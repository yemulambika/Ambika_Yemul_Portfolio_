import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import Reveal from '../components/ui/Reveal';
import { useProfile, useExperience, useEducation } from '../hooks/usePortfolio';
import { formatDateShort } from '../utils/helpers';

const About = () => {
  const { profile, loading: pL } = useProfile();
  const { experience, loading: eL } = useExperience();
  const { education, loading: edL } = useEducation();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <Reveal>
        <div>
          <h1 className="text-3xl font-bold mb-3">About Me</h1>
          {pL ? <Skeleton className="h-28" /> : (
            <Card>
              <h2 className="text-xl font-semibold mb-2">{profile ? `${profile.firstName} ${profile.lastName}` : 'Full Stack Developer'}</h2>
              <p className="text-accent text-sm mb-3">{profile?.title}</p>
              <p className="text-fg/70 whitespace-pre-line">{profile?.bio || 'Bio will appear here once added from the admin panel.'}</p>
            </Card>
          )}
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div>
          <h2 className="text-2xl font-bold mb-4">Experience</h2>
          {eL ? <Skeleton className="h-24" /> : experience.map(e => (
            <Card key={e._id} className="mb-4">
              <h3 className="font-semibold">{e.role} · {e.company}</h3>
              <p className="text-fg/50 text-sm mb-2">{formatDateShort(e.startDate)} - {e.isCurrent ? 'Present' : formatDateShort(e.endDate)}</p>
              <ul className="text-fg/70 text-sm list-disc ml-5 space-y-1">{(e.responsibilities || []).map((r, i) => <li key={i}>{r}</li>)}</ul>
            </Card>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <div>
          <h2 className="text-2xl font-bold mb-4">Education</h2>
          {edL ? <Skeleton className="h-24" /> : education.map(e => (
            <Card key={e._id} className="mb-4">
              <h3 className="font-semibold">{e.degree} · {e.institution}</h3>
              <p className="text-fg/50 text-sm">{e.fieldOfStudy}</p>
            </Card>
          ))}
          {!edL && !education.length && <Card><p className="text-fg/50 text-sm">Education placeholder — add real entries from admin.</p></Card>}
        </div>
      </Reveal>
      {profile?.resume && <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-primary inline-flex">Download Resume</a>}
      <Reveal delay={0.2}>
        <div className="flex flex-wrap gap-2">{(profile?.skills || []).slice(0, 10).map(s => <Badge key={s}>{s}</Badge>)}</div>
      </Reveal>
    </div>
  );
};
export default About;