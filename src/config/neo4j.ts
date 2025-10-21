import neo4j, { Driver, Session } from 'neo4j-driver';

class Neo4jService {
  private driver: Driver | null = null;
  private isConnected: boolean = false;

  constructor() {
    this.initializeDriver();
  }

  private initializeDriver() {
    try {
      const uri = process.env.NEXT_PUBLIC_NEO4J_URI as string | undefined;
      const username = process.env.NEXT_PUBLIC_NEO4J_USERNAME as string | undefined;
      const password = process.env.NEXT_PUBLIC_NEO4J_PASSWORD as string | undefined;

      console.log('🔧 Neo4j initialization:', {
        uri: uri ? `${uri.substring(0, 20)}...` : 'NOT SET',
        username: username || 'NOT SET',
        password: password ? '***SET***' : 'NOT SET'
      });

      if (!uri || !username || !password) {
        console.warn('⚠️ Neo4j configuration incomplete, database operations will be disabled');
        this.isConnected = false;
        return;
      }

      this.driver = neo4j.driver(uri, neo4j.auth.basic(username, password));
      this.isConnected = true;
      console.log('✅ Neo4j driver initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Neo4j driver:', error);
      this.isConnected = false;
    }
  }

  getSession(): Session | null {
    if (!this.driver || !this.isConnected) {
      return null;
    }
    return this.driver.session({ database: process.env.NEXT_PUBLIC_NEO4J_DATABASE });
  }

  async testConnection(): Promise<boolean> {
    const session = this.getSession();
    if (!session) return false;

    try {
      await session.run('RETURN 1');
      return true;
    } catch (error) {
      console.error('Neo4j connection test failed:', error);
      return false;
    } finally {
      await session.close();
    }
  }

  isConfigured(): boolean {
    const configured = !!(
      process.env.NEXT_PUBLIC_NEO4J_URI &&
      process.env.NEXT_PUBLIC_NEO4J_USERNAME &&
      process.env.NEXT_PUBLIC_NEO4J_PASSWORD &&
      process.env.NEXT_PUBLIC_NEO4J_DATABASE
    );
    
    console.log('🔍 Neo4j isConfigured():', {
      configured,
      isConnected: this.isConnected,
      hasDriver: !!this.driver
    });
    
    return configured && this.isConnected;
  }

  async close(): Promise<void> {
    if (this.driver) {
      await this.driver.close();
      this.isConnected = false;
    }
  }
}

export const neo4jService = new Neo4jService();
export default neo4jService;
