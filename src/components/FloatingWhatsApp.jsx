import { WhatsAppIcon } from './Icons.jsx';
import { CONTACT } from '../data/site.js';

/** Always-on-screen WhatsApp shortcut. CSS hides it on small screens where the
 *  mobile CTA bar already provides the same action. */
export default function FloatingWhatsApp() {
  return (
    <a
      className="fab-whatsapp"
      href={CONTACT.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Landmark Developers on WhatsApp"
    >
      <span className="fab-pulse" aria-hidden="true" />
      <WhatsAppIcon width="26" height="26" />
    </a>
  );
}
