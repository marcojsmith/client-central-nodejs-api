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
    const { page = 1,  ...queryParams } = req.query; // Extract page and queryParams
    
    // Log request info before making API call
    console.log('Fetching tickets with:', {
      page,
      queryParams,
      workspaceId: config.server.workspaceIdFilter
    });

    // Fetch tickets from API
    const response = await apiClient.getTickets(page, queryParams);
    
    // Validate response structure  before processing
    if (!response?.data) {
      console.error('Invalid response structure:', {
        received: fullTickets,
        expectedProperty: 'data'
      });
      return res.status(500).json({ 
        error: 'Invalid response from API'
      });
    }

    const tickets = response.data.map(fullTicket => {
      return {
        ticketId: fullTicket.id,
        workspaceId: fullTicket.workspace.id,
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

    // Return response with tickets and pagination information
    res.json({
      tickets,
      // Pagination information from the API:
      // - currentPage: Current page number
      // - totalPages: Total number of pages available
      // - hasMore: Whether there are more pages after this one
      pagination: {
        currentPage: response.page,
        totalPages: response.total_pages,
        hasMore: response.more
      }
    });
  } catch (error) {
    console.error('Error getting tickets list:', error);
    res.status(500).json({ error: 'Failed to get tickets list' });
  }
});

// GET endpoint for getting ticket details
app.get('/api/v1/tickets/:id', async (req, res) => {
  try {
    console.log('Request received for ticket ID:', req.params.id); // Log request parameters
    const ticket = await apiClient.getTicketById(req.params.id, config.server.workspaceIdFilter);
      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      
    res.json(ticket);
  } catch (error) {
    console.error('Error getting ticket details:', error);
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
    // Extract ticket data from the request body
    const ticketData = req.body;

    // Validate ticket data - ensure ticketData is not empty
    if (!ticketData || Object.keys(ticketData).length === 0) {
      return res.status(400).json({ error: 'Ticket data is required in the request body' });
    }

    // Call apiClient.createTicket to create the ticket
    const newTicket = await apiClient.createTicket(ticketData);

    // Respond with the newly created ticket data
    res.status(201).json(newTicket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    // Handle specific error types if needed, otherwise, send a generic error response
    res.status(500).json({ error: 'Failed to create ticket', details: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ error: 'Something went wrong' });
});

// endpoint for updating tickets
app.patch('/api/v1/tickets/:id', async (req, res) => {
  console.log('Request received for updating ticket ID:', req.params.id);
  try {
    const ticketId = req.params.id;
    const ticketData = req.body.ticket;
    const ticketEvent = req.body.ticket_event || {};
    
    // Extract ticket event data
    const comment = ticketEvent.comment;
    
    console.log('Updating ticket with:', {
      ticketData, ticketEvent
    });
    if (!ticketId) {
      return res.status(400).json({ error: 'Ticket ID is required' });
    }
    if (!ticketData || Object.keys(ticketData).length === 0) {
      return res.status(400).json({ error: 'Ticket data is required in the request body' });
    }

    const updatedTicket = await apiClient.commitTicket(ticketId, ticketData, comment);
    
    // Format the response
    const formattedResponse = {
      id: updatedTicket.data.id,
      subject: updatedTicket.data.subject,
      description: updatedTicket.data.description,
      status: updatedTicket.data.status?.name,
      updated_at: updatedTicket.data.updated_at,
      internal: updatedTicket.data.internal,
      visible_to_customer: !updatedTicket.data.visible_to_customer
    };
    
    res.json(formattedResponse);
  } catch (error) {
    console.error('Detailed error:', error);
    console.error('Request body:', req.body);
    console.error('Request params:', req.params);
    console.error('Error updating ticket:', error);
    res.status(500).json({ error: 'Failed to update ticket', details: error.message });
  }
});



// Start server
const PORT = config.serverPort || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});