import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo.jsx';
import MagneticButton from '../MagneticButton.jsx';
import { CONTACT } from '../../data/site.js';

const NAV = [
  { label: 'Home',         to: '/' },
  { label: 'All Projects', to: '/projects' },
  { label: 'About Us',     to: '/about' },
  { label: 'Blog',         to: '/blog' },
  { label: 'Team',         to: '/team' },
  { label: 'Contact',      to: '/contact' },
];

export default function InnerHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const { pathname } = useLocation();

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
    <header className={`site-header inner-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="Landmark Developers home">
          <Logo />
        </Link>

        <nav className="nav" aria-label="Primary">
          {NAV.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link${pathname === l.to ? ' nav-link--active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <MagneticButton
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="btn-sm header-cta"
          >
            WhatsApp Us
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
        <nav className="mobile-nav" aria-label="Mobile">
          {NAV.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              className={`mobile-link${pathname === l.to ? ' is-active' : ''}`}
              style={{ transitionDelay: `${0.06 * i + 0.05}s` }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-foot">
          <a
            className="btn btn-primary"
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            WhatsApp Us
          </a>
          <a
            className="btn btn-glass"
            href={CONTACT.phoneHref}
            onClick={() => setOpen(false)}
          >
            Call Now
          </a>
        </div>
      </div>
    </header>
  );
}
