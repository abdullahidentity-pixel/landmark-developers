import { useEffect, useMemo, useRef } from 'react';
import { TESTIMONIALS } from '../data/testimonials.js';

/* ── Gold Google-style verify badge ── */
const VerifyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 48 48" aria-hidden="true">
    <polygon fill="#d9b878" points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884" />
    <polygon fill="#060504" points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926" />
  </svg>
);

/* ── Star row ── */
const Stars = () => (
  <div className="testi-m-stars" aria-label="5 stars">
    {[0,1,2,3,4].map(i => (
      <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M6 1l1.236 2.505L10 3.927l-2 1.951.472 2.752L6 7.38 3.528 8.63 4 5.878 2 3.927l2.764-.422L6 1z" fill="var(--gold)" />
      </svg>
    ))}
  </div>
);

/* ── Single marquee card ── */
const TeCard = ({ t }) => (
  <div className="testi-m-card">
    <div className="testi-m-header">
      <div className="testi-m-avatar">{t.initials}</div>
      <div className="testi-m-info">
        <div className="testi-m-name-row">
          <span className="testi-m-name">{t.name}</span>
          <VerifyIcon />
        </div>
        <span className="testi-m-role">{t.role} · {t.location}</span>
      </div>
    </div>
    <Stars />
    <p className="testi-m-quote">{t.quote}</p>
  </div>
);

/* ── One scrolling row ── */
function MarqueeRow({ data, reverse = false, speed = 32 }) {
  const doubled = useMemo(() => [...data, ...data], [data]);
  return (
    <div className="testi-m-track-wrap">
      <div className="testi-m-fade testi-m-fade--left" aria-hidden="true" />
      <div
        className="testi-m-track"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {doubled.map((t, i) => (
          <TeCard key={`${t.id}-${i}`} t={t} />
        ))}
      </div>
      <div className="testi-m-fade testi-m-fade--right" aria-hidden="true" />
    </div>
  );
}

/* ── Split reviews into two rows ── */
export default function Testimonials() {
  const half = Math.ceil(TESTIMONIALS.length / 2);
  const row1 = TESTIMONIALS.slice(0, half);
  const row2 = TESTIMONIALS.slice(half);
  /* if only one row of data, use same for both */
  const r1 = row1.length ? row1 : TESTIMONIALS;
  const r2 = row2.length ? row2 : TESTIMONIALS;

  // The two marquee rows are continuously-animating composited layers. On iOS
  // a running CSS animation competes with the scroll compositor, so scrolling
  // *through* this section felt slow, and left running for the whole page they
  // added drag everywhere else too. Rule: only animate when the section is on
  // screen AND the user isn't actively scrolling. The marquee resumes ~180ms
  // after scrolling settles, so the effect is fully visible at rest but never
  // fights a scroll gesture. Disabled entirely under reduced-motion.
  const sectionRef = useRef(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const tracks = el.querySelectorAll('.testi-m-track');
    const setState = (s) => tracks.forEach((t) => { t.style.animationPlayState = s; });

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setState('paused');
    if (reduce) return;

    let visible = false;
    let scrolling = false;
    let scrollTimer = 0;
    const apply = () => setState(visible && !scrolling ? 'running' : 'paused');

    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; apply(); },
      { rootMargin: '100px 0px' }
    );
    io.observe(el);

    const onScroll = () => {
      if (!scrolling) { scrolling = true; apply(); }
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => { scrolling = false; apply(); }, 180);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <section className="testimonials" id="testimonials" ref={sectionRef}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Client Stories</p>
          <h2 className="section-title">What our clients say</h2>
          <p className="section-sub">
            Real words from real investors and homeowners who have built with Landmark.
          </p>
        </div>
      </div>

      <div className="testi-marquee">
        <MarqueeRow data={r1} reverse={false} speed={28} />
        <MarqueeRow data={r2} reverse={true}  speed={34} />
      </div>

      <div className="container">
        <div className="testi-bottom">
          <div className="testi-aggregate">
            <span className="testi-agg-score">5.0</span>
            <div>
              <Stars />
              <span className="testi-agg-label">Based on Google reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
