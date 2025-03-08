require('dotenv').config();

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
    }
  },
  statuses: {
    61: 'In Testing'
  },
  priorities: {
    11: 'P3: Medium'
  }
};