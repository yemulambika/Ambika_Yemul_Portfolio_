import { Link } from 'react-router-dom';
const NotFound = () => (
  <div className="max-w-xl mx-auto px-4 text-center pt-20">
    <h1 className="text-6xl font-bold gradient-text mb-3">404</h1>
    <p className="text-white/60 mb-6">Page not found.</p>
    <Link to="/" className="btn-primary">Go Home</Link>
  </div>
);
export default NotFound;