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

  // Get list of tickets
  async getTickets(page) {
    try {
      const response = await this.client.get('/api/v1/tickets.json', {
        params: {
          page, // Page number
          // Select all fields
          select: 'description,status.name,priority.name,status.id,priority.id,id,subject,customer_user.name,customer_user.id,created_by_user.id,assignee.name,account.name,assignee.id,account.id,related_module.name,related_module.id,type.name,type.id,created_at,updated_at'
        }
      });

      // Extract pagination information from response data
      const pagination = {
        responsePage: response.data.page,
        more: response.data.more,
        total_pages: response.data.total_pages,
      };

      console.log('Pagination Info:', pagination); // Log pagination information

      return response.data;
    } catch (error) {
      console.error('Error getting tickets:', error);
      throw new Error('Failed to get tickets');
    }
  }

  // Get details of a specific ticket
  async getTicketById(id) {
    try {
      const response = await this.client.get(`/api/v1/tickets/${id}.json`, {
        params: {
          select: 'description,status.name,priority.name,status.id,priority.id,id,subject,customer_user.name,customer_user.id,created_by_user.id,assignee.name,account.name,assignee.id,account.id,related_module.name,related_module.id,type.name,type.id,created_at,updated_at'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error getting ticket details:', error);
      throw new Error('Failed to get ticket details');
    }
  }

  // Create a new ticket
  async createTicket(ticketData) {
    try {
      const response = await this.client.post('/api/v1/tickets.json', { ticket: ticketData });
      return response.data;
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw new Error('Failed to create ticket');
    }
  }
}

module.exports = ApiClient;