const express = require('express');
const {
  getEducation,
  getEducationItem,
  getEducationAdmin,
  createEducation,
  updateEducation,
  deleteEducation,
} = require('../controllers/educationController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Admin (must be declared before /:id)
router.get('/admin', protect, getEducationAdmin);

// Public
router.get('/', getEducation);
router.get('/:id', getEducationItem);

// Admin mutations
router.post('/', protect, createEducation);
router.put('/:id', protect, updateEducation);
router.delete('/:id', protect, deleteEducation);

module.exports = router;