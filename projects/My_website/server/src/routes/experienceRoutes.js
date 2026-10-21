const express = require('express');
const {
  getExperience,
  getExperienceItem,
  getExperienceAdmin,
  createExperience,
  updateExperience,
  deleteExperience,
} = require('../controllers/experienceController');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

const router = express.Router();

// Admin (must be declared before /:id)
router.get('/admin', protect, getExperienceAdmin);

// Public
router.get('/', getExperience);
router.get('/:id', getExperienceItem);

// Admin mutations
router.post('/', protect, upload.single('companyLogo'), createExperience);
router.put('/:id', protect, upload.single('companyLogo'), updateExperience);
router.delete('/:id', protect, deleteExperience);

module.exports = router;