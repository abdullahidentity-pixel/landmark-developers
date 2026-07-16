import { forwardRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Apple-style easing — long, soft settle.
const EASE = [0.22, 1, 0.36, 1];
// Positive bottom margin pre-triggers the reveal while the section is still
// below the fold, so content has finished animating in by the time the user
// actually scrolls to it — instead of appearing to "pop in" or go missing.
// `once: true` is deliberate: with `once: false` every time an element left and
// re-entered the viewport Framer re-ran the entrance, re-applying `transform:
// translateY` + a fresh opacity fade on each scroll pass. During fast mobile
// scrolling that reads as content repositioning, the contact layout appearing
// to flip, and a "flashback" flicker. Revealing once and then leaving the
// element alone keeps every section stable after it has appeared. The generous
// pre-trigger margin means the observer fires well before the element is on
// screen, so the earlier "missed first check" concern no longer applies.
const VIEWPORT = { once: true, margin: '0px 0px 180px 0px' };

/**
 * Single element that fades + rises into view on scroll. Falls back to a plain,
 * already-visible element when the user prefers reduced motion.
 */
export const Reveal = forwardRef(function Reveal(
  { as = 'div', y = 40, delay = 0, duration = 0.85, className, children, ...rest },
  ref
) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Tag = as;
    return (
      <Tag ref={ref} className={className} {...rest}>
        {children}
      </Tag>
    );
  }
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
});

/**
 * Container that orchestrates a staggered reveal of any RevealItem descendants.
 * The children inherit the "hidden"/"show" variant state by name.
 */
export const RevealGroup = forwardRef(function RevealGroup(
  { as = 'div', stagger = 0.06, delayChildren = 0.02, className, children, ...rest },
  ref
) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Tag = as;
    return (
      <Tag ref={ref} className={className} {...rest}>
        {children}
      </Tag>
    );
  }
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
});

/** A child of RevealGroup — rises in as part of the stagger. */
export const RevealItem = forwardRef(function RevealItem(
  { as = 'div', y = 34, className, children, ...rest },
  ref
) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Tag = as;
    return (
      <Tag ref={ref} className={className} {...rest}>
        {children}
      </Tag>
    );
  }
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
});
