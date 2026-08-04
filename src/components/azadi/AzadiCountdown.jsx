import { useEffect, useState } from 'react';
import { azadiDeadline } from '../../data/azadi.js';

function diff(target, now) {
  const ms = target.getTime() - now.getTime();
  if (ms <= 0) return null;
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

/**
 * Live countdown to the end of 14 August.
 *
 * Ticks once per second and only re-renders when a displayed value actually
 * changes. The deadline is recomputed from `azadiDeadline()` so the component
 * stays correct across a year boundary without a code change.
 *
 * `expired` state is handled rather than ignored: once the window closes the
 * page must not keep promising a live offer, so we render a neutral
 * "enquiries still open" line instead of a row of zeroes.
 */
export default function AzadiCountdown({ compact = false }) {
  const [target] = useState(() => azadiDeadline());
  const [left, setLeft] = useState(() => diff(target, new Date()));

  useEffect(() => {
    const id = setInterval(() => setLeft(diff(target, new Date())), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!left) {
    return (
      <p className="az-count-expired">
        The Azadi Deal window has closed — enquiries are still open for current
        Grand 15 availability.
      </p>
    );
  }

  const cells = [
    { v: left.days, l: left.days === 1 ? 'Day' : 'Days' },
    { v: left.hours, l: 'Hours' },
    { v: left.minutes, l: 'Minutes' },
    { v: left.seconds, l: 'Seconds' },
  ];

  return (
    <div className={`az-count ${compact ? 'az-count--compact' : ''}`}>
      {cells.map((c, i) => (
        <div className="az-count-cell" key={c.l}>
          <span className="az-count-num">{String(c.v).padStart(2, '0')}</span>
          <span className="az-count-lbl">{c.l}</span>
          {i < cells.length - 1 && <span className="az-count-sep" aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}
