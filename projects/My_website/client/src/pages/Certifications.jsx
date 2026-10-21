import { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import { useCertifications } from '../hooks/usePortfolio';
import { formatDateShort } from '../utils/helpers';

const Certifications = () => {
  const [search, setSearch] = useState('');
  const { certifications, loading } = useCertifications({ search: search || undefined, limit: 50 });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-2">Certifications</h1>
      <p className="text-white/60 mb-6">Placeholder cards — replace with verified credentials.</p>
      <div className="relative max-w-md mb-6">
        <Search className="w-4 h-4 absolute left-3 top-3.5 text-white/40" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search certifications..." className="input pl-9" />
      </div>
      {loading ? <div className="grid md:grid-cols-3 gap-5">{[1,2,3].map(i => <Skeleton key={i} className="h-48" />)}</div> : (
        certifications.length ? <div className="grid md:grid-cols-3 gap-5">{certifications.map(c => (
          <Card key={c._id}>
            {c.certificateImage && (
              <img
                src={c.certificateImage}
                alt={`${c.title} certificate`}
                className="w-full h-40 object-cover object-top rounded-md mb-3 border border-white/10"
              />
            )}
            <h3 className="font-semibold mb-1">{c.title}</h3>
            <p className="text-white/50 text-sm mb-2">{c.organization} · {formatDateShort(c.issueDate)}</p>
            {c.credentialId && <p className="text-white/50 text-xs mb-2">ID: {c.credentialId}</p>}
            <div className="flex flex-wrap gap-1.5 mb-3">{(c.skills || []).map(s => <Badge key={s}>{s}</Badge>)}</div>
            {c.credentialUrl && <a href={c.credentialUrl} target="_blank" rel="noreferrer" className="text-accent text-sm inline-flex items-center gap-1">Verify <ExternalLink className="w-3 h-3" /></a>}
          </Card>))}</div>
        : <Card><p className="text-white/60 text-sm">No certifications yet. Add from Admin panel.</p></Card>
      )}
    </div>
  );
};
export default Certifications;