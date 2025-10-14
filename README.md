# Bonobo - Monorepo Bun + Hono + Next.js

Progetto full-stack con:
- **Backend**: Hono + Bun
- **Frontend**: Next.js 15 + React 19

## 🚀 Quick Start

### Installazione

```bash
# Installa dipendenze backend
bun install

# Installa dipendenze frontend
cd web && bun install
```

### Sviluppo Locale

```bash
# Backend + Frontend insieme
bun run dev:all

# Solo Backend (porta 3000)
bun run dev

# Solo Frontend (porta 5173)
cd web && bun run dev
```

### Build

```bash
# Build frontend per produzione
bun run build
```

## 📁 Struttura Progetto

```
.
├── server/          # Backend Hono
│   ├── app.ts      # App principale
│   ├── routes/     # Route API
│   └── types/      # TypeScript types
├── web/            # Frontend Next.js
│   └── src/
│       ├── app/    # Pages Next.js
│       └── lib/    # Utilities
├── index.ts        # Entry point backend
└── package.json    # Dipendenze backend
```

## 🌐 Deploy

Vedi [DEPLOY.md](./DEPLOY.md) per istruzioni dettagliate sul deploy:
- Frontend su **Vercel**
- Backend su **Render**

## 🛠️ Tech Stack

- **Runtime**: [Bun](https://bun.com)
- **Backend**: [Hono](https://hono.dev)
- **Frontend**: [Next.js 15](https://nextjs.org) + [React 19](https://react.dev)
- **Styling**: Tailwind CSS
