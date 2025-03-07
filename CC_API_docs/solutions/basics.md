# Solutions API - Basics

## Table of Contents
- [Introduction](#introduction)
- [Solution Structure](#solution-structure)
- [Creating Solutions](#creating-solutions)
- [Updating Solutions](#updating-solutions)
- [Deleting Solutions](#deleting-solutions)

## Introduction

This document covers the basic operations for working with solutions through the API.

## Solution Structure

A solution is represented as a JSON object with the following structure:

```json
{
  "id": 123,
  "name": "Example Solution",
  "description": "This is an example solution",
  "version": "1.0.0",
  "created_at": "2025-03-07T12:00:00Z",
  "updated_at": "2025-03-07T12:00:00Z",
  "status": "active",
  "tags": ["example", "demo"]
}
```

### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Unique identifier |
| `name` | string | Solution name |
| `description` | string | Solution description |
| `version` | string | Version number |
| `created_at` | datetime | Creation timestamp |
| `updated_at` | datetime | Last update timestamp |
| `status` | string | Current status (active/inactive) |
| `tags` | array | List of tags |

## Creating Solutions

### Request

```http
POST /api/v1/solutions
```

### Request Body

```json
{
  "name": "New Solution",
  "description": "This is a new solution",
  "version": "1.0.0",
  "tags": ["new", "example"]
}
```

### Response

```json
{
  "id": 124,
  "name": "New Solution",
  "description": "This is a new solution",
  "version": "1.0.0",
  "created_at": "2025-03-07T12:05:00Z",
  "updated_at": "2025-03-07T12:05:00Z",
  "status": "active",
  "tags": ["new", "example"]
}
```

## Updating Solutions

### Request

```http
PUT /api/v1/solutions/124
```

### Request Body

```json
{
  "description": "Updated description",
  "version": "1.0.1"
}
```

### Response

```json
{
  "id": 124,
  "name": "New Solution",
  "description": "Updated description",
  "version": "1.0.1",
  "created_at": "2025-03-07T12:05:00Z",
  "updated_at": "2025-03-07T12:10:00Z",
  "status": "active",
  "tags": ["new", "example"]
}
```

## Deleting Solutions

### Request

```http
DELETE /api/v1/solutions/124
```

### Response

```json
{
  "success": true,
  "message": "Solution deleted"
}
```

> **Note:** Deleted solutions cannot be recovered.
