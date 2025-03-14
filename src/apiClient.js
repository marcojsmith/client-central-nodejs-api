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
  async getTickets(page, queryParams = {}) {
    try {
      const params = {
        page: page, // Page number
        workspaceId: config.server.workspaceIdFilter, // workspaceId filter
        ...queryParams, // Merge queryParams
        select: 'description,status.name,priority.name,status.id,priority.id,id,subject,customer_user.name,customer_user.id,created_by_user.id,assignee.name,account.name,assignee.id,account.id,related_module.name,related_module.id,type.name,type.id,created_at,updated_at',
      };


      const url = '/api/v1/tickets.json?';
      const fullUrl = this.client.defaults.baseURL + url + new URLSearchParams(params).toString();
      console.log('API Request URL:', fullUrl); // Log the full URL
      const response = await this.client.get(url, { params });

      // Extract pagination information from response data
      const pagination = {
        responsePage: response.data.page,
        more: response.data.more,
        total_pages: response.data.total_pages,
      };

      console.log('Pagination Info:', pagination); // Log pagination information

      return response.data
    } catch (error) {
      console.error('Error getting tickets:', error);
      throw new Error('Failed to get tickets');
    }
  }

  // --- Internal function to fetch ticket details ---
  async _fetchTicketDetails(id, workspaceId, params = {}) {
    try {
      const requestParams = { ...params };
      if (workspaceId) {
        requestParams.workspaceId = workspaceId; // Add workspaceId if provided
      }
      const response = await this.client.get(`/api/v1/tickets/${id}.json`, { params: requestParams });
      return response?.data || null;
    } catch (error) {
      console.error('API Error Details:', {
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });
      if (error.response?.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch ticket details');
    }
  }

  // Get details of a specific ticket
  async getTicketById(id, workspaceId) {
    return this._fetchTicketDetails(id, workspaceId, {  select: 'description,status.name,priority.name,status.id,priority.id,id,subject,customer_user.name,customer_user.id,created_by_user.id,assignee.name,account.name,assignee.id,account.id,related_module.name,related_module.id,type.name,type.id,created_at,updated_at' });
  }

  // Get details of a specific ticket with all fields
  async getAllTicketFieldsById(id, workspaceId) {
    return this._fetchTicketDetails(id, workspaceId);
  }

  // Create a new ticket
  async createTicket(ticketData) {
    try {
      const url = '/api/v1/tickets.json';
      const fullUrl = this.client.defaults.baseURL + url;
      console.log('API Request URL:', fullUrl); // Log the full URL
      const response = await this.client.post(url, { ticket: ticketData });
      return response.data;
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw new Error('Failed to create ticket');
    }
  }

  // Update an existing ticket (commit)
  async commitTicket(ticketId, ticketData, comment) {
    try {
      const url = `/api/v1/tickets/${ticketId}.json`;
      const fullUrl = this.client.defaults.baseURL + url;
      // console.log('API Request URL:', fullUrl);
      
      // Following Python example structure
      const payload = {
        ticket: {
          ...ticketData,
        },
        ticket_event: {
          comment: comment || null,
          internal: ticketData.internal || false,
          visible_to_customer: ticketData.visible_to_customer !== false,
          disable_default_notifications: true
        }
      };
      
      // Log full request details for debugging
      console.log('Request URL:', fullUrl);
      console.log('Request method:', 'PATCH');
      console.log('Request headers:', this.client.defaults.headers);
      console.log('Request params:', this.client.defaults.params);
      console.log('Request body:', JSON.stringify(payload, null, 2));
      
      console.log('Sending payload:', JSON.stringify(payload, null, 2));
      
      const response = await this.client.put(url, payload);
      return response.data;
    } catch (error) {
      console.error('API Error Details:', {
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });
      throw new Error('Failed to commit ticket');
    }
  }
}

module.exports = ApiClient;