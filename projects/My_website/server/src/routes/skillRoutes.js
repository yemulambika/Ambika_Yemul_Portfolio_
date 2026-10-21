const express = require('express');
const {
  getSkills,
  getSkill,
  getSkillsAdmin,
  createSkill,
  updateSkill,
  deleteSkill,
} = require('../controllers/skillController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Admin (must be declared before /:id)
router.get('/admin', protect, getSkillsAdmin);

// Public
router.get('/', getSkills);
router.get('/:id', getSkill);

// Admin mutations
router.post('/', protect, createSkill);
router.put('/:id', protect, updateSkill);
router.delete('/:id', protect, deleteSkill);

module.exports = router;