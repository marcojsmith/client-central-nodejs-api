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
  "ticketId": 571864,
  "ticketDescription": "Review Employees with Leave recalculation issues",
  "owner": 12973,
  "ownerName": "System Administrator",
  "assignee": 12973,
  "assigneeName": "System Administrator",
  "relatedModule": "Employee Central Time Tracking & Time Off",
  "status": "In Progress",
  "priority": "High",
  "statusId": 61,
  "priorityId": 11,
  "ticketType": 23,
  "account": 5398,
  "accountName": "Allan Gray Proprietary Limited",
  "created_at": "2024-12-05T11:00:39+02:00",
  "updated_at": "2025-03-08T02:11:28+02:00"
}
```

### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `ticketId` | integer | Unique identifier |
| `ticketDescription` | string | Ticket subject |
| `customer_user` | integer | Ticket owner user ID |
| `assignee` | integer | Ticket assignee user ID |
| `relatedModule` | string | Related module name |
| `statusId` | integer | Current status ID |
| `priorityId` | integer | Priority level ID |
| `ticketType` | integer | Ticket type ID |
| `account` | integer | Account ID |
| `created_at` | datetime | Creation timestamp |
| `updated_at` | datetime | Last update timestamp |

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
