import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import Reveal from '../components/ui/Reveal';
import { useSkills } from '../hooks/usePortfolio';

const TECHS = [
  'React', 'JavaScript', 'TypeScript', 'Node.js', 'Express.js',
  'MongoDB', 'SQL', 'REST APIs', 'Git', 'Docker', 'AWS',
];

const Skills = () => {
  const { grouped, loading } = useSkills();
  const cats = Object.keys(grouped || {});
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <Reveal>
        <h1 className="text-3xl font-bold mb-2">Skills</h1>
        <p className="text-fg/60 mb-6">Grouped by category. Manage from Admin panel.</p>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="text-2xl font-bold mb-4">Core Technologies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {TECHS.map((t, i) => (
            <motion.div
              key={t}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full flex flex-col items-center justify-center text-center py-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
                  <span className="text-accent font-bold text-sm">{t.slice(0, 2).toUpperCase()}</span>
                </div>
                <p className="text-sm font-medium">{t}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Reveal>

      {loading ? <Skeleton className="h-40" /> : cats.length ? (
        <Reveal delay={0.15}>
          <div className="grid md:grid-cols-2 gap-5">
            {cats.map(cat => (
              <Card key={cat}>
                <h2 className="font-semibold mb-3">{cat}</h2>
                <div className="space-y-3">
                  {(grouped[cat] || []).map(s => (
                    <div key={s._id}>
                      <div className="flex justify-between text-sm mb-1"><span>{s.name}</span><span className="text-fg/50">{s.proficiency}%</span></div>
                      <div className="h-2 bg-fg/10 rounded-full"><div className="h-2 bg-accent rounded-full transition-all" style={{ width: `${s.proficiency}%` }} /></div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Reveal>
      ) : <Card><p className="text-fg/60 text-sm">No skills yet.</p></Card>}
      <div className="flex flex-wrap gap-2"><Badge>Frontend</Badge><Badge>Backend</Badge><Badge>Databases</Badge><Badge>Cloud</Badge></div>
    </div>
  );
};
export default Skills;