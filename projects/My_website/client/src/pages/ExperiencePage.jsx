import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import { useExperience } from '../hooks/usePortfolio';
import { formatDateShort } from '../utils/helpers';

const ExperiencePage = () => {
  const { experience, loading } = useExperience();
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-2">Experience</h1>
      <p className="text-white/60 mb-6">Professional timeline. Only verified roles are shown.</p>
      {loading ? <Skeleton className="h-40" /> : experience.length ? (
        <div className="space-y-4">
          {experience.map(e => (
            <Card key={e._id}>
              <div className="flex flex-wrap gap-2 mb-2"><Badge variant="accent">{e.type || 'Full-time'}</Badge>{e.isCurrent && <Badge variant="featured">Current</Badge>}</div>
              <h2 className="font-semibold">{e.role} · {e.company}</h2>
              <p className="text-white/50 text-sm mb-2">{formatDateShort(e.startDate)} - {e.isCurrent ? 'Present' : formatDateShort(e.endDate)} {e.location ? `· ${e.location}` : ''}</p>
              <ul className="list-disc ml-5 text-white/70 text-sm space-y-1">{(e.responsibilities || []).map((r, i) => <li key={i}>{r}</li>)}</ul>
              {!!(e.achievements || []).length && <ul className="list-disc ml-5 text-white/70 text-sm mt-2 space-y-1">{e.achievements.map((r, i) => <li key={i}>{r}</li>)}</ul>}
            </Card>
          ))}
        </div>
      ) : <Card><p className="text-white/60 text-sm">No verified experience yet.</p></Card>}
    </div>
  );
};
export default ExperiencePage;