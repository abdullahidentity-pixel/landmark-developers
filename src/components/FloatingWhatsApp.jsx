import { WhatsAppIcon } from './Icons.jsx';
import { CONTACT } from '../data/site.js';

/** Always-on-screen WhatsApp shortcut. CSS hides it on small screens where the
 *  mobile CTA bar already provides the same action.
 *
 *  `message` pre-fills the chat. Campaign pages pass their own so an enquiry
 *  arrives already identifying which campaign it came from; without it the link
 *  behaves exactly as before. */
export default function FloatingWhatsApp({ message }) {
  const href = message
    ? `${CONTACT.whatsappHref}?text=${encodeURIComponent(message)}`
    : CONTACT.whatsappHref;
  return (
    <a
      className="fab-whatsapp"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Landmark Developers on WhatsApp"
    >
      <span className="fab-pulse" aria-hidden="true" />
      <WhatsAppIcon width="26" height="26" />
    </a>
  );
}
