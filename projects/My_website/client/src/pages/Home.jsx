import { Link } from 'react-router-dom';
import { ArrowRight, Download, Mail, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import { useProfile, useProjects, useSkills, useExperience } from '../hooks/usePortfolio';
import { truncate } from '../utils/helpers';

const Home = () => {
  const { profile, loading: pL } = useProfile();
  const { projects, loading: prL } = useProjects({ limit: 6, featured: 'true' });
  const { grouped, loading: sL } = useSkills();
  const { experience } = useExperience();
  const flat = Object.values(grouped || {}).flat().slice(0, 12);
  const name = profile ? `${profile.firstName} ${profile.lastName}` : 'Full Stack Developer';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <section className="pt-10 grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {pL ? <Skeleton className="h-32" /> : (
            <>
              <Badge variant="accent">Available for opportunities</Badge>
              <h1 className="text-4xl sm:text-5xl font-bold mt-4 mb-3">Hi, I&apos;m <span className="gradient-text">{name}</span></h1>
              <p className="text-xl text-accent mb-3">{profile?.title || 'Full Stack Developer'}</p>
              <p className="text-white/70 mb-6">{profile?.shortBio || 'I build modern web apps with clean code.'}</p>
              <div className="flex flex-wrap gap-3">
                <Link to="/projects" className="btn-primary">View My Projects <ArrowRight className="w-4 h-4" /></Link>
                {profile?.resume && <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-outline"><Download className="w-4 h-4" /> Resume</a>}
                <Link to="/contact" className="btn-ghost"><Mail className="w-4 h-4" /> Contact</Link>
              </div>
              <div className="flex gap-3 mt-5 text-white/60">
                {profile?.socialLinks?.github && <a href={profile.socialLinks.github} target="_blank" rel="noreferrer"><Github className="w-5 h-5" /></a>}
                {profile?.socialLinks?.linkedin && <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer"><Linkedin className="w-5 h-5" /></a>}
              </div>
            </>
          )}
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="flex justify-center">
          <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-accent/30 bg-card flex items-center justify-center shadow-[0_0_60px_rgba(99,102,241,0.3)]">
            {profile?.avatar ? <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-5xl font-bold text-accent">FS</span>}
          </div>
        </motion.div>
      </section>
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Key Skills</h2>
          <Link to="/skills" className="text-accent text-sm">View all</Link>
        </div>
        {sL ? <Skeleton className="h-12" /> : <div className="flex flex-wrap gap-2">{flat.map(s => <Badge key={s._id} variant="accent">{s.name}</Badge>)}</div>}
      </section>
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <Link to="/projects" className="text-accent text-sm">View all</Link>
        </div>
        {prL ? <div className="grid md:grid-cols-3 gap-5">{[1, 2, 3].map(i => <Skeleton key={i} className="h-52" />)}</div> : (
          projects.length ? (
            <div className="grid md:grid-cols-3 gap-5">
              {projects.slice(0, 3).map(p => (
                <Card key={p._id}>
                  <h3 className="font-semibold mb-2">{p.title}</h3>
                  <p className="text-white/60 text-sm mb-3">{truncate(p.shortDescription || p.description, 110)}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">{(p.technologies || []).slice(0, 4).map(t => <Badge key={t}>{t}</Badge>)}</div>
                  <Link to={`/projects/${p._id}`} className="text-accent text-sm">View details</Link>
                </Card>
              ))}
            </div>
          ) : <Card><p className="text-white/60 text-sm">No featured projects yet — mark them featured in Admin → Projects.</p></Card>
        )}
      </section>
      <section className="grid md:grid-cols-2 gap-5">
        <Card>
          <h2 className="text-xl font-bold mb-3">Experience Highlights</h2>
          {experience.length ? (
            <ul className="space-y-2">
              {experience.slice(0, 3).map(e => <li key={e._id} className="text-sm text-white/70"><span className="text-white font-medium">{e.role}</span> · {e.company}</li>)}
            </ul>
          ) : <p className="text-white/50 text-sm">Experience will appear here.</p>}
          <Link to="/experience" className="text-accent text-sm mt-4 inline-block">View timeline</Link>
        </Card>
        <Card>
          <h2 className="text-xl font-bold mb-3">Explore More</h2>
          <div className="flex flex-wrap gap-2">
            <Link to="/about" className="btn-outline text-sm px-4 py-2">About</Link>
            <Link to="/skills" className="btn-outline text-sm px-4 py-2">Skills</Link>
            <Link to="/certifications" className="btn-outline text-sm px-4 py-2">Certifications</Link>
            <Link to="/resume" className="btn-outline text-sm px-4 py-2">Resume</Link>
          </div>
        </Card>
      </section>
    </div>
  );
};
export default Home;