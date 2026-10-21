import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import { useSkills } from '../hooks/usePortfolio';

const Skills = () => {
  const { grouped, loading } = useSkills();
  const cats = Object.keys(grouped || {});
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-2">Skills</h1>
      <p className="text-white/60 mb-6">Grouped by category. Manage from Admin panel.</p>
      {loading ? <Skeleton className="h-40" /> : cats.length ? (
        <div className="grid md:grid-cols-2 gap-5">
          {cats.map(cat => (
            <Card key={cat}>
              <h2 className="font-semibold mb-3">{cat}</h2>
              <div className="space-y-3">
                {(grouped[cat] || []).map(s => (
                  <div key={s._id}>
                    <div className="flex justify-between text-sm mb-1"><span>{s.name}</span><span className="text-white/50">{s.proficiency}%</span></div>
                    <div className="h-2 bg-white/10 rounded-full"><div className="h-2 bg-accent rounded-full" style={{ width: `${s.proficiency}%` }} /></div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      ) : <Card><p className="text-white/60 text-sm">No skills yet.</p></Card>}
      <div className="mt-6 flex gap-2"><Badge>Frontend</Badge><Badge>Backend</Badge><Badge>Databases</Badge><Badge>Cloud</Badge></div>
    </div>
  );
};
export default Skills;