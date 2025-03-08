# Tickets API - PowerShell Examples

This document provides examples of how to interact with the Tickets API using PowerShell's `Invoke-WebRequest` cmdlet.

## Table of Contents

- [Get Ticket Details](#get-ticket-details)
- [List Tickets](#list-tickets)
- [Create Ticket](#create-ticket)
- [Update Ticket](#update-ticket)

---

## Get Ticket Details

To retrieve details for a specific ticket, use the following command. Replace `{ticketId}` with the ID of the ticket you want to retrieve.

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/v1/tickets/{ticketId}" -Method GET
```

**Example:** To get details for ticket ID `123`:

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/v1/tickets/123" -Method GET
```

## List Tickets

To retrieve a list of tickets, use the following command. You can optionally specify the `page` and `pageSize` parameters to control pagination.

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/v1/tickets?page=1&pageSize=20" -Method GET
```

**Example:** To list tickets with default pagination (page 1, page size 20):

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/v1/tickets" -Method GET
```

## Create Ticket

To create a new ticket, use the following command with the `-Method POST` and a JSON request body.

```powershell
$headers = @{'Content-Type'='application/json'}
$body = @{
  "subject" = "New Ticket via PowerShell"
  "description" = "This ticket was created using Invoke-WebRequest in PowerShell."
  "priority" = "normal"
} | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:3000/api/v1/tickets" -Method POST -Headers $headers -Body $body
```

## Update Ticket

To update an existing ticket, use the following command with `-Method PUT`, replacing `{ticketId}` with the ticket ID, and including a JSON request body with the fields to update.

```powershell
$headers = @{'Content-Type'='application/json'}
$body = @{
  "description" = "Updated description via PowerShell"
  "priority" = "high"
} | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:3000/api/v1/tickets/{ticketId}" -Method PUT -Headers $headers -Body $body
```

**Example:** To update ticket ID `123` description and priority:

```powershell
$headers = @{'Content-Type'='application/json'}
$body = @{
  "description" = "Updated description via PowerShell"
  "priority" = "high"
} | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:3000/api/v1/tickets/123" -Method PUT -Headers $headers -Body $body
```

**Note:** The base URL `http://localhost:3000` is used here as an example; ensure you use the correct base URL for your API.  API token is assumed to be handled by the client configuration. For POST and PUT requests, we include headers to specify `Content-Type` as `application/json` and use `ConvertTo-Json` to format the request body.

---