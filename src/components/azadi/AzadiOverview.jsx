import { Reveal, RevealGroup, RevealItem } from '../Reveal.jsx';
import MagneticButton from '../MagneticButton.jsx';
import { useTilt } from '../../hooks/useTilt.js';
import { OVERVIEW } from '../../data/azadi.js';

function OverviewCard({ title, body }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt({ max: 7 });
  return (
    <RevealItem>
      <article
        ref={ref}
        className="az-ov-card"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <h3>{title}</h3>
        <p>{body}</p>
      </article>
    </RevealItem>
  );
}

export default function AzadiOverview({ onRegister }) {
  return (
    <section className="az-section az-overview" id="azadi-overview">
      <div className="container">
        <Reveal className="az-head">
          <p className="az-eyebrow">The Offer</p>
          <h2 className="az-title">{OVERVIEW.title}</h2>
          <p className="az-sub">{OVERVIEW.body}</p>
        </Reveal>

        <RevealGroup className="az-ov-grid" stagger={0.07}>
          {OVERVIEW.cards.map((c) => (
            <OverviewCard key={c.title} {...c} />
          ))}
        </RevealGroup>

        <Reveal className="az-section-cta" delay={0.1}>
          <MagneticButton
            as="button"
            type="button"
            variant="primary"
            className="btn-lg"
            onClick={onRegister}
          >
            {OVERVIEW.cta}
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
