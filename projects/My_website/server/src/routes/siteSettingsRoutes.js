const express = require('express');
const {
  getSiteSettings,
  updateSiteSettings,
} = require('../controllers/siteSettingsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public
router.get('/', getSiteSettings);

// Admin
router.put('/', protect, updateSiteSettings);

module.exports = router;