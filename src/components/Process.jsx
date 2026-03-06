import { motion } from 'framer-motion';
import { processSteps } from '../data/portfolio';
import ScrollReveal from './ScrollReveal';

const stepIcons = {
  '01': (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="20" r="16" />
      <circle cx="20" cy="20" r="6" />
      <line x1="20" y1="4" x2="20" y2="10" />
      <line x1="20" y1="30" x2="20" y2="36" />
      <line x1="4" y1="20" x2="10" y2="20" />
      <line x1="30" y1="20" x2="36" y2="20" />
    </svg>
  ),
  '02': (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="28" height="28" rx="4" />
      <line x1="6" y1="14" x2="34" y2="14" />
      <line x1="14" y1="14" x2="14" y2="34" />
      <circle cx="24" cy="24" r="4" />
    </svg>
  ),
  '03': (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 32L16 12L24 26L32 8" />
      <circle cx="16" cy="12" r="3" />
      <circle cx="24" cy="26" r="3" />
      <circle cx="32" cy="8" r="3" />
      <circle cx="8" cy="32" r="3" />
    </svg>
  ),
  '04': (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L34 14V26L20 34L6 26V14L20 6Z" />
      <polyline points="20,6 20,20 34,14" />
      <line x1="20" y1="20" x2="6" y2="14" />
      <line x1="20" y1="20" x2="20" y2="34" />
    </svg>
  ),
};

export default function Process() {
  return (
    <section className="process" id="process">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <p className="section-label">My Process</p>
            <h2 className="section-title">How I Work</h2>
          </div>
        </ScrollReveal>
        <div className="process__grid">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              className="process__step"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="process__icon">
                {stepIcons[step.number]}
              </div>
              <div className="process__number">{step.number}</div>
              <h3 className="process__title">{step.title}</h3>
              <p className="process__desc">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
