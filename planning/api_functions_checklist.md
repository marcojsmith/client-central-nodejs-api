# API Functions Implementation Checklist for HTTP Server - Revised

This checklist outlines the functions to be implemented or updated in our Node.js server and API client, based on the Python code examples provided in `CC_API_docs/python-code-examples/`. We will focus on enhancing the existing HTTP endpoints and updating the `apiClient.js` to support more functionalities.

## Ticket Functions - HTTP Endpoints and apiClient Updates

1.  [x] **Enhance `GET /api/v1/tickets` Endpoint and `getTickets(page, workspaceId, queryParams)` in `apiClient.js` for Querying and Filtering (Partially Completed)**:
    *   [x] **Purpose**: Modify the existing `GET /api/v1/tickets` endpoint to support flexible querying and filtering of tickets using query parameters. This will allow users to search and filter tickets based on various criteria, making the endpoint more versatile.
    *   [x] **Tasks**:
        *   [x] Update the `getTickets(page, workspaceId)` function in `src/apiClient.js` to accept an optional `queryParams` object.
        *   [x] Modify `getTickets` to construct API request parameters based on the provided `queryParams`. This will include handling filters, select fields, sorting, and other query options.
        *   [x] Update the `GET /api/v1/tickets` endpoint in `src/server.js` to extract query parameters from the HTTP request (e.g., `req.query`).
        *   [x] Pass these extracted query parameters to `apiClient.getTickets()`.
        *   [x] Ensure pagination and workspace filtering still work correctly with the new query parameters.
        *   [ ] Implement error handling and response formatting.
        *   [x] Test various query scenarios, including filtering by different fields, using operators, and combining filters. **(Failed - Filtering not working as expected, needs further investigation)**

2.  [x] **Update `GET /api/v1/tickets/:id/full` Endpoint and `getAllTicketFieldsById(id, workspaceId)` in `apiClient.js` (Verification)**:
    *   [ ] **Purpose**: Verify and ensure this endpoint and apiClient function correctly retrieve and return all fields for a specific ticket. This is for fetching complete ticket details when needed.
    *   [x] **Tasks**:
        *   [x] Verify that `getAllTicketFieldsById` in `apiClient.js` correctly fetches all fields (it seems correctly implemented, but verification is needed).
        *   [x] Ensure the `/api/v1/tickets/:id/full` endpoint in `server.js` uses `getAllTicketFieldsById` and returns the full ticket data without any field selection.
        *   [x] Add/verify error handling and logging for both the endpoint and the apiClient function.
        *   [x] Test the endpoint to confirm it returns all ticket fields.

3.  [x] **Implement Ticket Creation - `POST /api/v1/tickets` Endpoint and `createTicket(ticketData)` in `apiClient.js`**:
    *   [x] **Purpose**: Implement the function to create new tickets via the API. This will allow users to create new tickets through our server.
    *   [x] **Tasks**:
        *   [x] Implement the `createTicket(ticketData)` function in `apiClient.js` to send a POST request to `/api/v1/tickets.json` with the provided `ticketData`.
        *   [x] Ensure the `POST /api/v1/tickets` endpoint in `server.js` correctly uses `apiClient.createTicket()` to handle ticket creation requests.
        *   [x] Implement input validation in the endpoint to validate `ticketData` and ensure required fields are present.
        *   [x] Add error handling and proper response formatting for both the endpoint and apiClient function.
        *   [ ] Test ticket creation with valid and invalid data, including boundary cases and error conditions.

4.  [x] **Implement Ticket Update (Commit) - `PATCH /api/v1/tickets/:id` Endpoint and `commitTicket(ticketId, ticketData, comment)` in `apiClient.js`**:
    *   [x] **Purpose**: Implement the ability to update existing tickets, allowing modifications to ticket fields and adding commit comments.
    *   [x] **Tasks**:
        *   [x] Create a new function `commitTicket(ticketId, ticketData, comment)` in `apiClient.js`.
        *   [x] This function should send a PATCH request to `/api/v1/tickets/:id.json` with the `ticketData` for updates and include `comment` in the `ticket_event` for commit comments.
        *   [x] Update the `PATCH /api/v1/tickets/:id` endpoint in `server.js` to use `apiClient.commitTicket()` for handling ticket updates.
        *   [x] Ensure the endpoint correctly handles `ticketData` and `comment` from the request body.
        *   [x] Implement data validation for `ticketData` in the endpoint.
        *   [x] Add error handling and response formatting.
        *   [ ] Test various ticket updates, including different field modifications and adding comments.

