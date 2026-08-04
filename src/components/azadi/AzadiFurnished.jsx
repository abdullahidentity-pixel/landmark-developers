import { Reveal, RevealGroup, RevealItem } from '../Reveal.jsx';
import { WhatsAppIcon } from '../Icons.jsx';
import { FURNISHED, WA_MESSAGES } from '../../data/azadi.js';
import { CONTACT } from '../../data/site.js';

const waHref = (msg) => `${CONTACT.whatsappHref}?text=${encodeURIComponent(msg)}`;

export default function AzadiFurnished() {
  return (
    <section className="az-section az-furnished" id="azadi-furnished">
      <div className="container az-furn-inner">
        <Reveal className="az-furn-copy">
          <p className="az-eyebrow">Furniture Package</p>
          <h2 className="az-title az-title--left">{FURNISHED.title}</h2>
          <p className="az-sub az-sub--left">{FURNISHED.sub}</p>
          <p className="az-furn-body">{FURNISHED.body}</p>

          <a
            className="btn btn-whatsapp btn-lg az-furn-cta"
            href={waHref(WA_MESSAGES.furniture)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon width="18" height="18" />
            {FURNISHED.cta}
          </a>
        </Reveal>

        <RevealGroup className="az-furn-grid" stagger={0.07}>
          {FURNISHED.cards.map((c) => (
            <RevealItem className="az-furn-card" key={c}>
              <span className="az-furn-tick" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none"
                  stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              {c}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
