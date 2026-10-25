/**
 * Database Seed Script
 * Run with: npm run seed
 * All sample content is placeholder - replace with real info before production.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Certification = require('../models/Certification');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Education = require('../models/Education');
const SiteSettings = require('../models/SiteSettings');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB. Seeding data...');

    await Admin.deleteMany();
    await Profile.deleteMany();
    await Project.deleteMany();
    await Certification.deleteMany();
    await Skill.deleteMany();
    await Experience.deleteMany();
    await Education.deleteMany();
    console.log('Cleared existing data.');

    const admin = await Admin.create({
      name: 'Administrator',
      email: 'admin@portfolio.com',
      password: 'Admin123!@#',
      role: 'super-admin',
    });
    console.log('Admin created:', admin.email);
    // Create profile
    await Profile.create({
      firstName: 'Ambika',
      lastName: 'Yemul',
      title: 'Full Stack Developer | React.js, JavaScript, Node.js, Express.js, REST APIs & Databases',
      bio: `Full Stack Developer with approximately 2.8 years of professional experience at DreamCare Developers Pvt. Ltd., starting February 2024. I build responsive web applications, develop reusable React components, integrate REST APIs, implement backend functionality and database operations, and support debugging, testing, and maintenance of real-world projects.

This portfolio showcases my professional experience, projects, skills, certifications, and contact information.`,
      shortBio: 'Full Stack Developer with ~2.8 years of experience building responsive web applications, reusable React components, REST APIs, and database-driven features.',
      email: 'ambikayemul01@gmail.com',
      phone: '',
      location: '',
      avatar: '',
      resume: '',
      socialLinks: {
        github: 'https://github.com/yemulambika?tab=repositories',
        linkedin: '',
        twitter: '',
        instagram: '',
        website: '',
        email: 'ambikayemul01@gmail.com',
      },
      isPublished: true,
    });
    console.log('Profile created.');

    // Create projects (placeholder data - replace with real projects)
    await Project.create([
      {
        title: 'Smart Bandobast — Nashik Rural Police',
        description:
          'A police duty management application supporting duty scheduling, officer assignments, digital attendance, GPS tracking, notifications, and reporting.',
        shortDescription: 'Police duty management application with scheduling, GPS tracking, and reporting.',
        category: 'Web Application',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
        coverImage: '',
        year: 2025,
        client: 'Nashik Rural Police',
        role: 'Full Stack Developer',
        objectives: [
          'Streamline duty scheduling and officer assignments',
          'Implement digital attendance system',
          'Add GPS tracking for field officers',
          'Enable real-time notifications',
          'Generate comprehensive reports',
        ],
        keyFeatures: [
          'Duty scheduling and management',
          'Officer assignment tracking',
          'Digital attendance with geolocation',
          'GPS tracking for field personnel',
          'Notification system',
          'Reporting and analytics dashboard',
        ],
        challengesSolved: [
          'Real-time GPS tracking with high accuracy',
          'Secure role-based access control',
          'Scalable architecture for growing user base',
        ],
        githubUrl: '',
        liveDemoUrl: '',
        isFeatured: true,
        isPublished: true,
        displayOrder: 1,
      },
      {
        title: 'Bandobast Management System',
        description:
          'A system for managing police deployment and operational duty assignments. Detailed information will be added once verified project features are provided.',
        shortDescription: 'Police deployment and duty assignment management system.',
        category: 'Management System',
        technologies: [],
        coverImage: '',
        year: 2025,
        client: '',
        role: '',
        objectives: [],
        keyFeatures: [],
        challengesSolved: [],
        githubUrl: '',
        liveDemoUrl: '',
        isFeatured: false,
        isPublished: true,
        displayOrder: 2,
      },
    ]);
    console.log('Projects created.');

    // Create certifications
    // NOTE: issueDate values below are placeholders — edit them in the
    // admin panel (/admin/certifications) with the real issue dates from each certificate.
    await Certification.create([
      {
        title: 'MERN Stack Developer',
        organization: 'Scaler',
        issueDate: new Date('2025-01-01'),
        certificateImage: '/uploads/MERN.png',
        category: 'Web Development',
        skills: ['MongoDB', 'Express', 'React', 'Node.js'],
        isPublished: true,
        displayOrder: 1,
      },
      {
        title: 'Data Structures & Algorithms',
        organization: 'Scaler',
        issueDate: new Date('2025-01-01'),
        certificateImage: '/uploads/Data_Structure.png',
        category: 'Other',
        skills: ['Data Structures', 'Algorithms'],
        isPublished: true,
        displayOrder: 2,
      },
      {
        title: 'Database & SQL',
        organization: 'Scaler',
        issueDate: new Date('2025-01-01'),
        certificateImage: '/uploads/SQL.png',
        category: 'Other',
        skills: ['SQL', 'Databases'],
        isPublished: true,
        displayOrder: 3,
      },
      {
        title: 'Data Structures (GFG)',
        organization: 'GeeksforGeeks',
        issueDate: new Date('2025-01-01'),
        certificateImage: '/uploads/GFG.jpg',
        category: 'Other',
        skills: ['Data Structures'],
        isPublished: true,
        displayOrder: 4,
      },
      {
        title: 'React Development',
        organization: 'Scaler',
        issueDate: new Date('2025-01-01'),
        certificateImage: '/uploads/React.png',
        category: 'Web Development',
        skills: ['React'],
        isPublished: true,
        displayOrder: 5,
      },
      {
        title: 'JavaScript',
        organization: 'Scaler',
        issueDate: new Date('2025-01-01'),
        certificateImage: '/uploads/JavaScript.png',
        category: 'Web Development',
        skills: ['JavaScript'],
        isPublished: true,
        displayOrder: 6,
      },
    ]);
    console.log('Certifications created.');

    // Create skills
    await Skill.create([
      { category: 'Frontend Development', name: 'React', icon: 'code', proficiency: 90, description: 'Component-based UI development', isPublished: true },
      { category: 'Frontend Development', name: 'TypeScript', icon: 'code-2', proficiency: 85, description: 'Type-safe JavaScript development', isPublished: true },
      { category: 'Frontend Development', name: 'Tailwind CSS', icon: 'palette', proficiency: 90, description: 'Utility-first CSS framework', isPublished: true },
      { category: 'Frontend Development', name: 'Framer Motion', icon: 'animate', proficiency: 75, description: 'Animation library for React', isPublished: true },
      { category: 'Backend Development', name: 'Node.js', icon: 'code', proficiency: 85, description: 'Server-side JavaScript runtime', isPublished: true },
      { category: 'Backend Development', name: 'Express.js', icon: 'code-2', proficiency: 85, description: 'Web framework for Node.js', isPublished: true },
      { category: 'Backend Development', name: 'REST APIs', icon: 'api', proficiency: 80, description: 'RESTful API design and development', isPublished: true },
      { category: 'Programming Languages', name: 'JavaScript', icon: 'code', proficiency: 90, description: 'Primary programming language', isPublished: true },
      { category: 'Programming Languages', name: 'TypeScript', icon: 'code-2', proficiency: 85, description: 'Typed superset of JavaScript', isPublished: true },
    ]);
    console.log('Skills created.');

    // Create experience
    await Experience.create([
      {
        company: 'DreamCare Developers Pvt. Ltd.',
        companyLogo: '',
        role: 'Software Developer / Full Stack Developer',
        startDate: new Date('2024-02-01'),
        endDate: null,
        isCurrent: true,
        location: 'Your City',
        type: 'Full-time',
        responsibilities: [
          'Develop and maintain full-stack web applications using MERN stack',
          'Collaborate with cross-functional teams to deliver features',
          'Implement responsive UI components with React and Tailwind CSS',
          'Design and develop RESTful APIs with Node.js and Express',
          'Manage MongoDB database schemas and queries',
        ],
        achievements: [
          'Contributed to multiple client projects',
        ],
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
        isPublished: true,
        displayOrder: 1,
      },
    ]);
    console.log('Experience created.');

    // Create education
    await Education.create([
      {
        institution: 'Savitribai Pule Pune University',
        degree: 'Bachelor of Engineering',
        fieldOfStudy: 'Computer Science',
        startDate: new Date('2019-08-01'),
        endDate: new Date('2023-05-01'),
        isCurrent: false,
        location: 'Pune, India',
        grade: '',
        description: 'Bachelor of Engineering · Savitribai Pule Pune University',
        achievements: [],
        isPublished: true,
        displayOrder: 1,
      },
      {
        institution: 'Scaler Academy',
        degree: 'Certificate Course',
        fieldOfStudy: 'Software Development',
        startDate: new Date('2023-06-01'),
        endDate: new Date('2024-06-01'),
        isCurrent: false,
        location: 'Online',
        grade: '',
        description: 'Certificate Course - Scaler Academy - Online',
        achievements: [],
        isPublished: true,
        displayOrder: 2,
      },
      {
        institution: 'Velocity Institute',
        degree: 'Certificate Course',
        fieldOfStudy: 'Software Development',
        startDate: new Date('2023-06-01'),
        endDate: new Date('2024-06-01'),
        isCurrent: false,
        location: 'Online',
        grade: '',
        description: 'Velocity Institute - Online',
        achievements: [],
        isPublished: true,
        displayOrder: 3,
      },
    ]);
    console.log('Education created.');

    // Create site settings
    await SiteSettings.create({
      siteName: 'My Portfolio',
      siteDescription: 'Personal Portfolio Website',
      metaTitle: 'Portfolio - Full Stack Developer',
      metaDescription: 'A personal portfolio website showcasing skills, projects, and experience.',
      theme: 'dark',
      primaryColor: '#6366f1',
    });
    console.log('Site settings created.');

    console.log('Seeding complete!');
    console.log('\nDefault Admin Credentials:');
    console.log('   Email: admin@portfolio.com');
    console.log('   Password: Admin123!@#');
    console.log('   CHANGE THESE CREDENTIALS BEFORE PRODUCTION DEPLOYMENT\n');

    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();