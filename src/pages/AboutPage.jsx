import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSmoothScroll } from '../hooks/useSmoothScroll.js';
import CursorGlow from '../components/CursorGlow.jsx';
import FloatingWhatsApp from '../components/FloatingWhatsApp.jsx';
import MobileCTABar from '../components/MobileCTABar.jsx';
import Footer from '../components/Footer.jsx';
import InnerHeader from '../components/inner/InnerHeader.jsx';
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal.jsx';
import ProjectShowcaseScroll from '../components/inner/ProjectShowcaseScroll.jsx';
import { CONTACT } from '../data/site.js';
import '../styles/inner-pages.css';

/* ── Data ─────────────────────────────────────────────────── */

const STATS = [
  { value: 9,   suffix: '+',  label: 'Years of Excellence' },
  { value: 500, suffix: '+',  label: 'Units Delivered' },
  { value: 15,  suffix: '',   label: 'Successful Projects' },
  { value: 100, suffix: '%',  label: 'On-Time Delivery' },
];

const TIMELINE = [
  {
    years: '2011 — 2016',
    phase: 'Laying the Foundation',
    body: 'Landmark Developers was founded with a singular vision — to redefine Pakistan\'s real estate sector through quality, transparency, and trust. Early projects established our delivery record and earned the confidence of investors in Bahria Town.',
  },
  {
    years: '2017 — 2026',
    phase: 'Shaping the Skyline',
    body: 'A decade of scaling ambition. Landmark became a pioneer in high-rise development — introducing smartly planned towers with contemporary architecture, efficient layouts, and strong investment value across Bahria Town Lahore and Islamabad.',
  },
];

const PHILOSOPHY = [
  {
    title: 'Quality Construction',
    body: 'Every building is engineered to exceed specification, using premium materials and rigorous on-site quality control at every stage.',
  },
  {
    title: 'Strategic Locations',
    body: 'Prime addresses in Bahria Town Lahore and Islamabad — communities with proven appreciation, rental demand, and long-term value.',
  },
  {
    title: 'Modern Architecture',
    body: 'Contemporary design language that creates enduring visual appeal and highly efficient, comfortable living and working spaces.',
  },
  {
    title: 'Transparent Dealings',
    body: 'Clear pricing, honest timelines, and straightforward agreements — no hidden clauses, no last-minute surprises.',
  },
  {
    title: 'Long-Term Value',
    body: 'Projects are positioned for appreciation and consistent rental yields, attracting buyers seeking sustainable portfolio growth.',
  },
  {
    title: 'On-Time Completion',
    body: '500+ units delivered on schedule across 15 projects. With Landmark, on-time handover is a promise, not a hope.',
  },
];

/* ── Animated stat counter ─────────────────────────────────── */

function StatCounter({ value, suffix, label }) {
  const ref     = useRef(null);
  const started = useRef(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const dur = 1800;
        const t0  = performance.now();
        const tick = (now) => {
          const p      = Math.min((now - t0) / dur, 1);
          const eased  = 1 - Math.pow(1 - p, 3);
          setCount(Math.round(eased * value));
          if (p < 1) requestAnimationFrame(tick);
          else obs.disconnect();
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div className="about-stat" ref={ref}>
      <span className="about-stat-number">{count}{suffix}</span>
      <span className="about-stat-label">{label}</span>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────── */

export default function AboutPage() {
  useSmoothScroll();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'About Landmark Developers | Premium Real Estate in Bahria Town';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content',
      'Landmark Developers — 9+ years of excellence, 500+ units delivered, 15 successful projects. Pioneer in premium real estate across Bahria Town Lahore and Islamabad.'
    );
    return () => { document.title = 'Landmark Developers — Premium Living in Bahria Town Lahore'; };
  }, []);

  return (
    <div className="inner-page about-page">
      <CursorGlow />
      <InnerHeader />

      <main>
        {/* ── Hero ── */}
        <section className="ip-hero about-hero">
          <div className="ip-hero-bg" aria-hidden="true">
            <div className="ip-orb ip-orb-1" />
            <div className="ip-orb ip-orb-2" />
          </div>
          <div className="container ip-hero-inner">
            <Reveal>
              <p className="ip-label">About · Landmark Developers</p>
            </Reveal>
            <Reveal delay={0.07}>
              <h1 className="ip-hero-h1">
                Building Trust.<br />
                <span className="gold-word">Shaping Skylines.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="ip-hero-sub">
                Landmark Developers creates modern residential and commercial destinations built around
                quality, innovation, strategic locations, and on-time delivery.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Legacy Timeline ── */}
        <section className="ip-section">
          <div className="container">
            <Reveal><p className="ip-label">Our Journey</p></Reveal>
            <Reveal delay={0.07}>
              <h2 className="ip-section-h2">
                A decade of building<br />
                <span className="gold-word">what lasts.</span>
              </h2>
            </Reveal>

            <div className="about-timeline">
              <Reveal delay={0}>
                <div className="about-tl-item about-tl-item--left">
                  <span className="about-tl-years">{TIMELINE[0].years}</span>
                  <h3 className="about-tl-phase">{TIMELINE[0].phase}</h3>
                  <p className="about-tl-body">{TIMELINE[0].body}</p>
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="about-tl-item about-tl-item--right">
                  <span className="about-tl-years">{TIMELINE[1].years}</span>
                  <h3 className="about-tl-phase">{TIMELINE[1].phase}</h3>
                  <p className="about-tl-body">{TIMELINE[1].body}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="about-stats-section">
          <div className="about-stats-grid container">
            {STATS.map((s) => (
              <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </section>

        {/* ── Philosophy ── */}
        <section className="ip-section">
          <div className="container">
            <Reveal><p className="ip-label">What We Stand For</p></Reveal>
            <Reveal delay={0.07}>
              <h2 className="ip-section-h2">
                Our development<br />
                <span className="gold-word">philosophy.</span>
              </h2>
            </Reveal>
            <RevealGroup className="about-philosophy-grid" stagger={0.08}>
              {PHILOSOPHY.map((p, i) => (
                <RevealItem key={i} className="about-phil-card">
                  <span className="about-phil-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="about-phil-title">{p.title}</h3>
                  <p className="about-phil-body">{p.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ── Portfolio — scrolling image showcase ── */}
        <ProjectShowcaseScroll />

        {/* ── CTA ── */}
        <section className="ip-section ip-cta-section">
          <div className="container ip-cta-inner">
            <Reveal><p className="ip-label">Ready to Invest?</p></Reveal>
            <Reveal delay={0.08}>
              <h2 className="ip-cta-h2">
                Your next Landmark<br />
                <span className="gold-word">starts here.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="ip-cta-btns">
                <Link to="/projects" className="btn btn-primary btn-lg">
                  Explore Projects
                </Link>
                <a
                  href={CONTACT.whatsappHref}
                  className="btn btn-glass btn-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Now
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
