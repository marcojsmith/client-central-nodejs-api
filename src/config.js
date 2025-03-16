require('dotenv').config();

// Helper function to parse workspace IDs from environment variable
function parseWorkspaceIds(envValue) {
  if (!envValue) return null;
  
  // Split by comma and convert to array of numbers
  return envValue.split(',')
    .map(id => id.trim())
    .filter(id => id !== '')
    .map(Number)  // Convert to numbers
    .filter(id => !isNaN(id));  // Remove any invalid numbers
}

module.exports = {
  api: {
    baseUrl: process.env.API_BASE_URL,
    token: process.env.API_TOKEN
  },
  CC: {
    maxRetries: parseInt(process.env.MAX_RETRIES) || 3
  },
  server: {
    port: parseInt(process.env.SERVER_PORT) || 3000,
    cors: {
      allowedOrigins: process.env.CORS_ALLOWED_ORIGINS?.split(',') || ['*']
    },
    workspaceIdFilter: parseWorkspaceIds(process.env.WORKSPACE_ID_FILTER)
  },
  debug: {
    envWorkspaceIdFilter: process.env.WORKSPACE_ID_FILTER,
    parsedWorkspaceIds: parseWorkspaceIds(process.env.WORKSPACE_ID_FILTER)
  },
  statuses: {
    61: 'In Testing'
  },
  priorities: {
    11: 'P3: Medium'
  }
};