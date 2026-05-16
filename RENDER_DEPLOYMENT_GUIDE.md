# Complete Deployment Guide - Render Only (Frontend + Backend)

## 📋 Overview

- **Frontend:** React + Vite → Deployed on **Render** (Static Site)
- **Backend:** Node.js + Express + MongoDB → Deployed on **Render** (Web Service)
- **Database:** MongoDB Atlas (Cloud)

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
   - `PORT`: `5000` (optional, Render assigns by default)

6. Click **"Create Web Service"**
7. Wait 3-5 minutes for deployment
8. **Copy your backend URL** (e.g., `https://portfolio-backend-xxxxx.onrender.com`)
9. Test health endpoint:
   ```bash
   curl https://portfolio-backend-xxxxx.onrender.com/api/health
   ```

### Step 3: Deploy Frontend to Render

1. Go to **[render.com](https://render.com)** → Click **"New +"** → **"Static Site"**
2. Select repository: `MY-Portfolio`
3. Configure:
   - **Name:** `portfolio-frontend`
   - **Branch:** `main`
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`

4. **Add Environment Variable**:
   - **Key:** `VITE_BACKEND_URL`
   - **Value:** `https://portfolio-backend-xxxxx.onrender.com` (use your actual backend URL from Step 2)

5. Click **"Create Static Site"**
6. Wait 2-3 minutes for deployment
7. You'll get a Render URL (e.g., `https://portfolio-frontend-xxxxx.onrender.com`)

### Step 4: Verify Deployment

1. Visit your frontend URL in browser
2. Fill the visitor form
3. Click "Continue to Portfolio"
4. Check browser console (F12 → Console tab)
   - Should see NO errors about `localhost:5000`
   - Should see requests to your Render backend URL

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

### Frontend (VITE_BACKEND_URL)
```
https://portfolio-backend-xxxxx.onrender.com
```

### Backend
```
MONGO_URI=mongodb+srv://raavanaasura87_db_user:Chani8877@chani.irvyksk.mongodb.net/portfolio?retryWrites=true&w=majority
NODE_ENV=production
PORT=5000
```

---

## ✅ Deployment Verification Checklist

### Backend
- [ ] Render shows "Live" status (green)
- [ ] Health check passes: `GET /api/health` returns 200
- [ ] MongoDB connected: Check Render logs for "✅ MongoDB connected"
- [ ] No CORS errors blocking requests

### Frontend
- [ ] Render shows "Deployed" status
- [ ] Frontend loads without 404 errors
- [ ] Visitor form visible on page
- [ ] No errors in browser console

### End-to-End
- [ ] Can enter name and email in visitor form
- [ ] Form submits successfully
- [ ] No network errors in console
- [ ] Data saved to MongoDB (check in MongoDB Atlas)

---

## 🐛 Troubleshooting

### Issue: "Network Error" when submitting form

**Cause:** Backend URL not set correctly in frontend

**Solution:**
1. Check frontend environment variable: `VITE_BACKEND_URL` in Render dashboard
2. Should match your backend URL exactly (e.g., `https://portfolio-backend-abc123.onrender.com`)
3. Redeploy frontend after changing environment variable

### Issue: MongoDB connection error

**Cause:** MongoDB Atlas network access not allowing Render IP

**Solution:**
1. Go to **[MongoDB Atlas](https://cloud.mongodb.com)** → Network Access
2. Add IP: `0.0.0.0/0` (allow all)
3. Or add specific Render IP ranges
4. Redeploy backend

### Issue: 404 errors on refresh (SPA routing issue)

**Solution:** Render static sites need redirect configuration
1. Create `render.yaml` with rewrites
2. Or check if frontend build is correctly pointing to `dist` directory

### Issue: Free tier keeps going to sleep

**Cause:** Render free tier spins down inactive services after 15 minutes

**Solution:**
- Upgrade to paid plan, OR
- Keep services active with periodic requests, OR
- Accept brief startup delay on first request

---

## 📝 Next Steps

1. **Optional:** Add a monitoring dashboard
   - Visit Render → Settings → Logs to monitor errors
   
2. **Optional:** Set up automatic alerts
   - Render Pro feature to notify on deployment failures

3. **Domain:** If you want a custom domain:
   - Render → Settings → Custom Domains
   - Add your domain and DNS records

---

## 🔗 Useful Links

- Render Dashboard: https://dashboard.render.com
- MongoDB Atlas: https://cloud.mongodb.com
- GitHub Repository: https://github.com/Chanikyachowdarysamineni/MY-Portfolio
