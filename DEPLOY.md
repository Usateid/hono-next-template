# 🚀 Deploy Guide

Questo progetto è configurato per essere deployato con:
- **Frontend (Next.js)** → Vercel
- **Backend (Hono)** → Render

---

## 📦 1. Deploy Backend su Render

### Step 1: Crea account su Render
1. Vai su [render.com](https://render.com)
2. Fai login con GitHub

### Step 2: Crea nuovo Web Service
1. Click su **"New +"** → **"Web Service"**
2. Connetti il tuo repository GitHub
3. Seleziona questo repository

### Step 3: Configura il servizio
Render rileverà automaticamente il Dockerfile. Verifica le impostazioni:

**Name:** `bonobo-backend` (o il nome che preferisci)

**Region:** Scegli la più vicina ai tuoi utenti

**Branch:** `main`

**Build Command:** `bun install` (automatico dal Dockerfile)

**Start Command:** `bun run start` (automatico dal Dockerfile)

**Plan:** `Free`

### Step 4: Variabili d'ambiente
Aggiungi le seguenti variabili d'ambiente:
- `PORT` → (automatico, Render lo setta)
- `FRONTEND_URL` → `https://tuo-app.vercel.app` (aggiungi dopo il deploy Vercel)

### Step 5: Deploy
- Click su **"Create Web Service"**
- Render builderà e deployerà automaticamente
- Prendi nota dell'URL generato (tipo: `https://bonobo-backend.onrender.com`)

---

## 🎨 2. Deploy Frontend su Vercel

### Step 1: Crea account su Vercel
1. Vai su [vercel.com](https://vercel.com)
2. Fai login con GitHub

### Step 2: Importa progetto
1. Click su **"Add New"** → **"Project"**
2. Importa questo repository da GitHub
3. Vercel rileverà un monorepo

### Step 3: Configura Build Settings
Nelle impostazioni del progetto:

**Framework Preset:** `Next.js`

**Root Directory:** `web` (IMPORTANTE!)

**Build Command:** `bun run build` (o lascia vuoto per usare quello di default)

**Output Directory:** `dist`

**Install Command:** `bun install`

### Step 4: Variabili d'Ambiente
Aggiungi in Vercel → Settings → Environment Variables:

```bash
NEXT_PUBLIC_API_URL=https://bonobo-backend.onrender.com
```

Sostituisci con l'URL del tuo backend Render (dallo step 1.5)

### Step 5: Deploy
- Click su **"Deploy"**
- Vercel builderà e deployerà il frontend
- Prendi nota dell'URL (tipo: `https://tuo-app.vercel.app`)

### Step 6: Aggiorna Render
Torna su Render e aggiorna la variabile `FRONTEND_URL` con l'URL di Vercel

---

## ✅ 3. Verifica Deploy

### Backend (Railway)
Apri nel browser: `https://tuo-backend.up.railway.app`

Dovresti vedere:
```json
{
  "message": "Backend API is running",
  "timestamp": "..."
}
```

### Frontend (Vercel)
Apri nel browser: `https://tuo-app.vercel.app`

Dovresti vedere il sito Next.js funzionante

---

## 🔄 4. Deploy Automatici

Entrambi i servizi sono configurati per deploy automatici:

- **Push su `main`** → Deploy automatico di entrambi
- **Pull Request** → Preview deploy su Vercel

---

## 🛠️ 5. Sviluppo Locale

```bash
# Backend + Frontend insieme
bun run dev:all

# Solo Backend (porta 3000)
bun run dev

# Solo Frontend (porta 5173)
cd web && bun run dev
```

---

## 📝 Note

- Il backend sarà pubblicamente accessibile (aggiungi auth se necessario)
- Il frontend è statico (pre-renderizzato)
- CORS è configurato per accettare richieste dal frontend
- **Render Free Tier:** Il backend entra in sleep dopo 15 minuti di inattività. La prima richiesta dopo lo sleep richiederà ~30 secondi per riavviarsi
- **Vercel Free Tier:** Deploy illimitati, bandwidth generoso per progetti personali

---

## 🆘 Troubleshooting

### Build fallito su Render
- Verifica che `bun.lock` sia committato nel repo
- Controlla i log nel dashboard Render (sezione "Logs")
- Verifica che il `Dockerfile` sia presente nella root del progetto

### Build fallito su Vercel
- Verifica che Root Directory sia impostato a `web`
- Verifica che `web/bun.lock` sia committato
- Controlla che `NEXT_PUBLIC_API_URL` sia una variabile d'ambiente corretta

### API non risponde / Timeout
- **Render Free Tier:** Il backend potrebbe essere in sleep. La prima richiesta richiede ~30 secondi
- Verifica che `NEXT_PUBLIC_API_URL` sia settato correttamente su Vercel
- Controlla i CORS nel backend (`server/app.ts`)
- Verifica che il backend sia online: apri `https://tuo-backend.onrender.com` nel browser

### CORS Errors
- Aggiorna `FRONTEND_URL` su Render con l'URL corretto di Vercel
- Verifica che il frontend chiami l'URL corretto (controlla la Network tab nel browser)

