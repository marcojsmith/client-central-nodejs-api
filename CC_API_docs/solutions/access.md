# Solutions API - Access Control

## Table of Contents
- [Introduction](#introduction)
- [Access Levels](#access-levels)
- [Permissions](#permissions)
- [Examples](#examples)

## Introduction

This document describes the access control mechanisms for the Solutions API.

## Access Levels

The API supports the following access levels:

| Level | Description |
|-------|-------------|
| `public` | Accessible to all users |
| `restricted` | Requires authentication |
| `admin` | Requires admin privileges |

## Permissions

### Permission Types

| Permission | Description |
|------------|-------------|
| `read` | View solution details |
| `write` | Create or modify solutions |
| `delete` | Remove solutions |
| `execute` | Run solution workflows |

### Permission Structure

Permissions are represented as a JSON object:

```json
{
  "solution_id": 123,
  "permissions": {
    "read": true,
    "write": false,
    "delete": false,
    "execute": true
  }
}
```

## Examples

### Checking Permissions

```http
GET /api/v1/solutions/123/permissions
```

Example response:

```json
{
  "solution_id": 123,
  "permissions": {
    "read": true,
    "write": false,
    "delete": false,
    "execute": true
  }
}
```

### Updating Permissions

```http
PUT /api/v1/solutions/123/permissions
```

Request body:

```json
{
  "permissions": {
    "read": true,
    "write": true,
    "delete": false,
    "execute": true
  }
}
```

> **Note:** Only users with admin privileges can update permissions.
