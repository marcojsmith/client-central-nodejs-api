const BaseApiClient = require('./base');
const config = require('../config');

/**
 * @architecture-ref: /architecture/api-client.md#ticket-operations
 * Handles all ticket-related API operations
 * Inherits core functionality from BaseApiClient
 */
class TicketClient extends BaseApiClient {
  /**
   * Create a new ticket
   * @param {Object} ticketData - Data for the new ticket
   * @returns {Promise<Object>} Created ticket data
   */
  async createTicket(ticketData) {
    try {
      // Parse assignee format "user:12345" to numeric ID
      const assigneeId = ticketData.assignee ? 
        parseInt(ticketData.assignee.split(':')[1], 10) : 
        null;

      // Format custom fields as individual parameters
      const customFields = {};
      Object.entries(ticketData.custom_field_values || {})
.forEach(([fieldId, value], index) => {
        customFields[`custom_fields_attributes[${index}][id]`] = parseInt(fieldId, 10);
        customFields[`custom_fields_attributes[${index}][values]`] = value;
       });

      // Build payload with proper nested structure
      const payload = {
        ticket: {
          type_id: ticketData.type_id,
          workspace_id: ticketData.workspace_id,
          account: ticketData.account,
          subject: String(ticketData.subject).trim(),
          description: String(ticketData.description).trim(),
          internal: ticketData.internal,
          priority_id: ticketData.priority_id,
          assignee: assigneeId,
          disable_default_notifications: ticketData.disable_default_notification,
          custom_fields_attributes: Object.entries(ticketData.custom_field_values || {}).map(([id, value]) => ({ id: Number(id), values: [value] }))
        }
, 
      };

      // Log request details
      console.log('Creating ticket with request:', {
        url: '/api/v1/tickets.json',
        method: 'POST',
        headers: this.client.defaults.headers,
        payload: JSON.stringify(payload, null, 2)
      });

      
      // Convert nested JSON to flat fields format
      const flatFields = {};
      Object.entries(payload.ticket).forEach(([key, value]) => {
        if (key === 'custom_fields_attributes') {
          value.forEach((field, index) => {
            flatFields[`ticket[custom_fields_attributes][${index}][id]`] = field.id;
            flatFields[`ticket[custom_fields_attributes][${index}][values]`] = field.values[0];
          });
        } else {
          flatFields[`ticket[${key}]`] = value;
        }
      });

      console.log('Converted to flat fields format:', flatFields);

      // Try with URLSearchParams format
      const formData = new URLSearchParams();
      Object.entries(flatFields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      console.log('Final request format:', {
        url: '/api/v1/tickets.json',
        formData: {
          ...Object.fromEntries(formData),
          'ticket[subject]': ticketData.subject,
          'ticket[description]': ticketData.description
        }, headers: {
          ...this.client.defaults.headers,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const response = await this.client.post('/api/v1/tickets.json', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      // Log success response
      console.log('API Success Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data
      });

      return response.data;
    } catch (error) {
      // Log detailed error information
      /* console.error('API Error Details:', {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
        data: error.response?.data
      }); */

      // Log validation errors if present
      /* if (error.response?.data?.errors) {
        console.error('Validation Errors:', JSON.stringify(error.response.data.errors, null, 2));
      } */

      this._handleError(error, 'createTicket', { ticketData });
    }
  }

  // Rest of the class methods remain unchanged...
}

module.exports = TicketClient;