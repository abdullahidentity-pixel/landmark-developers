import { Reveal, RevealGroup, RevealItem } from '../Reveal.jsx';
import { AmenityIcon } from '../Icons.jsx';
import { AMENITIES, AMENITIES_HEAD } from '../../data/azadi.js';

export default function AzadiAmenities() {
  return (
    <section className="az-section az-amenities" id="azadi-amenities">
      <div className="az-amen-bg" aria-hidden="true" />
      <div className="container">
        <Reveal className="az-head">
          <p className="az-eyebrow">Lifestyle</p>
          <h2 className="az-title">{AMENITIES_HEAD.title}</h2>
          <p className="az-sub">{AMENITIES_HEAD.sub}</p>
        </Reveal>

        <RevealGroup className="az-amen-grid" stagger={0.05}>
          {AMENITIES.map((a) => (
            <RevealItem className="az-amen-card" key={a.label}>
              <span className="az-amen-icon" aria-hidden="true">
                <AmenityIcon name={a.icon} width="26" height="26" />
              </span>
              <span className="az-amen-label">{a.label}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
