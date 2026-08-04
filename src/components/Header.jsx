import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import MagneticButton from './MagneticButton.jsx';
import ProjectsNavDropdown from './ProjectsNavDropdown.jsx';
import AzadiNavLink from './AzadiNavLink.jsx';
import { useLeadModal } from '../context/LeadModalContext.jsx';
import { CONTACT } from '../data/site.js';
import '../styles/nav-dropdown.css';

const NAV_LEFT = [
  { label: 'Home',     type: 'link', to: '/' },
  { label: 'About Us', type: 'link', to: '/about' },
];
const NAV_RIGHT = [
  { label: 'Compare',  type: 'link', to: '/projects#compare' },
  { label: 'Blog',     type: 'link', to: '/blog' },
  { label: 'Team',     type: 'link', to: '/team' },
];
/* Mobile only — full list */
const NAV_MOBILE = [
  { label: 'Home',         type: 'link', to: '/' },
  { label: 'About Us',     type: 'link', to: '/about' },
  { label: 'All Projects', type: 'link', to: '/projects' },
  { label: 'Compare',      type: 'link', to: '/projects#compare' },
  { label: 'Blog',         type: 'link', to: '/blog' },
  { label: 'Team',         type: 'link', to: '/team' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const { openTour } = useLeadModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Locking scroll with `overflow: hidden` alone doesn't reliably stop
  // touch-scroll/rubber-banding on iOS Safari — the page can still creep,
  // which reads as the drawer being "stuck" mid-way while the user scrolls.
  // Pinning body to a fixed position (and restoring the exact scroll offset
  // on close) blocks background scroll completely on every mobile browser.
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const startPath = window.location.pathname;
    const { style } = document.body;
    style.position = 'fixed';
    style.top = `-${scrollY}px`;
    style.left = '0';
    style.right = '0';
    style.overflow = 'hidden';
    return () => {
      style.position = '';
      style.top = '';
      style.left = '';
      style.right = '';
      style.overflow = '';
      // Only restore the previous scroll offset if the drawer was closed WITHOUT
      // navigating (e.g. tapping the X). If a nav link changed the route, the new
      // page must start at its hero — ScrollToTop already moved us there, and
      // restoring the old offset would drop the fresh page mid-section.
      if (window.location.pathname === startPath) {
        window.scrollTo(0, scrollY);
      }
    };
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
              <Link key={l.to} to={l.to} className="nav-link">
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className="nav-link">
                {l.label}
              </a>
            )
          )}

          {/* Radix-powered "All Projects" dropdown */}
          <ProjectsNavDropdown />

          {NAV_RIGHT.map((l) =>
            l.type === 'link' ? (
              <Link key={l.to} to={l.to} className="nav-link">
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className="nav-link">
                {l.label}
              </a>
            )
          )}

          {/* Last in the row on purpose: it is the only item here that expires,
              so it sits at the end of the permanent items rather than being
              threaded through them. */}
          <AzadiNavLink />
        </nav>

        <div className="header-actions">
          <MagneticButton as="button" variant="primary" className="btn-sm header-cta" onClick={() => openTour()}>
            Book a Tour
          </MagneticButton>
          <button
            className={`menu-toggle ${open ? 'is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
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
          <AzadiNavLink
            className="az-nav-pill--mobile"
            onClick={() => setOpen(false)}
          />
        </nav>
        <div className="mobile-menu-foot">
          <button className="btn btn-primary" onClick={() => { setOpen(false); openTour(); }}>
            Book a Tour
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
