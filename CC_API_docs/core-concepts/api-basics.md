# API Basics

## Table of Contents
- [API Request Format](#api-request-format)
- [Querying](#querying)
- [Metadata](#metadata)
- [Pagination](#pagination)
- [Field Selection](#field-selection)
- [Filtering](#filtering)
- [Counting](#counting)
- [Saved Views](#saved-views)
- [Field Translations](#field-translations)

## API Request Format

API requests use the following format:

```http
GET /api/<version>/<resource>?token=<api_token>
```

The version above is currently always v1 and 'resource' is, for example, tickets, download/folders or download/files.

The `api_token` parameter is your user's API token. Read up on finding your API token if you don't have one yet.

> **Note:** If you are accessing the above endpoint via your browser, which is currently logged into a user, you don't need to use a token. (This is only for testing purposes)

```http
GET /api/<version>/<resource>
```

## Querying

### Requesting a List of Resources

```http
GET /api/v1/<resource>.json
```

Example for tickets:

```http
GET /api/v1/tickets.json
```

### Requesting a Specific Resource

```http
GET /api/v1/<resource>/<resource_id>.json
```

Example for ticket ID 123:

```http
GET /api/v1/tickets/123.json
```

## Metadata

### Full Metadata

```http
GET /api/v1/<resource>.json?metadata=true
```

Returns information about each field including:
- Human-readable name
- Whether the field is required
- Field type
- Whether the field can contain multiple values

### Custom Fields Metadata

```http
GET /api/v1/<resource>.json?metadata=custom_fields
```

Returns information specific to custom fields including:
- Custom field ID
- Additional custom field properties

## Pagination

When retrieving data, the response includes pagination information:

```json
{
  "page": 1,
  "more": true,
  "total_pages": 201
}
```

To retrieve a specific page:

```http
GET /api/v1/tickets.json?page=2
```

## Field Selection

By default, all root fields are returned. You can select specific fields:

```http
GET /api/v1/tickets.json?select=subject,description,account
```

For related resources:

```http
GET /api/v1/tickets.json?select=assignee.name
```

To select all fields of a related resource:

```http
GET /api/v1/tickets.json?select=events.*
```

Combined example:

```http
GET /api/v1/tickets.json?select=subject,description,account,assignee.name,assignee.locale,events.*
```

## Filtering

Resources can be filtered using JSON:

```http
GET /api/v1/tickets.json?filter={"project":20}
```

> **Note:** Filtering does not currently support filtering in sub-fields.

## Counting

To include total resource count:

```http
GET /api/v1/tickets.json?count=true
```

## Saved Views

Access resources of a specific saved view:

```http
GET /api/v1/tickets.json?saved_view=10857
```

> **Note:** The ID of a saved view can be found in the URL when opening the saved view in a browser:
> `clientcentral.io/support/tickets?saved_view=10857`

## Field Translations

### Basic Field Request

```http
GET /api/v1/tickets/<ticket_id>.json?select=status.name
```

Example response:

```json
{
  "data": {
    "id": <ticket_id>,
    "_type": "Ticket",
    "status": {
      "id": 11,
      "_type": "TicketStatus",
      "name": "Completed"
    }
  }
}
```

### All Translations

```http
GET /api/v1/tickets/<ticket_id>.json?select=status.name&locales=true
```

Example response:

```json
{
  "data": {
    "id": <ticket_id>,
    "_type": "Ticket",
    "status": {
      "id": 11,
      "_type": "TicketStatus",
      "name": {
        "en": "Completed",
        "fr": "Confirmé",
        "de": "Quittiert",
        "es": "Compleatdo"
      }
    }
  }
}
```

### Specific Language Translations

```http
GET /api/v1/tickets/<ticket_id>.json?select=status.name&locales=de,fr,en
```

Example response:

```json
{
  "data": {
    "id": <ticket_id>,
    "_type": "Ticket",
    "status": {
      "id": 11,
      "_type": "TicketStatus",
      "name": {
        "en": "Completed",
        "fr": "Confirmé",
        "de": "Quittiert"
      }
    }
  }
}
```

> **Note:** Invalid language codes are ignored in the response.
