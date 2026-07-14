import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../MagneticButton.jsx';
import { WhatsAppIcon } from '../Icons.jsx';
import { useLeadModal } from '../../context/LeadModalContext.jsx';
import { CONTACT } from '../../data/site.js';

gsap.registerPlugin(ScrollTrigger);

/* ── Floating particles ── */
function HeroParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: `${4 + ((i * 6.7) % 92)}%`,
      bottom: `${(i * 13) % 28}%`,
      size: `${1.5 + (i % 3) * 0.7}px`,
      delay: `${(i * 0.65) % 6}s`,
      duration: `${5.5 + (i * 0.78) % 5}s`,
      drift: `${(i % 2 === 0 ? '' : '-')}${14 + (i * 11) % 30}px`,
    }))
  , []);

  return (
    <div className="pj-particles" aria-hidden="true">
      {particles.map(p => (
        <span
          key={p.id}
          className="pj-particle"
          style={{
            left: p.left,
            bottom: p.bottom,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            '--drift': p.drift,
          }}
        />
      ))}
    </div>
  );
}

export default function ProjHero({ project }) {
  const root = useRef(null);

  /* ── Cinematic intro ── */
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo('.pj-hero-img',
      { scale: 1.08, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.4 }
    )
    .fromTo('.pj-hero-badge',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.9')
    .fromTo('.pj-hero-name',    { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1   }, '-=0.5')
    .fromTo('.pj-hero-tagline', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.7')
    .fromTo('.pj-hero-meta',    { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.6')
    .fromTo('.pj-hero-actions > *', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, '-=0.5')
    .fromTo('.pj-hero-stats > *',   { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
    .fromTo('.pj-hero-cards > *',   { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }, '-=0.5');

    return () => tl.kill();
  }, []);

  /* ── Scroll parallax — desktop only ── */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    // Skip parallax on touch/mobile devices — causes layout gaps
    if (window.matchMedia('(max-width: 860px)').matches) return;

    const ctx = gsap.context(() => {
      gsap.to('.pj-hero-img', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.pj-hero-content', {
        yPercent: -10,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  /* ── Count-up for numeric stats — fires with intro timeline ── */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    // Delay matches roughly when stats animate in from the intro timeline (~1.6s)
    const timer = gsap.delayedCall(1.6, () => {
      el.querySelectorAll('.pj-hero-stat strong').forEach((node, i) => {
        const raw = node.textContent.trim();
        const match = raw.match(/([\d,]+)/);
        if (!match) return; // skip pure-text stats like "Theme Park"

        const numPart = parseInt(match[1].replace(/,/g, ''), 10);
        const pre = raw.slice(0, match.index);
        const suf = raw.slice(match.index + match[0].length);
        const fmt = (n) => n >= 1000 ? n.toLocaleString() : String(n);

        const obj = { v: 0 };
        gsap.to(obj, {
          v: numPart,
          duration: 1.6,
          delay: i * 0.18,
          ease: 'power3.out',
          onUpdate() { node.textContent = pre + fmt(Math.round(obj.v)) + suf; },
        });
      });
    });

    return () => timer.kill();
  }, []);

  const { openTour } = useLeadModal();
  const whatsappText =
    `New project enquiry%0AProject: ${project.displayName}%0APlease send me details.`;

  return (
    <section className="pj-hero" ref={root} aria-label={`${project.displayName} hero`}>

      {/* Floating gold particles */}
      <HeroParticles />

      {/* Ambient drifting orb */}
      <div className="pj-hero-amb" aria-hidden="true" />

      {/* Diagonal light sweep */}
      <div className="pj-hero-sweep" aria-hidden="true" />

      {/* Cinematic background */}
      <div className="pj-hero-bg" aria-hidden="true">
        <img
          className="pj-hero-img"
          src={project.heroImage}
          alt={`${project.displayName} render`}
          loading="eager"
          decoding="async"
          onError={(e) => { e.currentTarget.src = project.localHero; }}
          onLoad={() => ScrollTrigger.refresh()}
        />
        <div className="pj-hero-overlay" />
        <div className="pj-hero-vignette" />
      </div>

      {/* Content */}
      <div className="container pj-hero-content">
        <span className="pj-hero-badge eyebrow">{project.badge} · {project.type}</span>

        <h1 className="pj-hero-name">{project.displayName}</h1>
        <p className="pj-hero-tagline">{project.tagline}</p>

        <div className="pj-hero-meta">
          <span className="pj-hero-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>
            </svg>
            {project.locationDetail}
          </span>
          <span className={`pj-status-pill ${project.status === 'Completed' ? 'completed' : ''}`}>
            {project.status}
          </span>
        </div>

        <div className="pj-hero-actions">
          <MagneticButton as="button" variant="primary" className="btn-lg" onClick={() => openTour(project.name)}>
            Register Your Interest
          </MagneticButton>
          <a
            className="btn btn-whatsapp btn-lg"
            href={`${CONTACT.whatsappHref}?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp enquiry"
          >
            <WhatsAppIcon width="20" height="20" /> WhatsApp Now
          </a>
        </div>

        {/* Animated stat pills */}
        <ul className="pj-hero-stats" aria-label="Key figures">
          {project.stats.map((s, i) => (
            <li className="pj-hero-stat" key={s.label} style={{ '--stat-i': i }}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Floating detail cards bottom-right */}
      <div className="pj-hero-cards" aria-label="Project quick facts">
        <div className="pj-hero-card">
          <span className="pj-card-label">Project</span>
          <span className="pj-card-value">{project.name}</span>
        </div>
        <div className="pj-hero-card">
          <span className="pj-card-label">Location</span>
          <span className="pj-card-value">{project.location}</span>
        </div>
        <div className="pj-hero-card">
          <span className="pj-card-label">Status</span>
          <span className="pj-card-value">{project.status}</span>
        </div>
      </div>

      <div className="pj-hero-scroll" aria-hidden="true">
        <span className="pj-scroll-line" />
        <span className="pj-scroll-label">Scroll</span>
      </div>
    </section>
  );
}
