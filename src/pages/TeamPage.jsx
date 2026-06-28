import { useEffect } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll.js';
import CursorGlow from '../components/CursorGlow.jsx';
import FloatingWhatsApp from '../components/FloatingWhatsApp.jsx';
import MobileCTABar from '../components/MobileCTABar.jsx';
import Footer from '../components/Footer.jsx';
import InnerHeader from '../components/inner/InnerHeader.jsx';
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal.jsx';
import { CONTACT } from '../data/site.js';
import '../styles/inner-pages.css';

/* ── Data ─────────────────────────────────────────────────── */

const VALUES = [
  {
    title: 'Trust',
    body: 'Every commitment we make — on delivery, pricing, and quality — is one we intend to keep.',
    icon: (
      <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
    ),
  },
  {
    title: 'Transparency',
    body: 'Open communication with every buyer, investor, and partner — no hidden terms, no fine print surprises.',
    icon: (
      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
    ),
  },
  {
    title: 'Execution',
    body: '15 projects delivered. A culture built on doing what we say, when we say it, to the standard promised.',
    icon: (
      <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
    ),
  },
  {
    title: 'Client-First',
    body: 'Our consultation team guides every buyer from first enquiry to handover — with patience and expertise.',
    icon: (
      <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    ),
  },
];

const DEPARTMENTS = [
  {
    name: 'Leadership Team',
    label: 'Executive',
    desc: 'Guides the company vision, strategy, and long-term growth across all Landmark developments and markets.',
    count: 3,
  },
  {
    name: 'Sales & Consultation Team',
    label: 'Client-Facing',
    desc: 'Expert investment advisors who guide buyers through project selection, pricing, and payment plans.',
    count: 4,
  },
  {
    name: 'Project Development Team',
    label: 'Technical',
    desc: 'Architects, engineers, and site managers ensuring every project is delivered on time and on quality.',
    count: 4,
  },
  {
    name: 'Client Support Team',
    label: 'Post-Sale',
    desc: 'Dedicated post-handover support — addressing maintenance, documentation, and owner relations.',
    count: 3,
  },
];

/* ── Silhouette SVG ─────────────────────────────────────────── */

function Silhouette() {
  return (
    <div className="team-silhouette" aria-hidden="true">
      <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="19" r="13" />
        <path d="M4 56c0-13.255 10.745-24 24-24s24 10.745 24 24z" />
      </svg>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────── */

export default function TeamPage() {
  useSmoothScroll();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Our Team | Landmark Developers — Bahria Town Lahore';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content',
      'Meet the people behind Landmark Developers — a team built on trust, execution, and client-first service across all projects in Bahria Town Lahore and Islamabad.'
    );
    return () => { document.title = 'Landmark Developers — Premium Living in Bahria Town Lahore'; };
  }, []);

  return (
    <div className="inner-page team-page">
      <CursorGlow />
      <InnerHeader />

      <main>
        {/* ── Hero ── */}
        <section className="ip-hero">
          <div className="ip-hero-bg" aria-hidden="true">
            <div className="ip-orb ip-orb-1" />
            <div className="ip-orb ip-orb-2" />
          </div>
          <div className="container ip-hero-inner">
            <Reveal>
              <p className="ip-label">Our Team · Landmark Developers</p>
            </Reveal>
            <Reveal delay={0.07}>
              <h1 className="ip-hero-h1">
                The people behind<br />
                <span className="gold-word">Landmark's delivery.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="ip-hero-sub">
                Every project is backed by a dedicated team of advisors, engineers, and client partners
                focused on one thing — delivering what we promised.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Team Values ── */}
        <section className="ip-section">
          <div className="container">
            <Reveal><p className="ip-label">What Drives Us</p></Reveal>
            <Reveal delay={0.07}>
              <h2 className="ip-section-h2">
                Principles we<br />
                <span className="gold-word">operate by.</span>
              </h2>
            </Reveal>
            <RevealGroup className="team-values-grid" stagger={0.1}>
              {VALUES.map((v) => (
                <RevealItem key={v.title} className="team-val-card">
                  <div className="team-val-icon">{v.icon}</div>
                  <h3 className="team-val-title">{v.title}</h3>
                  <p className="team-val-body">{v.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ── Departments ── */}
        <section className="ip-section">
          <div className="container">
            <Reveal><p className="ip-label">Our Departments</p></Reveal>
            <Reveal delay={0.07}>
              <h2 className="ip-section-h2">
                Four teams.<br />
                <span className="gold-word">One standard.</span>
              </h2>
            </Reveal>

            <RevealGroup className="team-dept-grid" stagger={0.1}>
              {DEPARTMENTS.map((dept) => (
                <RevealItem key={dept.name} className="team-dept-card">
                  <div className="team-dept-avatars">
                    {Array.from({ length: dept.count }).map((_, i) => (
                      <Silhouette key={i} />
                    ))}
                  </div>
                  <div className="team-dept-info">
                    <p className="team-dept-label">{dept.label}</p>
                    <h3 className="team-dept-name">{dept.name}</h3>
                    <p className="team-dept-desc">{dept.desc}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.1}>
              <div className="team-profiles-note">
                <p>
                  <strong>Note:</strong> Individual team profiles will be published once official names
                  and photos are confirmed. For now, reach our consultation team directly via
                  WhatsApp or phone.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="ip-section ip-cta-section">
          <div className="container ip-cta-inner">
            <Reveal><p className="ip-label">Speak to Us</p></Reveal>
            <Reveal delay={0.08}>
              <h2 className="ip-cta-h2">
                Speak with Landmark's<br />
                <span className="gold-word">consultation team.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="ip-cta-btns">
                <a
                  href={CONTACT.whatsappHref}
                  className="btn btn-primary btn-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Now
                </a>
                <a href={CONTACT.phoneHref} className="btn btn-glass btn-lg">
                  Call {CONTACT.phoneDisplay}
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
      <MobileCTABar />
    </div>
  );
}
