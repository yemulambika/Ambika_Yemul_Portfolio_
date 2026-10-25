import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Sun, Moon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { NAV_LINKS } from '../../utils/constants';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const linkCls = (path) =>
    location.pathname === path ? 'text-accent' : 'text-fg/70 hover:text-fg';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark/90 backdrop-blur-md border-b border-fg/10 shadow-lg' : 'bg-transparent'}`}>
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
              <Link key={l.name} to={l.path} className={`text-sm font-medium transition-colors relative ${linkCls(l.path)}`}>
                {l.name}
                {location.pathname === l.path && (
                  <motion.span layoutId="nav-indicator" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full" />
                )}
              </Link>
            ))}
            {isAuthenticated && (
              <Link to="/admin/dashboard" className="text-xs bg-accent/10 text-accent px-3 py-1.5 rounded-full border border-accent/20 hover:bg-accent/20 transition-colors">
                Admin
              </Link>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg border border-fg/10 text-fg/70 hover:text-fg hover:bg-fg/5 transition-colors"
            >
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="inline-flex"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.span>
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
            <button onClick={() => setIsOpen(!isOpen)} className="text-fg/70 hover:text-fg md:hidden" aria-label="Toggle menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-dark/95 backdrop-blur-lg border-b border-fg/10"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {NAV_LINKS.map((l) => (
                <Link key={l.name} to={l.path} className="block px-4 py-3 text-base font-medium rounded-lg hover:bg-fg/5 hover:text-accent transition-colors">
                  {l.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;