5.  [ ] **Implement Add Comment to Ticket - `PATCH /api/v1/tickets/:id` Endpoint (reuse) and `addCommentToTicket(ticketId, description)` in `apiClient.js`**:
    *   [ ] **Purpose**: Implement a dedicated function for adding comments to tickets, making it easy to add notes and updates to tickets.
    *   [ ] **Tasks**:
        *   [ ] Create a new function `addCommentToTicket(ticketId, description)` in `apiClient.js`.
        *   [ ] This function should send a PATCH request to `/api/v1/tickets/:id.json` with the `description` as the comment in the `ticket_event` payload.
        *   [ ] Update the `PATCH /api/v1/tickets/:id` endpoint in `server.js` to handle comment addition using `apiClient.addCommentToTicket()`.
        *   [ ] Ensure the endpoint extracts the comment `description` correctly from the request.
        *   [ ] Test adding comments to tickets and verify comments are correctly associated with the ticket.

6.  [ ] **Implement Add Comment and Attachment to Ticket - `PATCH /api/v1/tickets/:id` Endpoint (reuse) and `addCommentAndAttachmentToTicket(ticketId, comment, attachments)` in `apiClient.js`**:
    *   [ ] **Purpose**: Enable adding comments and attaching files to tickets, allowing for richer communication and information sharing on tickets.
    *   [ ] **Tasks**:
        *   [ ] Create `addCommentAndAttachmentToTicket(ticketId, comment, attachments)` in `apiClient.js`.
        *   [ ] Implement multipart form data handling in `addCommentAndAttachmentToTicket` to include both comment text and file attachments in the PATCH request to `/api/v1/tickets/:id.json`. Use `form-data` npm package.
        *   [ ] Update the `PATCH /api/v1/tickets/:id` endpoint in `server.js` to handle file uploads. Configure middleware (e.g., `multer`) for handling multipart/form-data.
        *   [ ] Ensure the endpoint correctly extracts comment text and file attachments from the request and passes them to `apiClient.addCommentAndAttachmentToTicket()`.
        *   [ ] Test adding comments with attachments, verifying successful file uploads and association with the ticket.

7.  [ ] **Implement Press Button on Ticket - `POST /api/v1/tickets/:id/buttons/:buttonName` Endpoint and `pressTicketButton(ticketId, buttonName, comment)` in `apiClient.js`**:
    *   [ ] **Purpose**: Allow programmatically triggering ticket button actions, enabling automation of ticket workflows and state transitions.
    *   [ ] **Tasks**:
        *   [ ] Create `pressTicketButton(ticketId, buttonName, comment)` in `apiClient.js`.
        *   [ ] Implement logic in `pressTicketButton` to first fetch available buttons for a ticket using `GET /api/v1/tickets/:id/available_buttons.json`.
        *   [ ] Find the button by `buttonName` and then send a POST request to `/api/v1/tickets/:id/buttons/:buttonId.json` to press the button, including an optional `comment`.
        *   [ ] Create a new POST endpoint `/api/v1/tickets/:id/buttons/:buttonName` in `server.js` to handle button press requests.
        *   [ ] Ensure the endpoint extracts `ticketId`, `buttonName`, and optional `comment` from the request and passes them to `apiClient.pressTicketButton()`.
        *   [ ] Handle cases where a button press requires a comment, and validate accordingly.
        *   [ ] Test pressing various buttons, with and without comments, and verify that ticket state changes as expected.

9.  [ ] User Functions (Optional - HTTP Endpoints and apiClient Updates) - To be addressed later if needed.

## General Tasks

*   [ ] Implement robust error handling for all new and updated functions and endpoints, including handling API errors, network issues, and data validation errors.
*   [ ] Add comprehensive logging using a logging library (e.g., `winston` or `morgan`) for debugging, monitoring, and auditing purposes.
*   [ ] Update API documentation (e.g., in `CC_API_docs/`) to include details of all new and modified endpoints, functions, request/response formats, and parameters.
*   [ ] Update memory bank with implementation details and progress in `progress.md` and `activeContext.md` after each major implementation step.

---

**Note**: "Optional" user functions will be addressed based on project requirements and priorities, likely in a future iteration. We will focus on implementing and testing the ticket functions first.