import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Reveal } from '../Reveal.jsx';
import MagneticButton from '../MagneticButton.jsx';
import { STORY } from '../../data/azadi.js';

/**
 * The emotional centrepiece — a patriotic tableau built around the ribbon
 * artwork: the flag furling through Minar-e-Pakistan, Faisal Mosque,
 * Mazar-e-Quaid and Badshahi.
 *
 * This section used to carry the national reference in its *background*: a
 * drawn lattice-tower silhouette and an SVG flag, both washed back to under 20%
 * opacity and bled off the edges so they read as atmosphere. That was the right
 * treatment for drawn stand-ins — they could not survive being looked at
 * directly. The real artwork can, so it is promoted to a foreground object with
 * its own column, and the two stand-ins are gone rather than left underneath
 * competing with it.
 *
 * Scroll drives a gentle counter-parallax between the artwork and the sky via
 * Framer's `useScroll`, which reads the scroll timeline rather than a scroll
 * listener — that keeps it smooth on iOS Safari, where scroll events are
 * throttled during momentum.
 */
/* Whether to run the cloth ripple.
 *
 * An animated SVG displacement map is genuinely expensive — it re-runs a
 * turbulence and a per-pixel displacement pass over the artwork on every frame,
 * which is more work than everything that was just stripped out of the hero to
 * stop Android struggling. So it is desktop-only, and it is off entirely under
 * `prefers-reduced-motion`: a rippling flag is exactly the kind of continuous
 * ambient movement that setting exists to stop.
 *
 * Read once on mount rather than subscribed to. A visitor who resizes a desktop
 * window down past the breakpoint keeps the ripple, which is the harmless
 * direction to be wrong in — the cost that matters is on phones, and phones do
 * not change width. */
function useClothRipple(reduce) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (reduce || typeof window.matchMedia !== 'function') return;
    setOn(window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 821px)').matches);
  }, [reduce]);
  return on;
}

export default function AzadiStory({ onClaim }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const ripple = useClothRipple(reduce);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Different rates per layer = depth.
  const ySky = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const yArt = useTransform(scrollYProgress, [0, 1], ['7%', '-7%']);

  return (
    <section className="az-section az-story" ref={ref} id="azadi-story">
      <div className="az-story-bg" aria-hidden="true">
        <motion.div className="az-story-sky" style={reduce ? undefined : { y: ySky }} />
        <div className="az-story-crescent" />
        <div className="az-story-vignette" />
      </div>

      <div className="container az-story-inner">
        {/* The artwork is decorative — every landmark in it is named in the copy
            beside it — so it carries an empty alt rather than a description that
            a screen reader would have to sit through twice.

            The source ships with a light studio backdrop and a "PAKISTAN"
            wordmark above the ribbon. Both are gone: the subject was lifted with
            Vision's foreground-instance matte, which keeps the white flag bands
            (a luminance key would have eaten them — they are the same brightness
            as the backdrop) and leaves the wordmark behind as non-subject. So
            there is no frame and no scrim here any more; the ribbon sits
            directly on the section's own ground. */}
        <motion.figure
          className="az-story-art"
          style={reduce ? undefined : { y: yArt }}
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          whileInView={reduce ? false : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            className="az-story-art-base"
            src="/images/pakistan-ribbon-landmarks.webp"
            alt=""
            width="900"
            height="1359"
            loading="lazy"
            decoding="async"
          />

          {/* ── The cloth ripple ────────────────────────────────────────────
              The artwork is one flat bitmap, so "animate the flag" means
              distorting pixels: an SVG turbulence feeding a displacement map,
              which is what actually reads as silk moving rather than as an
              image being wobbled.

              The catch is that a filter applies to the whole image, and this
              image is not all flag — Minar-e-Pakistan, Faisal Mosque,
              Mazar-e-Quaid and Badshahi sit in the middle of it, and rippling
              stone is instantly wrong. So the displaced copy is layered over
              the untouched one and masked to the periphery: an ellipse over
              the monuments stays transparent, and the mask ramps to opaque out
              at the two fabric tails. The buildings you see are always the
              original pixels; only the flag is ever displaced.

              The ramp is deliberately wide. A hard mask edge would show as a
              seam wherever the displacement pushed pixels across it. */}
          {ripple && (
            <img
              className="az-story-art-wave"
              src="/images/pakistan-ribbon-landmarks.webp"
              alt=""
              aria-hidden="true"
              width="900"
              height="1359"
              loading="lazy"
              decoding="async"
            />
          )}
        </motion.figure>

        <div className="az-story-copy">
          <Reveal>
            <p className="az-eyebrow">14 August · Independence Day</p>
            <h2 className="az-story-title">{STORY.title}</h2>
            <p className="az-story-body">{STORY.body}</p>
          </Reveal>

          {/* No countdown here. There is one at the foot of the hero, and now
              that this section follows the hero directly the two sat barely a
              screen apart — the same four ticking boxes twice in a row reads as
              a rendering bug rather than as urgency. The hero keeps it, because
              that one is above the fold and does its work at first paint. */}

          <Reveal delay={0.1}>
            <MagneticButton
              as="button"
              type="button"
              variant="primary"
              className="btn-lg az-story-cta"
              onClick={onClaim}
            >
              {STORY.cta}
            </MagneticButton>
          </Reveal>
        </div>
      </div>

      {/* The filter itself. Rendered only alongside the layer that uses it, so
          a phone never carries the definition at all.

          Two noise fields at different frequencies drive the displacement — a
          long slow one for the big swell running down the fabric, a shorter one
          for the small creases riding on top. Animating `baseFrequency` is what
          makes the wave travel; animating only the displacement `scale` would
          pulse in place, which reads as breathing rather than as wind. The
          numbers are small on purpose: at scale 18 on a ~420px render the fabric
          moves a few pixels, which is where cloth stops looking like cloth and
          starts looking like heat haze if you go further.

          `color-interpolation-filters="sRGB"` is not optional. The SVG default
          is linearRGB, and the filter would silently shift the flag's greens. */}
      {ripple && (
        <svg className="az-story-defs" aria-hidden="true" focusable="false">
          <defs>
            <filter
              id="az-flag-wave"
              x="-8%"
              y="-8%"
              width="116%"
              height="116%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.005 0.011"
                numOctaves="2"
                seed="9"
                result="noise"
              >
                <animate
                  attributeName="baseFrequency"
                  dur="17s"
                  values="0.005 0.011;0.008 0.009;0.006 0.013;0.005 0.011"
                  calcMode="spline"
                  keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="18"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}
    </section>
  );
}
