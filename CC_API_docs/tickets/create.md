# Creating Tickets

## Basics

A ticket can be created with a HTTP POST request to the following endpoint:

```
/api/v1/tickets.json?token=<your_api_token>
```

## Required Parameters

| Key | Example | Description |
|-----|---------|-------------|
| `ticket[workspace_id]` | 4 | The ID of the workspace the ticket should be created in |
| `ticket[project_id]` | 2 | The ID of the project this ticket should be associated with. **Note:** This parameter is only required if multiple projects are linked to the workspace. To get the project ID:<br>1. Go to Administration > Configuration (Tickets)<br>2. Select the project<br>3. The ID will be in the URL: `.../admin/accounts/.../ticket_projects/2/edit` |
| `ticket[subject]` | "Some subject" | The title/subject of the ticket |
| `ticket[description]` | "Some description" | More info about the ticket |

## Optional Parameters

| Key | Description |
|-----|-------------|
| `ticket[status_id]` | The ID of the ticket status. To get the status ID:<br>1. Go to Administration > Configuration (Tickets) > Statuses (tab)<br>2. Select a status<br>3. The ID will be in the URL: `.../admin/accounts/.../ticket_statuses/13/edit` |
| `ticket[type_id]` | The ID of the ticket type. To get the type ID:<br>1. Go to Administration > Configuration (Tickets) > Types (tab)<br>2. Select a type<br>3. The ID will be in the URL: `.../admin/accounts/.../ticket_types/8/edit` |
| `ticket[priority_id]` | The ID of the ticket priority. To get the priority ID:<br>1. Go to Administration > Configuration (Tickets) > Priorities (tab)<br>2. Select a priority<br>3. The ID will be in the URL: `.../admin/accounts/.../ticket_priorities/17/edit` |
| `ticket[attachments_attributes][x][file]` | Files to be uploaded as attachments. Example:<br>`ticket[attachments_attributes][0][file] = some_file.jpg`<br>`ticket[attachments_attributes][1][file] = other_file.png` |
| `ticket[custom_fields_attributes][x][id]`<br>`ticket[custom_fields_attributes][x][values]` | Custom field values. Example:<br>`ticket[custom_field_attributes][0][id] = 123`<br>`ticket[custom_field_attributes][0][values] = "Need translation"`<br>`ticket[custom_field_attributes][1][id] = 246`<br>`ticket[custom_field_attributes][1][values] = true`<br>**Note:** The 0 and 1 are arbitrary numbers. Get custom field IDs from the URL when administering custom fields. |
| `ticket[disable_default_notifications]` | If set to "true", email notifications will not be sent out. **Note:** This can only be used by ticket agents. Useful for synchronizing events with external ticket systems or performing mass updates. |

## Exploring Parameters

While our API documentation is limited, you can explore parameters using browser developer tools:

1. Open the new ticket screen
2. Open Chrome Developer Tools (Right Click > Inspect) and go to the Network tab
3. In the create ticket screen, change any field (e.g., ticket type)
4. In the Network tab, click the "tickets" request
5. Scroll down to view the form data showing all current parameters

**Note:** You shouldn't send all parameters - only include the ones you want to set.