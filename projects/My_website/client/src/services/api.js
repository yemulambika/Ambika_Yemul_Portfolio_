import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

if (!import.meta.env.VITE_API_URL) {
  if (import.meta.env.DEV) console.warn('VITE_API_URL is not set - API calls will fall back to http://localhost:5000/api');
  else console.error('VITE_API_URL is not set in production build - API calls will fail. Set VITE_API_URL in Vercel.');
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Credentials are sent via the httpOnly cookie set by the server on login.
  // Do NOT read/write the JWT from browser storage (XSS surface).
  withCredentials: true,
});

// Request interceptor — auth is carried by the httpOnly cookie via withCredentials.
// No Authorization header is added from localStorage.
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor - handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle 401 - redirect to login (but never for the initial
      // auth check, otherwise public visitors get bounced to /login)
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        const url = error.config?.url || '';
        if (!url.includes('/auth/me') && window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

// Portfolio APIs
export const portfolioAPI = {
  // Profile
  getProfile: () => api.get('/profile'),
  getProfileAdmin: () => api.get('/profile/admin'),
  updateProfile: (data) => api.post('/profile', data),

  // Projects
  getProjects: (params) => api.get('/projects', { params }),
  getProject: (id) => api.get(`/projects/${id}`),
  getProjectsAdmin: () => api.get('/projects/admin'),
  createProject: (data) => api.post('/projects', data),
  updateProject: (id, data) => api.put(`/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/projects/${id}`),

  // Certifications
  getCertifications: (params) => api.get('/certifications', { params }),
  getCertification: (id) => api.get(`/certifications/${id}`),
  getCertificationsAdmin: () => api.get('/certifications/admin'),
  createCertification: (data) => api.post('/certifications', data),
  updateCertification: (id, data) => api.put(`/certifications/${id}`, data),
  deleteCertification: (id) => api.delete(`/certifications/${id}`),

  // Skills
  getSkills: (params) => api.get('/skills', { params }),
  getSkillsAdmin: () => api.get('/skills/admin'),
  createSkill: (data) => api.post('/skills', data),
  updateSkill: (id, data) => api.put(`/skills/${id}`, data),
  deleteSkill: (id) => api.delete(`/skills/${id}`),

  // Experience
  getExperience: () => api.get('/experience'),
  getExperienceAdmin: () => api.get('/experience/admin'),
  createExperience: (data) => api.post('/experience', data),
  updateExperience: (id, data) => api.put(`/experience/${id}`, data),
  deleteExperience: (id) => api.delete(`/experience/${id}`),

  // Education
  getEducation: () => api.get('/education'),
  getEducationAdmin: () => api.get('/education/admin'),
  createEducation: (data) => api.post('/education', data),
  updateEducation: (id, data) => api.put(`/education/${id}`, data),
  deleteEducation: (id) => api.delete(`/education/${id}`),

  // Contact
  submitContact: (data) => api.post('/contact', data),
  trackResumeDownload: () => api.post('/profile/resume-download'),
  getContactMessages: (params) => api.get('/contact/admin', { params }),
  getContactStats: () => api.get('/contact/admin/stats'),
  updateContactMessage: (id, data) => api.put(`/contact/admin/${id}`, data),
  deleteContactMessage: (id) => api.delete(`/contact/admin/${id}`),

  // Settings
  getSiteSettings: () => api.get('/settings'),
  updateSiteSettings: (data) => api.put('/settings', data),
};

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
  updatePassword: (data) => api.put('/auth/update-password', data),
  updateProfile: (data) => api.put('/auth/update-profile', data),
};

export default api;