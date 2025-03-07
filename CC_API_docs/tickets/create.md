# Tickets API - Creating Tickets

## Table of Contents
- [Introduction](#introduction)
- [Required Fields](#required-fields)
- [Optional Fields](#optional-fields)
- [Examples](#examples)
- [Error Handling](#error-handling)

## Introduction

This document provides detailed information about creating tickets through the API.

## Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `subject` | string | Ticket subject (max 255 characters) |
| `description` | string | Detailed ticket description |

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `priority` | string | Priority level (low/normal/high) |
| `tags` | array | List of tags |
| `assignee_id` | integer | ID of user to assign ticket to |
| `due_date` | datetime | Due date for the ticket |

## Examples

### Basic Ticket Creation

```http
POST /api/v1/tickets
```

Request body:

```json
{
  "subject": "New Ticket",
  "description": "This is a new ticket"
}
```

Response:

```json
{
  "id": 125,
  "subject": "New Ticket",
  "description": "This is a new ticket",
  "status": "open",
  "priority": "normal",
  "created_at": "2025-03-07T12:15:00Z",
  "updated_at": "2025-03-07T12:15:00Z",
  "tags": []
}
```

### Ticket with Additional Fields

```http
POST /api/v1/tickets
```

Request body:

```json
{
  "subject": "Urgent Issue",
  "description": "This needs immediate attention",
  "priority": "high",
  "tags": ["urgent", "bug"],
  "assignee_id": 456,
  "due_date": "2025-03-10T12:00:00Z"
}
```

Response:

```json
{
  "id": 126,
  "subject": "Urgent Issue",
  "description": "This needs immediate attention",
  "status": "open",
  "priority": "high",
  "created_at": "2025-03-07T12:20:00Z",
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

### Missing Required Fields

Response (400 Bad Request):

```json
{
  "error": "Validation failed",
  "messages": {
    "subject": ["can't be blank"],
    "description": ["can't be blank"]
  }
}
```

### Invalid Field Values

Response (400 Bad Request):

```json
{
  "error": "Validation failed",
  "messages": {
    "priority": ["must be one of: low, normal, high"],
    "due_date": ["must be a future date"]
  }
}
```

> **Note:** All timestamps are in UTC format.
