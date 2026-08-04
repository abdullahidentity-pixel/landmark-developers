import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import MagneticButton from '../MagneticButton.jsx';
import { WhatsAppIcon } from '../Icons.jsx';
import AzadiCountdown from './AzadiCountdown.jsx';
import PatrioticBackgroundLayer from './PatrioticBackgroundLayer.jsx';
import HeroParallaxVisual from './HeroParallaxVisual.jsx';
import CampaignBadge from './CampaignBadge.jsx';
import AzadiDocButton from './AzadiDocButton.jsx';
import {
  AZADI,
  AZADI_DEADLINE_LABEL,
  AZADI_PAYMENT_PLAN_PDF_URL,
  WA_MESSAGES,
} from '../../data/azadi.js';
import { CONTACT } from '../../data/site.js';

const EASE = [0.22, 1, 0.36, 1];
const waHref = (msg) => `${CONTACT.whatsappHref}?text=${encodeURIComponent(msg)}`;

// The validity line gets its own CampaignBadge treatment, so it must not also
// appear as a plain pill in the badge row.
const PILL_BADGES = AZADI.badges.filter((b) => b !== AZADI_DEADLINE_LABEL);

/**
 * Cinematic campaign hero.
 *
 * Layered back-to-front: patriotic background (rays, map, tribute, landmark,
 * motif, dust, vignette) → emblem orb → building render → glass cards → copy.
 *
 * The parallax is pointer-driven through two CSS custom properties written on
 * this one root element. Every moving layer downstream reads --px/--py in its
 * own `transform`, so the entire effect costs one rAF loop writing two strings
 * and N composited transforms — no React re-render, no per-layer listener.
 */
export default function AzadiHero({ onRegister }) {
  const rootRef = useRef(null);
  const reduce = useReducedMotion();

  // Pointer parallax. Desktop only — on touch there is no cursor, so the
  // listener would never fire and the rAF loop would burn frames for nothing.
  useEffect(() => {
    if (reduce) return undefined;
    const el = rootRef.current;
    if (!el) return undefined;
    const fine =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return undefined;

    let raf = 0;
    const cur = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width - 0.5;
      target.y = (e.clientY - r.top) / r.height - 0.5;
    };
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      el.style.setProperty('--px', cur.x.toFixed(4));
      el.style.setProperty('--py', cur.y.toFixed(4));
      raf = requestAnimationFrame(tick);
    };
    el.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
    };
  }, [reduce]);

  const rise = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <section className="az-hero" ref={rootRef} aria-labelledby="az-hero-title">
      <PatrioticBackgroundLayer reduce={reduce} />

      <div className="container az-hero-inner">
        {/* ── Copy column ──────────────────────────────────────────── */}
        <div className="az-hero-copy">
          <motion.p className="az-kicker" {...rise(0.05)}>
            <span className="az-kicker-dot" aria-hidden="true" />
            {AZADI.heroKicker}
          </motion.p>

          <motion.h1 id="az-hero-title" className="az-hero-title" {...rise(0.14)}>
            <span className="az-title-word">{AZADI.heroTitle}</span>
          </motion.h1>

          <motion.p className="az-hero-statement" {...rise(0.24)}>
            {AZADI.heroStatement}
          </motion.p>

          <motion.p className="az-hero-sub" {...rise(0.32)}>
            {AZADI.heroSub}
          </motion.p>

          <motion.div className="az-badge-row" {...rise(0.4)}>
            <ul className="az-badges">
              {PILL_BADGES.map((b) => (
                <li className="az-badge" key={b}>
                  {b}
                </li>
              ))}
            </ul>
            <CampaignBadge />
          </motion.div>

          <motion.div className="az-hero-cta" {...rise(0.48)}>
            <MagneticButton
              as="button"
              type="button"
              variant="primary"
              className="btn-lg az-cta-primary"
              onClick={onRegister}
            >
              Register Your Interest
            </MagneticButton>
            {/* This button said "Download" but only scrolled the page down to
                the payment-plan section, where the visitor had to find the real
                download and click a second time. It now IS the download — the
                same gated AzadiDocButton used everywhere else on the page, so
                the lead is captured before the PDF is served. */}
            <AzadiDocButton
              url={AZADI_PAYMENT_PLAN_PDF_URL}
              label="Grand 15 Azadi Deal Payment Plan"
              variant="glass"
              className="btn-lg"
            >
              Download Special Payment Plan
            </AzadiDocButton>
            <a
              className="btn btn-whatsapp btn-lg"
              href={waHref(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon width="18" height="18" />
              WhatsApp Now
            </a>
          </motion.div>

          <motion.div className="az-hero-count" {...rise(0.56)}>
            <p className="az-count-lead">{AZADI.clockLine}</p>
            <AzadiCountdown />
          </motion.div>
        </div>

        {/* ── Visual column ────────────────────────────────────────── */}
        <HeroParallaxVisual reduce={reduce} />
      </div>

      <div className="az-hero-hairline" aria-hidden="true" />
    </section>
  );
}
