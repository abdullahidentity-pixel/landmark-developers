import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo.jsx';
import MagneticButton from '../MagneticButton.jsx';
import { PROJECTS_DATA } from '../../data/projects.js';
import { CONTACT } from '../../data/site.js';

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
