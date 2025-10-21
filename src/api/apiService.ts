import { LLMInteraction, DashboardStats, AgentSettings, AuditLogEntry, FeedbackEntry } from '../types';
import { agents } from '../agents';
import { graphNeo4jDatabaseService } from '../services/graphNeo4jService';
import { rateLimiter } from '../utils/rateLimiter';
import { InputSanitizer } from '../utils/inputSanitizer';
import { callOpenAI, isOpenAIConfigured } from '../lib/openaiAgent';

export class ApiService {
  private useNeo4j: boolean;
  private interactionsMemory: LLMInteraction[] = [];
  private auditLogsMemory: AuditLogEntry[] = [];
  private feedbackMemory: FeedbackEntry[] = [];
  private settingsMemory: AgentSettings = {
    policyEnforcer: { enabled: true },
    verifier: { enabled: true },
    auditLogger: { enabled: true },
    responseAgent: { enabled: true },
    feedbackAgent: { enabled: true },
    severityThreshold: 7.0,
  };

  constructor() {
    this.useNeo4j = graphNeo4jDatabaseService.isConfigured();
    
    console.log('🔧 ApiService constructor:', {
      useNeo4j: this.useNeo4j,
      neo4jConfigured: graphNeo4jDatabaseService.isConfigured()
    });
    
    if (!this.useNeo4j) {
      console.warn('⚠️ Neo4j not configured, using in-memory storage (no mock).');
    } else {
      console.log('✅ Neo4j configured, initializing schema...');
      // Initialize Neo4j schema
      graphNeo4jDatabaseService.initializeSchema().catch(console.error);
    }
  }

  private getClientIdentifier(): string {
    // In a real app, this would be based on user ID or IP address
    // For demo purposes, we'll use a simple browser fingerprint
    return `client_${navigator.userAgent.slice(0, 50)}`;
  }

  async processPrompt(prompt: string): Promise<LLMInteraction> {
    const clientId = this.getClientIdentifier();
    
    // Rate limiting
    if (!rateLimiter.isAllowed(clientId)) {
      const resetTime = rateLimiter.getResetTime(clientId);
      const waitTime = Math.ceil((resetTime - Date.now()) / 1000);
      throw new Error(`Rate limit exceeded. Please wait ${waitTime} seconds before trying again.`);
    }

    // Input sanitization
    const validation = InputSanitizer.validatePrompt(prompt);
    if (!validation.isValid) {
      throw new Error(`Invalid input: ${validation.error}`);
    }

    const sanitizedPrompt = validation.sanitized!;

    // Generate LLM response using OpenAI
    // Even if not configured, callOpenAI will return a fallback response
    const llmResult = await callOpenAI(sanitizedPrompt);
    
    const interaction: LLMInteraction = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      input: sanitizedPrompt,
      output: llmResult.response,
      status: 'pending',
      severity: 'low',
      violations: [],
      agentActions: [],
      llmSource: llmResult.source as 'openai' | 'mock' | 'fallback',
      llmModel: llmResult.model,
      llmError: llmResult.error
    };

    // Get current settings
    const settings = await this.getSettings();

    // Process through agents
    if (settings.policyEnforcer.enabled) {
      const policyActions = await agents.policyEnforcer.process(interaction);
      interaction.agentActions.push(...policyActions);
    }

    // Update violations and status based on agent actions
    if (interaction.agentActions.some(action => action.action === 'flag' || action.action === 'block')) {
      // Don't override violations already detected by PolicyEnforcer
      // Only add additional violations from response analysis if none exist
      if (interaction.violations.length === 0) {
        interaction.violations = this.extractViolations(llmResult.response);
      }
      
      // Check if any violation exceeds threshold or if blocked by agent
      const maxSeverity = Math.max(...interaction.violations.map(v => v.severity), 0);
      const isBlocked = interaction.agentActions.some(action => action.action === 'block');
      
      interaction.status = isBlocked || maxSeverity >= settings.severityThreshold ? 'blocked' : 'pending';
      interaction.severity = this.mapSeverityToCategory(maxSeverity);
    } else {
      interaction.status = 'approved';
      interaction.severity = 'low';
    }

    // Process through verifier if enabled and high severity
    if (settings.verifier.enabled && interaction.violations.some(v => v.severity >= 7)) {
      const verifierActions = await agents.verifier.process(interaction);
      interaction.agentActions.push(...verifierActions);
      
      // Re-evaluate status after verifier adds potential violations
      if (interaction.violations.length > 0) {
        const maxSeverity = Math.max(...interaction.violations.map(v => v.severity), 0);
        interaction.status = maxSeverity >= settings.severityThreshold ? 'blocked' : 'pending';
        interaction.severity = this.mapSeverityToCategory(maxSeverity);
      }
    }

