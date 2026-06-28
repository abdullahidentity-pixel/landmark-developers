/**
 * ProjectsNavDropdown
 * A Radix NavigationMenu-based "All Projects" dropdown for the site header.
 * Plain JSX — no TypeScript, no Tailwind. Styled via nav-dropdown.css tokens.
 */
import * as NavMenu from '@radix-ui/react-navigation-menu';
import { ChevronDown, ArrowUpRight, LayoutGrid, FileText, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/projects.js';

/* Quick-action footer links */
const QUICK = [
  { label: 'Compare Projects', href: '/projects#compare', Icon: LayoutGrid },
  { label: 'Brochures & Plans', href: '/projects#brochures', Icon: FileText },
  { label: 'Contact Team', to: '/contact', Icon: Phone },
];

export default function ProjectsNavDropdown() {
  return (
    <NavMenu.Root className="pnd-root" delayDuration={120} skipDelayDuration={400}>
      <NavMenu.List className="pnd-list">
        <NavMenu.Item>
          {/* ── Trigger ── */}
          <NavMenu.Trigger className="nav-link pnd-trigger" asChild={false}>
            All Projects
            <ChevronDown className="pnd-chevron" size={13} aria-hidden />
          </NavMenu.Trigger>

          {/* ── Dropdown content ── */}
          <NavMenu.Content className="pnd-content">
            {/* Header row */}
            <div className="pnd-header">
              <span className="pnd-header-label">Our Projects</span>
              <NavMenu.Link asChild>
                <Link to="/projects" className="pnd-view-all">
                  View all
                  <ArrowUpRight size={13} />
                </Link>
              </NavMenu.Link>
            </div>

            {/* Project cards strip */}
            <div className="pnd-cards">
              {PROJECTS_DATA.map((p) => (
                <NavMenu.Link key={p.slug} asChild>
                  <Link to={`/${p.slug}`} className="pnd-card">
                    {/* Image */}
                    <div className="pnd-card-img">
                      <img
                        src={p.heroImage || p.localHero}
                        alt={p.name}
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://placehold.co/280x180/1a1510/d9b878?text=${encodeURIComponent(p.name)}`;
                        }}
                      />
                      {/* Status badge inside image */}
                      <span className="pnd-card-status">{p.status}</span>
                    </div>

                    {/* Text */}
                    <div className="pnd-card-body">
                      <span className="pnd-card-badge">{p.badge}</span>
                      <span className="pnd-card-name">{p.name}</span>
                      <span className="pnd-card-loc">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        {p.location}
                      </span>
                    </div>
                  </Link>
                </NavMenu.Link>
              ))}
            </div>

            {/* Footer quick-action row */}
            <div className="pnd-footer">
              {QUICK.map(({ label, href, to, Icon }) =>
                to ? (
                  <NavMenu.Link key={label} asChild>
                    <Link to={to} className="pnd-quick">
                      <Icon size={14} className="pnd-quick-icon" />
                      {label}
                    </Link>
                  </NavMenu.Link>
                ) : (
                  <NavMenu.Link key={label} asChild>
                    <a href={href} className="pnd-quick">
                      <Icon size={14} className="pnd-quick-icon" />
                      {label}
                    </a>
                  </NavMenu.Link>
                )
              )}
            </div>
          </NavMenu.Content>
        </NavMenu.Item>
      </NavMenu.List>

      {/* Viewport: animated container that appears below the trigger */}
      <div className="pnd-viewport-positioner">
        <NavMenu.Viewport className="pnd-viewport" />
      </div>
    </NavMenu.Root>
  );
}
