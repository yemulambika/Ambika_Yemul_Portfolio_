const express = require('express');
const {
  getCertifications,
  getCertification,
  getCertificationsAdmin,
  createCertification,
  updateCertification,
  deleteCertification,
} = require('../controllers/certificationController');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

const router = express.Router();

// Admin (must be declared before /:id)
router.get('/admin', protect, getCertificationsAdmin);

// Public
router.get('/', getCertifications);
router.get('/:id', getCertification);

// Admin mutations
router.post(
  '/',
  protect,
  upload.fields([
    { name: 'certificateImage', maxCount: 1 },
    { name: 'certificatePdf', maxCount: 1 },
  ]),
  createCertification
);
router.put(
  '/:id',
  protect,
  upload.fields([
    { name: 'certificateImage', maxCount: 1 },
    { name: 'certificatePdf', maxCount: 1 },
  ]),
  updateCertification
);
router.delete('/:id', protect, deleteCertification);

module.exports = router;