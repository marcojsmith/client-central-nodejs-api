# Ticket Update API Documentation

## Basics
To update a ticket, send an HTTP PATCH request to:
```
/api/v1/tickets/<ticket_id>.json?token=<your_api_token>
```

## Required Parameters

| Key | Example | Description |
|-----|---------|-------------|
| `ticket_event[comment]` | "Some comment" | Comment added to the event/post. Can be blank but must be present |
| `ticket_event[visible_to_customer]` | false | Determines if event is visible to customer |

## Optional Parameters

### Attachments
| Key | Example | Description |
|-----|---------|-------------|
| `ticket_event[attachments_attributes][x][file]` | `some_file.jpg` | Files to upload as attachments |
| | `other_file.png` | Use sequential numbers for multiple files |

### Ticket Details
| Key | Description |
|-----|-------------|
| `ticket[subject]` | The title/subject of the ticket |
| `ticket[description]` | Detailed information about the ticket |

### Status, Type & Priority
| Key | Description |
|-----|-------------|
| `ticket[status_id]` | ID from Administration > Configuration (Tickets) > Statuses |
| `ticket[type_id]` | ID from Administration > Configuration (Tickets) > Types |
| `ticket[priority_id]` | ID from Administration > Configuration (Tickets) > Priorities |

### Custom Fields
| Key | Example | Description |
|-----|---------|-------------|
| `ticket[custom_fields_attributes][x][id]` | 123 | Custom field ID from admin URL |
| `ticket[custom_fields_attributes][x][values]` | "Need translation" | Value for custom field |

### Notification Control
| Key | Description |
|-----|-------------|
| `ticket_event[disable_default_notifications]` | Set to "true" to prevent email notifications (agent-only) |