import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { FloatingSparkle } from './Decorations';

function AnimatedStat({ number, label, delay }) {
  return (
    <motion.div
      className="stat"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="stat__number">{number}</span>
      <span className="stat__label">{label}</span>
    </motion.div>
  );
}

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about__grid">
          <ScrollReveal>
            <div className="about__image">
              <div className="about__image-placeholder">
                <span>Your Photo</span>
              </div>
              {/* Decorative sparkle near the image */}
              <FloatingSparkle size={32} color="var(--color-accent)" style={{ top: '-20px', right: '-20px' }} delay={0.3} />
              <FloatingSparkle size={18} color="var(--color-purple-light)" style={{ bottom: '10%', left: '-15px' }} delay={0.5} />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="about__content">
              <p className="section-label">About Me</p>
              <h2 className="section-title">
                Designing with empathy,<br />delivering with precision.
              </h2>
              <p className="about__text">
                I recently graduated with a bachelor's in graphic design and a UX/UI
                certification, but I've been designing and building things for years.
                I approach every project like I'm still learning — because I am. I ask
                questions, I listen, and I don't pretend to know everything. That's what
                makes my work better every time.
              </p>
              <p className="about__text">
                Outside of design, you'll find me baking bread, keeping plants alive,
                or deep in a Dead by Daylight session with over 3,150 hours played.
                I also have three cats who keep me on my toes — Harrison, my 12-year-old
                Norwegian Forest Cat who thinks he runs the place, a 7-year-old
                with diabetes who's tougher than he looks, and a 2-year-old Siamese
                who has zero chill.
              </p>
              <div className="about__stats">
                <AnimatedStat number="10+" label="Projects Completed" delay={0} />
                <AnimatedStat number="3" label="Clients Served" delay={0.12} />
                <AnimatedStat number="BFA" label="Graphic Design" delay={0.24} />
              </div>
              <a href="#" className="btn btn--primary" download>Download Resume</a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
