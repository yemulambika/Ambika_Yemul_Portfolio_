const Profile = require('../models/Profile');

const getFileUrl = (file) => {
  if (!file) return null;
  if (file.path && /^https?:\/\//.test(file.path)) return file.path;
  return `/uploads/${file.filename}`;
};

// @desc    Get profile (public)
// @route   GET /api/profile
// @access  Public
exports.getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ isPublished: true });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get profile for admin (includes unpublished)
// @route   GET /api/profile/admin
// @access  Private
exports.getProfileAdmin = async (req, res, next) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update profile
// @route   POST /api/profile
// @access  Private
exports.createUpdateProfile = async (req, res, next) => {
  try {
    if (req.files?.avatar?.[0]) req.body.avatar = getFileUrl(req.files.avatar[0]);
    if (req.files?.resume?.[0]) req.body.resume = getFileUrl(req.files.resume[0]);
    let profile = await Profile.findOne();

    if (profile) {
      profile = await Profile.findByIdAndUpdate(profile._id, req.body, {
        new: true,
        runValidators: true,
      });
    } else {
      profile = await Profile.create(req.body);
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Track resume download (privacy-safe counter only, no PII stored)
// @route   POST /api/profile/resume-download
// @access  Public
exports.trackResumeDownload = async (req, res, next) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      {},
      { $inc: { resumeDownloads: 1 } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: { downloads: profile?.resumeDownloads || 0 },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete profile
// @route   DELETE /api/profile
// @access  Private
exports.deleteProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found.',
      });
    }

    await profile.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Profile deleted successfully.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};