# ClerkLens Changelog

## Latest Updates (October 21, 2025)

### 🎯 Project Renamed: NIMEdge → ClerkLens
- Updated all branding throughout the application
- Changed package name to `clerklens-ai-governance`
- Updated repository references
- Modified UI components to display "ClerkLens"
- Migrated from Vite to Next.js with App Router
- Integrated Clerk authentication

## Previous Updates (October 10, 2025)

### 🎯 Project Renamed: EthosLens → NIMEdge
- Updated all branding throughout the application
- Changed package name to `nimedge-ai-governance`
- Updated repository references
- Modified UI components to display "NIMEdge"

### ✅ Fixed: Audit Logs Page
**Issue**: Audit logs weren't working properly
**Solution**: 
- Added proper loading states with spinner
- Implemented manual refresh button
- Auto-refresh every 10 seconds for real-time updates
- Added interaction and agent log counts in tab labels
- Improved empty states with helpful messages
- Better error handling and console logging

**Features Added**:
- Loading indicator while fetching data
- Refresh button with spinning animation
- Display count of total interactions and audit logs
- Filter by status (approved/blocked/pending)
- Filter by severity (low/medium/high/critical)
- Full-text search across logs
- Export functionality placeholder

### 🗄️ Database Management
**New Feature**: Clear Neo4j Database
- Added `clearAllData()` method to GraphNeo4jService
- Removes all nodes and relationships from Neo4j
- Automatic schema reinitialization after clearing
- Available through API service

**Settings Page Enhancement**:
- New "Database Management" section
- Clear Database button with confirmation dialog
- Safety warning before clearing (irreversible action)
- Visual feedback during operations
- Disabled when Neo4j is not configured
- Success/error toast notifications

### 🔧 Technical Improvements

#### API Service
- Added `clearAllData()` public method
- Better error handling with descriptive messages
- Improved Neo4j configuration checking

#### GraphNeo4jService
- New `clearAllData()` method with proper session handling
- Enhanced logging for debugging
- Proper error propagation

#### Audit Logs Component
- Refactored data fetching into reusable function
- Added loading and refreshing states
- Improved UX with counts and status indicators
- Better performance with Promise.all

### 📚 Documentation Updates
- Updated README with new features
- Added Features Guide section
- Documented Database Management workflow
- Enhanced Testing instructions
- Added Neo4j configuration notes

### 🚀 Repository Updates
- Pushed to original repository: `nihalnihalani/EthosLens`
- Pushed to new repository: `aran-yogesh/nimedge`
- Created and merged `nihal's-branch`
- All changes committed with proper descriptions

## Usage Instructions

### To Clear the Database:
1. Navigate to **Settings** page
2. Scroll to **Database Management** section
3. Click **Clear Database** button
4. Confirm the action in the dialog
5. Wait for success notification
6. Database will be empty and schema reinitialized

### To View Audit Logs:
1. Navigate to **Audit Logs** page
2. Switch between "Interactions" and "Agent Logs" tabs
3. Use filters to narrow down results
4. Click "Refresh" to manually update data
5. Search using the search box
6. Export logs (coming soon)

### To Monitor Real-time:
- Audit logs auto-refresh every 10 seconds
- Live Monitor shows latest interactions
- Dashboard displays real-time statistics
- Graph view shows relationship visualization

## Configuration Requirements

### Neo4j (Recommended)
```env
VITE_NEO4J_URI=neo4j+s://xxxxx.databases.neo4j.io
VITE_NEO4J_USERNAME=neo4j
VITE_NEO4J_PASSWORD=your_password
VITE_NEO4J_DATABASE=neo4j
```

### OpenAI (Optional)
```env
VITE_OPENAI_API_KEY=your_openai_key
```

### Perplexity (Optional)
```env
VITE_PERPLEXITY_API_KEY=your_perplexity_key
```

## Known Issues & Notes
- Export functionality is placeholder (to be implemented)
- Without Neo4j, system uses in-memory mock data
- Node.js version warning can be ignored (app works fine)
- Auto-refresh interval set to 10 seconds (configurable)

## Next Steps
- Implement export logs functionality
- Add pagination for large datasets
- Add date range filters
- Implement real-time WebSocket updates
- Add user authentication
- Enhance graph visualization

---
**Version**: 1.1.0  
**Last Updated**: October 10, 2025  
**Project**: NIMEdge (formerly EthosLens)  
**Repository**: https://github.com/aran-yogesh/nimedge

