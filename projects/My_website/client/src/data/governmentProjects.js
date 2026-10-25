export const governmentProjects = [
  {
    slug: 'government-and-police-department-websites',
    title: 'Government and Police Department Websites',
    year: 2025,
    group: 'Professional',
    category: 'Government / Police Web Applications',
    confidentialityLabel: 'Professional Experience',
    badge: 'Professional Experience',
    shortDescription: 'Development and maintenance of government and police department websites, including Maharashtra Police and Osmanabad Zilla Parishad, with responsive interfaces and backend integration.',
    overview: 'This work involved building and maintaining web applications for government and police departments, including Maharashtra Police and Osmanabad Zilla Parishad. Responsibilities covered responsive frontend development, content presentation, form handling, and integration with backend services as part of my professional experience at DreamCare Developers Pvt. Ltd.',
    problemStatement: 'Government and police departments require reliable, accessible, and maintainable web portals to publish information, handle requests, and support departmental workflows.',
    objectives: ['Deliver responsive and accessible web interfaces.', 'Support content presentation, forms, and data-driven pages.', 'Integrate frontend workflows with backend services and APIs.', 'Maintain and improve existing government web applications.', 'Ensure consistent UI components and maintainable code.'],
    keyFeatures: ['Responsive layouts for desktop and mobile devices.', 'Informational pages and content sections for departments.', 'Forms and request handling interfaces.', 'Reusable UI components, navigation, and layout modules.', 'Backend and API integration for dynamic content.', 'Maintenance, debugging, and incremental improvements.'],
    role: 'Software Developer',
    responsibilities: ['Developed and maintained React.js frontend modules for government and police department websites.', 'Built responsive layouts, reusable components, and navigation structures.', 'Integrated frontend workflows with backend services and REST APIs.', 'Supported content updates, form handling, and data presentation.', 'Debugged issues, handled API errors, and supported maintenance.', 'Used Git for version control and collaboration.'],
    technologies: ['React.js', 'JavaScript', 'Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'Git'],
    techExplanation: [{ tech: 'React.js', role: 'Responsive pages and reusable components.' }, { tech: 'JavaScript', role: 'Client-side logic and API communication.' }, { tech: 'Node.js', role: 'Server-side runtime.' }, { tech: 'Express.js', role: 'Backend routing.' }, { tech: 'REST APIs', role: 'Frontend/backend communication.' }, { tech: 'MongoDB', role: 'Document storage.' }, { tech: 'Git', role: 'Version control.' }],
    architecture: { note: 'Conceptual (illustrative) architecture.', flow: ['React.js frontend', 'REST APIs', 'Node.js / Express.js backend', 'MongoDB database'] },
    challenges: [{ challenge: 'Maintaining responsive layouts across devices.', solution: 'Used responsive design practices and reusable components.' }, { challenge: 'Integrating dynamic content.', solution: 'Integrated REST APIs with loading and error handling.' }],
    learnings: ['Building responsive government web interfaces.', 'Maintaining production-style web applications.', 'Integrating frontend with backend services.'],
    githubUrl: null,
    liveDemoUrl: null,
    confidentialityStatement: 'This work was performed as part of my professional experience at DreamCare Developers Pvt. Ltd. Source code and proprietary details are not publicly available due to company confidentiality.',
  },
];
export const getGovernmentProject = (slug) => governmentProjects.find((p) => p.slug === slug);
export default governmentProjects;
