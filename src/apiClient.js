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

  // Helper method to format workspace filter query
  _formatWorkspaceFilter(workspaceId, context = '') {
    if (!workspaceId) {
      return null;
    }

    // Handle both single workspace ID and arrays of workspace IDs
    let filterQuery;
    if (Array.isArray(workspaceId)) {
      // Use array format for multiple workspace filter
      filterQuery = `workspace.id IN [${workspaceId.join(',')}]`;

      // Log filter creation for debugging
      console.log('Creating multi-workspace filter:', {
        workspaceIds: workspaceId,
        filterSyntax: filterQuery,
        context
      });
    } else {
      // Use equals for single workspace
      filterQuery = `workspace.id = ${workspaceId}`;

      // Log filter creation for debugging
      console.log('Creating single workspace filter:', {
        workspaceId,
        filterSyntax: filterQuery,
        context
      });
    }

    return filterQuery;
  }

  // --- Get list of tickets ---
  async getTickets(page, queryParams = {}) {
    // Initialize params at the beginning of the method
    const params = {
      page: page,
      select: 'workspace,description,status.name,priority.name,status.id,priority.id,id,subject,customer_user.name,customer_user.id,created_by_user.id,assignee.name,account.name,assignee.id,account.id,related_module.name,related_module.id,type.name,type.id,created_at,updated_at'
    };

    try {
      // Add workspace filter using correct format
      const workspaceId = config.server.workspaceIdFilter;
      if (workspaceId) {
        params['filter'] = this._formatWorkspaceFilter(workspaceId, 'getTickets');
      }

      // Add any additional query parameters
      Object.assign(params, queryParams);

      // Log request details for debugging
      console.log('Request Details:', {
        url: '/api/v1/tickets.json',
        params: params,
        filterType: Array.isArray(workspaceId) ? 'array' : 'single'
      });

      const response = await this.client.get('/api/v1/tickets.json', { params });

      // Log response details
      if (response.data) {
        console.log('Response Info:', {
          total: response.data.total_pages,
          page: response.data.page,
          hasMore: response.data.more
        });
      }

      return response.data;
    } catch (error) {
      console.error('Error Details:', {
        method: 'getTickets',
        message: error.message,
        status: error.response?.status,
        errors: error.response?.data?.errors,
        errorData: error.response?.data,
        requestParams: params
      });
      throw error;
    }
  }

  // --- Get details of a specific ticket ---
  async getTicketById(id, workspaceId) {
    try {
      const params = {
        select: 'description,status.name,priority.name,status.id,priority.id,id,subject,customer_user.name,customer_user.id,created_by_user.id,assignee.name,account.name,assignee.id,account.id,related_module.name,related_module.id,type.name,type.id,created_at,updated_at'
      };

      if (workspaceId) {
        params['filter'] = this._formatWorkspaceFilter(workspaceId, 'getTicketById');
      }

      const response = await this.client.get(`/api/v1/tickets/${id}.json`, { params });
      return response?.data || null;
    } catch (error) {
      console.error('API Error:', {
        method: 'getTicketById',
        status: error.response?.status,
        data: error.response?.data,
        filter: params.filter
      });
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  // --- Get full ticket details ---
  async getAllTicketFieldsById(id, workspaceId) {
    try {
      const params = {};
      if (workspaceId) {
        params['filter'] = this._formatWorkspaceFilter(workspaceId, 'getAllTicketFieldsById');
      }

      const response = await this.client.get(`/api/v1/tickets/${id}.json`, { params });
      return response.data;
    } catch (error) {
      console.error('API Error:', {
        method: 'getAllTicketFieldsById',
        ticketId: id,
        workspaceId,
        filter: params.filter,
        error: error.message,
        errorData: error.response?.data
      });
      throw error;
    }
  }

  // --- Create a new ticket ---
  async createTicket(ticketData) {
    try {
      const response = await this.client.post('/api/v1/tickets.json', { ticket: ticketData });
      return response.data;
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }
  }

  // --- Update an existing ticket (commit) ---
  async commitTicket(ticketId, ticketData, comment) {
    try {
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

      console.log('Update request:', {
        url: `/api/v1/tickets/${ticketId}.json`,
        payload: payload
      });

      const response = await this.client.put(`/api/v1/tickets/${ticketId}.json`, payload);
      return response.data;
    } catch (error) {
      console.error('Update Error:', {
        status: error.response?.status,
        data: error.response?.data
      });
      throw error;
    }
  }
}

module.exports = ApiClient;