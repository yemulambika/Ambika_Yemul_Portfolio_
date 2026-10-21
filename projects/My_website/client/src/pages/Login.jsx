import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data);
      toast.success('Logged in!');
      navigate('/admin/dashboard');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-10">
      <Card>
        <h1 className="text-2xl font-bold mb-1">Admin Login</h1>
        <p className="text-white/60 text-sm mb-5">Default seeded: admin@portfolio.com / Admin123!@#</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div><label className="label">Email</label><input type="email" {...register('email', { required: 'Required' })} className="input" />{errors.email && <p className="text-red-400 text-xs mt-1">Required</p>}</div>
          <div><label className="label">Password</label><input type="password" {...register('password', { required: 'Required' })} className="input" />{errors.password && <p className="text-red-400 text-xs mt-1">Required</p>}</div>
          <button disabled={loading} className="btn-primary w-full justify-center">{loading ? 'Logging in...' : 'Login'}</button>
        </form>
        <Link to="/" className="text-accent text-sm mt-4 inline-block">Back to site</Link>
      </Card>
    </div>
  );
};
export default Login;