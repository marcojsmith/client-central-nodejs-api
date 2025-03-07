require('dotenv').config();

module.exports = {
  api: {
    baseUrl: process.env.API_BASE_URL,
    token: process.env.API_TOKEN
  },
  cli: {
    pageSize: parseInt(process.env.DEFAULT_PAGE_SIZE) || 20,
    maxRetries: parseInt(process.env.MAX_RETRIES) || 3
  },
  statuses: {
    61: 'In Testing'
  },
  priorities: {
    11: 'P3: Medium'
  }
};