const TicketClient = require('./api/tickets');

/**
 * @architecture-ref: /architecture/api-client.md#main-client
 * Main API Client that provides a clean interface to all API functionality.
 * Acts as a facade to the specialized clients (tickets, etc.) while maintaining
 * a simple and consistent interface for the application.
 */
class ApiClient {
  constructor() {
    // Initialize specialized clients
    this.tickets = new TicketClient();
  }

  /**
   * Get a paginated list of tickets
   * @param {number} page - Page number
   * @param {Object} queryParams - Additional query parameters
   */
  async getTickets(page, queryParams) {
    try {
      return await this.tickets.getTickets(page, queryParams);
    } catch (error) {
      /*
      console.error('Failed to get tickets:', error.details || error);
      throw error;
      */
    }
  }

  /**
   * Get a single ticket by ID
   * @param {string} id - Ticket ID
   * @param {string} workspaceId - Optional workspace ID
   */
  async getTicketById(id, workspaceId) {
    try {
      return await this.tickets.getTicketById(id, workspaceId);
    } catch (error) {
      /*
      console.error('Failed to get ticket:', error.details || error);
      throw error;
      */
    }
  }

  /**
   * Get all fields for a specific ticket
   * @param {string} id - Ticket ID
   * @param {string} workspaceId - Optional workspace ID
   */
  async getAllTicketFieldsById(id, workspaceId) {
    try {
      return await this.tickets.getAllTicketFieldsById(id, workspaceId);
    } catch (error) {
      /*
      console.error('Failed to get ticket fields:', error.details || error);
      throw error;
      */
    }
  }

  /**
   * Create a new ticket
   * @param {Object} ticketData - Data for the new ticket
   */
  async createTicket(ticketData) {
    try {
      return await this.tickets.createTicket(ticketData);
    } catch (error) {
      /*
      console.error('Failed to create ticket:', error.details || error);
      throw error;
      */
    }
  }

  /**
   * Update an existing ticket
   * @param {string} ticketId - ID of ticket to update
   * @param {Object} ticketData - Updated ticket data
   * @param {string} comment - Optional comment to add
   */
  async commitTicket(ticketId, ticketData, comment) {
    try {
      return await this.tickets.commitTicket(ticketId, ticketData, comment);
    } catch (error) {
      /*
      console.error('Failed to update ticket:', error.details || error);
      throw error;
      */
    }
  }
}

module.exports = ApiClient;
