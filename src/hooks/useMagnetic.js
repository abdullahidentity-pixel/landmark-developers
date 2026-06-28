import { useCallback, useRef } from 'react';

/**
 * Magnetic pull toward the pointer for premium buttons. Translates the element a
 * fraction of the cursor offset and eases back on leave. Disabled on coarse
 * pointers so taps stay precise on mobile.
 */
export function useMagnetic({ strength = 0.15 } = {}) {
  const ref = useRef(null);
  const raf = useRef(0);
  const coarse =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: none), (pointer: coarse)').matches;

  const onMove = useCallback(
    (e) => {
      if (coarse) return;
      const el = ref.current;
      if (!el) return;
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
    },
    [coarse, strength]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.transform = 'translate(0, 0)';
  }, []);

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}
