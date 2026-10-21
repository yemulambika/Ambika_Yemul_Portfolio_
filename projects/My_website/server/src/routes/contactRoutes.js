const express = require('express');
const {
  submitContact,
  getContactMessages,
  getContactMessage,
  updateContactMessage,
  deleteContactMessage,
  getContactStats,
  contactRateLimiter,
} = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

const { validate } = require('../middleware/validate');
const { contactValidation } = require('../validators/contactValidator');

const router = express.Router();

// Public - with validation + rate limiting
router.post('/', contactRateLimiter, contactValidation, validate, submitContact);

// Admin
router.get('/admin', protect, getContactMessages);
router.get('/admin/stats', protect, getContactStats);
router.get('/admin/:id', protect, getContactMessage);
router.put('/admin/:id', protect, updateContactMessage);
router.delete('/admin/:id', protect, deleteContactMessage);

module.exports = router;