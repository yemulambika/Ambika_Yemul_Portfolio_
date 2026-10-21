const Education = require('../models/Education');

// @desc    Get all education (public)
// @route   GET /api/education
// @access  Public
exports.getEducation = async (req, res, next) => {
  try {
    const query = { isPublished: true };

    const education = await Education.find(query).sort({
      displayOrder: 1,
      startDate: -1,
    });

    res.status(200).json({
      success: true,
      count: education.length,
      data: education,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single education (public)
// @route   GET /api/education/:id
// @access  Public
exports.getEducationItem = async (req, res, next) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education || !education.isPublished) {
      return res.status(404).json({
        success: false,
        message: 'Education not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: education,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create education
// @route   POST /api/education
// @access  Private
exports.createEducation = async (req, res, next) => {
  try {
    const education = await Education.create(req.body);

    res.status(201).json({
      success: true,
      data: education,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update education
// @route   PUT /api/education/:id
// @access  Private
exports.updateEducation = async (req, res, next) => {
  try {
    let education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: 'Education not found.',
      });
    }

    education = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: education,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete education
// @route   DELETE /api/education/:id
// @access  Private
exports.deleteEducation = async (req, res, next) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: 'Education not found.',
      });
    }

    await education.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Education deleted successfully.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get education for admin
// @route   GET /api/education/admin
// @access  Private
exports.getEducationAdmin = async (req, res, next) => {
  try {
    const education = await Education.find().sort({
      displayOrder: 1,
      startDate: -1,
    });

    res.status(200).json({
      success: true,
      count: education.length,
      data: education,
    });
  } catch (error) {
    next(error);
  }
};