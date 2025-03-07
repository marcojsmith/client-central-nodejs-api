# Tickets API - Updating Time Logs

## Table of Contents
- [Introduction](#introduction)
- [Update Parameters](#update-parameters)
- [Examples](#examples)
- [Error Handling](#error-handling)

## Introduction

This document provides detailed information about updating time logs through the API.

## Update Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `hours` | float | Updated hours (must be positive) |
| `description` | string | Updated description |
| `logged_at` | datetime | Updated timestamp |

## Examples

### Basic Update

```http
PUT /api/v1/tickets/123/time_logs/789
```

Request body:

```json
{
  "hours": 3.0,
  "description": "Updated time entry"
}
```

Response:

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

### Updating Timestamp

```http
PUT /api/v1/tickets/123/time_logs/789
```

Request body:

```json
{
  "logged_at": "2025-03-07T13:00:00Z"
}
```

Response:

```json
{
  "id": 789,
  "ticket_id": 123,
  "hours": 3.0,
  "description": "Updated time entry",
  "logged_at": "2025-03-07T13:00:00Z",
  "created_at": "2025-03-07T12:05:00Z",
  "updated_at": "2025-03-07T15:05:00Z"
}
```

## Error Handling

### Invalid Hours

Response (400 Bad Request):

```json
{
  "error": "Validation failed",
  "messages": {
    "hours": ["must be greater than 0"]
  }
}
```

### Invalid Timestamp

Response (400 Bad Request):

```json
{
  "error": "Validation failed",
  "messages": {
    "logged_at": ["must be a valid timestamp"]
  }
}
```

### Non-existent Time Log

Response (404 Not Found):

```json
{
  "error": "Not found",
  "message": "Time log not found"
}
```

> **Note:** Only the owner of the time log or an admin can update time entries.