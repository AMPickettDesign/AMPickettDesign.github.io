import { motion } from 'framer-motion';
import { skills } from '../data/portfolio';
import ScrollReveal from './ScrollReveal';

function SkillGroup({ title, items, delay }) {
  return (
    <motion.div
      className="skill-group"
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 className="skill-group__title">{title}</h3>
      <ul className="skill-group__list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <p className="section-label">Expertise</p>
            <h2 className="section-title">Skills & Tools</h2>
          </div>
        </ScrollReveal>
        <div className="skills__grid">
          <SkillGroup title="Technical Skills" items={skills.technical} delay={0} />
          <SkillGroup title="Tools" items={skills.tools} delay={0.12} />
          <SkillGroup title="Soft Skills" items={skills.soft} delay={0.24} />
        </div>
      </div>
    </section>
  );
}
