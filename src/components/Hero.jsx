import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton.jsx';
import { useLeadModal } from '../context/LeadModalContext.jsx';
import { HERO_CARDS, STATS } from '../data/site.js';

// Three.js is the heaviest dependency — keep it out of the initial bundle and
// only mount it where it earns its weight (desktop, motion allowed).
const Scene3D = lazy(() => import('./Scene3D.jsx'));

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { openTour } = useLeadModal();
  const root = useRef(null);
  const introPlayed = useRef(false);
  const [show3D, setShow3D] = useState(false);

  // Decide once, after mount, whether the device should carry the 3D scene.
  useEffect(() => {
    const heavy = window.matchMedia('(min-width: 861px) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setShow3D(heavy && !reduce);
  }, []);

  // Time-based cinematic intro. Runs once (StrictMode/HMR-safe). Explicit
  // set + to avoids immediateRender overlaps that can strand a staggered step.
  useLayoutEffect(() => {
    if (introPlayed.current) return;
    introPlayed.current = true;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    gsap.set(['.hero-kicker', '.hero-sub'], { opacity: 0, y: 24 });
    gsap.set('.hero-line span', { opacity: 0, yPercent: 120 });
    gsap.set('.hero-cta > *', { opacity: 0, y: 20 });
    gsap.set('.hero-stat', { opacity: 0, y: 18 });
    gsap.set('.hero-card', { opacity: 0, y: 40, rotateX: -12 });
    gsap.set('.scene-wrap', { opacity: 0, scale: 0.9 });
    gsap.set('.hero-watermark', { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.to('.hero-watermark', { opacity: 1, duration: 1.6 })
      .to('.scene-wrap', { opacity: 1, scale: 1, duration: 1.4 }, '-=1.4')
      .to('.hero-kicker', { opacity: 1, y: 0, duration: 0.8 }, '-=1.1')
      .to('.hero-line span', { opacity: 1, yPercent: 0, duration: 1.1, stagger: 0.12 }, '-=0.6')
      .to('.hero-sub', { opacity: 1, y: 0, duration: 0.9 }, '-=0.7')
      .to('.hero-cta > *', { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, '-=0.6')
      .to('.hero-card', { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.12 }, '-=0.7')
      .to('.hero-stat', { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, '-=0.6');
  }, []);

  // Scroll-driven parallax in a revertable context.
  useEffect(() => {
    const el = root.current;
    const ctx = gsap.context(() => {
      gsap.to('.hero-content', {
        yPercent: -14,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.scene-wrap', {
        yPercent: 16,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero-cards', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  // Mouse-driven depth. Writes --px/--py on the hero; decorative layers read them
  // (the GSAP-controlled layers are intentionally left untouched). Desktop only.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    };
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty('--px', cx.toFixed(4));
      el.style.setProperty('--py', cy.toFixed(4));
      raf = requestAnimationFrame(loop);
    };
    el.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      el.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" id="top" ref={root}>
      <span className="hero-watermark" aria-hidden="true">
        LANDMARK
      </span>
      <div className="scene-wrap" aria-hidden="true">
        <div className="hero-aurora" />
        <div className="hero-mesh" />
        {show3D && (
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        )}
      </div>

      <div className="container hero-content">

        <h1 className="hero-title">
          <span className="hero-line">
            <span>Invest in Landmark Living</span>
          </span>
          <span className="hero-line">
            <span className="gold-text">at Bahria Town Lahore</span>
          </span>
        </h1>
        <p className="hero-sub">
          Premium developments in Bahria Town — built on-time, invested with confidence.
        </p>

        <div className="hero-cta">
          <MagneticButton as="button" variant="primary" className="btn-lg" onClick={() => openTour()}>
            Book Free Consultation
          </MagneticButton>
          <MagneticButton href="#projects" variant="glass" className="btn-lg">
            View Projects
          </MagneticButton>
        </div>

        <ul className="hero-stats" aria-label="Key figures">
          {STATS.slice(0, 3).map((s) => (
            <li className="hero-stat" key={s.label}>
              <strong className="gold-text">
                {s.value}
                {s.suffix}
              </strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>

        <ul className="hero-cards" aria-label="Flagship projects">
          {HERO_CARDS.map((c) => (
            <li className={`hero-card tone-${c.tone}`} key={c.name}>
              <span className="hero-card-name">{c.name}</span>
              <span className="hero-card-meta">{c.meta}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
