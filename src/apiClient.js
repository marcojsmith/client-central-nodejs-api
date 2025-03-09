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
  async getTickets(page, workspaceId) {
    try {
      const response = await this.client.get('/api/v1/tickets.json', {
        params: {
          page, // Page number
          // Select all fields
          select: 'description,status.name,priority.name,status.id,priority.id,id,subject,customer_user.name,customer_user.id,created_by_user.id,assignee.name,account.name,assignee.id,account.id,related_module.name,related_module.id,type.name,type.id,created_at,updated_at',
          ...(workspaceId ? { workspace_id: workspaceId } : {}) // Conditionally add workspace_id
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

  // --- Internal function to fetch ticket details ---
  async _fetchTicketDetails(id, workspaceId, params = {}) { // params is now optional
    try {
      const requestParams = { ...params }; // Start with any provided params
      if (workspaceId) {
        requestParams.workspace_id = workspaceId; // Add workspaceId if provided
      }
      const response = await this.client.get(`/api/v1/tickets/${id}.json`, { params: requestParams });
      return response.data;
    } catch (error) {
      console.error('Error fetching ticket details:', error);
      throw new Error('Failed to fetch ticket details');
    }
  }


  // Get details of a specific ticket
  async getTicketById(id, workspaceId) {
    return this._fetchTicketDetails(id, workspaceId, { select: 'description,status.name,priority.name,status.id,priority.id,id,subject,customer_user.name,customer_user.id,created_by_user.id,assignee.name,account.name,assignee.id,account.id,related_module.name,related_module.id,type.name,type.id,created_at,updated_at' });
  }

  // Get details of a specific ticket with all fields
  async getAllTicketFieldsById(id, workspaceId) {
    return this._fetchTicketDetails(id, workspaceId);
  }


  // Create a new ticket
  
}

module.exports = ApiClient;