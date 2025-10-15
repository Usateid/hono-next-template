# 🚀 Quick Start

Quick guide to get started in **20 minutes**.

## 📋 Prerequisites

- GitHub account
- [Bun](https://bun.sh) installed

---

## ⚡ Local Setup (5 minutes)

### 1. Clone and install dependencies

```bash
git clone <your-repo-url>
cd bun
bun install
cd web && bun install && cd ..
```

### 2. Start the local database

```bash
bun run db:up
```

### 3. Create the `.env` file

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/bun_dev
FRONTEND_URL=http://localhost:3000
```

### 4. Initialize the database

```bash
bun run db:push
```

### 5. Start the project

```bash
bun run dev:all
```

✅ Open http://localhost:3000 - everything works!

📚 **Details:** See [DATABASE_LOCAL.md](./DATABASE_LOCAL.md) for info about local database

---

## 🚀 Production Deploy (15 minutes)

### 1️⃣ Backend → Render

1. Go to [render.com](https://render.com) and sign in with GitHub
2. **New +** → **Web Service** → Connect this repo
3. Configuration:
   - **Runtime:** Docker (detected automatically)
   - **Plan:** Free
4. Add environment variable: `FRONTEND_URL` = `*`
5. **Create Web Service**
6. 📝 Save the URL: `https://your-backend.onrender.com`

### 2️⃣ Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. **New Project** → Import this repo
3. Important configuration:
   - **Root Directory:** `web` ⚠️
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = Backend URL (step 1.6)
5. **Deploy**
6. 📝 Save the URL: `https://your-app.vercel.app`

### 3️⃣ Connect Frontend and Backend

1. Return to **Render** → Environment
2. Update `FRONTEND_URL` with Vercel URL (step 2.6)

### 4️⃣ Database → Neon

1. Go to [neon.tech](https://neon.tech) and sign in with GitHub
2. **Create project** → Choose name and region
3. Copy the **Connection String** (use "Pooled")
4. On **Render** → Environment → Add:
   - `DATABASE_URL` = Neon connection string
5. On **Render** → Shell → Run:
   ```bash
   bun run db:push
   ```

---

## ✅ Done!

- **Backend:** https://your-backend.onrender.com
- **Frontend:** https://your-app.vercel.app

Every push to `main` → automatic deploy! 🎉

---

## 📚 Complete Documentation

- **[DEPLOY.md](./DEPLOY.md)** - Complete deploy guide and troubleshooting
- **[DATABASE_LOCAL.md](./DATABASE_LOCAL.md)** - Local database setup

---

## 🛠️ Useful Commands

```bash
# Local development
bun run dev:all          # Backend + Frontend
bun run dev              # Backend only
cd web && bun run dev    # Frontend only

# Database
bun run db:up            # Start PostgreSQL
bun run db:down          # Stop PostgreSQL
bun run db:push          # Create/update tables
bun run db:studio        # Database GUI (localhost:4983)
```
