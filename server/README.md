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
VITE_BACKEND_URL=https://portfolio-backend-xxxxx.onrender.com
```

## Deployment

### Deploy to Render

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Backend deployment configuration"
   git push origin main
   ```

2. **Create Render Service**
   - Go to [render.com](https://render.com)
   - Sign in with GitHub
   - Click **"New +"** → **"Web Service"**
   - Connect your repository
   - Configure:
     - **Name**: `portfolio-backend`
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free

3. **Add Environment Variables**
   - Go to **Settings** → **Environment**
   - Add:
     ```
     MONGO_URI=mongodb+srv://raavanaasura87_db_user:Chani8877@chani.irvyksk.mongodb.net/portfolio?retryWrites=true&w=majority
     NODE_ENV=production
     ```

4. **Deploy**
   - Click **"Create Web Service"**
   - Wait for deployment (2-3 minutes)
   - Copy your Render URL (e.g., `https://portfolio-backend-xxxxx.onrender.com`)

5. **Update Frontend**
   - Update `VITE_BACKEND_URL` in frontend `.env`:
     ```
     VITE_BACKEND_URL=https://portfolio-backend-xxxxx.onrender.com
     ```
   - Rebuild and redeploy frontend

### Health Check
After deployment, verify your backend:
```
https://portfolio-backend-xxxxx.onrender.com/api/health
```

Should return:
```json
{
  "success": true,
  "message": "Backend is running",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Troubleshooting

### Build Fails
- Ensure `server` folder has `package.json` with `start` script
- Check `render.yaml` has `rootDir: server`

### MongoDB Connection Error
- Verify `MONGO_URI` is correct in Render environment variables
- Check MongoDB Atlas IP whitelist includes Render's IPs
- Render IPs: Allow all (0.0.0.0/0) or check Render docs for specific IPs

### Free Tier Limitations
- Apps spin down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds
- Daily uptime limited to 750 hours/month

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
