import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { portfolioAPI } from '../../services/api';

const AdminMessages = () => {
  const [list, setList] = useState([]);
  const load = async () => { const r = await portfolioAPI.getContactMessages(); setList(r.data.data || []); };
  useEffect(() => { load().catch(() => toast.error('Failed')); }, []);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Messages ({list.length})</h1>
      {list.map(m => (
        <Card key={m._id}>
          <div className="flex gap-2 mb-2">{!m.isRead ? <Badge variant="featured">New</Badge> : <Badge>Read</Badge>}{m.isReplied && <Badge variant="accent">Replied</Badge>}</div>
          <p className="font-medium text-sm">{m.subject} — {m.name} ({m.email})</p>
          <p className="text-white/60 text-sm mt-1 whitespace-pre-line">{m.message}</p>
          <div className="flex gap-2 mt-3">
            <button onClick={async () => { await portfolioAPI.updateContactMessage(m._id, { isReplied: !m.isReplied, isRead: true }); load(); }} className="text-xs btn-outline px-3 py-1.5">Toggle replied</button>
            <button onClick={async () => { if (confirm('Delete?')) { await portfolioAPI.deleteContactMessage(m._id); toast.success('Deleted'); load(); } }} className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400">Delete</button>
          </div>
        </Card>
      ))}
      {!list.length && <Card><p className="text-white/60 text-sm">No messages yet.</p></Card>}
    </div>
  );
};
export default AdminMessages;