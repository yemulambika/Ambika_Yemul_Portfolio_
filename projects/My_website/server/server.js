require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const certificationRoutes = require('./src/routes/certificationRoutes');
const skillRoutes = require('./src/routes/skillRoutes');
const experienceRoutes = require('./src/routes/experienceRoutes');
const educationRoutes = require('./src/routes/educationRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const siteSettingsRoutes = require('./src/routes/siteSettingsRoutes');

// Import error middleware
const errorHandler = require('./src/middleware/error');

const app = express();
const IS_PROD = process.env.NODE_ENV === 'production';

// Trust proxy (Render sits behind a proxy — needed for real client IPs / HTTPS)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(xss());
app.use(mongoSanitize());

// CORS — strict allowlist from CLIENT_URL (comma-separated for multiple domains,
// e.g. "https://my-portfolio.vercel.app,https://www.mydomain.com")
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

if (IS_PROD && allowedOrigins.every((o) => o.startsWith('http://localhost'))) {
  console.warn('⚠ CLIENT_URL points at localhost in production — cross-origin requests from your Vercel site will be blocked.');
}

app.use(
  cors({
    origin(origin, callback) {
      // Requests without an Origin header (curl, uptime monitors, server-to-server) are allowed;
      // browser requests must come from an explicitly allowed origin.
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(null, false);
    },
    credentials: true,
  })
);

// Rate limiting (health endpoint excluded so uptime monitors never get blocked)
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use((req, res, next) => (req.path === '/api/health' ? next() : limiter(req, res, next)));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Serve uploaded files (local fallback storage)
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/settings', siteSettingsRoutes);

// Health check (exposed for Render uptime monitoring; reports DB status)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// Global error handler
app.use(errorHandler);

// ---------------------------------------------------------------------------
// Startup — resilient MongoDB connection + graceful shutdown (Render sends SIGTERM)
// ---------------------------------------------------------------------------
const PORT = process.env.PORT || 5000;

if (!process.env.MONGODB_URI) {
  if (IS_PROD) {
    console.error('FATAL: MONGODB_URI is not set. Configure it in the Render dashboard (see render.yaml / docs/DEPLOYMENT.md).');
    process.exit(1);
  }
  console.warn('⚠ MONGODB_URI is not set — database-backed routes will fail. Add it to server/.env.');
}

const connectWithRetry = async (retries) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
      });
      console.log('✓ MongoDB connected successfully');
      return true;
    } catch (err) {
      console.error(`✗ MongoDB connection attempt ${attempt}/${retries} failed: ${err.message}`);
      if (attempt < retries) await new Promise((resolve) => setTimeout(resolve, attempt * 5000));
    }
  }
  return false;
};

mongoose.connection.on('disconnected', () => {
  console.error('⚠ MongoDB disconnected — attempting to continue; /api/health will report db status.');
});
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB error: ${err.message}`);
});

const startServer = async () => {
  const connected = await connectWithRetry(IS_PROD ? 5 : 1);
  if (!connected) {
    console.error('⚠ Starting HTTP server without a database connection. Public pages will show empty content until MongoDB is reachable.');
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✓ Server listening on 0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });

  let shuttingDown = false;
  const shutdown = (signal) => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log(`${signal} received — shutting down gracefully...`);
    server.close(() => {
      mongoose.connection
        .close()
        .catch(() => {})
        .finally(() => process.exit(0));
    });
    // Force exit if connections refuse to close
    setTimeout(() => process.exit(0), 10000).unref();
  };
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};

startServer();

// Handle unhandled promise rejections — log, and exit in production so the
// process manager (Render) restarts a potentially corrupted process.
process.on('unhandledRejection', (err) => {
  console.error('Unhandled promise rejection:', err && err.message ? err.message : err);
  if (IS_PROD) process.exit(1);
});