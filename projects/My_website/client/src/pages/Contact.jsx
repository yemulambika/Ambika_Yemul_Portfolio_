import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Card from '../components/ui/Card';
import Reveal from '../components/ui/Reveal';
import { portfolioAPI } from '../services/api';
import { useProfile } from '../hooks/usePortfolio';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [sending, setSending] = useState(false);
  const { profile } = useProfile();

  const onSubmit = async (data) => {
    setSending(true);
    try {
      await portfolioAPI.submitContact(data);
      toast.success('Message sent successfully!');
      reset();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to send message');
    } finally { setSending(false); }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      <Reveal>
        <h1 className="text-3xl font-bold mb-2">Contact</h1>
        <p className="text-fg/60 mb-6">Email: {profile?.email || 'hello@portfolio.com'}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div><label className="label">Name</label><input {...register('name', { required: 'Name required' })} className="input" />{errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}</div>
            <div><label className="label">Email</label><input {...register('email', { required: 'Email required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} className="input" />{errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}</div>
            <div><label className="label">Subject</label><input {...register('subject', { required: 'Subject required' })} className="input" />{errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}</div>
            <div><label className="label">Message</label><textarea rows={5} {...register('message', { required: 'Message required', minLength: { value: 10, message: 'Min 10 chars' } })} className="input" />{errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}</div>
            <button disabled={sending} className="btn-primary w-full justify-center">{sending ? 'Sending...' : 'Send Message'}</button>
          </form>
        </Card>
      </Reveal>
    </div>
  );
};
export default Contact;