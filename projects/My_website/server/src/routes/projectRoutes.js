const express = require('express');
const {
  getProjects,
  getProject,
  getProjectsAdmin,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { upload } = require('../middleware/upload');
const { createProjectValidation } = require('../validators/projectValidator');

const router = express.Router();

// Admin (declared before /:id so Express does not treat "admin" as an id)
router.get('/admin', protect, getProjectsAdmin);

// Public
router.get('/', getProjects);
router.get('/:id', getProject);

// Admin mutations
router.post('/', protect, upload.single('coverImage'), createProjectValidation, validate, createProject);
router.put('/:id', protect, upload.single('coverImage'), updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;