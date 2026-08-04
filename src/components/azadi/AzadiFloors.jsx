import { Reveal, RevealGroup, RevealItem } from '../Reveal.jsx';
import MagneticButton from '../MagneticButton.jsx';
import { WhatsAppIcon } from '../Icons.jsx';
import AzadiDocButton from './AzadiDocButton.jsx';
import { FLOORS, WA_MESSAGES, AZADI_LAYOUT_PLAN_PDF_URL } from '../../data/azadi.js';
import { CONTACT } from '../../data/site.js';

const waHref = (msg) => `${CONTACT.whatsappHref}?text=${encodeURIComponent(msg)}`;

/**
 * The building read as a vertical journey.
 *
 * Desktop: a horizontal rail of cards with a connecting line — the eye travels
 * left-to-right the way the building stacks bottom-to-top.
 * Mobile: the same cards become a vertical timeline, which is the natural
 * orientation for a floor stack on a narrow screen.
 */
export default function AzadiFloors() {
  return (
    <section className="az-section az-floors" id="azadi-layout">
      <div className="container">
        <Reveal className="az-head">
          <p className="az-eyebrow">Layout & Floor Plan</p>
          <h2 className="az-title">Explore the Grand 15 Layout</h2>
          <p className="az-sub">
            From street-level brand outlets to nine floors of premium service
            apartments.
          </p>
        </Reveal>

        <RevealGroup className="az-floor-rail" stagger={0.1}>
          {FLOORS.map((f, i) => (
            <RevealItem className="az-floor-card" key={f.level}>
              <span className="az-floor-index" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="az-floor-level">{f.level}</span>
              <h3 className="az-floor-title">{f.title}</h3>
              <p className="az-floor-body">{f.body}</p>
              <span className="az-floor-node" aria-hidden="true" />
            </RevealItem>
          ))}
          <span className="az-floor-line" aria-hidden="true" />
        </RevealGroup>

        <Reveal className="az-section-cta az-section-cta--multi" delay={0.08}>
          <AzadiDocButton
            url={AZADI_LAYOUT_PLAN_PDF_URL}
            label="Grand 15 Layout Plan"
            variant="primary"
            className="btn-lg"
            fallbackMessage={WA_MESSAGES.layout}
          >
            View Layout Plan
          </AzadiDocButton>
          <a
            className="btn btn-whatsapp btn-lg"
            href={waHref(WA_MESSAGES.layout)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon width="18" height="18" />
            Ask About Available Units
          </a>
        </Reveal>
      </div>
    </section>
  );
}
