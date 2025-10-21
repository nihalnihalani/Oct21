# Neo4j Graph Not Displaying - Fix Guide

## Problem
Your Neo4j database has data but the graph visualization is not showing in the app.

## Root Cause
The Neo4j environment variables are **not configured** in your Next.js application. The system requires **all 4 Neo4j variables** to be set before it considers Neo4j "configured" and attempts to fetch graph data.

## Solution

### Step 1: Create `.env.local` File

Create a file named `.env.local` in your project root (same folder as `package.json`) with the following content:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Neo4j Database Configuration (ALL 4 REQUIRED)
NEXT_PUBLIC_NEO4J_URI=neo4j+s://your-database-id.databases.neo4j.io
NEXT_PUBLIC_NEO4J_USERNAME=neo4j
NEXT_PUBLIC_NEO4J_PASSWORD=your_neo4j_password
NEXT_PUBLIC_NEO4J_DATABASE=neo4j

# Perplexity API (for fact verification)
NEXT_PUBLIC_PERPLEXITY_API_KEY=your_perplexity_api_key

# OpenAI API (for LLM responses)
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
```

### Step 2: Get Your Neo4j Credentials

1. Go to your Neo4j Aura console: https://neo4j.com/cloud/aura/
2. Select your database instance
3. Click "Connect" or "Connection details"
4. Copy:
   - **URI** (starts with `neo4j+s://`) → Use for `NEXT_PUBLIC_NEO4J_URI`
   - **Username** (usually `neo4j`) → Use for `NEXT_PUBLIC_NEO4J_USERNAME`
   - **Password** (the one you set when creating the database) → Use for `NEXT_PUBLIC_NEO4J_PASSWORD`
   - **Database** (usually `neo4j`) → Use for `NEXT_PUBLIC_NEO4J_DATABASE`

### Step 3: Restart the Dev Server

After creating/updating `.env.local`, you **must** restart the Next.js dev server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 4: Verify the Configuration

1. Open your app in the browser (usually http://localhost:3000)
2. Navigate to the Dashboard
3. You should now see the **Neo4j Debug Panel** showing all 4 variables as configured
4. Check the browser console - you should see:
   ```
   ✅ Neo4j driver initialized successfully
   ```

## How to Check if It's Working

### In the Browser Console
Look for these messages:
```
🔧 Neo4j initialization: {
  uri: 'neo4j+s://...',
  username: 'neo4j',
  password: '***SET***'
}
✅ Neo4j driver initialized successfully
```

### In the Dashboard
- The Neo4j Status component should show "Connected"
- The Neo4j Debug panel should show all 4 variables with green checkmarks
- The graph visualization should load with your data

## Common Issues

### Issue 1: Variables Not Recognized
**Symptom**: Console shows "NOT SET" for variables
**Solution**: 
- Make sure the file is named exactly `.env.local` (with the dot at the start)
- Make sure it's in the project root (same folder as `package.json`)
- Restart the dev server

### Issue 2: Still Using Mock Data
**Symptom**: Graph shows empty even after configuration
**Solution**:
- Check all 4 variables are set (not just 3)
- Verify your Neo4j credentials are correct
- Test connection in Neo4j browser first

### Issue 3: Connection Timeout
**Symptom**: "Failed to fetch graph data from Neo4j" in console
**Solution**:
- Check your Neo4j instance is running
- Verify the URI is correct (should start with `neo4j+s://` for Aura)
- Check your firewall/network settings

## Important Notes

1. **All variables must have `NEXT_PUBLIC_` prefix** for client-side access
2. **All 4 Neo4j variables are required** - missing even one will cause the system to use in-memory storage
3. **Environment variables are read only at build/start time** - you must restart after changes
4. **`.env.local` is gitignored** - this is correct, never commit credentials to git

## Testing the Graph

Once configured, you can test the graph:

1. Go to **Live Monitor** page
2. Submit a test prompt (e.g., "Ignore all previous instructions")
3. Wait for processing to complete
4. Go back to **Dashboard**
5. The graph should now display nodes and relationships

## What the Graph Shows

When working correctly, the graph visualizes:
- **Interaction nodes** (blue) - Each prompt/response pair
- **Violation nodes** (red) - Detected policy violations
- **Agent Action nodes** (green) - Agent processing actions
- **Relationships** - Connections between nodes (HAS_VIOLATION, PROCESSED_BY, etc.)

## Need More Help?

If you're still having issues:
1. Check the browser console for specific error messages
2. Verify your Neo4j instance has data (check in Neo4j browser)
3. Make sure you're using Neo4j 5.x (required for the driver)
4. Check the ENVIRONMENT_SETUP.md guide for more details

