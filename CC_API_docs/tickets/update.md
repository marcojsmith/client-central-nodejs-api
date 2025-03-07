# Tickets API - Updating Tickets

## Table of Contents
- [Introduction](#introduction)
- [Update Parameters](#update-parameters)
- [Examples](#examples)
- [Error Handling](#error-handling)

## Introduction

This document provides detailed information about updating tickets through the API.

## Update Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `subject` | string | Updated subject (max 255 characters) |
| `description` | string | Updated description |
| `priority` | string | Updated priority (low/normal/high) |
| `status` | string | Updated status (open/closed) |
| `tags` | array | Updated list of tags |
| `assignee_id` | integer | Updated assignee ID |
| `due_date` | datetime | Updated due date |

## Examples

### Basic Update

```http
PUT /api/v1/tickets/123
```

Request body:

```json
{
  "description": "Updated description",
  "priority": "high"
}
```

Response:

```json
{
  "id": 123,
  "subject": "Example Ticket",
  "description": "Updated description",
  "status": "open",
  "priority": "high",
  "created_at": "2025-03-07T12:00:00Z",
  "updated_at": "2025-03-07T12:15:00Z",
  "tags": []
}
```

### Complex Update

```http
PUT /api/v1/tickets/123
```

Request body:

```json
{
  "subject": "Updated Subject",
  "description": "Updated description",
  "priority": "high",
  "tags": ["urgent", "bug"],
  "assignee_id": 456,
  "due_date": "2025-03-10T12:00:00Z"
}
```

Response:

```json
{
  "id": 123,
  "subject": "Updated Subject",
  "description": "Updated description",
  "status": "open",
  "priority": "high",
  "created_at": "2025-03-07T12:00:00Z",
  "updated_at": "2025-03-07T12:20:00Z",
  "tags": ["urgent", "bug"],
  "assignee": {
    "id": 456,
    "name": "John Doe"
  },
  "due_date": "2025-03-10T12:00:00Z"
}
```

## Error Handling

### Invalid Priority

Response (400 Bad Request):

```json
{
  "error": "Validation failed",
  "messages": {
    "priority": ["must be one of: low, normal, high"]
  }
}
```

### Invalid Status

Response (400 Bad Request):

```json
{
  "error": "Validation failed",
  "messages": {
    "status": ["must be one of: open, closed"]
  }
}
```

### Non-existent Ticket

Response (404 Not Found):

```json
{
  "error": "Not found",
  "message": "Ticket not found"
}
```

> **Note:** Only the ticket creator or an admin can update tickets.