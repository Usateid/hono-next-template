# Bonobo - Monorepo Bun + Hono + Next.js

Full-stack project with:
- **Backend**: Hono + Bun
- **Frontend**: Next.js 15 + React 19

## 🚀 Quick Start

### Installation

```bash
# Install backend dependencies
bun install

# Install frontend dependencies
cd web && bun install
```

### Database Setup

**Option 1: Local Database (recommended for development)**
```bash
# Start PostgreSQL with Docker
bun run db:up

# Create .env with DATABASE_URL
cp env.example .env

# Push schema to database
bun run db:push
```

**Option 2: Neon (recommended for production)**

See [QUICK_START.md](./QUICK_START.md) for Neon setup.

📚 **Complete local database guide:** [DATABASE_LOCAL.md](./DATABASE_LOCAL.md)

### Local Development

```bash
# Backend + Frontend together
bun run dev:all

# Backend only (port 3000)
bun run dev

# Frontend only (port 5173)
cd web && bun run dev

# Drizzle Studio (database GUI)
bun run db:studio
```

### Build

```bash
# Build frontend for production
bun run build
```

## 📁 Project Structure

```
.
├── server/          # Hono Backend
│   ├── app.ts      # Main app
│   ├── routes/     # API routes
│   └── types/      # TypeScript types
├── web/            # Next.js Frontend
│   └── src/
│       ├── app/    # Next.js pages
│       └── lib/    # Utilities
├── index.ts        # Backend entry point
└── package.json    # Backend dependencies
```

## 🌐 Deploy

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions:
- Frontend on **Vercel**
- Backend on **Render**

## 🛠️ Tech Stack

- **Runtime**: [Bun](https://bun.com)
- **Backend**: [Hono](https://hono.dev)
- **Frontend**: [Next.js 15](https://nextjs.org) + [React 19](https://react.dev)
- **Database**: [PostgreSQL](https://postgresql.org) + [Drizzle ORM](https://orm.drizzle.team)
- **Styling**: Tailwind CSS

## 📚 Documentation

- [QUICK_START.md](./QUICK_START.md) - Quick deploy guide
- [DATABASE_LOCAL.md](./DATABASE_LOCAL.md) - Local database setup
- [DEPLOY.md](./DEPLOY.md) - Complete deployment guide
