import { Reveal } from '../Reveal.jsx';
import MagneticButton from '../MagneticButton.jsx';
import { useLeadModal } from '../../context/LeadModalContext.jsx';

export default function ProjConstruction({ project }) {
  const { openTour } = useLeadModal();
  return (
    <section className="pj-construction" id="construction" aria-labelledby="construction-title">
      <div className="container">
        <div className="pj-section-head">
          <p className="eyebrow">Progress</p>
          <h2 id="construction-title" className="pj-section-title">
            Construction update
          </h2>
        </div>

        <Reveal className="pj-construction-card" y={36}>
          <div className="pj-construction-visual" aria-hidden="true">
            <div className="pj-construction-rings">
              <div className="pj-ring pj-ring-1" />
              <div className="pj-ring pj-ring-2" />
              <div className="pj-ring pj-ring-3" />
            </div>
            <svg className="pj-construction-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="4" y="2" width="16" height="20" rx="1"/>
              <path d="M9 2v20M4 8h5M4 14h5M15 8h.01M15 14h.01M15 20h.01"/>
            </svg>
          </div>

          <div className="pj-construction-content">
            <h3 className="pj-construction-heading">Latest Construction Update</h3>
            <p className="pj-construction-body">
              Contact Landmark Developers directly for the latest construction updates,
              site photographs, and progress reports for {project.displayName}.
              Our team will share up-to-date media and detailed milestones on request.
            </p>
            <p className="pj-construction-sub">
              Landmark has a proven track record of 100% on-time delivery across 500+ units.
            </p>
          </div>

          <div className="pj-construction-actions">
            <MagneticButton as="button" variant="primary" onClick={() => openTour(project.name)}>
              Ask for Latest Update
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
