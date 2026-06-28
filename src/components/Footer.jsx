import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import { PhoneIcon, WhatsAppIcon, PinIcon } from './Icons.jsx';
import { NAV_LINKS, CONTACT, BRAND } from '../data/site.js';
import { PROJECTS_DATA } from '../data/projects.js';

/* ── Social icon SVGs ── */
const FbIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const IgIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const LiIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const TtIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.78a4.85 4.85 0 0 1-1.01-.09z"/>
  </svg>
);
const YtIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.95C5.12 20 12 20 12 20s6.88 0 8.6-.47a2.78 2.78 0 0 0 1.94-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#050403"/>
  </svg>
);

const SOCIALS = [
  { title: 'Facebook',  href: 'https://facebook.com',  from: '#1877F2', to: '#4fa3ff', Icon: FbIcon },
  { title: 'Instagram', href: 'https://instagram.com', from: '#833AB4', to: '#E1306C', Icon: IgIcon },
  { title: 'LinkedIn',  href: 'https://linkedin.com',  from: '#0A66C2', to: '#0099E5', Icon: LiIcon },
  { title: 'TikTok',   href: 'https://tiktok.com',    from: '#69C9D0', to: '#EE1D52', Icon: TtIcon },
  { title: 'YouTube',  href: 'https://youtube.com',   from: '#FF0000', to: '#ff6b6b', Icon: YtIcon },
];

function SocialPills() {
  return (
    <ul className="social-pills" aria-label="Follow us">
      {SOCIALS.map(({ title, href, from, to, Icon }) => (
        <li key={title}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-pill"
            style={{ '--sp-from': from, '--sp-to': to }}
            aria-label={title}
          >
            <span className="social-pill-gradient" aria-hidden="true" />
            <span className="social-pill-glow"     aria-hidden="true" />
            <span className="social-pill-icon"><Icon /></span>
            <span className="social-pill-label">{title}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>
              Modern residential and commercial spaces in Bahria Town Lahore.
              9+ years of on-time delivery and quality construction.
            </p>
            <SocialPills />
          </div>

          <div className="footer-col">
            <h4>Projects</h4>
            <ul>
              {PROJECTS_DATA.map((p) => (
                <li key={p.slug}>
                  <Link to={`/${p.slug}`}>{p.displayName}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  {isHome ? (
                    <a href={l.href}>{l.label}</a>
                  ) : (
                    <Link to={`/${l.href}`}>{l.label}</Link>
                  )}
                </li>
              ))}
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/team">Our Team</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={CONTACT.phoneHref}>
                  <PhoneIcon width="16" height="16" /> {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon width="16" height="16" /> WhatsApp
                </a>
              </li>
              <li className="footer-addr">
                <PinIcon width="16" height="16" /> {CONTACT.office}
              </li>
              <li className="footer-timing">
                {CONTACT.timing} · {CONTACT.timingNote}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-base">
          <span>© {year} {BRAND.name}. All rights reserved.</span>
          <span className="footer-legal">Bahria Town, Lahore · Pakistan</span>
        </div>
      </div>
    </footer>
  );
}
