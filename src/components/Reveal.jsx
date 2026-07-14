import { forwardRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Apple-style easing — long, soft settle.
const EASE = [0.22, 1, 0.36, 1];
// Positive bottom margin pre-triggers the reveal while the section is still
// below the fold, so content has finished animating in by the time the user
// actually scrolls to it — instead of appearing to "pop in" or go missing.
// `once: false` is deliberate self-healing: on some real-world setups (smooth-scroll
// libraries driving native scroll position, first-paint jank, slow asset load) the
// IntersectionObserver can miss its very first check and whileInView never fires,
// leaving content stuck at opacity:0 until a manual refresh. With `once: false`, any
// later scroll that re-intersects the element re-checks and reveals it — the content
// self-corrects instead of staying permanently invisible.
const VIEWPORT = { once: false, margin: '0px 0px 180px 0px' };

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
