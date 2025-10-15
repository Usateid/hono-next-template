# 🗄️ Local Database - Setup Guide

Instead of using Neon, you can set up a local PostgreSQL database for development.

## 🐳 Option 1: PostgreSQL with Docker (Recommended)

### Prerequisites
- Docker installed ([Download here](https://www.docker.com/products/docker-desktop))

### Setup

1. **Start the database:**
   ```bash
   bun run db:up
   ```
   
   This command starts a PostgreSQL container with:
   - User: `postgres`
   - Password: `postgres`
   - Database: `bun_dev`
   - Port: `5432`

2. **Configure environment variables:**
   
   Create a `.env` file in the project root:
   ```bash
   cp env.example .env
   ```
   
   The `.env` file should contain:
   ```env
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/bun_dev
   FRONTEND_URL=http://localhost:3000
   ```

3. **Create database tables:**
   ```bash
   # Push schema to database
   bun run db:push
   ```

4. **Verify it works:**
   ```bash
   # Open Drizzle Studio to view the database
   bun run db:studio
   ```
   
   Go to http://localhost:4983 - you should see the `teachers` table

### Useful Commands

```bash
# Start the database
bun run db:up

# Stop the database (keeps data)
bun run db:down

# Stop and remove everything (deletes data)
docker-compose down -v

# View database logs
docker-compose logs -f postgres

# Open a PostgreSQL shell
docker exec -it bun-postgres psql -U postgres -d bun_dev
```

---

## 💻 Option 2: PostgreSQL Installed Locally

### Setup (macOS with Homebrew)

1. **Install PostgreSQL:**
   ```bash
   brew install postgresql@16
   brew services start postgresql@16
   ```

2. **Create the database:**
   ```bash
   createdb bun_dev
   ```

3. **Configure `.env`:**
   ```env
   DATABASE_URL=postgresql://localhost:5432/bun_dev
   FRONTEND_URL=http://localhost:3000
   ```

4. **Create tables:**
   ```bash
   bun run db:push
   ```

### Setup (Linux)

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start the service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database
sudo -u postgres createdb bun_dev
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
```

Then follow the same process for `.env` and `bun run db:push`.

---

## 🔄 Development Workflow

### Complete startup

```bash
# 1. Start the database (if using Docker)
bun run db:up

# 2. Start backend + frontend
bun run dev:all

# 3. (Optional) Open Drizzle Studio in another terminal
bun run db:studio
```

### Schema modifications

When modifying `server/db/schema.ts`:

```bash
# Push changes directly (dev)
bun run db:push

# OR generate migrations (production)
bun run db:generate
bun run db:migrate
```

---

## 🆚 Local Database vs Neon

| Feature | Local (Docker) | Neon |
|---------|----------------|------|
| **Speed** | ⚡ Very fast | 🚀 Very fast (serverless) |
| **Cost** | 💰 Free | 💰 Free (500MB storage, 10 branches) |
| **Setup** | 🔧 Requires Docker | ☁️ 30-second setup |
| **Offline** | ✅ Works offline | ❌ Requires internet |
| **Persistence** | 💾 Local | ☁️ Cloud |
| **Backup** | 🔴 Manual | ✅ Automatic (point-in-time recovery) |
| **Sharing** | ❌ Local only | ✅ Team access |
| **Branching** | ❌ No | ✅ Database branches (like Git!) |
| **Recommended use** | 🧪 Development | 🚀 Production/Staging |

---

## 🎯 Recommendation

**For local development:** Use PostgreSQL with Docker (faster, no latency)
**For production/staging:** Use Neon (serverless, auto-scaling, database branching)

You can easily switch between them by just changing the `DATABASE_URL` variable in the `.env` file!

---

## 🐛 Troubleshooting

### "Error: connect ECONNREFUSED 127.0.0.1:5432"

The database is not started. Run:
```bash
bun run db:up
```

### "Port 5432 is already allocated"

You already have a PostgreSQL running on port 5432. Options:
1. Stop the other PostgreSQL: `brew services stop postgresql@16`
2. Change port in `docker-compose.yml`: `"5433:5432"`
   And update `.env`: `postgresql://postgres:postgres@localhost:5433/bun_dev`

### View data in the database

```bash
# With Docker
docker exec -it bun-postgres psql -U postgres -d bun_dev

# Example query
SELECT * FROM teachers;
```

Or use Drizzle Studio:
```bash
bun run db:studio
```
