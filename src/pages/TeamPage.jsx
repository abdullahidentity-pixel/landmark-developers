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

/* ── Team data ──────────────────────────────────────────────── */

const LEADERSHIP = [
  {
    name: 'Ali Ubaid',
    title: 'Founder & Chairman',
    photo: '/team/ali-ubaid.png',
    bio: 'Founded Landmark Developers with a vision to redefine real estate standards in Pakistan. His leadership has driven 9+ years of on-time delivery and quality construction across Bahria Town Lahore and Islamabad.',
  },
  {
    name: 'Hussain Jamil',
    title: 'Chief Executive Officer',
    photo: '/team/hussain-jamil.png',
    bio: 'Leads Landmark\'s overall business strategy, project development pipeline, and investor relations. Hussain brings a client-first philosophy that has defined the company\'s growth and reputation.',
  },
];

const MANAGEMENT = [
  {
    name: 'Nadeem Lone',
    title: 'General Manager — Sales',
    photo: '/team/nadeem-lone.png',
    bio: 'Oversees the complete sales function across all active projects, ensuring every buyer receives expert guidance from first enquiry to handover.',
  },
];

const SALES_TEAM = [
  { name: 'Ahmad Jamil',     title: 'Director Sales', photo: '/team/ahmad-jamil.png' },
  { name: 'Ali Hamza',       title: 'Director Sales', photo: '/team/ali-hamza.png' },
  { name: 'Anas Jamil',      title: 'Sales Director', photo: '/team/anas-jamil.png' },
  { name: 'Muhammad Naeem',  title: 'Director Sales', photo: '/team/muhammad-naeem.png' },
  { name: 'Muhammad Waqas',  title: 'Director Sales', photo: '/team/muhammad-waqas.png' },
  { name: 'Iqra',            title: 'Director Sales', photo: '/team/iqra.png' },
  { name: 'Zahid',           title: 'Director Sales', photo: '/team/zahid.png' },
];

/* ── Page ─────────────────────────────────────────────────── */

export default function TeamPage() {
  useSmoothScroll();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Our Team | Landmark Developers — Bahria Town Lahore';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content',
      'Meet the leadership and sales team behind Landmark Developers — the people who have delivered 500+ units across Bahria Town Lahore and Islamabad.'
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
                From our chairman's founding vision to our sales directors' daily commitment —
                every member of the Landmark team is focused on one thing: delivering what we promised.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Leadership ── */}
        <section className="ip-section">
          <div className="container">
            <Reveal><p className="ip-label">Founders & Leadership</p></Reveal>
            <Reveal delay={0.07}>
              <h2 className="ip-section-h2">
                Vision at the<br />
                <span className="gold-word">top.</span>
              </h2>
            </Reveal>

            <RevealGroup className="team-leadership-grid" stagger={0.1}>
              {LEADERSHIP.map((m) => (
                <RevealItem key={m.name} className="team-leader-card">
                  <div className="team-leader-photo-wrap">
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="team-leader-photo"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                  <div className="team-leader-info">
                    <h3 className="team-leader-name">{m.name}</h3>
                    <p className="team-leader-title">{m.title}</p>
                    <p className="team-leader-bio">{m.bio}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ── Management ── */}
        <section className="ip-section">
          <div className="container">
            <Reveal><p className="ip-label">Senior Management</p></Reveal>
            <Reveal delay={0.07}>
              <h2 className="ip-section-h2">
                Running the<br />
                <span className="gold-word">operation.</span>
              </h2>
            </Reveal>

            <RevealGroup className="team-mgmt-grid" stagger={0.1}>
              {MANAGEMENT.map((m) => (
                <RevealItem key={m.name} className="team-leader-card">
                  <div className="team-leader-photo-wrap">
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="team-leader-photo"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                  <div className="team-leader-info">
                    <h3 className="team-leader-name">{m.name}</h3>
                    <p className="team-leader-title">{m.title}</p>
                    <p className="team-leader-bio">{m.bio}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ── Sales Team ── */}
        <section className="ip-section">
          <div className="container">
            <Reveal><p className="ip-label">Sales & Consultation</p></Reveal>
            <Reveal delay={0.07}>
              <h2 className="ip-section-h2">
                Your investment<br />
                <span className="gold-word">advisors.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="ip-section-sub">
                Our directors of sales guide every buyer from initial enquiry through payment plan selection,
                unit choice, and final handover — with honest, transparent advice at every step.
              </p>
            </Reveal>

            <RevealGroup className="team-sales-grid" stagger={0.08}>
              {SALES_TEAM.map((m) => (
                <RevealItem key={m.name} className="team-sales-card">
                  <div className="team-sales-photo-wrap">
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="team-sales-photo"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                  <div className="team-sales-info">
                    <h3 className="team-sales-name">{m.name}</h3>
                    <p className="team-sales-title">{m.title}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
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