    // Process through other agents
    if (settings.auditLogger.enabled) {
      const auditActions = await agents.auditLogger.process(interaction);
      interaction.agentActions.push(...auditActions);
    }

    if (settings.responseAgent.enabled) {
      const responseActions = await agents.responseAgent.process(interaction);
      interaction.agentActions.push(...responseActions);
    }

    if (settings.feedbackAgent.enabled) {
      const feedbackActions = await agents.feedbackAgent.process(interaction);
      interaction.agentActions.push(...feedbackActions);
    }

    // Log all agent actions to audit logs after processing
    await this.logAllAgentActions(interaction);
    // Save interaction
    if (this.useNeo4j) {
      try {
        console.log('🔄 Attempting to save to Neo4j...', { id: interaction.id, input: interaction.input.substring(0, 50) });
        const neo4jId = await graphNeo4jDatabaseService.saveInteraction(interaction);
        interaction.id = neo4jId;
        console.log('✅ Successfully saved to Neo4j:', neo4jId);
      } catch (error) {
        console.error('❌ Failed to save to Neo4j, using mock API:', error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        const errorStack = error instanceof Error ? error.stack : '';
        console.error('Error details:', errorMessage, errorStack);
        // Do not fallback to mock; keep in-memory instead
        this.interactionsMemory.push(interaction);
      }
    } else {
      console.warn('⚠️ Neo4j not configured, storing interaction in-memory');
      this.interactionsMemory.push(interaction);
    }

    return interaction;
  }

