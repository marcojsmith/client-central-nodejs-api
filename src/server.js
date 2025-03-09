// HTTP Server Implementation
const express = require('express');
const cors = require('cors');
const ApiClient = require('./apiClient');
const config = require('./config');

// Initialize Express app
const app = express();

// Create ApiClient instance
const apiClient = new ApiClient();

// Middleware
app.use(cors());
app.use(express.json());

// GET endpoint for listing tickets
app.get('/api/v1/tickets', async (req, res) => {
  try {
    const { page = 2 } = req.query;
    // Get list of tickets from API
    const fullTickets = await apiClient.getTickets(page, config.server.workspaceIdFilter);
    // Extract required fields for each ticket
    const tickets = fullTickets.data.map(fullTicket => {
      return {
        ticketId: fullTicket.id,
        ticketDescription: fullTicket.description,
        ticketSubject: fullTicket.subject,
        owner: fullTicket.customer_user?.id, // Optional chaining on customer_user
        ownerName: fullTicket.customer_user?.name, // Optional chaining on customer_user
        assignee: fullTicket.assignee?.id, // Optional chaining on assignee
        assigneeName: fullTicket.assignee?.name, // Optional chaining on assignee
        relatedModule: fullTicket.related_module?.name,
        status: fullTicket.status?.name,
        priority: fullTicket.priority?.name,
        statusId: fullTicket.status?.id,
        priorityId: fullTicket.priority?.id,
        accountName: fullTicket.account?.name, // Optional chaining on account
        ticketType: fullTicket.type?.name,
        ticketTypeId: fullTicket.type?.id,
        relatedModuleId: fullTicket.related_module?.id,
        account: fullTicket.account?.id, // Optional chaining on account
        createdAt: fullTicket.created_at,
        updatedAt: fullTicket.updated_at,
      };
    });
    res.json({ tickets }); // Return tickets in an object
  } catch (error) {
    console.error('Error getting tickets list:', error);
    res.status(500).json({ error: 'Failed to get tickets list' });
  }
});

// GET endpoint for getting ticket details
app.get('/api/v1/tickets/:id', async (req, res) => {
  try {
    console.log('Request received for ticket ID:', req.params.id); // Log request parameters
    const apiFullTicket = await apiClient.getTicketById(req.params.id, config.server.workspaceIdFilter);
    // Extract only the required fields
    /* const ticket = {
      ticketId: apiFullTicket.data.id,
      ticketDescription: apiFullTicket.data.description, // Corrected to description
      ticketSubject: apiFullTicket.data.subject, // ADDED: ticketSubject field
      owner: apiFullTicket.data.customer_user.id,
      ownerName: apiFullTicket.data.customer_user.name,
      assignee: apiFullTicket.data.assignee.id,
      assigneeName: apiFullTicket.data.assignee.name,
      relatedModule: apiFullTicket.data.related_module.name, // Added relatedModule
      status: apiFullTicket.data.status.name,
      priority: apiFullTicket.data.priority.name,
      statusId: apiFullTicket.data.status?.id, // Use optional chaining
      priorityId: apiFullTicket.data.priority?.id, // Use optional chaining
      accountName: apiFullTicket.data.account.name,
      ticketType: apiFullTicket.data.type?.name, // Corrected to type?.name
      ticketTypeId: apiFullTicket.data.type?.id, // Added ticketType id
      relatedModuleId: apiFullTicket.data.related_module.id, // Added relatedModule id
      account: apiFullTicket.data.account.id,
      createdAt: apiFullTicket.data.created_at, // Added created_at
      updatedAt: apiFullTicket.data.updated_at, // Added updated_at
    }; */
    res.json(apiFullTicket.data);
  } catch (error) {
    console.error('Error getting ticket details:', error);
    console.error('Detailed error:', error); // Log detailed error
    res.status(500).json({ error: 'Failed to get ticket details' });
  }
});

// GET endpoint for getting full ticket details
app.get('/api/v1/tickets/:id/full', async (req, res) => {
  try {
    console.log('Request received for full ticket details ID:', req.params.id); // Log request parameters
    const fullTicket = await apiClient.getAllTicketFieldsById(req.params.id, config.server.workspaceIdFilter);
    res.json(fullTicket.data); // Return all fields
  } catch (error) {
    console.error('Error getting full ticket details:', error);
    console.error('Detailed error:', error); // Log detailed error
    res.status(500).json({ error: 'Failed to get full ticket details' });
  }
});


// POST endpoint for creating tickets
app.post('/api/v1/tickets', async (req, res) => {
  try {
    const { ticket } = req.body;

    if (!ticket) {
      return res.status(400).json({ error: 'Ticket data is required' });
    }

    const result = await apiClient.createTicket(ticket);
    res.json(result);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

// Start server
const PORT = config.serverPort || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});