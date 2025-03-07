const axios = require('axios');
const config = require('./config');

class ApiClient {
  constructor() {
    const baseUrl = config.api.baseUrl.endsWith('/') 
      ? config.api.baseUrl.slice(0, -1)
      : config.api.baseUrl;

    this.client = axios.create({
      baseURL: baseUrl,
      params: {
        token: config.api.token
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  async getTickets(page = 1, pageSize = config.cli.pageSize) {
    const response = await this.client.get('/api/v1/tickets', {
      params: { page, pageSize }
    });
    return response.data;
  }

  async getTicketById(id) {
    const response = await this.client.get(`/api/v1/tickets/${id}`);
    return response.data;
  }
}

module.exports = ApiClient;