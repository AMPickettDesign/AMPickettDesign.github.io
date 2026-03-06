import { useScrollProgress, useActiveSection } from '../hooks/useScrollProgress';
import { navSections } from '../data/portfolio';
import { useMemo } from 'react';

export default function SideNav() {
  const { scrollY, scrollPercent } = useScrollProgress();
  const sectionIds = useMemo(() => navSections.map((s) => s.id), []);
  const activeSection = useActiveSection(sectionIds);
  const visible = scrollY > 300;

  const handleClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`side-nav ${visible ? 'visible' : ''}`}>
      <div className="side-nav__line">
        <div className="side-nav__progress" style={{ height: `${scrollPercent}%` }} />
      </div>
      {navSections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`side-nav__dot ${activeSection === section.id ? 'active' : ''}`}
          onClick={(e) => handleClick(e, section.id)}
          aria-label={section.label}
        >
          <span className="side-nav__label">{section.label}</span>
        </a>
      ))}
    </nav>
  );
}
