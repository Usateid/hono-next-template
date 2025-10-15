# 🚀 Deploy Guide - Complete Guide

Detailed guide for production deployment with troubleshooting.

> 💡 **To get started quickly:** See [QUICK_START.md](./QUICK_START.md)

**Deployment Stack:**
- **Frontend (Next.js)** → Vercel
- **Backend (Hono)** → Render
- **Database (PostgreSQL)** → Neon

---

## 📦 1. Deploy Backend on Render

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign in with GitHub

### Step 2: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select this repository

### Step 3: Configure the Service

Render will automatically detect the `Dockerfile`. Verify the settings:

| Setting | Value | Notes |
|---------|-------|-------|
| **Name** | `hono-backend` | Or any name you prefer |
| **Region** | Closest to you | E.g.: Frankfurt (Europe) |
| **Branch** | `main` | Production branch |
| **Build Command** | *(empty)* | Managed by Dockerfile |
| **Start Command** | `bun index.ts` | Startup command |
| **Plan** | `Free` | 750 hours/month free |

**⚠️ Important:** With the Free plan, the service goes to sleep after 15 minutes of inactivity. The first request after sleep will take ~30 seconds to restart.

### Step 4: Create Database with Neon

**Why Neon?**
- Serverless PostgreSQL (pay-per-use)
- Automatic scalability
- Optimized for Drizzle ORM
- Database branching (like Git!)
- Free Plan: 0.5 GB storage, 100 compute hours/month

**Procedure:**

