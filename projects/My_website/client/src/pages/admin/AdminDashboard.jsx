import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import { portfolioAPI } from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ projects: 0, certifications: 0, messages: 0, unread: 0 });
  useEffect(() => {
    (async () => {
      try {
        const [p, c, m] = await Promise.all([
          portfolioAPI.getProjectsAdmin().catch(() => ({ data: { count: 0 } })),
          portfolioAPI.getCertificationsAdmin().catch(() => ({ data: { count: 0 } })),
          portfolioAPI.getContactStats().catch(() => ({ data: { data: {} } })),
        ]);
        setStats({ projects: p.data.count || 0, certifications: c.data.count || 0, messages: m.data.data?.total || 0, unread: m.data.data?.unread || 0 });
      } catch {}
    })();
  }, []);
  const cards = [
    { label: 'Projects', value: stats.projects, to: '/admin/projects' },
    { label: 'Certifications', value: stats.certifications, to: '/admin/certifications' },
    { label: 'Messages', value: stats.messages, to: '/admin/messages' },
    { label: 'Unread', value: stats.unread, to: '/admin/messages' },
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cards.map(c => <Card key={c.label}><p className="text-fg/50 text-sm">{c.label}</p><p className="text-3xl font-bold">{c.value}</p><Link to={c.to} className="text-accent text-sm">Manage</Link></Card>)}
      </div>
      <Card><p className="text-fg/60 text-sm">Run <code>npm run seed</code> in server to load sample profile, projects (Smart Bandobast 2025 + Bandobast Management System), skills, and Dream Care Developers experience. Change default admin password immediately.</p></Card>
    </div>
  );
};
export default AdminDashboard;