const express = require('express');
const rateLimit = require('express-rate-limit');
const {
  register,
  login,
  getMe,
  logout,
  updatePassword,
  updateProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const {
  registerValidation,
  loginValidation,
  updatePasswordValidation,
  updateProfileValidation,
} = require('../validators/adminValidator');

const router = express.Router();

// Login rate limiting: max 5 attempts per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Public routes
router.post('/register', registerValidation, validate, register);
router.post('/login', loginLimiter, loginValidation, validate, login);

// Protected routes
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.put('/update-password', protect, updatePasswordValidation, validate, updatePassword);
router.put('/update-profile', protect, updateProfileValidation, validate, updateProfile);

module.exports = router;