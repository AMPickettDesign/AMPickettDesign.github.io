import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, filters } from '../data/portfolio';
import ScrollReveal from './ScrollReveal';

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.categories.includes(activeFilter));

  return (
    <section className="work" id="work">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <p className="section-label">Selected Work</p>
            <h2 className="section-title">Case Studies & Projects</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="work__filters">
            {filters.map((f) => (
              <button
                key={f.key}
                className={`work__filter ${activeFilter === f.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <motion.div className="work__grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                className="project-card"
                layout
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="project-card__image">
                  <div
                    className="project-card__placeholder"
                    style={{ background: project.gradient }}
                  >
                    <span>{project.link ? 'Project Image' : 'Coming Soon'}</span>
                  </div>
                  {project.link && (
                    <div className="project-card__overlay">
                      <a href={project.link} className="btn btn--small">View Project</a>
                    </div>
                  )}
                </div>
                <div className="project-card__info">
                  <span className="project-card__tag">{project.tag}</span>
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__desc">{project.description}</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
