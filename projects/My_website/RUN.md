# How to run this project

## Current status: RUNNING ✅
- **Frontend (Vite):** http://localhost:5173 — HTTP 200
- **Backend (Express):** http://localhost:5000 — connected to MongoDB Atlas
- **Database:** MongoDB Atlas (URI in `server/.env`)
- **Admin login:** http://localhost:5173/login → `admin@portfolio.com` / `Admin123!@#` (change after first login)

## ⚠️ Important: Rollup WASM override (do not remove)
This machine has a **Windows Application Control (WDAC) policy that blocks native `.node` binaries**. Vite's default Rollup native binding (`rollup.win32-x64-msvc.node`) is blocked, which crashes `vite dev` / `vite build`.

The fix is already applied in `client/package.json`:
```json
"overrides": { "rollup": "npm:@rollup/wasm-node@^4" }
```
This forces the WebAssembly Rollup build (no native binary). **Keep this override.** If you ever wipe `node_modules`, just re-run `npm install` in `client/` — the override persists via `package.json`.

## Run it
### VS Code tasks (Ctrl+Shift+P → "Tasks: Run Task")
- `▶ Run Full Stack (backend + frontend)` — starts both
- `▶ Run Backend (:5000)` / `▶ Run Frontend (:5173)` — individually
- `🌱 Seed Database` — re-seed admin + sample content
- `📦 Install All Dependencies`

### Double-click scripts (no VS Code)
- `start-backend.bat` · `start-frontend.bat` · `seed-db.bat` · `check-servers.bat`

### Manual
```
# Backend (needs MongoDB URI in server/.env)
cd server && npm install && node server.js

# Frontend
cd client && npm install && npm run dev
```

## Verify it works
```
node verify.js
```
Expected output: Frontend HTTP 200, Backend health HTTP 200, Projects HTTP 200 (2 projects), Admin login HTTP 200 (JWT issued).

## Notes
- Backend exits if MongoDB is unreachable — keep `server/.env` `MONGODB_URI` valid.
- Cloudinary/SMTP are optional; uploads fall back to local disk, emails are skipped when unset.
- Deployment configs: `client/vercel.json`, root `render.yaml`.

