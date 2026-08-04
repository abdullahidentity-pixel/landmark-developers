import { useEffect, useRef } from 'react';

/**
 * Soft champagne glow that eases toward the cursor on desktop. Pure transform on
 * a fixed layer (no React re-renders). Skipped entirely on touch / reduced-motion.
 */
export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (coarse || reduce) return;

    const el = ref.current;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let raf = 0;

    // Once the glow has caught up with the cursor there is nothing left to
    // interpolate, and the loop is only rewriting the same transform. That is
    // not free: this is a 520px fixed layer with `mix-blend-mode: screen`, so
    // every write asks the compositor to re-blend it against whatever is
    // underneath. Idling out means a still cursor costs nothing at all, and the
    // next pointermove restarts the loop.
    const SETTLED = 0.15; // sub-pixel — below this the glow is not moving

    const loop = () => {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      if (el) el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      if (Math.abs(mx - cx) < SETTLED && Math.abs(my - cy) < SETTLED) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
