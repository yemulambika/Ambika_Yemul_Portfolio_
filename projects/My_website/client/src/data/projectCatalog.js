import professionalProjects, { getProfessionalProject } from './professionalProjects';
import governmentProjects, { getGovernmentProject } from './governmentProjects';
import learningProjects, { getLearningProject } from './learningProjects';

export const allProjects = [...professionalProjects, ...governmentProjects, ...learningProjects];

export const getProject = (slug) =>
  allProjects.find((p) => p.slug === slug) ||
  getProfessionalProject(slug) ||
  getGovernmentProject(slug) ||
  getLearningProject(slug);

export const getProfessionalProjects = () => [...professionalProjects, ...governmentProjects];
export const getLearningProjects = () => learningProjects;

export default allProjects;
