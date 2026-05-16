# Render Deployment Checklist ✅

## Pre-Deployment Requirements

- [ ] GitHub repository is public
- [ ] Code is committed and pushed to `main` branch
- [ ] `package.json` has `build` and `start` scripts
- [ ] `Procfile` exists in root directory
- [ ] `.env` file is NOT committed (check `.gitignore`)
- [ ] MongoDB Atlas cluster is running and accessible

---

## Render Dashboard Configuration

### 1. Create New Web Service

**Location:** Render Dashboard → New + → Web Service

- [ ] **Repository:** `https://github.com/Chanikyachowdarysamineni/MY-Portfolio`
- [ ] **Branch:** `main`
- [ ] **Name:** `portfolio-backend`
- [ ] **Environment:** `Node`
- [ ] **Plan:** Free (or Starter for production)
- [ ] **Build Command:** `npm install; npm run build`
- [ ] **Start Command:** `npm start`
- [ ] **Root Directory:** (leave empty - Procfile will handle it)

---

### 2. Environment Variables

**Location:** Settings → Environment

Add the following variables:

| Key | Value | Notes |
|-----|-------|-------|
| `MONGO_URI` | `mongodb+srv://raavanaasura87_db_user:Chani8877@chani.irvyksk.mongodb.net/portfolio?retryWrites=true&w=majority` | MongoDB connection string |
| `NODE_ENV` | `production` | Production environment |
| `PORT` | `10000` | Render automatically assigns port (optional) |

**Steps:**
1. Click **"Environment"** in Settings
2. Click **"Add Environment Variable"**
3. Enter `MONGO_URI` as key
4. Paste the connection string as value
5. Repeat for `NODE_ENV` and `PORT`
6. Click **"Save"**

---

### 3. Advanced Settings

**Location:** Settings → Advanced

- [ ] **Auto-Deploy:** Toggle ON (auto-deploy on `main` branch push)
- [ ] **Health Check Path:** `/api/health`
- [ ] **Health Check Protocol:** `HTTP`
- [ ] **Graceful Shutdown Timeout:** `30` seconds

---

### 4. Deployment Triggers

**Location:** Settings → Notifications (Optional)

- [ ] Setup GitHub webhook (automatic)
- [ ] Enable email notifications for deployment failures

---

## Post-Deployment Verification

### 1. Check Build Logs
- [ ] Go to **"Logs"** tab
- [ ] Verify last 3 lines show:
  ```
  ==> Deploying...
  ==> Checking health...
  ==> Deployment successful ✅
  ```

### 2. Test Health Endpoint

**Copy your Render URL** (e.g., `https://portfolio-backend-xxxxx.onrender.com`)

**Test in browser or terminal:**
```bash
curl https://portfolio-backend-xxxxx.onrender.com/api/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Backend is running",
  "timestamp": "2026-05-16T08:20:00Z"
}
```

- [ ] Health check returns 200 status
- [ ] Response contains expected fields

### 3. Test Visitor Registration Endpoint

```bash
curl -X POST https://portfolio-backend-xxxxx.onrender.com/api/visitors/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Visitor information saved successfully",
  "data": {
    "_id": "...",
    "fullName": "Test User",
    "email": "test@example.com",
    "visitedAt": "2026-05-16T08:20:00Z"
  }
}
```

- [ ] Request returns 201 status
- [ ] Data is saved to MongoDB

---

## Frontend Integration

### Update Frontend Environment

**File:** `d:\PORTFOLIO\.env`

```env
VITE_BACKEND_URL=https://portfolio-backend-xxxxx.onrender.com
```

Replace `xxxxx` with your actual Render app subdomain.

- [ ] Frontend `.env` updated with Render backend URL
- [ ] Frontend rebuilt and redeployed
- [ ] Visitor form successfully submits data to Render backend

---

## Monitoring & Maintenance

### Daily Checks
- [ ] Monitor error logs in Render dashboard
- [ ] Check MongoDB connection status
- [ ] Verify no API timeouts

### Weekly Checks
- [ ] Review deployment logs for errors
- [ ] Test health endpoint at least once
- [ ] Check MongoDB storage usage

### Monthly Tasks
- [ ] Update dependencies if security patches available
- [ ] Archive old visitor data if needed
- [ ] Review cost usage on Render dashboard

---

## Troubleshooting

### Deployment Fails: "Missing script: build"
**Solution:**
- Verify `package.json` has `build` script
- Check `Procfile` exists in root
- Trigger manual redeploy

### MongoDB Connection Error
**Solution:**
- Verify `MONGO_URI` is correct in Render environment
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 or Render IPs)
- Test connection string locally first

### App Crashes After Deployment
**Solution:**
- Check **"Logs"** tab for error messages
- Verify all environment variables are set
- Ensure `server/package.json` has correct dependencies

### Slow First Request (30+ seconds)
**Solution:**
- Normal for free tier Render (app spins down after inactivity)
- Upgrade to paid plan for persistent uptime
- Add uptime monitoring to keep app awake

---

## Key Files for Render

| File | Purpose |
|------|---------|
| `Procfile` | Tells Render how to start the app |
| `package.json` (root) | Root-level scripts for build/start |
| `server/package.json` | Backend dependencies |
| `server/server.js` | Backend entry point |
| `render.yaml` | (Optional) Infrastructure as Code config |

---

## Render Service URLs

| Service | URL |
|---------|-----|
| Dashboard | https://dashboard.render.com |
| Docs | https://render.com/docs |
| Status | https://status.render.com |
| Support | https://render.com/support |

---

## Quick Reference Commands

**Manually trigger redeploy:**
```bash
git add .
git commit -m "trigger redeploy"
git push origin main
# OR click "Manual Deploy" in Render dashboard
```

**Check deployment status:**
- Go to Render Dashboard → `portfolio-backend` → Logs

**View live app:**
- Click the app URL in Render dashboard or visit: `https://portfolio-backend-xxxxx.onrender.com`

---

## Success Criteria ✅

Your Render deployment is successful when:

- [ ] App shows "Live" status (green)
- [ ] `/api/health` returns 200 status
- [ ] `/api/visitors/register` accepts POST requests
- [ ] Data is saved to MongoDB
- [ ] Frontend can communicate with backend
- [ ] No errors in Render logs
- [ ] Visitor form works end-to-end

---

**Last Updated:** May 16, 2026  
**Status:** Ready for deployment ✅
