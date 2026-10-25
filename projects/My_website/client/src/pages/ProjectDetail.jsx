import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import { portfolioAPI } from '../services/api';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    portfolioAPI.getProject(id).then(r => setProject(r.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="max-w-4xl mx-auto px-4"><Skeleton className="h-64" /></div>;
  if (!project) return <div className="max-w-4xl mx-auto px-4"><Card><p>Project not found.</p><Link to="/projects" className="text-accent text-sm">Back</Link></Card></div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
      <Link to="/projects" className="text-accent text-sm inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Back</Link>
      <h1 className="text-3xl font-bold">{project.title}</h1>
      <p className="text-fg/60">{project.shortDescription || project.description}</p>
      <div className="flex flex-wrap gap-1.5">{(project.technologies || []).map(t => <Badge key={t}>{t}</Badge>)}</div>
      <Card><h2 className="font-semibold mb-2">Overview</h2><p className="text-fg/70 whitespace-pre-line">{project.description}</p></Card>
      {!!(project.objectives || []).length && <Card><h2 className="font-semibold mb-2">Objectives</h2><ul className="list-disc ml-5 text-fg/70 text-sm space-y-1">{project.objectives.map((o, i) => <li key={i}>{o}</li>)}</ul></Card>}
      {!!(project.keyFeatures || []).length && <Card><h2 className="font-semibold mb-2">Key Features</h2><ul className="list-disc ml-5 text-fg/70 text-sm space-y-1">{project.keyFeatures.map((o, i) => <li key={i}>{o}</li>)}</ul></Card>}
      <div className="flex gap-3">
        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-outline text-sm"><Github className="w-4 h-4" /> Repo</a>}
        {project.liveDemoUrl && <a href={project.liveDemoUrl} target="_blank" rel="noreferrer" className="btn-primary text-sm"><ExternalLink className="w-4 h-4" /> Live Demo</a>}
      </div>
    </div>
  );
};
export default ProjectDetail;