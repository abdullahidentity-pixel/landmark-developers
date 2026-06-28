import { Reveal } from '../Reveal.jsx';
import MagneticButton from '../MagneticButton.jsx';
import { WhatsAppIcon } from '../Icons.jsx';
import { CONTACT } from '../../data/site.js';

export default function ProjPaymentPlan({ project }) {
  const waText = `Payment plan enquiry%0AProject: ${project.displayName}%0APlease share the latest payment plan.`;

  return (
    <section className="pj-payment" id="payment" aria-labelledby="payment-title">
      <div className="container">
        <div className="pj-section-head">
          <p className="eyebrow">Investment Structure</p>
          <h2 id="payment-title" className="pj-section-title">
            Payment plan &amp; brochure
          </h2>
        </div>

        <Reveal className="pj-payment-card" y={36}>
          <div className="pj-payment-icon" aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>

          <h3 className="pj-payment-heading">Request Latest Payment Plan</h3>
          <p className="pj-payment-body">
            Payment plans and current availability for {project.displayName} are subject to confirmation
            from Landmark Developers. Contact our team directly for the most accurate and up-to-date
            pricing, payment schedules, and installment options.
          </p>

          <div className="pj-payment-disclaimer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>
              Landmark Developers does not guarantee specific returns. All investment potential is
              indicative and subject to market conditions.
            </span>
          </div>

          <div className="pj-payment-actions">
            <MagneticButton href="#pj-contact" variant="primary">
              Request Payment Plan
            </MagneticButton>
            <a
              className="btn btn-whatsapp"
              href={`${CONTACT.whatsappHref}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon width="18" height="18" /> WhatsApp Us
            </a>
            <a
              className="btn btn-glass"
              href={project.officialPage}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Brochure
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
