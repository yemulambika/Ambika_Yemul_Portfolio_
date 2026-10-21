const express = require('express');
const {
  getProfile,
  getProfileAdmin,
  createUpdateProfile,
  deleteProfile,
  trackResumeDownload,
} = require('../controllers/profileController');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

const router = express.Router();

// Public
router.get('/', getProfile);
router.post('/resume-download', trackResumeDownload);

// Admin (avatar + resume uploads)
router.get('/admin', protect, getProfileAdmin);
router.post(
  '/',
  protect,
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
  ]),
  createUpdateProfile
);
router.delete('/', protect, deleteProfile);

module.exports = router;