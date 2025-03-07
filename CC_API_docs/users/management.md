# Users API - Management

## Table of Contents
- [Introduction](#introduction)
- [User Structure](#user-structure)
- [Creating Users](#creating-users)
- [Updating Users](#updating-users)
- [Deleting Users](#deleting-users)
- [Error Handling](#error-handling)

## Introduction

This document covers the user management functionality through the API.

## User Structure

A user is represented as a JSON object with the following structure:

```json
{
  "id": 456,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "role": "user",
  "created_at": "2025-03-07T12:00:00Z",
  "updated_at": "2025-03-07T12:00:00Z",
  "status": "active"
}
```

### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Unique identifier |
| `name` | string | User's full name |
| `email` | string | User's email address |
| `role` | string | User role (admin/user) |
| `created_at` | datetime | Creation timestamp |
| `updated_at` | datetime | Last update timestamp |
| `status` | string | Account status (active/inactive) |

## Creating Users

### Request

```http
POST /api/v1/users
```

### Request Body

```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "role": "user"
}
```

### Response

```json
{
  "id": 457,
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "role": "user",
  "created_at": "2025-03-07T12:05:00Z",
  "updated_at": "2025-03-07T12:05:00Z",
  "status": "active"
}
```

## Updating Users

### Request

```http
PUT /api/v1/users/457
```

### Request Body

```json
{
  "name": "Jane Doe",
  "role": "admin"
}
```

### Response

```json
{
  "id": 457,
  "name": "Jane Doe",
  "email": "jane.smith@example.com",
  "role": "admin",
  "created_at": "2025-03-07T12:05:00Z",
  "updated_at": "2025-03-07T12:10:00Z",
  "status": "active"
}
```

## Deleting Users

### Request

```http
DELETE /api/v1/users/457
```

### Response

```json
{
  "success": true,
  "message": "User deleted"
}
```

## Error Handling

### Missing Required Fields

Response (400 Bad Request):

```json
{
  "error": "Validation failed",
  "messages": {
    "name": ["can't be blank"],
    "email": ["can't be blank"]
  }
}
```

### Invalid Email

Response (400 Bad Request):

```json
{
  "error": "Validation failed",
  "messages": {
    "email": ["must be a valid email address"]
  }
}
```

### Non-existent User

Response (404 Not Found):

```json
{
  "error": "Not found",
  "message": "User not found"
}
```

> **Note:** Only admin users can create, update, or delete other users.
