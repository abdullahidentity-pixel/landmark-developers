import { RevealGroup, RevealItem } from './Reveal.jsx';
import MagneticButton from './MagneticButton.jsx';
import { WhatsAppIcon } from './Icons.jsx';
import { useLeadModal } from '../context/LeadModalContext.jsx';
import { CONTACT } from '../data/site.js';

export default function FinalCTA() {
  const { openTour } = useLeadModal();
  return (
    <section className="final-cta" id="book">
      <span className="section-watermark center" aria-hidden="true">
        LANDMARK
      </span>
      <RevealGroup className="container final-inner" stagger={0.12}>
        <RevealItem as="h2" className="cta-title">
          Ready to explore your next <span className="gold-text">Landmark</span> investment?
        </RevealItem>
        <RevealItem as="p" className="cta-sub">
          Speak with Landmark Developers today and get project details, availability,
          and investment options.
        </RevealItem>
        <RevealItem className="cta-actions">
          <MagneticButton as="button" variant="primary" className="btn-lg" onClick={() => openTour()}>
            Book Free Consultation
          </MagneticButton>
          <a
            className="btn btn-whatsapp btn-lg"
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon width="20" height="20" /> WhatsApp {CONTACT.phoneDisplay}
          </a>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
