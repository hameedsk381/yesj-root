# Frontend-Backend Connection Guide

This document explains how the frontend and backend of the YESJ application are connected and how to use them together.

## Architecture Overview

The application follows a client-server architecture:
- **Frontend**: React application running on Vite (port 3000)
- **Backend**: Node.js/Express server (port 5000)
- **Database**: MongoDB (local or remote)

## Connection Setup

### Environment Variables

The connection between frontend and backend is configured through environment variables:

**Frontend (.env files):**
```
VITE_API_BASE_URL=http://localhost:5001
NODE_ENV=development
```

**Backend (.env file):**
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/yesj
NODE_ENV=development
```

### Proxy Configuration

Vite is configured with a proxy to forward API requests from the frontend to the backend:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5001',
      changeOrigin: true,
      secure: false,
    }
  }
}
```

This means that when the frontend makes a request to `/api/announcements`, it gets forwarded to `http://localhost:5001/api/announcements`.

## API Services

The frontend uses a service layer to communicate with the backend:

1. **api.js**: Base axios configuration
2. **announcementsService.js**: CRUD operations for announcements
3. **coursesService.js**: CRUD operations for courses
4. **eventsService.js**: CRUD operations for events
5. **carouselService.js**: CRUD operations for carousel slides

## Data Flow

1. Frontend components call service functions
2. Services make HTTP requests to backend API endpoints
3. Backend processes requests and interacts with MongoDB
4. Backend returns JSON responses
5. Frontend updates UI with received data

## Running the Application

### Prerequisites

1. MongoDB installed and running locally
2. Node.js installed
3. npm or yarn package manager

### Steps

1. **Start MongoDB:**
   - Ensure MongoDB service is running on port 27017
   - Or start manually: `mongod --dbpath /data/db`

2. **Start Backend Server:**
   ```bash
   cd server
   npm install
   npm start
   ```

3. **Seed Database (Optional):**
   ```bash
   cd server
   npm run seed
   ```

4. **Start Frontend:**
   ```bash
   cd client
   npm install
   npm run dev
   ```

5. **Access Application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001
   - Health check: http://localhost:5001/health

## Testing the Connection

You can verify the connection is working by:

1. Checking the health endpoint: `http://localhost:5001/health`
2. Viewing announcements on the homepage
3. Navigating to Events or Courses pages
4. Checking browser developer tools Network tab for API requests

## Troubleshooting

### Common Issues

1. **"EADDRINUSE" Error:**
   - Another process is using port 5001
   - Solution: Change PORT in server/.env to a different port

2. **MongoDB Connection Error:**
   - MongoDB service not running
   - Solution: Start MongoDB service or check MONGODB_URI

3. **CORS Errors:**
   - Backend not configured to allow frontend origin
   - Solution: Check cors configuration in server/index.js

4. **API Requests Failing:**
   - Proxy not working correctly
   - Solution: Verify Vite proxy configuration in client/vite.config.js

### Debugging Steps

1. Check if both frontend and backend servers are running
2. Verify MongoDB is accessible
3. Check browser console for errors
4. Check server logs for error messages
5. Test API endpoints directly with tools like Postman

## Development Workflow

1. Make changes to frontend components
2. Update service files if API interactions change
3. Modify backend routes if needed
4. Test changes in browser
5. Check both frontend and backend consoles for errors

## Production Deployment

For production deployment:

1. Update VITE_API_BASE_URL in client/.env.production
2. Update MONGODB_URI in server/.env for production database
3. Build frontend: `npm run build`
4. Deploy backend to server
5. Serve built frontend files through backend or CDN