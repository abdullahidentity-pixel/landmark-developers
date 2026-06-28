import { PhoneIcon, WhatsAppIcon } from './Icons.jsx';
import { CONTACT } from '../data/site.js';

/** Sticky bottom Call / WhatsApp / Book bar — mobile only (CSS-gated). */
export default function MobileCTABar() {
  return (
    <div className="mobile-cta-bar" role="region" aria-label="Quick contact">
      <a className="mcta mcta-call" href={CONTACT.phoneHref}>
        <PhoneIcon width="19" height="19" />
        Call
      </a>
      <a
        className="mcta mcta-wa"
        href={CONTACT.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon width="19" height="19" />
        WhatsApp
      </a>
      <a className="mcta mcta-book" href="#contact">
        Book
      </a>
    </div>
  );
}
