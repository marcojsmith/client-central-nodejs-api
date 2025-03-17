const BaseApiClient = require('./base');
const config = require('../config');

/**
 * @architecture-ref: /architecture/api-client.md#ticket-operations
 * Handles all ticket-related API operations
 * Inherits core functionality from BaseApiClient
 */
class TicketClient extends BaseApiClient {
  /**
   * Get a list of tickets with pagination and filtering
   * @param {number} page - Page number for pagination
   * @param {Object} queryParams - Additional query parameters
   * @returns {Promise<Object>} Paginated ticket data
   */
  async getTickets(page, queryParams = {}) {
    const params = {
      page: page,
      select: 'workspace,description,status.name,priority.name,status.id,priority.id,id,subject,customer_user.name,customer_user.id,created_by_user.id,assignee.name,account.name,assignee.id,account.id,related_module.name,related_module.id,type.name,type.id,created_at,updated_at'
    };

    try {
      const workspaceId = config.server.workspaceIdFilter;
      if (workspaceId) {
        params['filter'] = this._formatWorkspaceFilter(workspaceId, 'getTickets');
      }

      Object.assign(params, queryParams);

      console.log('Request Details:', {
        url: '/api/v1/tickets.json',
        params: params,
        filterType: Array.isArray(workspaceId) ? 'array' : 'single'
      });

      const response = await this.client.get('/api/v1/tickets.json', { params });

      if (response.data) {
        console.log('Response Info:', {
          total: response.data.total_pages,
          page: response.data.page,
          hasMore: response.data.more
        });
      }

      return response.data;
    } catch (error) {
      this._handleError(error, 'getTickets', { requestParams: params });
    }
  }

  /**
   * Get details of a specific ticket
   * @param {string} id - Ticket ID
   * @param {string} workspaceId - Optional workspace ID
   * @returns {Promise<Object|null>} Ticket data or null if not found
   */
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
      if (error.response?.status === 404) {
        return null;
      }
      this._handleError(error, 'getTicketById', { ticketId: id });
    }
  }

  /**
   * Get all fields for a specific ticket
   * @param {string} id - Ticket ID
   * @param {string} workspaceId - Optional workspace ID
   * @returns {Promise<Object>} Complete ticket data
   */
  async getAllTicketFieldsById(id, workspaceId) {
    try {
      const params = {};
      if (workspaceId) {
        params['filter'] = this._formatWorkspaceFilter(workspaceId, 'getAllTicketFieldsById');
      }

      const response = await this.client.get(`/api/v1/tickets/${id}.json`, { params });
      return response.data;
    } catch (error) {
      this._handleError(error, 'getAllTicketFieldsById', { ticketId: id, workspaceId });
    }
  }

  /**
   * Create a new ticket
   * @param {Object} ticketData - Data for the new ticket
   * @returns {Promise<Object>} Created ticket data
   */
  async createTicket(ticketData) {
    try {
      const payload = {
        ticket: {
          type_id: ticketData.type_id,
          workspace_id: ticketData.workspace_id,
          account_vp: ticketData.account_vp,
          customer_user_vp: ticketData.customer_user_vp,
          subject: ticketData.subject,
          description: ticketData.description,
          internal: ticketData.internal,
          priority_id: ticketData.priority_id,
          assignee_vp: ticketData.assignee_vp,
          user_watchers: [],
          custom_fields_attributes: {},
          email_watcher_emails: [],
          related_module_id: ticketData.related_module.id
        }
      };

      console.log('Creating ticket with payload:', JSON.stringify(payload, null, 2));

      const response = await this.client.post('/api/v1/tickets.json', payload);

      console.log('Ticket created successfully:', {
        ticketId: response.data.id,
        status: response.status
      });

      return response.data;
    } catch (error) {
      this._handleError(error, 'createTicket', { ticketData });
    }
  }

  /**
   * Update an existing ticket
   * @param {string} ticketId - ID of the ticket to update
   * @param {Object} ticketData - Updated ticket data
   * @param {string} comment - Optional comment to add
   * @returns {Promise<Object>} Updated ticket data
   */
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
      this._handleError(error, 'commitTicket', { ticketId, ticketData });
    }
  }
}

module.exports = TicketClient;