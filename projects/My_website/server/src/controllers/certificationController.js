const Certification = require('../models/Certification');

const getFileUrl = (file) => {
  if (!file) return null;
  if (file.path && /^https?:\/\//.test(file.path)) return file.path;
  return `/uploads/${file.filename}`;
};

const normalizeCertBody = (req) => {
  if (!req.body) req.body = {};
  if (req.files?.certificateImage?.[0]) req.body.certificateImage = getFileUrl(req.files.certificateImage[0]);
  if (req.files?.certificatePdf?.[0]) req.body.certificatePdf = getFileUrl(req.files.certificatePdf[0]);
  if (typeof req.body.skills === 'string') {
    req.body.skills = req.body.skills.split(',').map((s) => s.trim()).filter(Boolean);
  }
  ['isFeatured', 'isPublished'].forEach((key) => {
    if (typeof req.body[key] === 'string') req.body[key] = req.body[key] === 'true';
  });
};

// @desc    Get all certifications (public)
// @route   GET /api/certifications
// @access  Public
exports.getCertifications = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 50,
      category,
      featured,
      search,
      sort = '-createdAt',
    } = req.query;

    const query = { isPublished: true };

    if (category) {
      query.category = category;
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;
    const total = await Certification.countDocuments(query);

    const certifications = await Certification.find(query)
      .sort(sort)
      .skip(startIndex)
      .limit(limitNum);

    const pagination = {};
    if (startIndex > 0) {
      pagination.prev = { page: pageNum - 1, limit: limitNum };
    }
    if (endIndex < total) {
      pagination.next = { page: pageNum + 1, limit: limitNum };
    }

    res.status(200).json({
      success: true,
      count: certifications.length,
      total,
      pagination,
      data: certifications,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single certification (public)
// @route   GET /api/certifications/:id
// @access  Public
exports.getCertification = async (req, res, next) => {
  try {
    const certification = await Certification.findById(req.params.id);

    if (!certification || !certification.isPublished) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: certification,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create certification
// @route   POST /api/certifications
// @access  Private
exports.createCertification = async (req, res, next) => {
  try {
    normalizeCertBody(req);
    const certification = await Certification.create(req.body);

    res.status(201).json({
      success: true,
      data: certification,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update certification
// @route   PUT /api/certifications/:id
// @access  Private
exports.updateCertification = async (req, res, next) => {
  try {
    let certification = await Certification.findById(req.params.id);

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found.',
      });
    }

    normalizeCertBody(req);
    certification = await Certification.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: certification,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete certification
// @route   DELETE /api/certifications/:id
// @access  Private
exports.deleteCertification = async (req, res, next) => {
  try {
    const certification = await Certification.findById(req.params.id);

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found.',
      });
    }

    await certification.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Certification deleted successfully.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get certifications for admin
// @route   GET /api/certifications/admin
// @access  Private
exports.getCertificationsAdmin = async (req, res, next) => {
  try {
    const certifications = await Certification.find().sort({
      displayOrder: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: certifications.length,
      data: certifications,
    });
  } catch (error) {
    next(error);
  }
};