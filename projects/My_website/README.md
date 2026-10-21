# Ambika Yemul — Personal Portfolio Website (Full Stack)

A production-ready, full-stack personal portfolio website built with **React + Vite + Tailwind CSS** on the frontend and **Express + MongoDB** on the backend. It includes a secure JWT-protected admin dashboard for managing profile, projects, certifications, skills, experience, education, and contact messages, plus contact-form email notifications and Cloudinary file uploads.

## ✨ Features

- **Home** — hero section with branding and navigation
- **About** — profile, bio, skills, and social links
- **Projects** — project gallery with images, tech stack, GitHub/live-demo links
- **Certifications** — certificates with images/PDFs, organizations, issue dates
- **Skills** — categorized skill badges
- **Experience** — professional timeline
- **Education** — academic history
- **Resume** — downloadable resume PDF with download tracking
- **Contact** — validated contact form (rate-limited, email notification optional)
- **Admin Dashboard** — secure JWT login, CRUD for all content, message management
- **Protected Routes** — admin pages require authentication (httpOnly cookie)

## 🗂️ Repository Structure

```
fullstack-portfolio/
├── client/                  # React + Vite frontend (Vercel)
│   ├── src/                 # assets, components, context, hooks, pages, services, utils
│   ├── .env.example         # frontend env placeholders (do not commit .env)
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── vercel.json          # SPA rewrites for React Router
│   └── vite.config.js
├── server/                  # Express + MongoDB backend (Render)
│   ├── src/                 # config, controllers, middleware, models, routes, services, utils, validators
│   ├── .env.example         # backend env placeholders (do not commit .env)
│   ├── .gitignore
│   ├── package.json
│   ├── server.js            # app entry point (0.0.0.0, PORT, graceful shutdown)
│   └── tests/api.test.js    # integration tests (Node built-in runner)
├── render.yaml              # Render Blueprint (no real secrets)
├── .gitignore
└── README.md
```

## 🚀 Tech Stack

**Frontend:** React 18, Vite 5, Tailwind CSS, React Router DOM, React Hook Form, Axios (centralized API client with credentials), Lucide React, Framer Motion


## 🛠️ Local Setup

### Prerequisites
- Node.js 18+ (v20+ recommended)
- MongoDB Atlas account (free tier)
- (Optional) Cloudinary account for production file uploads
- (Optional) SMTP service for contact-form emails

### 1. Clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/fullstack-portfolio.git
cd fullstack-portfolio
```

### 2. Backend (Render)
```bash
cd server
cp .env.example .env   # fill in MONGODB_URI, JWT_SECRET, CLIENT_URL, etc.
npm install
npm run seed           # creates first admin + sample content
npm run dev            # http://localhost:5000
```

### 3. Frontend (Vercel)
```bash
cd client
cp .env.example .env   # set VITE_API_URL=http://localhost:5000/api
npm install
npm run dev            # http://localhost:5173
```

> Windows PowerShell: if `npm` is blocked by execution policy, run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once, or use `npm.cmd`.

### 4. Admin login
Visit `http://localhost:5173/login` and sign in with the seeded admin:
- Email: `admin@portfolio.com`
- Password: `Admin123!@#`

**Change this password immediately after first login.** The seed script recreates all data — never re-run it against production.

## 🌍 Deployment

### Frontend → Vercel

1. Push this repository to GitHub.
2. In Vercel, **Add New → Project** and import the `fullstack-portfolio` repo.
3. Set **Root Directory** to `client`. Framework preset: **Vite**.
4. Build command: `npm run build`; Output directory: `dist`; Install command: `npm install`.
5. Add environment variable `VITE_API_URL=https://YOUR-RENDER-BACKEND.onrender.com/api`.
6. Deploy. Vercel auto-deploys on every push to `main`.

`client/vercel.json` rewrites all SPA routes to `index.html` so refreshing pages never 404s.

### Backend → Render

1. In Render, **New → Web Service** and connect the same GitHub repo.
2. Root Directory: `server`. Runtime: **Node**. Build: `npm install`, Start: `npm start`.
3. Add environment variables (from `server/.env.example`, replace placeholders):
   - `NODE_ENV=production`, `PORT=10000`
   - `MONGODB_URI` (your MongoDB Atlas connection string)
   - `JWT_SECRET` (long random string — generate one, do not reuse dev value)
   - `CLIENT_URL=https://YOUR-PORTFOLIO.vercel.app`
   - `CLOUDINARY_*` (for production file uploads)
   - `EMAIL_*` (optional, for contact-form emails)
   - `ADMIN_EMAIL`
4. Deploy. Render auto-deploys on every push to `main`.

### MongoDB Atlas

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user with read/write access to the `portfolio` database.
3. Add the Render outbound IP addresses (or `0.0.0.0/0` for testing only) to **Network Access**.
4. Copy the connection string and set it as `MONGODB_URI` on Render.

