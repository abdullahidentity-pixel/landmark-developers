import { RevealGroup, RevealItem } from './Reveal.jsx';
import { useCounter } from '../hooks/useCounter.js';
import { STATS } from '../data/site.js';

function Stat({ value, suffix, label }) {
  const [ref, n] = useCounter(value);
  return (
    <RevealItem className="trust-stat">
      <div className="trust-value gold-text" ref={ref}>
        {n}
        <em>{suffix}</em>
      </div>
      <div className="trust-label">{label}</div>
    </RevealItem>
  );
}

export default function Trust() {
  return (
    <section className="trust" id="trust" aria-label="Track record">
      <div className="container">
        <RevealGroup className="trust-grid" stagger={0.12}>
          {STATS.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
