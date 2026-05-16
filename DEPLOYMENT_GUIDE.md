# Complete Deployment Guide - Frontend (Vercel) & Backend (Render)

## 📋 Overview

- **Frontend:** React + Vite → Deployed on **Vercel**
- **Backend:** Node.js + Express + MongoDB → Deployed on **Render**
- **Database:** MongoDB Atlas (Cloud)

---

## 🚀 Part 1: Deploy Backend to Render

### Step 1: Prepare Backend

```bash
# Verify backend structure
cd server
npm install
npm start  # Should run on localhost:5000
```

### Step 2: Create Render Service

1. Go to **[render.com](https://render.com)** → Sign in with GitHub
2. Click **"New +"** → **"Web Service"**
3. Select your repository: `MY-Portfolio`

### Step 3: Configure Render Service

**Basic Configuration:**
- **Name:** `portfolio-backend`
- **Environment:** `Node`
- **Plan:** Free
- **Build Command:** `npm install` (auto-detected from render.yaml)
- **Start Command:** `npm start` (auto-detected from render.yaml)
- **Root Directory:** `server` (set in render.yaml)

**Environment Variables (in Render Dashboard):**

Go to **Settings** → **Environment** and add:

| Key | Value |
|-----|-------|
| `MONGO_URI` | `mongodb+srv://raavanaasura87_db_user:Chani8877@chani.irvyksk.mongodb.net/portfolio?retryWrites=true&w=majority` |
| `NODE_ENV` | `production` |
| `PORT` | `5000` |

### Step 4: Deploy & Verify Backend

1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. Copy your Render URL (e.g., `https://portfolio-backend-xxxxx.onrender.com`)
4. Test the health endpoint:

```bash
curl https://portfolio-backend-xxxxx.onrender.com/api/health
```

**Expected response:**
```json
{
  "success": true,
  "message": "Backend is running",
  "timestamp": "2026-05-16T..."
}
```

✅ If successful, note your backend URL for frontend configuration

---

## 🌐 Part 2: Deploy Frontend to Vercel

### Step 1: Prepare Frontend

```bash
# Build locally to test
npm install
npm run build
npm run preview
```

Should see frontend running locally.

### Step 2: Create Vercel Project

1. Go to **[vercel.com](https://vercel.com)** → Sign in with GitHub
2. Click **"Add New"** → **"Project"**
3. Select your repository: `MY-Portfolio`
4. **Framework Preset:** Vite
5. **Root Directory:** `./` (leave as default)

### Step 3: Configure Environment Variables

**In Vercel Dashboard:**

Go to **Settings** → **Environment Variables** and add:

| Key | Value |
|-----|-------|
| `VITE_BACKEND_URL` | `https://portfolio-backend-xxxxx.onrender.com` |

(Replace `xxxxx` with your actual Render backend subdomain)

### Step 4: Configure Build Settings

**In Vercel Dashboard:**

Go to **Settings** → **Build & Development Settings:**

- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Step 5: Deploy & Verify Frontend

1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment
3. You'll get a Vercel URL (e.g., `https://portfolio-xxxxx.vercel.app`)
4. Visit the URL in browser
5. Test the visitor form → should submit to your Render backend

✅ If form works, deployment is successful!

---

## 🔄 Environment Variables Summary

### Frontend (.env.vercel)
```env
VITE_BACKEND_URL=https://portfolio-backend-xxxxx.onrender.com
```

### Backend (.env.render)
```env
MONGO_URI=mongodb+srv://raavanaasura87_db_user:Chani8877@chani.irvyksk.mongodb.net/portfolio?retryWrites=true&w=majority
NODE_ENV=production
PORT=5000
```

---

## ✅ Deployment Verification Checklist

### Backend (Render)

- [ ] Render dashboard shows "Live" status (green)
- [ ] Health endpoint returns 200:
  ```bash
  curl https://portfolio-backend-xxxxx.onrender.com/api/health
  ```
- [ ] MongoDB connection successful (check Render logs)
- [ ] No "MongoDB connection error" in logs

### Frontend (Vercel)

- [ ] Vercel dashboard shows "Ready" status
- [ ] Frontend loads in browser at Vercel URL
- [ ] No 404 or build errors in deployment logs
- [ ] Network tab shows requests to correct backend URL

### End-to-End

- [ ] Visitor form is visible on portfolio
- [ ] Can enter name and email
- [ ] Form submits successfully
- [ ] No CORS errors in browser console
- [ ] Data appears in MongoDB Atlas (check in MongoDB dashboard)

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** "MongoDB connection error"
```
Solution:
1. Verify MONGO_URI is correct in Render environment variables
2. Check MongoDB Atlas IP whitelist: https://cloud.mongodb.com → Security → Network Access
3. Add IP 0.0.0.0/0 (allow all) or specific Render IPs
```

**Problem:** App keeps crashing after deployment
```
Solution:
1. Check Render logs for error messages
2. Verify server/package.json has all required dependencies
3. Ensure .env.render environment variables are set
4. Try manual redeploy
```

**Problem:** Health endpoint returns 404
```
Solution:
1. Verify server/server.js has health check route
2. Check Render is using correct start command
3. Ensure server is actually running (check Render logs)
```

### Frontend Issues

**Problem:** Frontend can't connect to backend
```
Solution:
1. Verify VITE_BACKEND_URL is set in Vercel environment variables
2. Check backend URL is correct (copy from Render dashboard)
3. Verify CORS is enabled on backend (should be in server.js)
4. Check browser console for specific error messages
```

**Problem:** Build fails on Vercel
```
Solution:
1. Check Vercel build logs for error details
2. Verify npm run build works locally
3. Ensure all dependencies in package.json are listed
4. Check for any console.errors in build output
```

**Problem:** 503 errors or "Too many requests"
```
Solution:
1. Free tier Render spins down after 15 minutes inactivity
2. First request takes 30 seconds to wake up - normal!
3. Upgrade to paid plan for persistent uptime
4. Use external uptime monitor to keep app awake
```

---

## 📁 Key Files for Deployment

| File | Purpose | Platform |
|------|---------|----------|
| `vercel.json` | Vercel configuration | Vercel |
| `.nvmrc` | Node.js version specification | Both |
| `render.yaml` | Render infrastructure config | Render |
| `Procfile` | Process file for Render | Render |
| `server/package.json` | Backend dependencies | Render |
| `package.json` | Frontend & root scripts | Vercel |
| `.env.vercel` | Frontend env template | Vercel |
| `.env.render` | Backend env template | Render |

---

## 🔄 Redeployment Process

### When to Redeploy

- After code changes (auto if webhooks enabled)
- After changing environment variables
- If deployment fails (manual redeploy)
- When updating dependencies

### Manual Redeploy Frontend (Vercel)

```bash
git add .
git commit -m "Update frontend code"
git push origin main
# Vercel auto-deploys on push (if enabled)
# Or click "Redeploy" in Vercel dashboard
```

### Manual Redeploy Backend (Render)

```bash
git add .
git commit -m "Update backend code"
git push origin main
# Render auto-deploys on push (if webhooks enabled)
# Or click "Manual Deploy" in Render dashboard
```

---

## 📊 Monitoring

### Backend Monitoring (Render)

- **Logs:** Render Dashboard → `portfolio-backend` → "Logs"
- **Metrics:** Render Dashboard → "Metrics" tab
- **Health:** Monitor `/api/health` endpoint

### Frontend Monitoring (Vercel)

- **Logs:** Vercel Dashboard → Deployments → Select deployment → "Logs"
- **Errors:** Vercel Dashboard → "Analytics" tab
- **Performance:** Check Network tab in browser DevTools

### Database Monitoring (MongoDB Atlas)

- **Metrics:** https://cloud.mongodb.com → Clusters → "Metrics"
- **Data:** Atlas Data Explorer to browse collections
- **Backups:** Check backup status in Atlas

---

## 🎯 Success Criteria

Your deployment is complete when:

✅ Backend:
- Render shows "Live" status
- `/api/health` returns 200
- MongoDB connection established
- No errors in logs

✅ Frontend:
- Vercel shows "Ready" status
- Frontend loads successfully
- Environment variables are set
- No console errors

✅ Integration:
- Visitor form submits successfully
- Data saved to MongoDB
- No CORS errors
- All endpoints respond correctly

---

## 📞 Support & Resources

| Resource | Link |
|----------|------|
| Vercel Docs | https://vercel.com/docs |
| Render Docs | https://render.com/docs |
| MongoDB Docs | https://docs.mongodb.com |
| Vite Docs | https://vitejs.dev |
| Express Docs | https://expressjs.com |

---

## 📅 Last Updated

May 16, 2026 - Fixed deployment configurations for both Vercel & Render

**Status:** ✅ Ready for deployment
