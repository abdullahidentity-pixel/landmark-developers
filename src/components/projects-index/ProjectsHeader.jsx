import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo.jsx';
import MagneticButton from '../MagneticButton.jsx';
import { PROJECTS_DATA } from '../../data/projects.js';
import { CONTACT } from '../../data/site.js';
import { useLeadModal } from '../../context/LeadModalContext.jsx';

export default function ProjectsHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openTour } = useLeadModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`site-header pj-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="Landmark Developers home">
          <Logo />
        </Link>

        <nav className="nav pj-nav" aria-label="Projects page navigation">
          <a href="#projects-grid" className="nav-link">All Projects</a>
          <a href="#compare" className="nav-link">Compare</a>
          <a href="#brochures" className="nav-link">Brochures</a>
          <a href="#enquire" className="nav-link">Enquire</a>
          <Link to="/" className="nav-link">← Home</Link>
        </nav>

        <div className="header-actions">
          <MagneticButton as="button" variant="primary" className="btn-sm header-cta" onClick={() => openTour()}>
            Get Recommendations
          </MagneticButton>
          <button
            className={`menu-toggle ${open ? 'is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span />
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav className="mobile-nav" aria-label="Mobile">
          {['projects-grid','compare','brochures','enquire'].map((id, i) => (
            <a key={id} href={`#${id}`} className="mobile-link"
              style={{ transitionDelay: `${0.06*i+0.05}s` }}
              onClick={() => setOpen(false)}>
              {id === 'projects-grid' ? 'All Projects' : id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
          <span className="mobile-link-sep" style={{ transitionDelay: '0.3s' }}>Individual Projects</span>
          {PROJECTS_DATA.map((p, i) => (
            <Link key={p.slug} to={`/${p.slug}`} className="mobile-link"
              style={{ transitionDelay: `${0.36+0.06*i}s` }}
              onClick={() => setOpen(false)}>
              {p.name}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-foot">
          <button className="btn btn-primary" onClick={() => { setOpen(false); openTour(); }}>
            Get Recommendations
          </button>
          <a className="btn btn-glass" href={CONTACT.whatsappHref}
            target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            WhatsApp Us
          </a>
        </div>
      </div>
    </header>
  );
}
