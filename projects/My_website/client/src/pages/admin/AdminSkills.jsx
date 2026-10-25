import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import { portfolioAPI } from '../../services/api';
import { SKILL_CATEGORIES } from '../../utils/constants';

const blank = { category: 'Frontend Development', name: '', proficiency: 70, description: '' };

const AdminSkills = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const load = async () => { const r = await portfolioAPI.getSkillsAdmin(); setList(r.data.data || []); };
  useEffect(() => { load().catch(() => toast.error('Failed')); }, []);
  const save = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, proficiency: Number(form.proficiency) };
      if (editing) await portfolioAPI.updateSkill(editing, payload);
      else await portfolioAPI.createSkill(payload);
      toast.success('Saved'); setForm(blank); setEditing(null); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Save failed'); }
  };
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Skills</h1>
      <Card>
        <form onSubmit={save} className="grid sm:grid-cols-2 gap-3">
          <select className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>{SKILL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select>
          <input className="input" placeholder="Skill name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <input className="input" type="number" min={0} max={100} value={form.proficiency} onChange={e => setForm({ ...form, proficiency: e.target.value })} />
          <input className="input" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <div className="sm:col-span-2 flex gap-2"><button className="btn-primary text-sm">{editing ? 'Update' : 'Create'}</button>{editing && <button type="button" onClick={() => { setEditing(null); setForm(blank); }} className="btn-ghost text-sm">Cancel</button>}</div>
        </form>
      </Card>
      <div className="space-y-2">
        {list.map(s => (
          <Card key={s._id} className="flex items-center justify-between gap-3">
            <div><p className="font-medium text-sm">{s.name} <span className="text-fg/40">· {s.category} · {s.proficiency}%</span></p></div>
            <div className="flex gap-2">
              <button onClick={() => { setEditing(s._id); setForm({ category: s.category, name: s.name, proficiency: s.proficiency, description: s.description || '' }); }} className="text-xs btn-outline px-3 py-1.5">Edit</button>
              <button onClick={async () => { if (confirm('Delete?')) { await portfolioAPI.deleteSkill(s._id); toast.success('Deleted'); load(); } }} className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400">Delete</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default AdminSkills;