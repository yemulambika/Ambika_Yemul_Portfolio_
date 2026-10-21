const Skill = require('../models/Skill');

// @desc    Get all skills (public)
// @route   GET /api/skills
// @access  Public
exports.getSkills = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = { isPublished: true };

    if (category) {
      query.category = category;
    }

    const skills = await Skill.find(query).sort({
      category: 1,
      displayOrder: 1,
      name: 1,
    });

    // Group skills by category
    const groupedSkills = {};
    skills.forEach((skill) => {
      if (!groupedSkills[skill.category]) {
        groupedSkills[skill.category] = [];
      }
      groupedSkills[skill.category].push(skill);
    });

    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
      grouped: groupedSkills,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single skill (public)
// @route   GET /api/skills/:id
// @access  Public
exports.getSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill || !skill.isPublished) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: skill,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create skill
// @route   POST /api/skills
// @access  Private
exports.createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);

    res.status(201).json({
      success: true,
      data: skill,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private
exports.updateSkill = async (req, res, next) => {
  try {
    let skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found.',
      });
    }

    skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: skill,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private
exports.deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found.',
      });
    }

    await skill.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Skill deleted successfully.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get skills for admin
// @route   GET /api/skills/admin
// @access  Private
exports.getSkillsAdmin = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({
      category: 1,
      displayOrder: 1,
    });

    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    next(error);
  }
};