const Project = require('../models/Project');

/**
 * Map multer upload + form-encoded arrays into req.body.
 * Works for both Cloudinary (req.file.path) and local disk (build /uploads URL).
 */
const getFileUrl = (file) => {
  if (!file) return null;
  if (file.path && /^https?:\/\//.test(file.path)) return file.path;
  return `/uploads/${file.filename}`;
};

const parseMaybeJsonArray = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return [];
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed;
    } catch (_) {
      // fall through to comma split
    }
    return trimmed.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return value;
};

const normalizeProjectBody = (req) => {
  if (!req.body) req.body = {};
  if (req.file) {
    const url = getFileUrl(req.file);
    if (url) req.body.coverImage = url;
  }
  ['technologies', 'objectives', 'keyFeatures', 'challengesSolved'].forEach((key) => {
    if (req.body[key] !== undefined) req.body[key] = parseMaybeJsonArray(req.body[key]);
  });
  if (req.body.year !== undefined && req.body.year !== '') req.body.year = Number(req.body.year);
  ['isFeatured', 'isPublished'].forEach((key) => {
    if (typeof req.body[key] === 'string') req.body[key] = req.body[key] === 'true';
  });
};

// @desc    Get all projects (public)
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      featured,
      search,
      sort = '-createdAt',
    } = req.query;

    // Build query
    const query = { isPublished: true };

    if (category) {
      query.category = category;
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    // Search
    if (search) {
      query.$text = { $search: search };
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;
    const total = await Project.countDocuments(query);

    // Execute query
    const projects = await Project.find(query)
      .sort(sort)
      .skip(startIndex)
      .limit(limitNum);

    // Pagination result
    const pagination = {};
    if (startIndex > 0) {
      pagination.prev = { page: pageNum - 1, limit: limitNum };
    }
    if (endIndex < total) {
      pagination.next = { page: pageNum + 1, limit: limitNum };
    }

    res.status(200).json({
      success: true,
      count: projects.length,
      total,
      pagination,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project (public)
// @route   GET /api/projects/:id
// @access  Public
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project || !project.isPublished) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    // Increment view count
    project.views = (project.views || 0) + 1;
    await project.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create project
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res, next) => {
  try {
    normalizeProjectBody(req);
    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    normalizeProjectBody(req);
    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get projects for admin (all including unpublished)
// @route   GET /api/projects/admin
// @access  Private
exports.getProjectsAdmin = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ displayOrder: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};