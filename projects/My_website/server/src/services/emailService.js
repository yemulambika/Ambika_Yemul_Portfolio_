const nodemailer = require('nodemailer');

/**
 * Create email transporter
 * Configure with your SMTP service in production
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

/**
 * Send contact form notification email
 */
exports.sendContactNotification = async (contactData) => {
  try {
    // Only send if email is configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email not configured. Skipping email notification.');
      return { success: true, skipped: true };
    }

    const transporter = createTransporter();

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${contactData.subject}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Subject:</strong> ${contactData.subject}</p>
        <p><strong>Message:</strong><br>${contactData.message}</p>
        <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    // Mask SMTP credentials before logging so credentials never hit the logs
    const safeMessage = error.message.replace(process.env.EMAIL_PASS || '', '***');
    console.error('Email sending error:', safeMessage);
    return { success: false, error: 'Email sending failed' };
  }
};

/**
 * Send welcome email to admin after account creation
 */
exports.sendWelcomeEmail = async (adminEmail, adminName) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return { success: true, skipped: true };
    }

    const transporter = createTransporter();

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: adminEmail,
      subject: 'Welcome to your Portfolio Admin Panel',
      html: `
        <h2>Welcome, ${adminName}!</h2>
        <p>Your admin account has been created successfully.</p>
        <p>You can now log in to manage your portfolio content.</p>
      `,
    });

    return { success: true };
  } catch (error) {
    const safeMessage = error.message.replace(process.env.EMAIL_PASS || '', '***');
    console.error('Welcome email error:', safeMessage);
    return { success: false, error: 'Email sending failed' };
  }
};