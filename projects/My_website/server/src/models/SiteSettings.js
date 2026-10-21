const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      default: 'Portfolio',
      trim: true,
    },
    siteDescription: {
      type: String,
      default: 'Personal Portfolio Website',
      trim: true,
    },
    metaTitle: {
      type: String,
      default: 'Portfolio - Personal Website',
      trim: true,
    },
    metaDescription: {
      type: String,
      default: 'A personal portfolio website showcasing skills, projects, and experience.',
      trim: true,
    },
    ogImage: {
      type: String,
      default: '',
    },
    theme: {
      type: String,
      enum: ['dark', 'light'],
      default: 'dark',
    },
    primaryColor: {
      type: String,
      default: '#6366f1',
    },
    contactEmail: {
      type: String,
      trim: true,
    },
    allowContactForm: {
      type: Boolean,
      default: true,
    },
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure only one settings document
siteSettingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);