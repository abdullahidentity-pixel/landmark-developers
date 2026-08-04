import { motion } from 'framer-motion';
import { AZADI } from '../../data/azadi.js';

const EASE = [0.22, 1, 0.36, 1];

/**
 * The hero's right-hand column: building render and floating cards.
 *
 * The patriotism used to come from a separate graphic element floating over the
 * render — first a flag, then a glass emblem orb. Both had the same problem: a
 * national symbol pasted *next to* the building is decoration, and decoration
 * next to a product shot always reads as an overlay. The render now carries the
 * campaign itself — the Independence Day banner is on the tower, the flags are
 * on its balconies — so no separate symbol is needed, and the composition drops
 * from two competing focal points to one.
 *
 * Depth now comes from the render and the cards moving at different rates
 * against the same pointer signal: the render least, the cards most, because
 * they are nearest the viewer. Both read the --px/--py the hero publishes, so
 * the parallax costs two composited transforms and zero re-renders.
 */
export default function HeroParallaxVisual({ reduce = false }) {
  return (
    <div className="az-hero-visual">
      <motion.div
        className="az-render-wrap"
        initial={reduce ? false : { opacity: 0, scale: 1.08, y: 40 }}
        animate={reduce ? false : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
      >
        {/* `fetchpriority` is lowercase deliberately: React 18 doesn't map the
            camelCase form, so it warns and drops the attribute. */}
        <img
          className="az-render"
          src="/images/grand-15-azadi-hero.jpg"
          alt="Grand 15 at Bahria Downtown Lahore dressed for Independence Day, with a Pakistan flag banner on the tower and flags along the boulevard"
          width="1400"
          height="1050"
          fetchpriority="high"
          decoding="async"
        />
        <div className="az-render-fade" aria-hidden="true" />
      </motion.div>

      <div className="az-float-cards">
        {AZADI.heroCards.map((c, i) => (
          <motion.div
            className={`az-float-card az-float-card--${i + 1}`}
            key={c.title}
            initial={reduce ? false : { opacity: 0, y: 26, scale: 0.94 }}
            animate={reduce ? false : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.7 + i * 0.13 }}
          >
            <span className="az-float-title">{c.title}</span>
            <span className="az-float-meta">{c.meta}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
