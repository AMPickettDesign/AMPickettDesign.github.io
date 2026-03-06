import { useState } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

export default function Nav() {
  const { scrollY, direction } = useScrollProgress();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = scrollY > 50;
  const hidden = direction === 'down' && scrollY > 200 && !menuOpen;

  const handleClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`nav ${scrolled ? 'scrolled' : ''} ${hidden ? 'hidden' : ''}`}
    >
      <div className="nav__container">
        <a href="#" className="nav__logo">AMP<span className="accent">.</span></a>
        <ul className={`nav__menu ${menuOpen ? 'open' : ''}`}>
          <li><a href="#work" className="nav__link" onClick={(e) => handleClick(e, 'work')}>Work</a></li>
          <li><a href="#about" className="nav__link" onClick={(e) => handleClick(e, 'about')}>About</a></li>
          <li><a href="#process" className="nav__link" onClick={(e) => handleClick(e, 'process')}>Process</a></li>
          <li><a href="#skills" className="nav__link" onClick={(e) => handleClick(e, 'skills')}>Skills</a></li>
          <li><a href="#contact" className="nav__link nav__link--cta" onClick={(e) => handleClick(e, 'contact')}>Let's Talk</a></li>
        </ul>
        <button
          className={`nav__toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
