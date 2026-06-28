import { Reveal } from '../Reveal.jsx';
import MagneticButton from '../MagneticButton.jsx';
import { PhoneIcon, WhatsAppIcon } from '../Icons.jsx';
import { CONTACT } from '../../data/site.js';

export default function ProjsFinalCTA() {
  return (
    <section className="pjidx-final-cta" aria-labelledby="pjidx-fcta-title">
      <div className="pjidx-fcta-bg" aria-hidden="true">
        <div className="pjidx-fcta-orb" />
      </div>

      <div className="container pjidx-fcta-inner">
        <Reveal y={40}>
          <p className="eyebrow pjidx-fcta-eyebrow">Get Started Today</p>
          <h2 id="pjidx-fcta-title" className="pjidx-fcta-title">
            Speak to Landmark Developers Today
          </h2>
          <p className="pjidx-fcta-sub">
            Our investment team is available 6 days a week to answer your questions,
            share payment plans, and help you secure the right unit.
          </p>

          <div className="pjidx-fcta-actions">
            <MagneticButton
              href={CONTACT.phoneHref}
              variant="glass"
              className="btn-lg pjidx-fcta-phone"
            >
              <PhoneIcon width="20" height="20" />
              Call {CONTACT.phoneDisplay}
            </MagneticButton>

            <a
              className="btn btn-whatsapp btn-lg"
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon width="20" height="20" /> WhatsApp Now
            </a>

            <MagneticButton href="#enquire" variant="primary" className="btn-lg">
              Book Free Consultation
            </MagneticButton>
          </div>

          <p className="pjidx-fcta-timing">
            {CONTACT.timing} · {CONTACT.timingNote}
          </p>
          <p className="pjidx-fcta-office">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>
            </svg>
            {CONTACT.office}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
