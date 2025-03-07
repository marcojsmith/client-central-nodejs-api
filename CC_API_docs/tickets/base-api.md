# Tickets API - Base Operations

## Table of Contents
- [Introduction](#introduction)
- [Ticket Structure](#ticket-structure)
- [Creating Tickets](#creating-tickets)
- [Reading Tickets](#reading-tickets)
- [Updating Tickets](#updating-tickets)
- [Deleting Tickets](#deleting-tickets)

## Introduction

This document covers the basic CRUD operations for working with tickets through the API.

## Ticket Structure

A ticket is represented as a JSON object with the following structure:

```json
{
  "id": 123,
  "subject": "Example Ticket",
  "description": "This is an example ticket",
  "status": "open",
  "priority": "normal",
  "created_at": "2025-03-07T12:00:00Z",
  "updated_at": "2025-03-07T12:00:00Z",
  "tags": ["example", "demo"]
}
```

### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Unique identifier |
| `subject` | string | Ticket subject |
| `description` | string | Ticket description |
| `status` | string | Current status (open/closed) |
| `priority` | string | Priority level (low/normal/high) |
| `created_at` | datetime | Creation timestamp |
| `updated_at` | datetime | Last update timestamp |
| `tags` | array | List of tags |

## Creating Tickets

### Request

```http
POST /api/v1/tickets
```

### Request Body

```json
{
  "subject": "New Ticket",
  "description": "This is a new ticket",
  "priority": "normal"
}
```

### Response

```json
{
  "id": 124,
  "subject": "New Ticket",
  "description": "This is a new ticket",
  "status": "open",
  "priority": "normal",
  "created_at": "2025-03-07T12:05:00Z",
  "updated_at": "2025-03-07T12:05:00Z",
  "tags": []
}
```

## Reading Tickets

### Single Ticket

```http
GET /api/v1/tickets/124
```

### Multiple Tickets

```http
GET /api/v1/tickets
```

## Updating Tickets

### Request

```http
PUT /api/v1/tickets/124
```

### Request Body

```json
{
  "description": "Updated description",
  "priority": "high"
}
```

### Response

```json
{
  "id": 124,
  "subject": "New Ticket",
  "description": "Updated description",
  "status": "open",
  "priority": "high",
  "created_at": "2025-03-07T12:05:00Z",
  "updated_at": "2025-03-07T12:10:00Z",
  "tags": []
}
```

## Deleting Tickets

### Request

```http
DELETE /api/v1/tickets/124
```

### Response

```json
{
  "success": true,
  "message": "Ticket deleted"
}
```

> **Note:** Deleted tickets cannot be recovered.
