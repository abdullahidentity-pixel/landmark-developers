import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticButton from '../MagneticButton.jsx';
import { WhatsAppIcon } from '../Icons.jsx';
import { CONTACT } from '../../data/site.js';
import { PROJECTS_DATA } from '../../data/projects.js';

export default function ProjsHero() {
  const root = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo('.pjidx-hero-kicker',  { opacity:0, y:20 }, { opacity:1, y:0, duration:0.7 })
      .fromTo('.pjidx-hero-title',   { opacity:0, y:48 }, { opacity:1, y:0, duration:1.1 }, '-=0.4')
      .fromTo('.pjidx-hero-sub',     { opacity:0, y:24 }, { opacity:1, y:0, duration:0.8 }, '-=0.65')
      .fromTo('.pjidx-hero-actions > *', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.6, stagger:0.1 }, '-=0.55')
      .fromTo('.pjidx-hero-chips > *',   { opacity:0, y:16 }, { opacity:1, y:0, duration:0.5, stagger:0.06 }, '-=0.4');
    return () => tl.kill();
  }, []);

  return (
    <section className="pjidx-hero" aria-labelledby="pjidx-hero-title">
      {/* Decorative orbs */}
      <div className="pjidx-hero-orb pjidx-orb-1" aria-hidden="true" />
      <div className="pjidx-hero-orb pjidx-orb-2" aria-hidden="true" />
      <div className="pjidx-hero-grid-lines" aria-hidden="true" />

      <div className="container pjidx-hero-inner">
        <p className="pjidx-hero-kicker eyebrow">The Complete Portfolio</p>

        <h1 id="pjidx-hero-title" className="pjidx-hero-title">
          Built for Lifestyle,<br />
          Location &amp; <span className="pjidx-gold-word">Long-Term Value</span>
        </h1>

        <p className="pjidx-hero-sub">
          Explore Landmark Developers' signature residential and commercial projects across
          Bahria Town Lahore and Islamabad — crafted with modern architecture, strategic
          locations, and on-time delivery.
        </p>

        <div className="pjidx-hero-actions">
          <MagneticButton href="#projects-grid" variant="primary" className="btn-lg">
            Explore Projects
          </MagneticButton>
          <a
            className="btn btn-whatsapp btn-lg"
            href={`${CONTACT.whatsappHref}?text=I'd like details on Landmark Developer projects.`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon width="20" height="20" /> WhatsApp for Details
          </a>
        </div>

        {/* Project name chips */}
        <ul className="pjidx-hero-chips" aria-label="Projects in this portfolio">
          {PROJECTS_DATA.map((p) => (
            <li key={p.slug}>
              <a href={`#card-${p.slug}`} className="pjidx-chip">
                {p.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Scroll prompt */}
      <div className="pjidx-scroll-prompt" aria-hidden="true">
        <span className="pjidx-scroll-line" />
        <span className="pjidx-scroll-text">Scroll</span>
      </div>
    </section>
  );
}
