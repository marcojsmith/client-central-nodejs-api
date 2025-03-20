const ApiClient = require('../src/apiClient');
const config = require('../src/config');

describe('Create Ticket Integration Test', () => {
  let apiClient;

  beforeAll(() => {
    apiClient = new ApiClient();
  });

  it('should create a new ticket and verify its details', async () => {
    // 1. Create new ticket with specified values
    const ticketData = {
      subject: 'TEST ticket Subject',
      description: 'TEST ticket Description',
      priority_id: 12,            // P4: Low
      type_id: 23,               // Service Request
      workspace_id: 49,
      account: 5398,
      customer_user: null,    // No owner
      assignee: 'user:12381',
      internal: true,
      custom_field_values: {   // Match Python code format
        24: 196               // Key is field ID, value is the value
      },
      disable_default_notification: true
    };

    try {
      console.log('Attempting to create ticket with data:', JSON.stringify(ticketData, null, 2));
      const createdTicket = await apiClient.createTicket(ticketData);
      
      // Verify ticket was created and has an ID
      expect(createdTicket).toBeDefined();
      expect(createdTicket.id).toBeDefined();
      console.log(`Ticket created with ID: ${createdTicket.id}`);

      // 2. Fetch the created ticket
      console.log('Fetching created ticket...');
      const fetchedTicket = await apiClient.getTicketById(createdTicket.id);

      // 3. Verify all fields match what we sent
      console.log('Verifying ticket details...');
      expect(fetchedTicket.subject).toBe(ticketData.subject);
      expect(fetchedTicket.description).toBe(ticketData.description);
      expect(fetchedTicket.priority.id).toBe(ticketData.priority_id);
      expect(fetchedTicket.type.id).toBe(ticketData.type_id);
      expect(fetchedTicket.workspace.id).toBe(ticketData.workspace_id);
      expect(fetchedTicket.account.id).toBe(ticketData.account);
      expect(fetchedTicket.customer_user).toBeNull();
      expect(fetchedTicket.assignee.id).toBe(12381);
      expect(fetchedTicket.internal).toBe(true);
      
      // Verify custom field value matches API format
      const customField = fetchedTicket.custom_fields.find(
        f => f.id === 24
      );
      expect(customField.value).toBe(196);

      console.log('Ticket verification complete. All fields match.');
    } catch (error) {
      // Log error details
      /* console.error('Test Error Details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        error: JSON.stringify(error.response.data.errors, null, 2)
      }); */

      throw error;
    }
  }, 50000); // 5 second timeout
});