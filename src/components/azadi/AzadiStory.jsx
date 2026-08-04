import { useRef } from 'react';
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
export default function AzadiStory({ onClaim }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

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
            src="/images/pakistan-ribbon-landmarks.webp"
            alt=""
            width="900"
            height="1359"
            loading="lazy"
            decoding="async"
          />
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
    </section>
  );
}
