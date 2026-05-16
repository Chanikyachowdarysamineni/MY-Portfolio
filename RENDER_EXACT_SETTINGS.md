# Render Dashboard - Backend Deployment Settings

## 📍 Location: Render Dashboard → Create Web Service

---

## ✅ STEP 1: Connect Repository

| Field | Value |
|-------|-------|
| **Repository** | `https://github.com/Chanikyachowdarysamineni/MY-Portfolio` |
| **Branch** | `main` |

---

## ✅ STEP 2: Basic Settings

| Field | Value |
|-------|-------|
| **Name** | `portfolio-backend` |
| **Environment** | `Node` |
| **Plan** | `Free` |
| **Region** | Select closest to you (e.g., `Singapore`, `US East`) |

---

## ✅ STEP 3: Build & Deploy Settings

### Build Command
```
cd server && npm install
```

### Start Command
```
cd server && npm start
```

### Root Directory
```
(leave EMPTY - do NOT fill this)
```

---

## ✅ STEP 4: Environment Variables

**Location:** Settings → Environment

Add these exactly as shown:

### Variable 1:
- **Key:** `MONGO_URI`
- **Value:** `mongodb+srv://raavanaasura87_db_user:Chani8877@chani.irvyksk.mongodb.net/portfolio?retryWrites=true&w=majority`

### Variable 2:
- **Key:** `NODE_ENV`
- **Value:** `production`

### Variable 3:
- **Key:** `PORT`
- **Value:** `5000`

---

## ✅ STEP 5: Advanced Settings

**Location:** Settings → Advanced

| Setting | Value |
|---------|-------|
| **Auto-Deploy** | Toggle `ON` |
| **Health Check Path** | `/api/health` |
| **Health Check Protocol** | `HTTP` |
| **Graceful Shutdown Timeout** | `30` seconds |

---

## 📋 Complete Checklist for Render Dashboard

```
☐ Repository: MY-Portfolio connected
☐ Branch: main selected
☐ Name: portfolio-backend
☐ Environment: Node
☐ Plan: Free
☐ Region: Selected

☐ Build Command: cd server && npm install
☐ Start Command: cd server && npm start
☐ Root Directory: (EMPTY)

☐ Environment Variables Added:
  ☐ MONGO_URI = (your connection string)
  ☐ NODE_ENV = production
  ☐ PORT = 5000

☐ Auto-Deploy: ON
☐ Health Check Path: /api/health
☐ Graceful Shutdown: 30s

☐ Click "Create Web Service"
```

---

## 🔍 After Deployment - What You'll See

### Success Signs ✅

1. **Status Page:**
   - Shows "Live" in green
   - No red error indicators

2. **Logs Tab:**
   ```
   ==> Running build command 'cd server && npm install'...
   added XX packages
   
   ==> Running start command 'cd server && npm start'...
   ✅ MongoDB connected successfully
   🚀 Server running on port 5000
   ```

3. **Health Check:**
   ```bash
   curl https://portfolio-backend-xxxxx.onrender.com/api/health
   ```
   
   Returns:
   ```json
   {
     "success": true,
     "message": "Backend is running",
     "timestamp": "2026-05-16T..."
   }
   ```

### Error Signs ❌

If you see these errors:
- `npm error Missing script: "build"` → Build command is wrong
- `MongoDB connection error` → MONGO_URI is wrong
- `Cannot find module` → Dependencies not installed
- `ECONNREFUSED` → Port not available

---

## 🚀 Quick Copy-Paste Reference

### Build Command (Exact):
```
cd server && npm install
```

### Start Command (Exact):
```
cd server && npm start
```

### Environment Variables (Exact):
```
MONGO_URI=mongodb+srv://raavanaasura87_db_user:Chani8877@chani.irvyksk.mongodb.net/portfolio?retryWrites=true&w=majority
NODE_ENV=production
PORT=5000
```

---

## ⚠️ Common Mistakes to Avoid

❌ **DO NOT:**
- Leave Build Command empty
- Use only `npm install` (must include `cd server &&`)
- Set Root Directory to `server` (leave empty)
- Skip environment variables

✅ **DO:**
- Use full path: `cd server && npm install`
- Use full path: `cd server && npm start`
- Add all 3 environment variables
- Copy MongoDB URI exactly as shown

---

## 📞 Still Having Issues?

1. **Delete the service** and start fresh
2. **Copy settings exactly** from this guide
3. **Check Render logs** for error messages
4. **Verify MongoDB Atlas** IP whitelist is set to `0.0.0.0/0`

---

**Status:** Ready to deploy ✅
