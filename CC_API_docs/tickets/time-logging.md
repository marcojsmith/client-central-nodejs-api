# Tickets API - Time Logging

## Table of Contents
- [Introduction](#introduction)
- [Logging Time](#logging-time)
- [Viewing Time Logs](#viewing-time-logs)
- [Updating Time Logs](#updating-time-logs)
- [Deleting Time Logs](#deleting-time-logs)

## Introduction

This document covers the time logging functionality for tickets through the API.

## Logging Time

### Request

```http
POST /api/v1/tickets/<ticket_id>/time_logs
```

### Request Body

```json
{
  "hours": 2.5,
  "description": "Initial investigation",
  "logged_at": "2025-03-07T12:00:00Z"
}
```

### Response

```json
{
  "id": 789,
  "ticket_id": 123,
  "hours": 2.5,
  "description": "Initial investigation",
  "logged_at": "2025-03-07T12:00:00Z",
  "created_at": "2025-03-07T12:05:00Z"
}
```

## Viewing Time Logs

### Single Time Log

```http
GET /api/v1/tickets/<ticket_id>/time_logs/<time_log_id>
```

### All Time Logs for a Ticket

```http
GET /api/v1/tickets/<ticket_id>/time_logs
```

Response:

```json
[
  {
    "id": 789,
    "ticket_id": 123,
    "hours": 2.5,
    "description": "Initial investigation",
    "logged_at": "2025-03-07T12:00:00Z",
    "created_at": "2025-03-07T12:05:00Z"
  },
  {
    "id": 790,
    "ticket_id": 123,
    "hours": 1.0,
    "description": "Follow-up analysis",
    "logged_at": "2025-03-07T14:00:00Z",
    "created_at": "2025-03-07T14:05:00Z"
  }
]
```

## Updating Time Logs

### Request

```http
PUT /api/v1/tickets/<ticket_id>/time_logs/<time_log_id>
```

### Request Body

```json
{
  "hours": 3.0,
  "description": "Updated time entry"
}
```

### Response

```json
{
  "id": 789,
  "ticket_id": 123,
  "hours": 3.0,
  "description": "Updated time entry",
  "logged_at": "2025-03-07T12:00:00Z",
  "created_at": "2025-03-07T12:05:00Z",
  "updated_at": "2025-03-07T15:00:00Z"
}
```

## Deleting Time Logs

### Request

```http
DELETE /api/v1/tickets/<ticket_id>/time_logs/<time_log_id>
```

### Response

```json
{
  "success": true,
  "message": "Time log deleted"
}
```

> **Note:** Deleted time logs cannot be recovered.
