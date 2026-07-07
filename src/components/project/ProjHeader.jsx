import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo.jsx';
import MagneticButton from '../MagneticButton.jsx';
import ProjectsNavDropdown from '../ProjectsNavDropdown.jsx';
import { useLeadModal } from '../../context/LeadModalContext.jsx';
import { PROJECTS_DATA } from '../../data/projects.js';
import { CONTACT } from '../../data/site.js';
import '../../styles/nav-dropdown.css';

const NAV_LEFT = [
  { label: 'Home',     type: 'link', to: '/' },
  { label: 'About Us', type: 'link', to: '/about' },
];
const NAV_RIGHT = [
  { label: 'Compare', type: 'href', href: '/projects#compare' },
  { label: 'Blog',    type: 'link', to: '/blog' },
  { label: 'Team',    type: 'link', to: '/team' },
];
const NAV_MOBILE = [
  { label: 'Home',         type: 'link', to: '/' },
  { label: 'About Us',     type: 'link', to: '/about' },
  { label: 'All Projects', type: 'link', to: '/projects' },
  { label: 'Compare',      type: 'href', href: '/projects#compare' },
  { label: 'Blog',         type: 'link', to: '/blog' },
  { label: 'Team',         type: 'link', to: '/team' },
];

export default function ProjHeader({ project }) {
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
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="Landmark Developers home">
          <Logo />
        </Link>

        <nav className="nav" aria-label="Primary">
          {NAV_LEFT.map((l) =>
            l.type === 'link' ? (
              <Link key={l.to} to={l.to} className="nav-link">{l.label}</Link>
            ) : (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            )
          )}

          {/* Same Radix-powered All Projects dropdown as main header */}
          <ProjectsNavDropdown />

          {NAV_RIGHT.map((l) =>
            l.type === 'link' ? (
              <Link key={l.to} to={l.to} className="nav-link">{l.label}</Link>
            ) : (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            )
          )}
        </nav>

        <div className="header-actions">
          <MagneticButton as="button" variant="primary" className="btn-sm header-cta" onClick={() => openTour(project.name)}>
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

      {/* Mobile drawer — mirrors main header */}
      <div className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav className="mobile-nav" aria-label="Mobile">
          {NAV_MOBILE.map((l, i) =>
            l.type === 'link' ? (
              <Link
                key={l.to}
                to={l.to}
                className="mobile-link"
                style={{ transitionDelay: `${0.06 * i + 0.05}s` }}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="mobile-link"
                style={{ transitionDelay: `${0.06 * i + 0.05}s` }}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            )
          )}
          {/* Other projects quick-jump */}
          <span className="mobile-link-sep" style={{ transitionDelay: '0.42s' }}>
            Other Projects
          </span>
          {PROJECTS_DATA.filter((p) => p.slug !== project.slug).map((p, i) => (
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
          <button className="btn btn-primary" onClick={() => { setOpen(false); openTour(project.name); }}>
            Register Interest
          </button>
          <a
            className="btn btn-glass"
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </header>
  );
}
