import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import { portfolioAPI } from '../../services/api';

const blank = { title: '', description: '', shortDescription: '', category: 'Web Application', technologies: '', year: 2025, githubUrl: '', liveDemoUrl: '', role: '', isFeatured: false, isPublished: true };

const AdminProjects = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const r = await portfolioAPI.getProjectsAdmin();
    setList(r.data.data || []);
  };
  useEffect(() => { load().catch(() => toast.error('Failed to load')); }, []);

  const save = async (e) => {
    e.preventDefault();
    const payload = { ...form, year: Number(form.year), technologies: form.technologies.split(',').map(s => s.trim()).filter(Boolean) };
    try {
      if (editing) await portfolioAPI.updateProject(editing, payload);
      else await portfolioAPI.createProject(payload);
      toast.success('Saved'); setForm(blank); setEditing(null); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Save failed'); }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Projects</h1>
      <Card>
        <form onSubmit={save} className="grid sm:grid-cols-2 gap-3">
          <input className="input" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <input className="input" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required />
          <input className="input sm:col-span-2" placeholder="Short description" value={form.shortDescription} onChange={e => setForm({ ...form, shortDescription: e.target.value })} />
          <textarea className="input sm:col-span-2" rows={3} placeholder="Full description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
          <input className="input" placeholder="Tech (comma separated)" value={form.technologies} onChange={e => setForm({ ...form, technologies: e.target.value })} />
          <input className="input" type="number" placeholder="Year" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} required />
          <input className="input" placeholder="GitHub URL" value={form.githubUrl} onChange={e => setForm({ ...form, githubUrl: e.target.value })} />
          <input className="input" placeholder="Live demo URL" value={form.liveDemoUrl} onChange={e => setForm({ ...form, liveDemoUrl: e.target.value })} />
          <input className="input" placeholder="Your role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
          <label className="text-sm text-fg/70 flex items-center gap-2"><input type="checkbox" checked={form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} /> Featured</label>
          <div className="sm:col-span-2 flex gap-2">
            <button className="btn-primary text-sm">{editing ? 'Update' : 'Create'}</button>
            {editing && <button type="button" onClick={() => { setEditing(null); setForm(blank); }} className="btn-ghost text-sm">Cancel</button>}
          </div>
        </form>
      </Card>
      <div className="space-y-2">
        {list.map(p => (
          <Card key={p._id} className="flex items-center justify-between gap-3">
            <div><p className="font-medium text-sm">{p.title} <span className="text-fg/40">({p.year})</span></p><p className="text-fg/50 text-xs">{p.isPublished ? 'Published' : 'Draft'} {p.isFeatured ? '· Featured' : ''}</p></div>
            <div className="flex gap-2">
              <button onClick={() => { setEditing(p._id); setForm({ ...blank, ...p, technologies: (p.technologies || []).join(', ') }); }} className="text-xs btn-outline px-3 py-1.5">Edit</button>
              <button onClick={async () => { if (confirm('Delete?')) { await portfolioAPI.deleteProject(p._id); toast.success('Deleted'); load(); } }} className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400">Delete</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default AdminProjects;