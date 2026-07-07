import { RevealGroup, RevealItem } from './Reveal.jsx';
import MagneticButton from './MagneticButton.jsx';
import { useLeadModal } from '../context/LeadModalContext.jsx';
import { WHY } from '../data/site.js';

export default function WhyLandmark() {
  const { openTour } = useLeadModal();
  return (
    <section className="why" id="why">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Why Landmark</p>
          <h2 className="section-title">Why investors choose Landmark</h2>
          <p className="section-sub">
            A trusted developer record, modern construction, and addresses engineered for returns.
          </p>
        </div>

        <RevealGroup className="why-grid" stagger={0.1}>
          {WHY.map((w, i) => (
            <RevealItem as="article" className="why-card" y={44} key={w.title}>
              <span className="why-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="why-title">{w.title}</h3>
              <p className="why-body">{w.body}</p>
            </RevealItem>
          ))}
          <RevealItem as="article" className="why-card why-cta-card" y={44}>
            <h3 className="why-title">See the numbers for yourself</h3>
            <p className="why-body">Get availability, pricing and projected returns in one call.</p>
            <MagneticButton as="button" variant="primary" className="btn-sm" onClick={() => openTour()}>
              Book Free Consultation
            </MagneticButton>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
