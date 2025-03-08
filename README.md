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
1. Create a `.env` file in the project root directory.
2. Add the following environment variables to the `.env` file:
   ```env
   API_BASE_URL=https://clientcentral.io/ # Replace with your API base URL
   API_TOKEN=YOUR_API_TOKEN # Replace with your actual API token
   MAX_RETRIES=3 # Maximum number of retries for API requests (optional, default: 3)
   SERVER_PORT=3000 # Port for the server to run on (optional, default: 3000)
   CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173 # Allowed origins for CORS (optional, default: '*')
   ```
   Replace `https://clientcentral.io/` with your actual API base URL and `YOUR_API_TOKEN` with your API token.
   You can customize `MAX_RETRIES`, `SERVER_PORT`, and `CORS_ALLOWED_ORIGINS` if needed.

## Usage
1. Start the server in development mode:
   ```bash
   npm run dev
   ```
   The server will start running at `http://localhost:3000`.

2. API Endpoints:
   - `GET /api/v1/tickets`: List tickets with pagination.
     - Query parameters:
       - `page`: Page number for pagination (optional, default: 2).
   - `GET /api/v1/tickets/:id`: Get ticket details by ID.
     - Parameters:
       - `id`: Ticket ID.
   - `POST /api/v1/tickets`: Create a new ticket.
     - Request body:
       ```json
       {
         "ticket": {
           "subject": "Ticket subject",
           "description": "Ticket description",
           ... // other ticket fields
         }
       }
       ```

## API Documentation
For detailed API documentation for Client Central, please refer to the `CC_API_docs` directory in the project.