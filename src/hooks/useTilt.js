import { useCallback, useRef } from 'react';

/**
 * Pointer-driven 3D tilt for glass cards. Writes CSS custom properties
 * (--rx, --ry, --mx, --my) so the visual transform + glare live in CSS and stay
 * GPU-cheap. No-ops on coarse pointers; the stylesheet neutralises tilt there.
 */
export function useTilt({ max = 9 } = {}) {
  const ref = useRef(null);
  const raf = useRef(0);

  const onMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty('--ry', `${(px - 0.5) * max * 2}deg`);
        el.style.setProperty('--rx', `${(0.5 - py) * max * 2}deg`);
        el.style.setProperty('--mx', `${px * 100}%`);
        el.style.setProperty('--my', `${py * 100}%`);
      });
    },
    [max]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--rx', '0deg');
  }, []);

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}