### render.yaml
A Render Blueprint is included at the repo root (`render.yaml`). It declares the web service and environment variable keys (no real secrets). Use it to provision the service via the Render dashboard or CLI.

## 📚 API Documentation

Base path: `/api` (e.g. `https://your-backend.onrender.com/api`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/health` | Public | Health check (reports DB status) |
| POST | `/auth/register` | Public | Create first admin (disabled after one exists) |
| POST | `/auth/login` | Public | Admin login (rate-limited: 5/15min) |
| GET | `/auth/me` | Private | Current admin profile |
| POST | `/auth/logout` | Private | Clear session cookie |
| GET | `/profile` | Public | Public profile |
| POST | `/profile` | Private | Update profile (avatar/resume upload) |
| GET | `/projects` | Public | List projects (search, category, featured, page) |
| GET | `/projects/:id` | Public | Single project |
| POST/PUT/DELETE | `/projects` | Private | Project CRUD (coverImage upload) |
| GET | `/certifications` | Public | List certifications |
| POST/PUT/DELETE | `/certifications` | Private | Certification CRUD (image/PDF upload) |
| GET | `/skills` | Public | List skills |
| POST/PUT/DELETE | `/skills` | Private | Skill CRUD |
| GET | `/experience` | Public | List experience |
| POST/PUT/DELETE | `/experience` | Private | Experience CRUD |
| GET | `/education` | Public | List education |
| POST/PUT/DELETE | `/education` | Private | Education CRUD |
| POST | `/contact` | Public | Submit contact message (validated, rate-limited) |
| GET | `/contact/admin` | Private | List contact messages |
| GET | `/settings` | Public | Site settings |
| PUT | `/settings` | Private | Update site settings |

All private routes require a valid JWT in the `token` httpOnly cookie (sent automatically with `withCredentials: true`).

## 📚 Environment Variables

### Backend (`server/.env.example`) — set on Render

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |
| `PORT` | Port to listen on | `10000` |
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Long random secret for signing JWTs | `openssl rand -base64 32` |
| `JWT_EXPIRE` | JWT expiry | `7d` |
| `CLIENT_URL` | Allowed CORS origin (Vercel URL) | `https://your-portfolio.vercel.app` |
| `COOKIE_EXPIRE` | Cookie expiry in days | `7` |
| `CLOUDINARY_*` | Cloudinary credentials for file uploads | Cloudinary dashboard |
| `EMAIL_*` | SMTP credentials (optional) | your SMTP provider |
| `ADMIN_EMAIL` | Initial admin email | `you@example.com` |

### Frontend (`client/.env.example`) — set on Vercel

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `https://your-backend.onrender.com/api` |

> `VITE_` variables are embedded in the browser bundle — **never** put server secrets there.

## 🔐 Security

- Passwords hashed with bcrypt (salt 10)
- JWT signed with `JWT_SECRET`, expires after `JWT_EXPIRE`, stored in httpOnly cookie (`Secure`, `SameSite=None` in production)
- Login rate-limited (5 attempts per 15 minutes); general API rate-limited per IP
- Strict CORS allowlist from `CLIENT_URL` (credentials enabled)
- `helmet`, `xss-clean`, `express-mongo-sanitize` (NoSQL injection protection)
- Multer file validation (MIME type, extension, 5 MB max)
- Error responses never leak stack traces or config in production
- No default admin password; seed prints a warning to change credentials
- No public admin registration — first admin created via `/auth/register` only when none exists
- Frontend never persists JWT in browser storage (cookie-only auth)

## 🧪 Testing

```bash
cd server
npm test
```

Runs `tests/api.test.js` against `TEST_BASE_URL` (default `http://localhost:5000/api`) using Node's built-in test runner. Covers health, public projects, contact validation, and admin auth requirements.

## 📦 File Uploads & Storage

In production, uploads go to **Cloudinary** (`CLOUDINARY_*` env vars). If Cloudinary is absent, the server falls back to local disk under `server/src/uploads/` served at `/uploads` — suitable for development only (Render has an ephemeral filesystem).

Allowed types: `jpg`, `jpeg`, `png`, `webp`, `pdf`. Max size: 5 MB.

## 🔄 Continuous Deployment

Connect the GitHub repo to both Vercel (frontend, root `client`) and Render (backend, root `server`). Pushes to `main` trigger automatic deployments on both platforms. Preview deployments are available on Vercel for pull requests.

## 🧹 .gitignore

Commits exclude: `node_modules/`, `dist/`, `build/`, `.env`, `*.log`, `server/src/uploads/`, IDE files, OS files, and lock files. See `.gitignore` at the root and in `client/`/`server/`.

## 📄 License

MIT
