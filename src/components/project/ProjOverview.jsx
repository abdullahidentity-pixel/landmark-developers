import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Reveal, RevealGroup, RevealItem } from '../Reveal.jsx';
import MagneticButton from '../MagneticButton.jsx';
import { useLeadModal } from '../../context/LeadModalContext.jsx';

const EASE = [0.22, 1, 0.36, 1];

export default function ProjOverview({ project }) {
  const { openTour } = useLeadModal();
  return (
    <section className="pj-overview" id="overview" aria-labelledby="overview-title">
      <div className="container pj-overview-inner">

        {/* Text column */}
        <Reveal className="pj-overview-text" y={40}>
          <p className="eyebrow">Project Overview</p>
          <h2 id="overview-title" className="pj-section-title">
            {project.displayName}
          </h2>
          <p className="pj-overview-desc">{project.aboutCopy}</p>

          <ul className="pj-overview-details" aria-label="Project details">
            <li>
              <span className="pj-detail-label">Type</span>
              <span className="pj-detail-value">{project.type}</span>
            </li>
            <li>
              <span className="pj-detail-label">Location</span>
              <span className="pj-detail-value">{project.locationDetail}</span>
            </li>
            <li>
              <span className="pj-detail-label">Status</span>
              <span className="pj-detail-value">{project.status}</span>
            </li>
            <li>
              <span className="pj-detail-label">Developer</span>
              <span className="pj-detail-value">Landmark Developers</span>
            </li>
          </ul>

          <MagneticButton as="button" variant="primary" onClick={() => openTour(project.name)}>
            Get Project Details
          </MagneticButton>
        </Reveal>

        {/* Image column */}
        <Reveal className="pj-overview-visual" y={50} delay={0.12}>
          <div className="pj-overview-img-wrap">
            <img
              src={project.heroImage}
              alt={`${project.displayName} render`}
              loading="lazy"
              decoding="async"
              onError={(e) => { e.currentTarget.src = project.localHero; }}
            />
            <div className="pj-overview-img-glare" aria-hidden="true" />
          </div>
          <div className="pj-overview-badge" aria-hidden="true">
            <span className="pj-overview-badge-text">{project.badge}</span>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
