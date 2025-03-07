# Tickets API - Actions

## Table of Contents
- [Introduction](#introduction)
- [Available Actions](#available-actions)
- [Performing Actions](#performing-actions)
- [Examples](#examples)

## Introduction

This document describes the available actions that can be performed on tickets through the API.

## Available Actions

| Action | Description |
|--------|-------------|
| `assign` | Assign ticket to a user |
| `close` | Close the ticket |
| `reopen` | Reopen a closed ticket |
| `comment` | Add a comment to the ticket |
| `change_priority` | Change ticket priority |
| `add_tag` | Add a tag to the ticket |
| `remove_tag` | Remove a tag from the ticket |

## Performing Actions

### Request Format

```http
POST /api/v1/tickets/<ticket_id>/actions
```

### Request Body

```json
{
  "action": "<action_name>",
  "parameters": {
    // Action-specific parameters
  }
}
```

## Examples

### Assigning a Ticket

```http
POST /api/v1/tickets/123/actions
```

Request body:

```json
{
  "action": "assign",
  "parameters": {
    "user_id": 456
  }
}
```

### Adding a Comment

```http
POST /api/v1/tickets/123/actions
```

Request body:

```json
{
  "action": "comment",
  "parameters": {
    "content": "This is a comment",
    "public": true
  }
}
```

### Changing Priority

```http
POST /api/v1/tickets/123/actions
```

Request body:

```json
{
  "action": "change_priority",
  "parameters": {
    "priority": "high"
  }
}
```

### Response Format

All actions return the updated ticket:

```json
{
  "id": 123,
  "status": "open",
  "priority": "high",
  "assigned_to": {
    "id": 456,
    "name": "John Doe"
  },
  "comments": [
    {
      "id": 789,
      "content": "This is a comment",
      "public": true,
      "created_at": "2025-03-07T12:15:00Z"
    }
  ]
}
```

> **Note:** Some actions may require specific permissions to execute.