import { Download } from 'lucide-react';
import Card from '../components/ui/Card';
import Skeleton from '../components/ui/Skeleton';
import { useProfile, useExperience, useEducation, useSkills, useCertifications } from '../hooks/usePortfolio';
import { portfolioAPI } from '../services/api';

const handleDownload = () => {
  // Privacy-safe: increments an anonymous counter, stores no personal data
  portfolioAPI.trackResumeDownload().catch(() => {});
};

const Resume = () => {
  const { profile, loading: pL } = useProfile();
  const { experience } = useExperience();
  const { education } = useEducation();
  const { skills } = useSkills();
  const { certifications } = useCertifications({ limit: 20 });
  if (pL) return <div className="max-w-4xl mx-auto px-4"><Skeleton className="h-64" /></div>;
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Resume</h1>
        {profile?.resume && <a href={profile.resume} target="_blank" rel="noreferrer" onClick={handleDownload} className="btn-primary text-sm"><Download className="w-4 h-4" /> Download PDF</a>}
      </div>
      <Card>
        <h2 className="text-xl font-semibold">{profile ? `${profile.firstName} ${profile.lastName}` : 'Your Name'}</h2>
        <p className="text-accent text-sm mb-2">{profile?.title}</p>
        <p className="text-white/70 text-sm whitespace-pre-line">{profile?.bio}</p>
      </Card>
      <Card><h2 className="font-semibold mb-2">Experience</h2>{experience.map(e => <p key={e._id} className="text-sm text-white/70">{e.role} · {e.company}</p>)}</Card>
      <Card><h2 className="font-semibold mb-2">Education</h2>{education.map(e => <p key={e._id} className="text-sm text-white/70">{e.degree} · {e.institution}</p>)}</Card>
      <Card><h2 className="font-semibold mb-2">Skills</h2><p className="text-sm text-white/70">{skills.map(s => s.name).join(', ')}</p></Card>
      <Card><h2 className="font-semibold mb-2">Certifications</h2>{certifications.map(c => <p key={c._id} className="text-sm text-white/70">{c.title} · {c.organization}</p>)}</Card>
    </div>
  );
};
export default Resume;