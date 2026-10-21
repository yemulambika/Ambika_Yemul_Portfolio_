const Experience = require('../models/Experience');

const getFileUrl = (file) => {
  if (!file) return null;
  if (file.path && /^https?:\/\//.test(file.path)) return file.path;
  return `/uploads/${file.filename}`;
};

const parseLines = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    return value.split('\n').map((s) => s.trim()).filter(Boolean);
  }
  return value;
};

const normalizeExpBody = (req) => {
  if (!req.body) req.body = {};
  if (req.file) req.body.companyLogo = getFileUrl(req.file);
  ['responsibilities', 'achievements'].forEach((key) => {
    if (req.body[key] !== undefined) req.body[key] = parseLines(req.body[key]);
  });
  if (typeof req.body.technologies === 'string') {
    req.body.technologies = req.body.technologies.split(',').map((s) => s.trim()).filter(Boolean);
  }
  if (typeof req.body.isCurrent === 'string') req.body.isCurrent = req.body.isCurrent === 'true';
  if (typeof req.body.isPublished === 'string') req.body.isPublished = req.body.isPublished === 'true';
};

// @desc    Get all experience (public)
// @route   GET /api/experience
// @access  Public
exports.getExperience = async (req, res, next) => {
  try {
    const query = { isPublished: true };

    const experience = await Experience.find(query).sort({
      displayOrder: 1,
      startDate: -1,
    });

    res.status(200).json({
      success: true,
      count: experience.length,
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single experience (public)
// @route   GET /api/experience/:id
// @access  Public
exports.getExperienceItem = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience || !experience.isPublished) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create experience
// @route   POST /api/experience
// @access  Private
exports.createExperience = async (req, res, next) => {
  try {
    normalizeExpBody(req);
    const experience = await Experience.create(req.body);

    res.status(201).json({
      success: true,
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update experience
// @route   PUT /api/experience/:id
// @access  Private
exports.updateExperience = async (req, res, next) => {
  try {
    let experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found.',
      });
    }

    normalizeExpBody(req);
    experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete experience
// @route   DELETE /api/experience/:id
// @access  Private
exports.deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found.',
      });
    }

    await experience.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Experience deleted successfully.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get experience for admin
// @route   GET /api/experience/admin
// @access  Private
exports.getExperienceAdmin = async (req, res, next) => {
  try {
    const experience = await Experience.find().sort({
      displayOrder: 1,
      startDate: -1,
    });

    res.status(200).json({
      success: true,
      count: experience.length,
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};