const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters'],
    },
    title: {
      type: String,
      required: [true, 'Professional title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    bio: {
      type: String,
      required: [true, 'Biography is required'],
      maxlength: [2000, 'Biography cannot exceed 2000 characters'],
    },
    shortBio: {
      type: String,
      maxlength: [300, 'Short bio cannot exceed 300 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    resume: {
      type: String,
      default: '',
    },
    socialLinks: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      instagram: { type: String, default: '' },
      website: { type: String, default: '' },
      email: { type: String, default: '' },
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    resumeDownloads: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure only one profile exists
profileSchema.statics.findOrCreate = async function (data) {
  let profile = await this.findOne();
  if (!profile) {
    profile = await this.create(data);
  }
  return profile;
};

module.exports = mongoose.model('Profile', profileSchema);