1. Go to [neon.tech](https://neon.tech) and sign in with GitHub
2. Click **"Create a project"**
3. Configure the project:
   - **Name:** Project name (e.g.: `bonobo-prod`)
   - **Region:** Closest to your users (e.g.: Europe - Frankfurt)
   - **PostgreSQL Version:** 16 (default, recommended)
4. The project will be ready **instantly** ⚡
5. In the dashboard you'll find the **Connection String** already prepared
6. **Important:** Select **"Pooled connection"** for better performance
   - Pooled connections use PgBouncer to efficiently manage multiple connections
   - Essential for serverless environments like Render
7. Copy the complete connection string (already includes password and parameters)

### Step 5: Environment Variables

Return to Render to your Web Service and add the following environment variables in the **Environment** section:

| Variable | Value | Description |
|----------|-------|-------------|
| `PORT` | *(automatic)* | Render sets it automatically |
| `NODE_ENV` | `production` | Production environment |
| `DATABASE_URL` | Neon connection string | Use the "Pooled" version |
| `FRONTEND_URL` | `https://your-app.vercel.app` | Add after Vercel deploy |

**Connection string format:**
```
postgres://[user]:[password]@[endpoint]/[dbname]?sslmode=require
```

### Step 6: Deploy and Database Migration

1. Click **"Create Web Service"**
2. Render will build and deploy automatically
3. Take note of the generated URL (e.g.: `https://hono-backend.onrender.com`)
4. **Important:** After the first deploy, go to the **"Shell"** tab of the Web Service
5. Run the command to create the tables:
   ```bash
   bun run db:push
   ```
6. This will create all tables defined in the schema in the Neon database

**📝 Note:** Render's shell allows you to execute commands directly on the production server. Use `bun run db:studio` to view data if necessary.

---

## 🎨 2. Deploy Frontend on Vercel

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub

### Step 2: Import Project
1. Click **"Add New"** → **"Project"**
2. Import this repository from GitHub
3. Vercel will automatically detect it's a monorepo

### Step 3: Configure Build Settings

**⚠️ ESSENTIAL:** Set the Root Directory correctly!

| Setting | Value | Notes |
|---------|-------|-------|
| **Framework Preset** | `Next.js` | Detected automatically |
| **Root Directory** | `web` | ⚠️ **REQUIRED** for monorepo |
| **Build Command** | *(default)* | Uses `next build` |
| **Output Directory** | *(default)* | Next.js uses `.next` |
| **Install Command** | *(default)* | Automatically uses Bun if it finds `bun.lock` |

**💡 Why Root Directory is important:**
The project is structured as a monorepo:
```
/
├── server/          # Backend (Hono)
├── web/            # Frontend (Next.js) ← Deploy from here
│   ├── src/
│   ├── package.json
│   └── bun.lock
└── package.json
```

### Step 4: Environment Variables

Go to Vercel → Settings → Environment Variables and add:

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://hono-backend.onrender.com` | Backend URL from Render (Step 1.3) |

**⚠️ Important:** Variables starting with `NEXT_PUBLIC_` are exposed to the client. Don't put secrets there!

### Step 5: Deploy

1. Click **"Deploy"**
2. Vercel will build and deploy the frontend automatically
3. Take note of the URL (e.g.: `https://your-app.vercel.app`)

**Build time:** ~2-3 minutes for the first deploy

### Step 6: Update Render

1. Return to **Render** → Your Web Service → **Environment**
2. Update the `FRONTEND_URL` variable with the Vercel URL
3. The service will restart automatically to apply the changes

**💡 Why it's needed:** To correctly configure CORS and allow the frontend to communicate with the backend.

---

## ✅ 3. Verify Deploy

### Backend (Render)

Open in browser: `https://your-backend.onrender.com`

**Expected response:**
```json
{
  "message": "Backend API is running",
  "timestamp": "2025-10-15T10:30:00.000Z"
}
```

**Test API:**
```bash
# List teachers
curl https://your-backend.onrender.com/api/teachers

# Create teacher (test)
curl -X POST https://your-backend.onrender.com/api/teachers \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","subject":"Math"}'
```

### Frontend (Vercel)

Open in browser: `https://your-app.vercel.app`

You should see:
- Homepage of the Next.js site
- `/teachers` page with list of teachers

**Test integration:**
1. Go to `/teachers`
2. Verify it loads data from the backend
3. Open DevTools → Network to see the API calls

---

## 🔄 4. Automatic Deploys

Both services are configured for automatic deploys:

### Render (Backend)
- **Push to `main`** → Automatic backend deploy
- **Time:** ~3-5 minutes
- **Logs:** Visible in real-time in the dashboard

### Vercel (Frontend)
- **Push to `main`** → Automatic frontend deploy to production
- **Pull Request** → Preview deploy with unique URL
- **Time:** ~2-3 minutes
- **Preview URL:** Automatically commented in the PR

**💡 Best Practice:**
1. Create a branch for new features
2. Open a Pull Request
3. Test the Vercel preview deploy
4. Merge to `main` → automatic production deploy

---

## 🏗️ 5. Deploy Architecture

```
┌─────────────────┐
│   User          │
└────────┬────────┘
         │
         ▼
┌─────────────────┐       API Request       ┌──────────────────┐
│  Vercel         │ ───────────────────────▶│  Render          │
│  (Frontend)     │                         │  (Backend)       │
│  Next.js        │ ◀───────────────────────│  Hono + Bun      │
└─────────────────┘       JSON Response     └────────┬─────────┘
                                                     │
                                                     ▼
                                            ┌──────────────────┐
                                            │  Neon            │
                                            │  (PostgreSQL)    │
                                            └──────────────────┘
```

**Request flow:**
1. User visits `your-app.vercel.app`
2. Vercel serves the Next.js page (SSG or SSR)
3. Client makes API requests to `your-backend.onrender.com`
4. Hono processes the request and queries Neon
5. Neon returns data to the backend
6. Backend returns JSON to the frontend
7. Frontend displays data to the user

---

## 📝 6. Important Notes

### Security
- ⚠️ The backend is publicly accessible (add authentication if needed)
- CORS is configured to accept requests from the frontend
- `NEXT_PUBLIC_*` variables are visible in the browser
- Database connection string is **only** on the backend (secure)

### Performance
- **Render Free Tier:**
  - Backend goes to sleep after 15 minutes of inactivity
  - First request after sleep: ~30 seconds to restart
  - 750 hours/month uptime (≈ 24/7 with a single service)
  
- **Vercel Free Tier:**
  - Unlimited deploys
  - 100 GB bandwidth/month
  - Serverless Functions: 100 GB-hours/month
  - Perfect for personal projects

- **Neon Free Tier:**
  - 0.5 GB storage
  - 100 compute hours/month
  - Unlimited database branching
  - Automatic sleep after 5 minutes of inactivity

### SEO and Static Site Generation
- Next.js pre-renders pages → great for SEO
- Dynamic pages use ISR (Incremental Static Regeneration)
- Configure `revalidate` to update cache

---

## 🆘 Troubleshooting

### Build failed on Render
- Verify that `bun.lock` is committed in the repo
- Check the logs in the Render dashboard ("Logs" section)
- Verify that the `Dockerfile` is present in the project root

### Build failed on Vercel
- Verify that Root Directory is set to `web`
- Verify that `web/bun.lock` is committed
- Check that `NEXT_PUBLIC_API_URL` is a correct environment variable

### API not responding / Timeout
- **Render Free Tier:** The backend might be asleep. The first request takes ~30 seconds
- Verify that `NEXT_PUBLIC_API_URL` is set correctly on Vercel
- Check CORS in the backend (`server/app.ts`)
- Verify that the backend is online: open `https://your-backend.onrender.com` in the browser

### CORS Errors
- Update `FRONTEND_URL` on Render with the correct Vercel URL
- Verify that the frontend calls the correct URL (check the Network tab in the browser)

### Database Connection Error
If you receive database connection errors during deployment:
1. Verify that `DATABASE_URL` is set correctly in the environment variables on Render
2. Make sure to use the "Pooled" connection string from Neon (not the direct one)
3. The Neon connection string format is: `postgres://[user]:[password]@[endpoint]/[dbname]?sslmode=require`
4. Verify that there are no spaces at the beginning or end of the URL
5. Neon automatically generates secure passwords, no need to modify them
6. If the error persists, regenerate the password from the Neon dashboard

### Database Migration Failed
- Make sure to run `bun run db:push` from the Render Shell after the first deployment
- Verify that the database is active and reachable
- Check the logs for specific errors
