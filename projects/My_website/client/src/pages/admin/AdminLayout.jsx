import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Home } from 'lucide-react';
import { ADMIN_NAV_LINKS } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const onLogout = async () => { await logout(); navigate('/login'); };

  return (
    <div className="min-h-screen bg-darker flex">
      <aside className="w-60 border-r border-fg/10 p-4 hidden md:block">
        <Link to="/" className="flex items-center gap-2 mb-6 text-sm text-fg/60"><Home className="w-4 h-4" /> View site</Link>
        <p className="text-fg/50 text-xs mb-2">ADMIN · {user?.email}</p>
        <nav className="space-y-1">
          {ADMIN_NAV_LINKS.map(l => (
            <Link key={l.path} to={l.path} className={`block px-3 py-2 rounded-lg text-sm ${location.pathname === l.path ? 'bg-accent/20 text-accent' : 'text-fg/70 hover:bg-fg/5'}`}>{l.name}</Link>
          ))}
        </nav>
        <button onClick={onLogout} className="mt-6 text-sm text-red-400 flex items-center gap-2"><LogOut className="w-4 h-4" /> Logout</button>
      </aside>
      <main className="flex-1 p-6 max-w-6xl">
        <div className="md:hidden flex gap-2 flex-wrap mb-4">
          {ADMIN_NAV_LINKS.map(l => <Link key={l.path} to={l.path} className="text-xs bg-fg/5 px-3 py-1.5 rounded-full">{l.name}</Link>)}
        </div>
        <Outlet />
      </main>
    </div>
  );
};
export default AdminLayout;