import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Card from './ui/Card';
import Badge from './ui/Badge';
import { getLearningProjects } from '../data/projectCatalog';

const LearningProjectsSection = ({ limit, showHeading = true }) => {
  const list = limit ? getLearningProjects().slice(0, limit) : getLearningProjects();

  return (
    <section className="space-y-6">
      {showHeading && (
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Personal / Learning Projects — Scaler Academy</h2>
            <p className="text-fg/60 text-sm mt-1">Projects completed as part of learning and skill development</p>
          </div>
          {limit && (
            <Link to="/projects" className="text-accent text-sm inline-flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      )}
      <div className="grid md:grid-cols-3 gap-5">
        {list.map((p) => (
          <motion.div key={p.slug} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="h-full flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="accent">{p.badge || 'Learning Project'}</Badge>
                <span className="text-fg/40 text-xs">{p.year}</span>
              </div>
              <h3 className="font-semibold mb-1">{p.title}</h3>
              <p className="text-fg/40 text-xs mb-2">{p.category}</p>
              <p className="text-fg/60 text-sm mb-3 flex-1">{p.shortDescription}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {(p.technologies || []).slice(0, 5).map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
              <Link
                to={`/case-studies/${p.slug}`}
                className="btn-outline text-sm justify-center"
                aria-label={`View details for ${p.title}`}
              >
                View Details <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LearningProjectsSection;
