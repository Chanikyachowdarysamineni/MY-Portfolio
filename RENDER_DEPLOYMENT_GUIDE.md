# Complete Deployment Guide - Render Only (Frontend + Backend)

## 📋 Overview

- **Frontend:** React + Vite → Deployed on **Render** (Static Site)
- **Backend:** Node.js + Express + MongoDB → Deployed on **Render** (Web Service)
- **Database:** MongoDB Atlas (Cloud)

---

## ⚠️ CRITICAL FIX: Backend URL Configuration

**Problem:** Static sites on Render need environment variables set **during build time**, not at runtime.

**Solution:** The `render.yaml` now explicitly sets `VITE_BACKEND_URL` in the build command:
```yaml
buildCommand: npm install && VITE_BACKEND_URL=https://portfolio-backend.onrender.com npm run build
```

This ensures Vite embeds the backend URL into the built files.

---

## 🚀 Deployment Steps

### Step 1: Push Code to GitHub

```bash
git add .
git commit -m "Setup Render deployment"
git push origin main
```

### Step 2: Deploy Backend to Render

1. Go to **[render.com](https://render.com)** → Sign in with GitHub
2. Click **"New +"** → **"Web Service"**
3. Select repository: `MY-Portfolio`
4. Configure:
   - **Name:** `portfolio-backend`
   - **Branch:** `main`
   - **Build Command:** `cd server && npm install`
   - **Start Command:** `cd server && npm start`
   - **Plan:** Free

5. **Add Environment Variables** (Settings → Environment):
   - `MONGO_URI`: `mongodb+srv://raavanaasura87_db_user:Chani8877@chani.irvyksk.mongodb.net/portfolio?retryWrites=true&w=majority`
   - `NODE_ENV`: `production`

6. Click **"Create Web Service"**
7. Wait 3-5 minutes for deployment
8. **Copy your backend URL** (e.g., `https://portfolio-backend-xxxxx.onrender.com`)
9. **Test endpoints:**
   ```bash
   # Health check
   curl https://portfolio-backend-xxxxx.onrender.com/api/health
   
   # Test CORS
   curl https://portfolio-backend-xxxxx.onrender.com/api/test
   ```
   Should return JSON responses.

### Step 3: Deploy Frontend to Render

1. Go to **[render.com](https://render.com)** → Click **"New +"** → **"Static Site"**
2. Select repository: `MY-Portfolio`
3. Configure:
   - **Name:** `portfolio-frontend`
   - **Branch:** `main`
   - **Build Command:** `npm install && VITE_BACKEND_URL=https://portfolio-backend-xxxxx.onrender.com npm run build`
   - **Publish Directory:** `dist`

   ⚠️ **IMPORTANT:** Replace `portfolio-backend-xxxxx` with your actual Render backend subdomain!

4. Click **"Create Static Site"**
5. Wait 2-3 minutes for deployment
6. You'll get a Render URL (e.g., `https://portfolio-frontend-xxxxx.onrender.com`)

### Step 4: Verify Deployment

1. Visit your frontend URL in browser
2. **Open Developer Tools** (F12 → Console tab)
3. Look for these logs:
   - `🔧 Backend URL: https://portfolio-backend-xxxxx.onrender.com` ✅
   - `📤 Sending request to: https://...`
   - `✅ Response received:` (if form works)

4. Fill the visitor form and submit
5. Check MongoDB Atlas to confirm data was saved

✅ **If form works, deployment is successful!**

---

## 📊 Service Architecture

```
┌─────────────────────────────┐
│   Frontend (Static Site)    │
│   portfolio-frontend        │
│  https://xxx.onrender.com   │
└──────────────┬──────────────┘
               │
               │ API Request
               │ /api/visitors/register
               ↓
┌─────────────────────────────┐
│   Backend (Web Service)     │
│   portfolio-backend         │
│  https://yyy.onrender.com   │
└──────────────┬──────────────┘
               │
               │ MongoDB Query
               ↓
┌─────────────────────────────┐
│   MongoDB Atlas (Cloud)     │
│   chani.irvyksk.mongodb.net │
└─────────────────────────────┘
```

---

## 🔄 Environment Variables Used

### Frontend (Build-Time)
```
VITE_BACKEND_URL=https://portfolio-backend-xxxxx.onrender.com
```
Set in build command during Render deployment.

### Backend (Runtime)
```
MONGO_URI=mongodb+srv://raavanaasura87_db_user:Chani8877@chani.irvyksk.mongodb.net/portfolio?retryWrites=true&w=majority
NODE_ENV=production
```

---

## ✅ Deployment Verification Checklist

### Backend
- [ ] Render shows "Live" status (green)
- [ ] Health check passes: `GET /api/health` returns 200
- [ ] MongoDB connected: Check Render logs for "✅ MongoDB connected"
- [ ] CORS enabled: Test endpoint returns data

### Frontend
- [ ] Render shows "Deployed" status
- [ ] Frontend loads without 404 errors
- [ ] Browser console shows `🔧 Backend URL: https://...` (NOT localhost)
- [ ] Visitor form visible on page

### End-to-End
- [ ] Can enter name and email in visitor form
- [ ] Form submits successfully (no errors in console)
- [ ] Data saved to MongoDB (check in MongoDB Atlas)

---

## 🐛 Troubleshooting

### Issue: "Network Error" when submitting form (localhost:5000 in console)

**Cause:** Frontend environment variable not set during build

**Solution:**
1. **Check Render frontend build logs** → Settings → Build & Deploy
2. Look for: `VITE_BACKEND_URL=https://portfolio-backend-xxxxx.onrender.com`
3. **Redeploy frontend with correct build command:**
   - Go to Frontend service → Settings → Build & Deploy
   - **Build Command:** `npm install && VITE_BACKEND_URL=https://portfolio-backend-xxxxx.onrender.com npm run build`
   - Replace `portfolio-backend-xxxxx` with your actual backend URL
   - Click "Redeploy"
4. **Check browser console logs:**
   - F12 → Console tab
   - Should see: `🔧 Backend URL: https://portfolio-backend-xxxxx.onrender.com` ✅
   - NOT: `🔧 Backend URL: http://localhost:5000` ❌

### Issue: Backend returns "404 Not Found" on `/api/visitors/register`

**Solution:**
1. Check backend Render logs for deployment errors
2. Test health endpoint: `https://portfolio-backend-xxxxx.onrender.com/api/health`
3. If health check fails, check MongoDB connection in logs:
   - Should show: `✅ MongoDB connected successfully`
4. If showing error, verify `MONGO_URI` environment variable is correct

### Issue: CORS errors in browser console

**Example:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
1. Backend CORS is automatically configured for Render URLs
2. If still getting errors:
   - Check backend Render logs for origin information
   - Verify frontend is deployed on Render (not localhost)
   - Hard refresh browser (Ctrl+Shift+R)

### Issue: MongoDB connection error

**Cause:** MongoDB Atlas network access not allowing Render IP

**Solution:**
1. Go to **[MongoDB Atlas](https://cloud.mongodb.com)** → Network Access
2. Add IP: `0.0.0.0/0` (allow all)
3. Click "Confirm" and wait for changes to apply
4. Redeploy backend service on Render

### Issue: Free tier keeps going to sleep

**Cause:** Render free tier spins down inactive services after 15 minutes

**Solution:**
- Upgrade to paid plan, OR
- Keep services active with periodic requests, OR
- Accept brief startup delay on first request

### Issue: Form submits but data doesn't appear in MongoDB

**Solution:**
1. Check backend logs: Render → Backend service → Logs
2. Verify MongoDB connection string is correct in env vars
3. Test MongoDB Atlas directly (check in Atlas console)
4. Check if collection `visitors` exists in database
5. Try redeploying backend

### How to Check Logs on Render

1. **Frontend logs:**
   - Render → portfolio-frontend → Logs
   - Shows build output and any deployment errors

2. **Backend logs:**
   - Render → portfolio-backend → Logs
   - Shows startup messages, requests, and errors
   - Look for: `🔧 Backend URL:`, `✅ MongoDB connected`, `📨 [timestamp] POST /api/visitors/register`

---

## 📝 Next Steps

1. **Monitor in production:**
   - Visit Render → Logs to check for errors
   - Set up email notifications (Render Pro feature)

2. **Custom domain** (optional):
   - Render → Settings → Custom Domains
   - Add your domain and DNS records

3. **Upgrade from free tier** (when ready):
   - Render → Settings → Plan
   - Upgrade to avoid service spin-down after 15 minutes idle

---

## 🔗 Useful Links

- **Render Dashboard:** https://dashboard.render.com
- **MongoDB Atlas:** https://cloud.mongodb.com
- **GitHub Repository:** https://github.com/Chanikyachowdarysamineni/MY-Portfolio
- **Render Docs - Static Sites:** https://render.com/docs/static-sites
- **Render Docs - Web Services:** https://render.com/docs/web-services
