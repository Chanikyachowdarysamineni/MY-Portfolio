# Visitor Form Backend Setup Guide

## Overview
This backend collects visitor information (email and full name) before they access the portfolio. The data is stored in MongoDB.

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account with a database and connection string

## Installation

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Environment Variables
Create a `.env` file in the server directory with the following:
```
MONGO_URI=mongodb+srv://raavanaasura87_db_user:Chani8877@chani.irvyksk.mongodb.net/portfolio?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

### 3. Start the Backend Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### POST `/api/visitors/register`
Register a new portfolio visitor

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Visitor information saved successfully",
  "data": {
    "_id": "...",
    "fullName": "John Doe",
    "email": "john@example.com",
    "visitedAt": "2024-01-15T10:30:00Z",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### GET `/api/visitors/all`
Retrieve all visitors (Admin endpoint)

**Response:**
```json
{
  "success": true,
  "count": 42,
  "data": [...]
}
```

### GET `/api/health`
Health check endpoint

## Database Schema

### Visitor Collection
```javascript
{
  _id: ObjectId,
  email: String (required, unique),
  fullName: String (required),
  visitedAt: Date (default: now),
  ipAddress: String,
  userAgent: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Frontend Integration

### 1. Update Backend URL
In your frontend `.env` file:
```
VITE_BACKEND_URL=http://localhost:5000
```

### 2. Install axios
```bash
npm install axios
```

### 3. Use the VisitorForm Component
The VisitorForm component is already integrated in `App.jsx` and:
- Shows on first visit
- Submits data to `/api/visitors/register`
- Stores info in localStorage to avoid showing again
- Displays success/error messages

## Features

✅ Email validation (frontend & backend)
✅ Full name validation
✅ MongoDB integration
✅ localStorage caching (don't ask twice)
✅ Error handling
✅ Responsive form UI
✅ IP address & user-agent logging
✅ CORS enabled

## Troubleshooting

### Connection Issues
- Check MongoDB URI in .env
- Verify IP whitelist in MongoDB Atlas (add 0.0.0.0/0 for development)
- Check firewall settings

### CORS Errors
- Backend already has CORS enabled
- If issues persist, check that backend is running on port 5000

### Form Not Submitting
- Verify backend is running: `curl http://localhost:5000/api/health`
- Check browser console for error messages
- Check backend logs for detailed errors

## Notes
- Visitor data is stored permanently in MongoDB
- Each visit creates a new record (even from same email)
- localStorage prevents showing form multiple times per browser
- Clear localStorage to see form again: `localStorage.removeItem('portfolioVisitorSubmitted')`
