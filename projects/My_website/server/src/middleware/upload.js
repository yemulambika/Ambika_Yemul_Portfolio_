const multer = require('multer');
const path = require('path');
const fs = require('fs');

const hasCloudinary =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

let storage;
let cloudinary = null;

if (hasCloudinary) {
  const { CloudinaryStorage } = require('multer-storage-cloudinary');
  cloudinary = require('cloudinary').v2;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
      folder: 'portfolio',
      allowed_formats: ['jpg', 'jpeg', 'png', 'pdf', 'webp'],
      public_id: `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, '')}`,
      resource_type: file.mimetype.includes('pdf') ? 'raw' : 'image',
    }),
  });
} else {
  // Local disk fallback (served from /uploads by server.js)
  const uploadDir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    },
  });
}

// File filter - allow images and PDFs
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|pdf/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Only images (jpg, jpeg, png, webp) and PDF files are allowed.'), false);
  }
};

// Configure upload limits
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: fileFilter,
});

// Reject uploads when no storage provider is configured in production
const assertUploadStorage = (req, res, next) => {
  if (!cloudinary && !storage) {
    return res.status(503).json({
      success: false,
      message: 'File uploads are not configured. Set Cloudinary environment variables.',
    });
  }
  next();
};

module.exports = { upload, cloudinary, assertUploadStorage };