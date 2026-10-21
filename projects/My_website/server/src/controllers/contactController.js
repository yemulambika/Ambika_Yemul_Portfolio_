const ContactMessage = require('../models/ContactMessage');
const { sendContactNotification } = require('../services/emailService');
const rateLimit = require('express-rate-limit');

// Stricter rate limit for contact form
const contactRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 messages per hour per IP
  message: {
    success: false,
    message: 'Too many messages sent. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

exports.contactRateLimiter = contactRateLimiter;

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    const contactMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent') || '',
    });

    // Send email notification (skipped gracefully if SMTP not configured)
    sendContactNotification({ name, email, subject, message }).catch((err) =>
      console.error('Contact email failed:', err.message)
    );

    res.status(201).json({
      success: true,
      message: 'Message sent successfully. I will get back to you soon.',
      data: {
        id: contactMessage._id,
        createdAt: contactMessage.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages (admin)
// @route   GET /api/contact/admin
// @access  Private
exports.getContactMessages = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, isRead } = req.query;
    const query = {};

    if (isRead !== undefined) {
      query.isRead = isRead === 'true';
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;
    const total = await ContactMessage.countDocuments(query);

    const messages = await ContactMessage.find(query)
      .sort({ createdAt: -1 })
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
      count: messages.length,
      total,
      pagination,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single contact message (admin)
// @route   GET /api/contact/admin/:id
// @access  Private
exports.getContactMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.',
      });
    }

    // Mark as read when viewed
    if (!message.isRead) {
      message.isRead = true;
      await message.save({ validateBeforeSave: false });
    }

    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark message as read/replied
// @route   PUT /api/contact/admin/:id
// @access  Private
exports.updateContactMessage = async (req, res, next) => {
  try {
    const { isRead, isReplied } = req.body;

    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.',
      });
    }

    if (isRead !== undefined) message.isRead = isRead;
    if (isReplied !== undefined) message.isReplied = isReplied;

    await message.save();

    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/admin/:id
// @access  Private
exports.deleteContactMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.',
      });
    }

    await message.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get contact message stats
// @route   GET /api/contact/stats
// @access  Private
exports.getContactStats = async (req, res, next) => {
  try {
    const total = await ContactMessage.countDocuments();
    const unread = await ContactMessage.countDocuments({ isRead: false });
    const replied = await ContactMessage.countDocuments({ isReplied: true });

    res.status(200).json({
      success: true,
      data: { total, unread, replied },
    });
  } catch (error) {
    next(error);
  }
};