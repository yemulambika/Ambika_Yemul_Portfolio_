import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { NAV_LINKS } from '../../utils/constants';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const linkCls = (path) =>
    location.pathname === path ? 'text-accent' : 'text-white/70 hover:text-white';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark/90 backdrop-blur-md border-b border-white/10 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Portfolio</span>
          </Link>
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <Link key={l.name} to={l.path} className={`text-sm font-medium transition-colors ${linkCls(l.path)}`}>
                {l.name}
              </Link>
            ))}
            {isAuthenticated && (
              <Link to="/admin/dashboard" className="text-xs bg-accent/10 text-accent px-3 py-1.5 rounded-full border border-accent/20 hover:bg-accent/20 transition-colors">
                Admin
              </Link>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme" className="p-2 rounded-lg border border-white/10 text-white/70 hover:text-white hover:bg-white/5">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            {!isAuthenticated ? (
              <Link to="/login" className="btn-outline text-sm hidden sm:inline-flex px-5 py-2">
                <User className="w-4 h-4" /> Login
              </Link>
            ) : (
              <Link to="/admin/dashboard" className="btn-outline text-sm hidden sm:inline-flex px-5 py-2">
                Dashboard
              </Link>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="text-white/70 hover:text-white md:hidden" aria-label="Toggle menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-dark/95 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {NAV_LINKS.map((l) => (
              <Link key={l.name} to={l.path} className="block px-4 py-3 text-base font-medium rounded-lg hover:bg-white/5 hover:text-accent transition-colors">
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;