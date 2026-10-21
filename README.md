# Ambika Yemul — Portfolio Repository

This repository hosts Ambika Yemul's personal portfolio projects.

## 🗂️ Projects

### My_website — Personal Portfolio Website (Full Stack)
**Location:** `projects/My_website/`

A production-ready, full-stack personal portfolio website built with **React + Vite + Tailwind CSS** on the frontend and **Express + MongoDB** on the backend. It includes a secure JWT-protected admin dashboard for managing profile, projects, certifications, skills, experience, education, and contact messages, plus contact-form email notifications and Cloudinary file uploads.

**Tech Stack**
- Frontend: React 18, Vite 5, Tailwind CSS, React Router DOM, React Hook Form, Axios, Lucide React, Framer Motion
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs, Cloudinary, Nodemailer

**Quick Setup**
```bash
cd projects/My_website

# Backend (Express + MongoDB)
cd server
cp .env.example .env        # fill in MONGODB_URI, JWT_SECRET, CLIENT_URL, etc.
npm install
npm run seed                # creates first admin + sample content
npm run dev                 # http://localhost:5000

# Frontend (React + Vite)  (open a new terminal)
cd ../client
cp .env.example .env        # set VITE_API_URL=http://localhost:5000/api
npm install
npm run dev                 # http://localhost:5173
```

Full documentation (features, API reference, environment variables, security, testing, deployment) is in `projects/My_website/README.md`.

**Admin login (after seeding):** `http://localhost:5173/login` — `admin@portfolio.com` / `Admin123!@#` (change immediately after first login).

> ⚠️ `.env` files, `node_modules`, logs, build outputs, and local uploads are excluded from this repository (see `.gitignore`). Configure your own `.env` from the provided `.env.example` files before running locally. No secrets or API keys are committed.
