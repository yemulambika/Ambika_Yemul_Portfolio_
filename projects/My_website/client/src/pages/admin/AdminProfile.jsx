import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import { portfolioAPI } from '../../services/api';

const blank = { firstName: '', lastName: '', title: '', bio: '', shortBio: '', email: '', phone: '', location: '', avatar: '', resume: '', github: '', linkedin: '', twitter: '', website: '' };

const AdminProfile = () => {
  const [form, setForm] = useState(blank);
  useEffect(() => {
    portfolioAPI.getProfileAdmin().then(r => {
      const p = r.data.data;
      setForm({ firstName: p.firstName || '', lastName: p.lastName || '', title: p.title || '', bio: p.bio || '', shortBio: p.shortBio || '', email: p.email || '', phone: p.phone || '', location: p.location || '', avatar: p.avatar || '', resume: p.resume || '', github: p.socialLinks?.github || '', linkedin: p.socialLinks?.linkedin || '', twitter: p.socialLinks?.twitter || '', website: p.socialLinks?.website || '' });
    }).catch(() => {});
  }, []);
  const save = async (e) => {
    e.preventDefault();
    const payload = { firstName: form.firstName, lastName: form.lastName, title: form.title, bio: form.bio, shortBio: form.shortBio, email: form.email, phone: form.phone, location: form.location, avatar: form.avatar, resume: form.resume, socialLinks: { github: form.github, linkedin: form.linkedin, twitter: form.twitter, website: form.website } };
    try { await portfolioAPI.updateProfile(payload); toast.success('Profile saved'); }
    catch (err) { toast.error(err.response?.data?.message || 'Save failed'); }
  };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Profile & Settings</h1>
      <Card>
        <form onSubmit={save} className="grid sm:grid-cols-2 gap-3">
          <input className="input" placeholder="First name" value={form.firstName} onChange={set('firstName')} required />
          <input className="input" placeholder="Last name" value={form.lastName} onChange={set('lastName')} required />
          <input className="input sm:col-span-2" placeholder="Title" value={form.title} onChange={set('title')} required />
          <textarea className="input sm:col-span-2" rows={4} placeholder="Bio" value={form.bio} onChange={set('bio')} required />
          <input className="input sm:col-span-2" placeholder="Short bio" value={form.shortBio} onChange={set('shortBio')} />
          <input className="input" placeholder="Email" value={form.email} onChange={set('email')} required />
          <input className="input" placeholder="Phone" value={form.phone} onChange={set('phone')} />
          <input className="input" placeholder="Location" value={form.location} onChange={set('location')} />
          <input className="input" placeholder="Avatar URL" value={form.avatar} onChange={set('avatar')} />
          <input className="input" placeholder="Resume PDF URL" value={form.resume} onChange={set('resume')} />
          <input className="input" placeholder="GitHub" value={form.github} onChange={set('github')} />
          <input className="input" placeholder="LinkedIn" value={form.linkedin} onChange={set('linkedin')} />
          <input className="input" placeholder="Twitter" value={form.twitter} onChange={set('twitter')} />
          <input className="input" placeholder="Website" value={form.website} onChange={set('website')} />
          <div className="sm:col-span-2"><button className="btn-primary text-sm">Save Profile</button></div>
        </form>
      </Card>
    </div>
  );
};
export default AdminProfile;