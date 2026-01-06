# Zoho Webinar Integration Environment Variables

For the Zoho Webinar integration to work properly, you need to configure the following environment variables in your backend `.env` file:

## Required Environment Variables

### Zoho OAuth Configuration
```env
# Zoho OAuth Credentials
ZOHO_CLIENT_ID=your_zoho_client_id
ZOHO_CLIENT_SECRET=your_zoho_client_secret
ZOHO_REFRESH_TOKEN=your_zoho_refresh_token

# Zoho Webinar API Configuration
ZOHO_WEBINAR_API=https://meeting.zoho.in
ZOHO_ZSOID=your_zoho_organization_id
```

### How to Get These Values

#### 1. Zoho Client ID and Client Secret
1. Go to [Zoho Developer Console](https://developer.zoho.com/)
2. Create a new project or select an existing one
3. Add a "Client-based Web Application" or "Self-Client" application
4. Note down the Client ID and Client Secret

#### 2. Zoho Refresh Token
1. Use the OAuth authorization flow to get the refresh token
2. You can use this endpoint in your browser:
   ```
   https://accounts.zoho.in/oauth/v2/auth?scope=ZohoMeeting.webinar.CREATE,ZohoMeeting.webinar.READ,ZohoMeeting.webinar.UPDATE,ZohoMeeting.webinar.DELETE&client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=https://medix-1-eoz3.onrender.com/api/zoho/callback&access_type=offline
   ```
3. After authorization, you'll receive a code in the callback
4. Exchange this code for refresh token using the callback endpoint already implemented in your app

#### 3. Zoho Organization ID (ZSOID)
1. Go to your Zoho Meeting dashboard
2. The organization ID is usually visible in the URL or account settings
3. Alternatively, you can get it from the Zoho API documentation

## API Endpoints Available

### Webinar Management
- `POST /api/webinars/create` - Create new webinar
- `GET /api/webinars/all-webinars` - Get all webinars (upcoming/past/ongoing)
- `GET /api/webinars/ongoing` - Get currently ongoing webinars
- `GET /api/webinars/:id` - Get webinar by ID
- `PUT /api/webinars/:id` - Update webinar
- `DELETE /api/webinars/:id` - Delete webinar

### Attendee Management
- `GET /api/webinars/:id/attendees` - Get webinar attendees
- `POST /api/webinars/:id/register` - Register attendee for webinar

### Session Management (for recurring webinars)
- `GET /api/webinars/:id/sessions` - Get webinar sessions

## Frontend Integration

The frontend components are already set up:

1. **User Dashboard** (`/webinars`) - Shows webinars for regular users
2. **Admin Dashboard** (`/admin/webinars`) - Full management capabilities for admins

## Features Implemented

### For Users
- View upcoming, ongoing, and past webinars
- Register for webinars
- Join live webinars
- See webinar details

### For Admins
- Create, update, and delete webinars
- View attendee reports
- Export attendee data as CSV
- Manage recurring webinar sessions
- View comprehensive statistics
- Real-time webinar status tracking

## Security Notes

- All endpoints require authentication (`protect` middleware)
- Admin operations require admin role (`admin` middleware)
- Zoho API tokens are automatically refreshed
- Environment variables are properly secured

## Testing

1. Ensure all environment variables are set
2. Test the OAuth flow by visiting the authorization URL
3. Create a test webinar through the admin dashboard
4. Register users and test the joining functionality

## Troubleshooting

### Common Issues
1. **401 Unauthorized**: Check your Zoho credentials and refresh token
2. **404 Not Found**: Verify the ZSOID and API endpoints
3. **CORS Issues**: Ensure your frontend URL is in the allowed origins
4. **Missing Scopes**: Make sure your OAuth app has the required scopes

### Debug Mode
Set `DEBUG=zoho:*` in your environment to see detailed API logs.
