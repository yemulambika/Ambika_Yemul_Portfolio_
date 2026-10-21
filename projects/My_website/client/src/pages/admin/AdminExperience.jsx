import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import { portfolioAPI } from '../../services/api';

const blankExp = { company: '', role: '', startDate: '', endDate: '', isCurrent: false, location: '', type: 'Full-time', responsibilities: '', achievements: '', technologies: '' };
const blankEdu = { institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', isCurrent: false, location: '', grade: '', description: '' };

const AdminExperience = () => {
  const [list, setList] = useState([]);
  const [edu, setEdu] = useState([]);
  const [form, setForm] = useState(blankExp);
  const [editing, setEditing] = useState(null);
  const [eduForm, setEduForm] = useState(blankEdu);
  const [eduEditing, setEduEditing] = useState(null);
  const load = async () => {
    const r = await portfolioAPI.getExperienceAdmin();
    setList(r.data.data || []);
    const e = await portfolioAPI.getEducationAdmin().catch(() => ({ data: { data: [] } }));
    setEdu(e.data.data || []);
  };
  useEffect(() => { load().catch(() => toast.error('Failed')); }, []);
  const save = async (e) => {
    e.preventDefault();
    const payload = { ...form, startDate: form.startDate || new Date().toISOString(), endDate: form.isCurrent ? null : (form.endDate || null), responsibilities: form.responsibilities.split('\n').map(s => s.trim()).filter(Boolean), achievements: form.achievements.split('\n').map(s => s.trim()).filter(Boolean), technologies: form.technologies.split(',').map(s => s.trim()).filter(Boolean) };
    try {
      if (editing) await portfolioAPI.updateExperience(editing, payload);
      else await portfolioAPI.createExperience(payload);
      toast.success('Saved'); setForm(blankExp); setEditing(null); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Save failed'); }
  };
  const saveEdu = async (e) => {
    e.preventDefault();
    const payload = { ...eduForm, startDate: eduForm.startDate || new Date().toISOString(), endDate: eduForm.isCurrent ? null : (eduForm.endDate || null) };
    try {
      if (eduEditing) await portfolioAPI.updateEducation(eduEditing, payload);
      else await portfolioAPI.createEducation(payload);
      toast.success('Education saved'); setEduForm(blankEdu); setEduEditing(null); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Save failed'); }
  };
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Experience & Education</h1>
      <Card>
        <form onSubmit={save} className="grid sm:grid-cols-2 gap-3">
          <input className="input" placeholder="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} required />
          <input className="input" placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required />
          <input className="input" type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} />
          <input className="input" type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} disabled={form.isCurrent} />
          <input className="input" placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
          <input className="input" placeholder="Tech (comma separated)" value={form.technologies} onChange={e => setForm({ ...form, technologies: e.target.value })} />
          <textarea className="input sm:col-span-2" rows={2} placeholder="Responsibilities (one per line)" value={form.responsibilities} onChange={e => setForm({ ...form, responsibilities: e.target.value })} />
          <textarea className="input sm:col-span-2" rows={2} placeholder="Achievements (one per line, verified only)" value={form.achievements} onChange={e => setForm({ ...form, achievements: e.target.value })} />
          <label className="text-sm text-white/70 flex items-center gap-2"><input type="checkbox" checked={form.isCurrent} onChange={e => setForm({ ...form, isCurrent: e.target.checked })} /> Current role</label>
          <div className="sm:col-span-2 flex gap-2"><button className="btn-primary text-sm">{editing ? 'Update' : 'Create'}</button>{editing && <button type="button" onClick={() => { setEditing(null); setForm(blankExp); }} className="btn-ghost text-sm">Cancel</button>}</div>
        </form>
      </Card>
      <div className="space-y-2">
        {list.map(x => (
          <Card key={x._id} className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium">{x.role} · {x.company}</p>
            <div className="flex gap-2">
              <button onClick={() => { setEditing(x._id); setForm({ company: x.company, role: x.role, startDate: x.startDate ? x.startDate.slice(0, 10) : '', endDate: x.endDate ? x.endDate.slice(0, 10) : '', isCurrent: !!x.isCurrent, location: x.location || '', type: x.type || 'Full-time', responsibilities: (x.responsibilities || []).join('\n'), achievements: (x.achievements || []).join('\n'), technologies: (x.technologies || []).join(', ') }); }} className="text-xs btn-outline px-3 py-1.5">Edit</button>
              <button onClick={async () => { if (confirm('Delete?')) { await portfolioAPI.deleteExperience(x._id); toast.success('Deleted'); load(); } }} className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400">Delete</button>
            </div>
          </Card>
        ))}
      </div>
      <Card><p className="text-sm text-white/60 mb-2">Education entries: {edu.length}</p><p className="text-xs text-white/40">Manage education via API for now; UI list shown on public pages.</p><Link to="/experience" className="text-accent text-sm">View public timeline</Link></Card>
      <Card>
        <h2 className="font-semibold mb-3">Education</h2>
        <form onSubmit={saveEdu} className="grid sm:grid-cols-2 gap-3 mb-4">
          <input className="input" placeholder="Institution" value={eduForm.institution} onChange={e => setEduForm({ ...eduForm, institution: e.target.value })} required />
          <input className="input" placeholder="Degree" value={eduForm.degree} onChange={e => setEduForm({ ...eduForm, degree: e.target.value })} required />
          <input className="input" placeholder="Field of study" value={eduForm.fieldOfStudy} onChange={e => setEduForm({ ...eduForm, fieldOfStudy: e.target.value })} />
          <input className="input" placeholder="Location" value={eduForm.location} onChange={e => setEduForm({ ...eduForm, location: e.target.value })} />
          <input className="input" type="date" value={eduForm.startDate} onChange={e => setEduForm({ ...eduForm, startDate: e.target.value })} />
          <input className="input" type="date" value={eduForm.endDate} onChange={e => setEduForm({ ...eduForm, endDate: e.target.value })} disabled={eduForm.isCurrent} />
          <input className="input" placeholder="Grade" value={eduForm.grade} onChange={e => setEduForm({ ...eduForm, grade: e.target.value })} />
          <textarea className="input" rows={2} placeholder="Description" value={eduForm.description} onChange={e => setEduForm({ ...eduForm, description: e.target.value })} />
          <label className="text-sm text-white/70 flex items-center gap-2"><input type="checkbox" checked={eduForm.isCurrent} onChange={e => setEduForm({ ...eduForm, isCurrent: e.target.checked })} /> Currently studying</label>
          <div className="sm:col-span-2 flex gap-2"><button className="btn-primary text-sm">{eduEditing ? 'Update' : 'Add'} Education</button>{eduEditing && <button type="button" onClick={() => { setEduEditing(null); setEduForm(blankEdu); }} className="btn-ghost text-sm">Cancel</button>}</div>
        </form>
        <div className="space-y-2">
          {edu.map(x => (
            <div key={x._id} className="flex items-center justify-between gap-3 border border-white/10 rounded-lg px-3 py-2">
              <p className="text-sm">{x.degree} · {x.institution}</p>
              <div className="flex gap-2">
                <button onClick={() => { setEduEditing(x._id); setEduForm({ institution: x.institution || '', degree: x.degree || '', fieldOfStudy: x.fieldOfStudy || '', startDate: x.startDate ? x.startDate.slice(0, 10) : '', endDate: x.endDate ? x.endDate.slice(0, 10) : '', isCurrent: !!x.isCurrent, location: x.location || '', grade: x.grade || '', description: x.description || '' }); }} className="text-xs btn-outline px-3 py-1.5">Edit</button>
                <button onClick={async () => { if (confirm('Delete?')) { await portfolioAPI.deleteEducation(x._id); toast.success('Deleted'); load(); } }} className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
export default AdminExperience;