  private async logAllAgentActions(interaction: LLMInteraction): Promise<void> {
    try {
      for (const action of interaction.agentActions) {
        const logEntry: AuditLogEntry = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: action.timestamp,
          agentName: action.agentName,
          action: action.action,
          interactionId: interaction.id,
          details: action.details,
        };
        if (this.useNeo4j) {
          await graphNeo4jDatabaseService.saveAuditLog(logEntry);
        } else {
          this.auditLogsMemory.push(logEntry);
        }
      }
    } catch (error) {
      console.error('Failed to log agent actions:', error);
    }
  }

  async getInteractions(): Promise<LLMInteraction[]> {
    if (this.useNeo4j) {
      try {
        console.log('🔄 Fetching interactions from Neo4j...');
        const interactions = await graphNeo4jDatabaseService.getInteractions();
        console.log(`✅ Retrieved ${interactions.length} interactions from Neo4j`);
        return interactions;
      } catch (error) {
        console.error('❌ Failed to fetch from Neo4j, using mock API:', error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('Error details:', errorMessage);
        return this.interactionsMemory.slice().reverse();
      }
    } else {
      console.warn('⚠️ Neo4j not configured, using in-memory interactions');
      return this.interactionsMemory.slice().reverse();
    }
  }

  async getDashboardStats(): Promise<DashboardStats> {
    if (this.useNeo4j) {
      try {
        return await graphNeo4jDatabaseService.getDashboardStats();
      } catch (error) {
        console.error('Failed to fetch stats from Neo4j:', error);
        return this.computeStatsFromMemory();
      }
    }
    return this.computeStatsFromMemory();
  }

  async getAuditLogs(): Promise<AuditLogEntry[]> {
    if (this.useNeo4j) {
      try {
        return await graphNeo4jDatabaseService.getAuditLogs();
      } catch (error) {
        console.error('Failed to fetch audit logs from Neo4j:', error);
        return this.auditLogsMemory.slice().reverse();
      }
    }
    return this.auditLogsMemory.slice().reverse();
  }

  async getFeedbackEntries(): Promise<FeedbackEntry[]> {
    if (this.useNeo4j) {
      try {
        return await graphNeo4jDatabaseService.getFeedback();
      } catch (error) {
        console.error('Failed to fetch feedback from Neo4j:', error);
        return this.feedbackMemory.slice().reverse();
      }
    }
    return this.feedbackMemory.slice().reverse();
  }

  async getSettings(): Promise<AgentSettings> {
    if (this.useNeo4j) {
      try {
        return await graphNeo4jDatabaseService.getSettings();
      } catch (error) {
        console.error('Failed to fetch settings from Neo4j:', error);
        return this.settingsMemory;
      }
    }
    return this.settingsMemory;
  }

  async updateSettings(newSettings: AgentSettings): Promise<void> {
    if (this.useNeo4j) {
      try {
        await graphNeo4jDatabaseService.saveSettings(newSettings);
      } catch (error) {
        console.error('Failed to save settings to Neo4j:', error);
        this.settingsMemory = { ...newSettings };
      }
    } else {
      this.settingsMemory = { ...newSettings };
    }
    
    // Update agent enabled states
    agents.policyEnforcer.enabled = newSettings.policyEnforcer.enabled;
    agents.verifier.enabled = newSettings.verifier.enabled;
    agents.auditLogger.enabled = newSettings.auditLogger.enabled;
    agents.responseAgent.enabled = newSettings.responseAgent.enabled;
    agents.feedbackAgent.enabled = newSettings.feedbackAgent.enabled;
  }

  async submitFeedback(interactionId: string, rating: 'positive' | 'negative' | 'flag', comment?: string): Promise<void> {
    const feedback: FeedbackEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      interactionId,
      rating,
      comment
    };

    if (this.useNeo4j) {
      try {
        await graphNeo4jDatabaseService.saveFeedback(feedback);
        
        // Update interaction with feedback
        const interactions = await graphNeo4jDatabaseService.getInteractions();
        const interaction = interactions.find((i: LLMInteraction) => i.id === interactionId);
        if (interaction) {
          await graphNeo4jDatabaseService.updateInteraction(interactionId, {
            userFeedback: {
              rating: rating === 'flag' ? 'report' : rating,
              comment,
              timestamp: new Date()
            }
          });
        }
      } catch (error) {
        console.error('Failed to save feedback to Neo4j:', error);
        this.feedbackMemory.push(feedback);
      }
    } else {
      this.feedbackMemory.push(feedback);
      // Update interaction in memory
      const interaction = this.interactionsMemory.find(i => i.id === interactionId);
      if (interaction) {
        interaction.userFeedback = {
          rating: rating === 'flag' ? 'report' : rating,
          comment,
          timestamp: new Date(),
        };
      }
    }
  }

  private mapSeverityToCategory(severity: number): 'low' | 'medium' | 'high' | 'critical' {
    if (severity >= 9) return 'critical';
    if (severity >= 7) return 'high';
    if (severity >= 5) return 'medium';
    return 'low';
  }

  private extractViolations(response: string) {
    const violations = [];
    const responseLower = response.toLowerCase();

    // PII detection
    if (responseLower.includes('john doe') || responseLower.includes('@email.com') || responseLower.includes('555-')) {
      violations.push({
        type: 'pii' as const,
        description: 'Personal information detected in response',
        severity: 8.5,
        confidence: 0.9,
        reason: 'Response contains email addresses, phone numbers, or medical record IDs'
      });
    }

    // Bias detection
    if (responseLower.includes('obviously') || responseLower.includes('everyone knows')) {
      violations.push({
        type: 'bias' as const,
        description: 'Biased language detected',
        severity: 5.8,
        confidence: 0.8,
        reason: 'Response contains language that may reflect unfair bias or assumptions'
      });
    }

    return violations;
  }

  // Get graph data for visualization
  async getGraphData(): Promise<{ nodes: any[], links: any[] }> {
    if (this.useNeo4j) {
      try {
        return await graphNeo4jDatabaseService.getGraphData();
      } catch (error) {
        console.error('Failed to fetch graph data from Neo4j:', error);
        return { nodes: [], links: [] };
      }
    }
    return { nodes: [], links: [] };
  }

  private computeStatsFromMemory(): DashboardStats {
    const total = this.interactionsMemory.length;
    const flagged = this.interactionsMemory.filter(i => i.status === 'blocked').length;
    const severitySum = this.interactionsMemory.reduce((sum, i) => {
      const map: Record<string, number> = { low: 1, medium: 2, high: 3, critical: 4 };
      return sum + (map[i.severity] || 0);
    }, 0);

    const violationCounts = this.interactionsMemory.reduce((counts, interaction) => {
      interaction.violations.forEach(v => {
        counts[v.type] = (counts[v.type] || 0) + 1;
      });
      return counts;
    }, {} as Record<string, number>);

    const topViolations = Object.entries(violationCounts)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const agentActionCounts = this.auditLogsMemory.reduce((counts, log) => {
      counts[log.agentName] = (counts[log.agentName] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);

    const agentActivity = Object.entries(agentActionCounts)
      .map(([agent, actions]) => ({ agent, actions }))
      .sort((a, b) => b.actions - a.actions);

    return {
      totalInteractions: total,
      flaggedInteractions: flagged,
      averageSeverity: total > 0 ? severitySum / total : 0,
      topViolations,
      agentActivity,
    };
  }

  isNeo4jConfigured(): boolean {
    return this.useNeo4j;
  }

  // Clear all Neo4j data
  async clearAllData(): Promise<void> {
    if (this.useNeo4j) {
      try {
        await graphNeo4jDatabaseService.clearAllData();
        // Reinitialize schema after clearing
        await graphNeo4jDatabaseService.initializeSchema();
      } catch (error) {
        console.error('Failed to clear Neo4j data:', error);
        throw error;
      }
    } else {
      console.warn('⚠️ Neo4j not configured, cannot clear data');
      throw new Error('Neo4j not configured');
    }
  }
}

export const apiService = new ApiService();