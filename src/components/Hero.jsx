import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import sparklesAnimation from '../assets/sparkles-animation.json';
import { useScrollProgress } from '../hooks/useScrollProgress';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  const { scrollY } = useScrollProgress();
  const lottieRef = useRef(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.4);
    }
  }, []);
  const heroProgress = Math.min(scrollY / (typeof window !== 'undefined' ? window.innerHeight * 0.5 : 600), 1);

  return (
    <header className="hero" id="hero">
      <div className="hero__visual" aria-hidden="true" style={{ opacity: 0.50 * (1 - heroProgress) }}>
        <Lottie
          lottieRef={lottieRef}
          animationData={sparklesAnimation}
          loop
          autoplay
          className="hero__lottie"
          rendererSettings={{
            preserveAspectRatio: 'xMidYMid slice',
          }}
          style={{
            width: '100%',
            height: '100%',
            transform: 'rotate(90deg) scale(0.5)',
            transformOrigin: 'center center',
          }}
        />
      </div>

      <div className="hero__container">
        <motion.div
          className="hero__content"
          style={{
            opacity: 1 - heroProgress,
            transform: `translateY(${scrollY * 0.3}px) scale(${1 - heroProgress * 0.05})`,
          }}
        >
          <motion.p className="hero__greeting" variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            Hello, I'm
          </motion.p>
          <motion.h1 className="hero__title" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            Ashley<br />
            <span className="hero__title-accent">Marie</span>{' '}
            Pickett
          </motion.h1>
          <motion.p className="hero__subtitle" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            Graphic & UI/UX Designer
          </motion.p>
          <motion.p className="hero__description" variants={fadeUp} initial="hidden" animate="visible" custom={3}>
            I create brand identities from start to finish and design
            interfaces in Figma, Adobe, and Unity. With AI in my toolkit,
            I go beyond prototypes — I turn my designs into tangible,
            usable products ready for testing. From concept to something
            you can actually use, I handle the whole thing.
          </motion.p>
          <motion.div className="hero__actions" variants={fadeUp} initial="hidden" animate="visible" custom={4}>
            <a href="#work" className="btn btn--primary" onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }}>View My Work</a>
            <a href="#contact" className="btn btn--outline" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Get in Touch</a>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
