import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import { portfolioAPI } from '../../services/api';

const blank = { title: '', organization: '', issueDate: '', credentialId: '', credentialUrl: '', category: 'Other', skills: '' };

const AdminCertifications = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const load = async () => { const r = await portfolioAPI.getCertificationsAdmin(); setList(r.data.data || []); };
  useEffect(() => { load().catch(() => toast.error('Failed')); }, []);

  const save = async (e) => {
    e.preventDefault();
    const payload = { ...form, issueDate: form.issueDate || new Date().toISOString(), skills: form.skills.split(',').map(s => s.trim()).filter(Boolean) };
    try {
      if (editing) await portfolioAPI.updateCertification(editing, payload);
      else await portfolioAPI.createCertification(payload);
      toast.success('Saved'); setForm(blank); setEditing(null); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Save failed'); }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Certifications</h1>
      <Card>
        <p className="text-fg/50 text-xs mb-3">Do not invent credentials — use placeholders until verified.</p>
        <form onSubmit={save} className="grid sm:grid-cols-2 gap-3">
          <input className="input" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <input className="input" placeholder="Organization" value={form.organization} onChange={e => setForm({ ...form, organization: e.target.value })} required />
          <input className="input" type="date" value={form.issueDate} onChange={e => setForm({ ...form, issueDate: e.target.value })} />
          <input className="input" placeholder="Credential ID" value={form.credentialId} onChange={e => setForm({ ...form, credentialId: e.target.value })} />
          <input className="input sm:col-span-2" placeholder="Verification URL" value={form.credentialUrl} onChange={e => setForm({ ...form, credentialUrl: e.target.value })} />
          <input className="input" placeholder="Skills (comma separated)" value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} />
          <div className="sm:col-span-2 flex gap-2"><button className="btn-primary text-sm">{editing ? 'Update' : 'Create'}</button>{editing && <button type="button" onClick={() => { setEditing(null); setForm(blank); }} className="btn-ghost text-sm">Cancel</button>}</div>
        </form>
      </Card>
      <div className="space-y-2">
        {list.map(c => (
          <Card key={c._id} className="flex items-center justify-between gap-3">
            <div><p className="font-medium text-sm">{c.title}</p><p className="text-fg/50 text-xs">{c.organization}</p></div>
            <div className="flex gap-2">
              <button onClick={() => { setEditing(c._id); setForm({ ...blank, ...c, issueDate: c.issueDate ? c.issueDate.slice(0, 10) : '', skills: (c.skills || []).join(', ') }); }} className="text-xs btn-outline px-3 py-1.5">Edit</button>
              <button onClick={async () => { if (confirm('Delete?')) { await portfolioAPI.deleteCertification(c._id); toast.success('Deleted'); load(); } }} className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400">Delete</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default AdminCertifications;