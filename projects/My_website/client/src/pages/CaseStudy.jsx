import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { getProject } from '../data/projectCatalog';

const Section = ({ title, children }) => (
  <Card>
    <h2 className="text-xl font-semibold mb-3">{title}</h2>
    {children}
  </Card>
);

const CaseStudy = () => {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    if (project) document.title = `${project.title} — Case Study`;
  }, [project]);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <p className="text-fg/60">Case study not found.</p>
          <Link to="/projects" className="text-accent text-sm mt-3 inline-block">Back to Projects</Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
      <Link to="/projects" className="text-accent text-sm inline-flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </Link>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">{project.confidentialityLabel || project.badge || project.group}</Badge>
          <Badge variant="featured">{project.category}</Badge>
          <span className="text-fg/40 text-sm">{project.year}</span>
        </div>
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p className="text-fg/70">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-1.5">
          {(project.technologies || []).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </header>

      <Section title="1. Project Overview">
        <p className="text-fg/70 whitespace-pre-line">{project.overview}</p>
      </Section>

      <Section title="2. Problem Statement & Project Objective">
        <p className="text-fg/70 mb-4">{project.problemStatement}</p>
        <h3 className="font-semibold mb-2 text-sm text-fg/80">Objectives</h3>
        <ul className="list-disc ml-5 text-fg/70 text-sm space-y-1">
          {(project.objectives || []).map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
      </Section>

      <Section title="3. Key Features">
        <ul className="list-disc ml-5 text-fg/70 text-sm space-y-1">
          {(project.keyFeatures || []).map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </Section>

      <Section title="4. My Role & Responsibilities">
        <p className="text-fg/70 text-sm mb-3">
          <span className="text-fg font-medium">Role:</span> {project.role}
        </p>
        <ul className="list-disc ml-5 text-fg/70 text-sm space-y-1">
          {(project.responsibilities || []).map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </Section>

      <Section title="5. Technology Stack">
        <div className="flex flex-wrap gap-2">
          {(project.technologies || []).map((t) => (
            <Badge key={t} variant="accent">{t}</Badge>
          ))}
        </div>
      </Section>

      <Section title="6. Technical Explanation">
        <div className="grid sm:grid-cols-2 gap-3">
          {(project.techExplanation || []).map((te) => (
            <div key={te.tech} className="bg-fg/5 border border-fg/10 rounded-lg p-3">
              <p className="font-medium text-sm text-accent mb-1">{te.tech}</p>
              <p className="text-fg/60 text-sm">{te.role}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="7. High-Level System Architecture (Conceptual)">
        <p className="text-fg/50 text-xs mb-4 italic">{project.architecture?.note}</p>
        <div className="flex flex-wrap items-center gap-2 justify-center">
          {(project.architecture?.flow || []).map((step, i, arr) => (
            <div key={i} className="flex items-center gap-2">
              <div className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/30 text-sm text-fg">
                {step}
              </div>
              {i < arr.length - 1 && (
                <span className="text-fg/40">→</span>
              )}
            </div>
          ))}
        </div>
        <p className="text-fg/40 text-xs mt-4 text-center">
          Conceptual, illustrative diagram only. Not a verified production architecture.
        </p>
      </Section>

      <Section title="8. Development Workflow">
        <ol className="list-decimal ml-5 text-fg/70 text-sm space-y-1">
          {(project.developmentWorkflow || []).map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ol>
      </Section>

      <Section title="9. Technical Challenges & Solutions">
        <div className="space-y-4">
          {(project.challenges || []).map((c, i) => (
            <div key={i} className="border-l-2 border-accent/40 pl-4">
              <p className="text-sm font-medium text-fg/90 mb-1">Challenge: {c.challenge}</p>
              <p className="text-sm text-fg/60">Solution: {c.solution}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="10. Key Learnings">
        <ul className="list-disc ml-5 text-fg/70 text-sm space-y-1">
          {(project.learnings || []).map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      </Section>

      <Section title="11. Project Confidentiality Statement">
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-accent mt-0.5 shrink-0" />
          <p className="text-fg/70 text-sm">{project.confidentialityStatement}</p>
        </div>
        <p className="text-fg/40 text-xs mt-4">
          No GitHub repository links, live demo URLs, source code, or proprietary implementation details are provided for this confidential company project.
        </p>
      </Section>
    </div>
  );
};

export default CaseStudy;


