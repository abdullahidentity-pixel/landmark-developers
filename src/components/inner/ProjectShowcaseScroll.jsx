import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../../data/projects.js';

/* ── Slide data pulled from the shared PROJECTS_DATA source ── */
const SLIDES = PROJECTS_DATA.map((p) => ({
  slug:        p.slug,
  name:        p.displayName || p.name,
  tagline:     p.tagline,
  badge:       p.badge,
  status:      p.status,
  location:    p.locationDetail || p.location,
  description: p.description,
  image:       p.heroImage || p.localHero,
}));

const N = SLIDES.length;

export default function ProjectShowcaseScroll() {
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);

  /* ── Scroll listener: maps window.scrollY → active slide index ── */
  useEffect(() => {
    const handleScroll = () => {
      const el = wrapRef.current;
      if (!el) return;

      const scrolled = -el.getBoundingClientRect().top;
      const totalH   = el.offsetHeight - window.innerHeight;

      if (scrolled <= 0)       { setActive(0);     return; }
      if (scrolled >= totalH)  { setActive(N - 1); return; }

      setActive(Math.min(N - 1, Math.floor((scrolled / totalH) * N)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    /* Also hook into Lenis if present */
    if (window.__lenis) window.__lenis.on('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (window.__lenis) window.__lenis.off('scroll', handleScroll);
    };
  }, []);

  /* ── Pagination click → smooth-scroll to that slide's position ── */
  const goTo = (i) => {
    const el = wrapRef.current;
    if (!el) return;

    const totalH  = el.offsetHeight - window.innerHeight;
    const stepH   = totalH / N;
    const targetY = el.offsetTop + stepH * i + 1;

    if (window.__lenis) {
      window.__lenis.scrollTo(targetY, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    /* outer div creates the scroll canvas; CSS var drives height */
    <div ref={wrapRef} className="pss-wrap" style={{ '--pss-n': N }}>
      <div className="pss-sticky">
        <div className="pss-grid">

          {/* ────────────── LEFT — text ────────────── */}
          <div className="pss-left">

            {/* top bar: pagination + counter */}
            <div className="pss-top-bar">
              <div className="pss-dots" role="tablist" aria-label="Project slides">
                {SLIDES.map((s, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`View ${s.name}`}
                    className={`pss-dot${i === active ? ' is-active' : ''}`}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>

              <p className="pss-counter" aria-live="polite">
                <span className="pss-counter-cur">{String(active + 1).padStart(2, '0')}</span>
                <span className="pss-counter-sep">/</span>
                <span className="pss-counter-tot">{String(N).padStart(2, '0')}</span>
              </p>
            </div>

            {/* animated text slides */}
            <div className="pss-slides" aria-live="polite">
              {SLIDES.map((slide, i) => (
                <div
                  key={slide.slug}
                  className={`pss-slide${i === active ? ' is-active' : ''}`}
                  aria-hidden={i !== active}
                >
                  <span className="pss-slide-badge">{slide.badge}</span>
                  <h3 className="pss-slide-name">{slide.name}</h3>
                  <p className="pss-slide-tagline">{slide.tagline}</p>
                  {slide.description && (
                    <p className="pss-slide-desc">{slide.description}</p>
                  )}
                  <p className="pss-slide-loc">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {slide.location}
                  </p>
                  <Link to={`/${slide.slug}`} className="pss-slide-cta">
                    View Project
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"/>
                      <polyline points="7 7 17 7 17 17"/>
                    </svg>
                  </Link>
                </div>
              ))}
            </div>

            {/* label at bottom */}
            <p className="pss-bottom-label">THE PORTFOLIO</p>
          </div>

          {/* ────────────── RIGHT — image strip ────────────── */}
          <div className="pss-right">
            <div className="pss-img-frame">
              {/* strip translated to reveal active image */}
              <div
                className="pss-img-strip"
                style={{ transform: `translateY(-${active * (100 / N)}%)` }}
              >
                {SLIDES.map((slide) => (
                  <div key={slide.slug} className="pss-img-item">
                    <img
                      src={slide.image}
                      alt={slide.name}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          `https://placehold.co/800x1000/1a1510/d9b878?text=${encodeURIComponent(slide.name)}`;
                      }}
                    />
                    {/* Gradient overlay at bottom for text legibility */}
                    <div className="pss-img-overlay" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
