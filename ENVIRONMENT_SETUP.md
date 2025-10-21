# Environment Setup Guide

## Required Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

### Clerk Authentication
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
```

### Neo4j Database Configuration
```bash
NEXT_PUBLIC_NEO4J_URI=neo4j+s://your-neo4j-instance.databases.neo4j.io
NEXT_PUBLIC_NEO4J_USERNAME=neo4j
NEXT_PUBLIC_NEO4J_PASSWORD=your_neo4j_password_here
NEXT_PUBLIC_NEO4J_DATABASE=neo4j
```

### Perplexity API (for fact verification)
```bash
NEXT_PUBLIC_PERPLEXITY_API_KEY=your_perplexity_api_key_here
```

### OpenAI API (for LLM responses)
```bash
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

## Important Notes

1. **All Neo4j variables must be prefixed with `NEXT_PUBLIC_`** - This is required for Next.js to make them available in the browser
2. **All 4 Neo4j variables are required** - The system checks for all of them before considering Neo4j "configured"
3. **Restart the dev server** after adding or changing environment variables

## Troubleshooting Graph Display

If your Neo4j database has data but the graph doesn't show:

1. **Check the browser console** for Neo4j connection errors
2. **Verify all 4 Neo4j variables are set** in `.env.local`
3. **Restart the dev server** with `npm run dev`
4. **Check Neo4j connection** in the browser console - you should see:
   ```
   ✅ Neo4j driver initialized successfully
   ```

## How to Get Your Neo4j Credentials

1. Go to [Neo4j Aura](https://neo4j.com/cloud/aura/) or your Neo4j instance
2. Copy the connection URI (starts with `neo4j+s://`)
3. Copy the username (usually `neo4j`)
4. Copy the password
5. Database name is usually `neo4j` (default)

## Testing Neo4j Connection

After setting up your environment variables, open the app in your browser and check the console. You should see:

```
🔧 Neo4j initialization: {
  uri: 'neo4j+s://...',
  username: 'neo4j',
  password: '***SET***'
}
✅ Neo4j driver initialized successfully
```

If you see errors, double-check your credentials and make sure they're properly formatted in `.env.local`.

