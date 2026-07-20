# SS Bal Sadan School — Project Changes Log

> Yeh file saare changes ka permanent record hai.
> Naye session mein bhi isko dekh ke poora context mil jaayega — kya kiya gaya, kyun kiya, aur aage kya karna hai.

---

## Project Overview

| Item | Detail |
|------|--------|
| **School** | SS Bal Sadan School, Siwan, Kaithal, Haryana |
| **Frontend** | `artifacts/school-website/` — React + Vite + TypeScript |
| **Backend** | `artifacts/api-server/` — Express v5 + TypeScript (esbuild bundle) |
| **Frontend URL (Replit)** | Replit preview via proxy |
| **Backend URL (Replit)** | `localhost:8080` (PORT env se) |
| **Target Deployment** | Frontend → Vercel, Backend → Render |

---

## Change 1 — Project Setup & Dependencies

**Kab:** Session 1  
**Kya kiya:**
- GitHub se import ke baad `pnpm install` run kiya (node_modules missing the).
- Frontend workflow (`artifacts/school-website: web`) aur Backend workflow (`artifacts/api-server: API Server`) dono configure karke start kiye.

---

## Change 2 — Email (Brevo Integration)

**Files changed:**
- `artifacts/api-server/src/routes/contact.ts`
- `artifacts/api-server/src/routes/admission.ts`

**Kya kiya:**
- Contact form aur Admission form dono mein Brevo HTTP API se email bhejne ka code already tha — sirf env vars missing the.
- `BREVO_API_KEY` aur `SCHOOL_EMAIL=mahakgoyat01@gmail.com` Replit secrets/env mein set kiye.
- Ab dono forms submit hone pe Gmail address pe email aata hai.

**Env vars needed:**
```
BREVO_API_KEY=<Brevo dashboard se>
SCHOOL_EMAIL=mahakgoyat01@gmail.com
```

> **Note:** Gmail SMTP Replit pe kaam nahi karta (Google GCP IPs block karta hai). Isliye Brevo HTTP API use ki. Dobara SMTP pe mat jaana.

---

## Change 3 — Chatbot (Groq AI)

**Files changed:**
- `artifacts/api-server/src/routes/chat.ts`

**Kya kiya:**
- Groq `llama-3.3-70b-versatile` model se chatbot power hota hai.
- Hindi aur English dono mein kaam karta hai.
- System prompt mein school ki poori info hai.
- `GROQ_API_KEY` Replit secret mein set kiya.

**Env vars needed:**
```
GROQ_API_KEY=<Groq dashboard se>
```

---

## Change 4 — Voice/TTS (Cartesia)

**Files changed:**
- `artifacts/api-server/src/routes/tts.ts`

**Kya kiya:**

1. **Model fix:** `sonic-2` aur `sonic-multilingual` sunsetted ho gaye the → `sonic-turbo` pe switch kiya.
2. **API version fix:** Header `Cartesia-Version: 2025-04-16` add kiya.
3. **Language auto-detection:** Text mein Devanagari Unicode characters hain toh `language: "hi"`, warna `"en"`.
4. **Pronunciation fix:** `fixPronunciation()` function add kiya:
   - Hindi mein: `"SS Bal Sadan School"` → `"एस एस बाल सदन स्कूल"`
   - English mein: `"Sadan"` → `"Sudun"` (warna "Sadhan" bol deta tha)

**Env vars needed:**
```
CARTESIA_API_KEY=<Cartesia dashboard se>
```

---

## Change 5 — Frontend + Backend Separation (Vercel + Render Ready)

**Kab:** Session 2 — Deployment preparation

### 5a — Frontend API URLs (hardcoded → env var based)

**Files changed:**
- `artifacts/school-website/src/lib/api.ts` ← **NAYA FILE**
- `artifacts/school-website/src/components/Chatbot.tsx`
- `artifacts/school-website/src/pages/Admissions.tsx`
- `artifacts/school-website/src/pages/Contact.tsx`

**Kya kiya:**
- Naya helper file banaya: `src/lib/api.ts`
  ```ts
  export const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? "";
  ```
- Teeno files mein `/api/...` → `` `${API_BASE}/api/...` `` kiya.
- Local dev mein `VITE_API_URL` empty → Vite proxy handle karta hai.
- Vercel pe `VITE_API_URL=https://your-backend.onrender.com` set karna hai.

### 5b — Vercel config

**Files changed:**
- `artifacts/school-website/vercel.json` ← **NAYA FILE**
- `artifacts/school-website/.env.example` ← **NAYA FILE**

**`vercel.json` content:**
```json
{
  "outputDirectory": "dist/public",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
- `outputDirectory: "dist/public"` — Vite ka build output yahi hai.
- `rewrites` — React SPA ke liye (sab routes `/index.html` pe jate hain).

**Vercel dashboard settings:**
- Root Directory: `artifacts/school-website`
- Build Command: `pnpm run build` (auto-detect bhi ho sakta hai)
- Environment Variable: `VITE_API_URL=https://aapka-backend.onrender.com`

### 5c — Backend workspace dependency hatayi

**Files changed:**
- `artifacts/api-server/src/routes/health.ts`
- `artifacts/api-server/package.json`

**Kya kiya:**
- `health.ts` mein `@workspace/api-zod` se `HealthCheckResponse` import hoti thi → directly `zod` use karke inline kar diya.
- `package.json` se `@workspace/api-zod` aur `@workspace/db` remove kiye — backend ab fully standalone hai, monorepo pe depend nahi karta.
- `zod: ^3.25.76` direct dependency mein add kiya.

### 5d — CORS (env var based)

**Files changed:**
- `artifacts/api-server/src/app.ts`

