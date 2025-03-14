# PowerShell script to update a ticket - corrected to use PUT and handle JSON response

# Define API endpoint and ticket ID
$apiEndpoint = "http://localhost:3000/api/v1/tickets"
$ticketId = 630308 # Replace with your ticket ID

# Define headers
$headers = @{
    "Content-Type" = "application/json"
    # API token should be added here if required by the API
    # "Authorization" = "Bearer YOUR_API_TOKEN"
}

# Define request body according to API documentation
$body = @{
    ticket = @{
        description = "Updated description via PowerShell Script"
        subject = "Updated Subject via PowerShell"
    }
    ticket_event = @{
        comment = "Updated via PowerShell script"
        internal = "true"
        visible_to_customer = "false"
        disable_default_notifications = "true"
    }
} | ConvertTo-Json -Depth 5

try {
    # Send request - using PATCH as specified in the API
    $response = Invoke-WebRequest -Uri "$apiEndpoint/$ticketId" -Method Patch -Headers $headers -Body $body -ErrorAction Stop

    # Properly handle the response stream and convert from JSON
    $responseContent = $response | ConvertFrom-Json

    # Output response
    Write-Host "Response content (JSON):"
    # Write-Host ($responseContent | ConvertTo-Json -Compress)

    # Optionally output specific fields from the response, e.g., ticket ID and status
    Write-Host "Ticket updated successfully."
    Write-Host "Ticket ID: $($responseContent.id)" 
    Write-Host "Status: $($responseContent.status)"
    Write-Host "Subject: $($responseContent.subject)"
    Write-Host "Description: $($responseContent.description)"
    Write-Host "Updated At: $($responseContent.updated_at)"
    Write-Host "Internal: $($responseContent.internal)"
    Write-Host "Visibile to customer: $($responseContent.visible_to_customer)"

}
catch {
    Write-Host "Error details below:"
    Write-Host $_.Exception.Message

    # Check if there's a web response and try to parse error details from JSON if possible
    if ($_.Exception.Response) {
        $errorResponse = $_.Exception.Response
        $errorStream = $errorResponse.GetResponseStream()
        $streamReader = New-Object -TypeName System.IO.StreamReader -ArgumentList $errorStream
        $errorContent = $streamReader.ReadToEnd()
        Write-Error -Message "Response content (Error JSON): $($errorContent | ConvertFrom-Json)"
    }
}