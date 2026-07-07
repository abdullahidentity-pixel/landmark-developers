import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo.jsx';
import MagneticButton from '../MagneticButton.jsx';
import { PROJECTS_DATA } from '../../data/projects.js';
import { CONTACT } from '../../data/site.js';

function ProjectsSwitcher({ currentSlug }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="pj-switcher" ref={ref}>
      <button
        className="nav-link pj-switcher-btn"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        All Projects
        <svg
          className={`pj-switcher-chevron ${open ? 'is-open' : ''}`}
          width="12" height="12" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="pj-switcher-drop" role="menu">
          <p className="pj-switcher-label">Switch Project</p>
          {PROJECTS_DATA.map((p) => (
            <Link
              key={p.slug}
              to={`/${p.slug}`}
              className={`pj-switcher-item ${p.slug === currentSlug ? 'is-active' : ''}`}
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              <img
                src={p.heroImage || p.localHero}
                alt={p.name}
                className="pj-switcher-thumb"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <span className="pj-switcher-info">
                <span className="pj-switcher-name">{p.name}</span>
                <span className="pj-switcher-status">{p.status}</span>
              </span>
              {p.slug === currentSlug && (
                <span className="pj-switcher-current" aria-label="Current project">●</span>
              )}
            </Link>
          ))}
          <Link to="/projects" className="pj-switcher-all" onClick={() => setOpen(false)}>
            View all projects →
          </Link>
        </div>
      )}
    </div>
  );
}

export default function ProjHeader({ project }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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

        <nav className="nav pj-nav" aria-label="Project navigation">
          <a href="#overview" className="nav-link">Overview</a>
          <a href="#highlights" className="nav-link">Highlights</a>
          <a href="#amenities" className="nav-link">Amenities</a>
          <a href="#units" className="nav-link">Units</a>
          <a href="#gallery" className="nav-link">Gallery</a>
          <a href="#pj-contact" className="nav-link">Contact</a>
          <ProjectsSwitcher currentSlug={project.slug} />
        </nav>

        <div className="header-actions">
          <MagneticButton href="#pj-contact" variant="primary" className="btn-sm header-cta">
            Register Interest
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

      {/* Mobile drawer */}
      <div className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav className="mobile-nav" aria-label="Mobile project navigation">
          {['overview','highlights','amenities','units','gallery','pj-contact'].map((id, i) => (
            <a
              key={id}
              href={`#${id}`}
              className="mobile-link"
              style={{ transitionDelay: `${0.06 * i + 0.05}s` }}
              onClick={() => setOpen(false)}
            >
              {id.replace('pj-', '').replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </a>
          ))}
          {/* Separator + other projects */}
          <span className="mobile-link-sep" style={{ transitionDelay: '0.42s' }}>Other Projects</span>
          {PROJECTS_DATA.filter((p) => p.slug !== project.slug).slice(0, 3).map((p, i) => (
            <Link
              key={p.slug}
              to={`/${p.slug}`}
              className="mobile-link"
              style={{ transitionDelay: `${0.48 + 0.06 * i}s` }}
              onClick={() => setOpen(false)}
            >
              {p.name}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-foot">
          <a className="btn btn-primary" href="#pj-contact" onClick={() => setOpen(false)}>
            Register Interest
          </a>
          <a className="btn btn-glass" href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer"
            onClick={() => setOpen(false)}>
            WhatsApp Us
          </a>
        </div>
      </div>
    </header>
  );
}