**Kya kiya:**
```ts
const frontendUrl = process.env["FRONTEND_URL"];
app.use(cors(frontendUrl ? { origin: frontendUrl } : {}));
```
- `FRONTEND_URL` set hai → sirf usi origin ko allow karo.
- Unset (dev) → sab allow.

### 5e — Render config

**Files changed:**
- `artifacts/api-server/render.yaml` ← **NAYA FILE**
- `artifacts/api-server/.env.example` ← **NAYA FILE**

**Render dashboard settings:**
- Root Directory: `artifacts/api-server`
- Build Command: `npm install -g pnpm && pnpm install && pnpm run build`
- Start Command: `node --enable-source-maps ./dist/index.mjs`

---

## Change 6 — Health Check Route + EADDRINUSE Bug Fix

**Kab:** Session 3

### 6a — Bug fix: EADDRINUSE port 8080

**Kya hua:** API server FAILED tha kyunki ek purana zombie Node.js process (PID 423) port 8080 pakde baitha tha. Naya server start hi nahi ho pa raha tha.  
**Fix:** Stale process kill kiya → server clean start hone laga.

### 6b — `/api/health` route add kiya

**Files changed:**
- `artifacts/api-server/src/routes/health.ts`

**Kya kiya:**
```ts
// Primary health check — Render deployment verify karne ke liye
router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Purana alias — backward compatibility ke liye rakha
router.get("/healthz", (_req, res) => {
  res.json({ status: "ok" });
});
```
- `GET /api/health` — naya (Render aur aap verify karne ke liye use karo)
- `GET /api/healthz` — purana, waise ka waisa

### 6c — CORS env var rename

**Files changed:**
- `artifacts/api-server/src/app.ts`
- `artifacts/api-server/render.yaml`
- `artifacts/api-server/.env.example`

**Kya kiya:** `CORS_ORIGIN` → **`FRONTEND_URL`** rename kiya (teeno files mein sync).

---

## Change 7 — Security: .env untracked, .gitignore strengthen

**Kab:** Session 3 — GitHub push se pehle

**Files changed:**
- `.gitignore`

**Kya kiya:**
- `artifacts/api-server/.env` git se untrack kiya (`git rm --cached`) — file disk pe hai, repo mein nahi.
- `.gitignore` mein yeh patterns add kiye:
  ```
  .env
  .env.*.local
  artifacts/**/.env
  artifacts/**/.env.local
  ```

---

## Deployment Checklist

### Backend → Render (pehle deploy karo)

- [ ] GitHub repo connect karo
- [ ] Root Directory: `artifacts/api-server`
- [ ] Build Command: `npm install -g pnpm && pnpm install && pnpm run build`
- [ ] Start Command: `node --enable-source-maps ./dist/index.mjs`
- [ ] Environment Variables set karo (table below)
- [ ] Deploy ke baad `https://your-backend.onrender.com/api/health` kholo → `{"status":"ok"}` aana chahiye

### Frontend → Vercel (baad mein deploy karo)

- [ ] GitHub repo connect karo
- [ ] Root Directory: `artifacts/school-website`
- [ ] Build Command: `pnpm run build`
- [ ] Output Directory: `dist/public`
- [ ] Environment Variable: `VITE_API_URL=https://your-backend.onrender.com`
- [ ] Deploy ke baad website kholo aur chatbot/contact/admission test karo

### CORS final step

- [ ] Vercel deploy hone ke baad Render pe jaao → `FRONTEND_URL=https://your-app.vercel.app` set karo

---

## Required Environment Variables — Complete List

### Backend (Render pe set karna hai)

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | ✅ | `production` |
| `FRONTEND_URL` | ✅ | Vercel URL, e.g. `https://your-app.vercel.app` — CORS ke liye |
| `BREVO_API_KEY` | ✅ | Brevo dashboard se — email bhejne ke liye |
| `SCHOOL_EMAIL` | ✅ | `mahakgoyat01@gmail.com` — forms ka email yahan aata hai |
| `GROQ_API_KEY` | ✅ | Groq dashboard se — chatbot ke liye |
| `CARTESIA_API_KEY` | ✅ | Cartesia dashboard se — voice/TTS ke liye |
| `SESSION_SECRET` | ✅ | Koi bhi random 32+ character string |
| `PORT` | ❌ | Render khud set karta hai, aapko nahi lagana |

### Frontend (Vercel pe set karna hai)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | ✅ | Render backend URL, e.g. `https://your-backend.onrender.com` |

> **Database:** Is project mein koi SQL/Postgres database nahi hai — koi `DATABASE_URL` nahi chahiye.

---

## Important Notes (Agle Session Ke Liye)

1. **Gmail SMTP Replit pe kaam nahi karta** — Google GCP IPs block karta hai. Hamesha Brevo HTTP API use karo.
2. **Cartesia model** `sonic-turbo` hai, API version `2025-04-16` — purane model names (`sonic-2`, `sonic-multilingual`) sunset ho gaye hain.
3. **"Sadan" pronunciation** — English mein `fixPronunciation()` `"Sadan"` → `"Sudun"` karta hai (`tts.ts` mein).
4. **Build output** `dist/public` hai (Vite config mein `dist/public` set hai) — Vercel ke `vercel.json` mein `outputDirectory: "dist/public"` lagaya hai.
5. **Backend standalone hai** — `@workspace/api-zod` aur `@workspace/db` hata diye gaye hain. Sirf `artifacts/api-server/` folder chahiye deploy karne ke liye.
6. **`EADDRINUSE` error** agar dobara aaye — `lsof -i :8080` se PID dekho aur `kill -9 <PID>` karo, phir workflow restart karo.
7. **`artifacts/api-server/.env`** — git mein tracked nahi hai (`.gitignore` mein hai). Disk pe rehti hai, push nahi hoti.
