import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import { useProjects } from '../hooks/usePortfolio';
import { PROJECT_CATEGORIES } from '../utils/constants';
import ProfessionalProjectsSection from '../components/ProfessionalProjectsSection';


import { truncate, debounce } from '../utils/helpers';

const Projects = () => {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const { projects, total, pagination, loading, error, refetch } = useProjects({ search: search || undefined, category: category || undefined, limit: 9, page });

  // Debounce search so we don't hammer the API on every keystroke
  useEffect(() => {
    const t = setTimeout(() => { setSearch(searchInput); setPage(1); }, 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ProfessionalProjectsSection />
      <h1 className="text-3xl font-bold mb-2 mt-10">All Projects</h1>
      <p className="text-fg/60 mb-6">Search and filter my work by technology or category.</p>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-fg/40" />
          <input value={searchInput} onChange={e => setSearchInput(e.target.value)} placeholder="Search projects..." className="input pl-9" />
        </div>
        <select value={category} onChange={e => { setCategory(e.target.value); setPage(1); }} className="input sm:w-56">
          <option value="">All categories</option>
          {PROJECT_CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <p className="text-fg/40 text-xs mb-4">{total ? `${total} project${total === 1 ? '' : 's'} found` : ''}</p>
      {loading ? <div className="grid md:grid-cols-3 gap-5">{[1,2,3].map(i => <Skeleton key={i} className="h-52" />)}</div> : error ? (
        <Card><p className="text-red-400 text-sm">Failed to load projects: {error}</p><button onClick={refetch} className="btn-outline text-sm mt-3 px-4 py-2">Retry</button></Card>
      ) : (
        projects.length ? (
          <div className="grid md:grid-cols-3 gap-5">
            {projects.map(p => (
              <Card key={p._id}>
                {p.isFeatured && <Badge variant="featured" className="mb-2">Featured</Badge>}
                <h3 className="font-semibold mb-2">{p.title} <span className="text-fg/40 text-sm">({p.year})</span></h3>
                <p className="text-fg/60 text-sm mb-3">{truncate(p.shortDescription || p.description, 120)}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">{(p.technologies || []).slice(0, 4).map(t => <Badge key={t}>{t}</Badge>)}</div>
                <Link to={`/projects/${p._id}`} className="text-accent text-sm">View details</Link>
              </Card>
            ))}
          </div>
        ) : <Card><p className="text-fg/60 text-sm">No projects found.</p></Card>
      )}
      {(pagination?.prev || pagination?.next) && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button disabled={!pagination?.prev} onClick={() => setPage(p => Math.max(1, p - 1))} className="btn-outline text-sm px-4 py-2 disabled:opacity-40">Previous</button>
          <span className="text-fg/50 text-sm">Page {page}</span>
          <button disabled={!pagination?.next} onClick={() => setPage(p => p + 1)} className="btn-outline text-sm px-4 py-2 disabled:opacity-40">Next</button>
        </div>
      )}
    </div>
  );
};
export default Projects;