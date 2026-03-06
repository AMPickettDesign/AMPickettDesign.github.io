import { motion } from 'framer-motion';

/* Four-point sparkle / diamond shape — like the Soul site */
export function Sparkle({ size = 24, color = 'var(--color-accent)', className = '', style = {} }) {
  return (
    <svg
      className={`sparkle ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      style={style}
    >
      <path d="M12 0C12 0 14 8 12 12C10 8 12 0 12 0ZM12 24C12 24 10 16 12 12C14 16 12 24 12 24ZM0 12C0 12 8 10 12 12C8 14 0 12 0 12ZM24 12C24 12 16 14 12 12C16 10 24 12 24 12Z" />
    </svg>
  );
}

/* Animated sparkle that fades/scales in on scroll */
export function FloatingSparkle({ size = 24, color = 'var(--color-accent)', delay = 0, style = {} }) {
  return (
    <motion.div
      className="floating-sparkle"
      style={{ position: 'absolute', ...style }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <Sparkle size={size} color={color} />
      </motion.div>
    </motion.div>
  );
}

/* Soft organic blob */
export function Blob({ color = 'var(--color-accent-subtle)', className = '', style = {} }) {
  return (
    <div className={`blob ${className}`} style={style}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill={color}>
        <path d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.2,-1.1C86.3,14.1,80,28.2,71.1,39.6C62.2,51,50.6,59.7,37.9,67.6C25.2,75.5,11.4,82.6,-2.4,86.3C-16.3,90.1,-32.5,90.5,-45.2,83.7C-57.9,76.8,-67,62.7,-74.2,48.1C-81.4,33.5,-86.6,18.3,-86.4,3.1C-86.2,-12.1,-80.6,-27.3,-72.1,-39.9C-63.6,-52.5,-52.2,-62.5,-39.2,-70.4C-26.2,-78.3,-11.6,-84.1,2.4,-87.9C16.3,-91.7,30.6,-83.5,44.7,-76.4Z" transform="translate(100 100)" />
      </svg>
    </div>
  );
}

/* Section divider — a full-width wave/organic shape */
export function SectionDivider({ variant = 'wave', flip = false }) {
  const transforms = flip ? 'scaleY(-1)' : '';

  if (variant === 'wave') {
    return (
      <div className="section-divider" style={{ transform: transforms }}>
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z"
            fill="var(--color-bg-alt)"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'curve') {
    return (
      <div className="section-divider" style={{ transform: transforms }}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0 80L1440 80V0C1200 70 960 90 720 60C480 30 240 70 0 40V80Z"
            fill="var(--color-bg-alt)"
          />
        </svg>
      </div>
    );
  }

  return null;
}

/* Quote/callout band — like the Soul site's inspirational quote section */
export function QuoteBand({ children }) {
  return (
    <motion.section
      className="quote-band"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1 }}
    >
      <div className="quote-band__inner">
        <FloatingSparkle size={32} color="var(--color-accent-light)" style={{ top: '15%', left: '8%' }} delay={0.2} />
        <FloatingSparkle size={20} color="var(--color-purple-light)" style={{ top: '25%', right: '12%' }} delay={0.4} />
        <FloatingSparkle size={16} color="var(--color-accent)" style={{ bottom: '20%', left: '15%' }} delay={0.6} />
        <motion.p
          className="quote-band__text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.p>
      </div>
    </motion.section>
  );
}
