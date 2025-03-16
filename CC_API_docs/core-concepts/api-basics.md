# API Basics

## Request Format

The standard API request format is:
```
/api/<version>/<resource>?token=<api_token>
```

- Current version is always `v1`
- Examples of resources: `tickets`, `download/folders`, `download/files`
- `api_token` is your user's API token (see [Finding Your API Token](#) for details)

> **Note:** When accessing via browser while logged in, you can omit the token (testing only):
> ```
> /api/<version>/<resource>
> ```

## Basic Querying

### List Resources
To get a list of resources:
```
/api/v1/<resource>.json
```

Example (listing tickets):
```
/api/v1/tickets.json
```

### Single Resource
To get a specific item by ID:
```
/api/v1/<resource>/<resource_id>.json
```

Example (getting ticket #123):
```
/api/v1/tickets/123.json
```

## Advanced Features

### Metadata
Get information about resource fields:
```
/api/v1/<resource>.json?metadata=true
```
Returns details about each field including:
- Human-readable name
- Required status
- Field type
- Multiple values capability

For custom fields only:
```
/api/v1/<resource>.json?metadata=custom_fields
```
Includes additional custom field specific information like field IDs.

### Pagination
Results include pagination details:
```json
{
    "page": 1,
    "more": true,
    "total_pages": 201
}
```

Navigate pages using the `page` parameter:
```
/api/v1/tickets.json?page=2
```

### Field Selection
Use `select` parameter to specify which fields to return:
```
/api/v1/tickets.json?select=subject,description,account
```

Select nested fields:
```
/api/v1/tickets.json?select=assignee.name
```

Select all fields of a related resource using `*`:
```
/api/v1/tickets.json?select=events.*
```

Combine multiple selections:
```
/api/v1/tickets.json?select=subject,description,account,assignee.name,assignee.locale,events.*
```

### Filtering
Filter resources using JSON object:
```
/api/v1/tickets.json?filter={"project":20}
```

> **Note:** Filtering on sub-fields is not supported. For advanced queries, use the API Query Language.

### Additional Parameters

#### Count
Include total resource count:
```
/api/v1/tickets.json?count=true
```

#### Saved Views
Access saved view resources by ID:
```
/api/v1/tickets.json?saved_view=10857
```

Find saved view ID in browser URL:
```
clientcentral.io/support/tickets?saved_view=10857
```

## Field Translations

### Default Response
Get ticket status without translations:
```
/api/v1/tickets/<ticket_id>.json?select=status.name
```

Response:
```json
{
    "data": {
        "id": "<ticket_id>",
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
Get all available translations:
```
/api/v1/tickets/<ticket_id>.json?select=status.name&locales=true
```

Response:
```json
{
    "data": {
        "id": "<ticket_id>",
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

### Specific Languages
Get translations for specific languages:
```
/api/v1/tickets/<ticket_id>.json?select=status.name&locales=de,fr,en
```

> **Note:** Invalid language codes are ignored.
