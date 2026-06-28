import { Link } from 'react-router-dom';
import { Reveal, RevealGroup, RevealItem } from '../Reveal.jsx';
import MagneticButton from '../MagneticButton.jsx';
import { WhatsAppIcon } from '../Icons.jsx';
import { PROJECTS_DATA, PROJECT_INDEX_META } from '../../data/projects.js';
import { CONTACT } from '../../data/site.js';

function DocCard({ project }) {
  const meta = PROJECT_INDEX_META[project.slug] || {};
  const { brochureUrl, paymentPlanUrl } = meta.documents || {};
  const hasDocuments = brochureUrl || paymentPlanUrl;

  const waText = `Payment plan enquiry%0AProject: ${project.displayName}%0APlease share the latest payment plan and brochure.`;

  return (
    <RevealItem className="pjidx-doc-card" y={40}>
      {/* Project thumb */}
      <div className="pjidx-doc-img">
        <img
          src={project.heroImage}
          alt={project.displayName}
          loading="lazy"
          decoding="async"
          onError={(e) => { e.currentTarget.src = project.localHero; }}
        />
        <div className="pjidx-doc-img-overlay" />
        <span className="pjidx-doc-badge">{project.badge}</span>
      </div>

      <div className="pjidx-doc-body">
        <Link to={`/${project.slug}`} className="pjidx-doc-name">
          {project.displayName}
        </Link>
        <p className="pjidx-doc-location">{project.locationDetail}</p>

        {hasDocuments ? (
          /* ── Documents available ── */
          <div className="pjidx-doc-actions">
            {brochureUrl && (
              <a
                className="btn btn-glass btn-sm pjidx-doc-btn"
                href={brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Brochure
              </a>
            )}
            {paymentPlanUrl && (
              <a
                className="btn btn-primary btn-sm pjidx-doc-btn"
                href={paymentPlanUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
                View Payment Plan
              </a>
            )}
          </div>
        ) : (
          /* ── No documents yet — CTA ── */
          <div className="pjidx-doc-request">
            <p className="pjidx-doc-notice">
              Payment plans and availability are subject to confirmation from Landmark Developers.
            </p>
            <div className="pjidx-doc-actions">
              <a
                className="btn btn-glass btn-sm pjidx-doc-btn"
                href={`${CONTACT.whatsappHref}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon width="15" height="15" />
                Request Payment Plan
              </a>
              <Link to={`/${project.slug}`} className="btn btn-primary btn-sm pjidx-doc-btn">
                View Project
              </Link>
            </div>
          </div>
        )}
      </div>
    </RevealItem>
  );
}

export default function ProjectDocuments() {
  return (
    <section className="pjidx-docs" id="brochures" aria-labelledby="docs-title">
      <div className="container">
        <Reveal className="pjidx-section-head">
          <p className="eyebrow">Brochures &amp; Plans</p>
          <h2 id="docs-title" className="pjidx-section-title">
            Payment plans &amp; brochures
          </h2>
          <p className="pjidx-section-sub">
            Download official brochures and payment plans, or request the latest documentation
            directly from our investment team.
          </p>
        </Reveal>

        <RevealGroup className="pjidx-docs-grid" stagger={0.09}>
          {PROJECTS_DATA.map((project) => (
            <DocCard key={project.slug} project={project} />
          ))}
        </RevealGroup>

        {/* Global request CTA */}
        <Reveal className="pjidx-docs-footer" y={24}>
          <p>Can't find what you need? Our team has the latest documentation ready.</p>
          <MagneticButton
            href={`${CONTACT.whatsappHref}?text=Please send me brochures and payment plans for all Landmark projects.`}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >
            <WhatsAppIcon width="18" height="18" /> Request All Brochures
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
