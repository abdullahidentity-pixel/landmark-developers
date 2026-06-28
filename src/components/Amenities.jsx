import { RevealGroup, RevealItem } from './Reveal.jsx';
import { AmenityIcon, WhatsAppIcon } from './Icons.jsx';
import { AMENITIES, CONTACT } from '../data/site.js';

export default function Amenities() {
  return (
    <section className="amenities" id="amenities">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Lifestyle</p>
          <h2 className="section-title">Amenities worth coming home to</h2>
          <p className="section-sub">
            Every Landmark address is designed around comfort, wellness and convenience.
          </p>
        </div>

        <RevealGroup className="amenity-grid" stagger={0.06}>
          {AMENITIES.map((a) => (
            <RevealItem as="article" className="amenity-card" y={32} key={a.label}>
              <span className="amenity-icon">
                <AmenityIcon name={a.icon} width="30" height="30" />
              </span>
              <span className="amenity-label">{a.label}</span>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="amenities-cta">
          <a
            className="btn btn-whatsapp"
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon width="20" height="20" /> Ask about amenities
          </a>
        </div>
      </div>
    </section>
  );
}
