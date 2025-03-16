# CC Backend Service

## Overview
This backend service retrieves data from an external API and exposes functionality through an HTTP-based API.

## Prerequisites
- Node.js (>= 18)
- npm (>= 8)

## Installation
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd CC_backend_nodejs
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration
This backend service is configured using environment variables. To set up your configuration:

1.  Create a `.env` file in the project root directory.
2.  Add the following environment variables to the `.env` file:

    ```env
    API_BASE_URL=https://clientcentral.io/ # Replace with your API base URL
    API_TOKEN=YOUR_API_TOKEN # Replace with your actual API token
    MAX_RETRIES=3 # Maximum number of retries for API requests (optional, default: 3)
    SERVER_PORT=3000 # Port for the server to run on (optional, default: 3000)
    CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173 # Allowed origins for CORS (optional, default: '*')
    WORKSPACE_ID_FILTER= # Workspace ID to filter tickets by (optional)
    ```

    -   `API_BASE_URL`:  The base URL for the Client Central API. **Required**.
    -   `API_TOKEN`: Your API token for authenticating with the Client Central API. **Required**.
    -   `MAX_RETRIES`:  Maximum number of retries for API requests before giving up. Optional, defaults to `3`.
    -   `SERVER_PORT`:  The port on which the server will listen for incoming requests. Optional, defaults to `3000`.
    -   `CORS_ALLOWED_ORIGINS`: A comma-separated list of allowed origins for Cross-Origin Resource Sharing (CORS). Optional, defaults to allowing all origins (`*`).
    -   `WORKSPACE_ID_FILTER`:  If provided, the server will only fetch and process tickets belonging to this workspace ID. Optional.

    Replace `https://clientcentral.io/` with your actual API base URL and `YOUR_API_TOKEN` with your API token.
    You can customize `MAX_RETRIES`, `SERVER_PORT`, `CORS_ALLOWED_ORIGINS`, and `WORKSPACE_ID_FILTER` if needed.

## Usage
1. Start the server in development mode:
   ```bash
   npm run dev
   ```
   The server will start running at `http://localhost:3000`.

2. API Endpoints:
   - `GET /api/v1/tickets`: List tickets with pagination.
     - Query parameters:
       - `page`: Page number for pagination (optional, default: `1`).
       - You can also use any of the ticket fields as query parameters to filter the results (e.g., `status=Open`, `priority=High`).
     - **Response**: Returns a JSON object with a `tickets` array containing simplified ticket objects.
   - `GET /api/v1/tickets/:id`: Get ticket details by ID.
     - Parameters:
       - `id`: Ticket ID.
     - **Response**: Returns a JSON object with the detailed ticket information.
   - `GET /api/v1/tickets/:id/full`: Get full ticket details by ID, including all available fields.
     - **Parameters**:
       - `id`: Ticket ID.
     - **Response**: Returns a JSON object with the complete ticket information, including all fields from the API response.
   - `POST /api/v1/tickets`: Create a new ticket.
     - Request body:
       ```json
       {
         "ticket": {
           "subject": "Ticket subject",
           "description": "Ticket description",
           ... // other ticket fields as per Client Central API documentation
         }
       }
       ```
     - **Response**: Returns a JSON object with the newly created ticket data.
   - `PATCH /api/v1/tickets/:id`: Update an existing ticket.
     - **Parameters**:
       - `id`: Ticket ID.
     - **Request body**:
       ```json
       {
         "ticket": {
           "subject": "Updated ticket subject",
           "description": "Updated ticket description",
           ... // ticket fields to update
         },
         "ticket_event": { // Optional, for adding comments or internal notes
           "comment": "Ticket updated via API",
           "internal": false, // or true for internal note
           "visible_to_customer": true // or false
         }
       }
       ```
     - **Response**: Returns a JSON object with the updated ticket data, including fields like `id`, `subject`, `description`, `status`, `updated_at`, `internal`, and `visible_to_customer`.

## API Documentation

The `CC_API_docs` directory contains API documentation for the Client Central ticketing system.

-   **Python API Reference**: The `CC_API_docs/python-code-examples` directory includes Python reference files and documentation from the [EPI-USE Labs client-central-python-api repository](https://github.com/EPI-USE-Labs/client-central-python-api). This Node.js backend service is designed as a Node.js implementation of that Python API.
-   **Client Central KBA Documentation**: The remaining documentation within the `CC_API_docs` directory is sourced from the Client Central Knowledge Base and provides general information about the Client Central API.
