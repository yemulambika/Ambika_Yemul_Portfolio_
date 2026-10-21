const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
      maxlength: [100, 'Skill name cannot exceed 100 characters'],
    },
    icon: {
      type: String,
      default: 'code',
      trim: true,
    },
    proficiency: {
      type: Number,
      default: 70,
      min: [0, 'Proficiency must be between 0 and 100'],
      max: [100, 'Proficiency must be between 0 and 100'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate skill in same category
skillSchema.index({ category: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Skill', skillSchema);