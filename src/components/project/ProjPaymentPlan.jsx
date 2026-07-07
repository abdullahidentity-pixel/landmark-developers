import { Reveal } from '../Reveal.jsx';
import MagneticButton from '../MagneticButton.jsx';
import { WhatsAppIcon } from '../Icons.jsx';
import { PROJECT_INDEX_META } from '../../data/projects.js';
import { CONTACT as SITE_CONTACT } from '../../data/site.js';

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const PlanIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

export default function ProjPaymentPlan({ project }) {
  const meta = (typeof PROJECT_INDEX_META !== 'undefined' ? PROJECT_INDEX_META : {})[project.slug] || {};
  const docs = meta.documents || {};
  const { brochureUrl, paymentPlanUrl, commercialPaymentPlanUrl } = docs;
  const hasDocuments = brochureUrl || paymentPlanUrl;

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

          {hasDocuments ? (
            <>
              <h3 className="pj-payment-heading">Download Official Documents</h3>
              <p className="pj-payment-body">
                Official payment plans and brochures for {project.displayName} are available for
                immediate download. For the latest availability and pricing, contact our team directly.
              </p>

              <div className="pj-payment-doc-grid">
                {brochureUrl && (
                  <a
                    className="pj-payment-doc-item"
                    href={brochureUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="pj-payment-doc-icon" aria-hidden="true">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                      </svg>
                    </span>
                    <span className="pj-payment-doc-info">
                      <span className="pj-payment-doc-label">Floor Plan / Brochure</span>
                      <span className="pj-payment-doc-sub">PDF — Click to download</span>
                    </span>
                    <span className="pj-payment-doc-arrow" aria-hidden="true">
                      <DownloadIcon />
                    </span>
                  </a>
                )}

                {paymentPlanUrl && (
                  <a
                    className="pj-payment-doc-item pj-payment-doc-item--primary"
                    href={paymentPlanUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="pj-payment-doc-icon" aria-hidden="true">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2"/>
                        <line x1="8" y1="21" x2="16" y2="21"/>
                        <line x1="12" y1="17" x2="12" y2="21"/>
                      </svg>
                    </span>
                    <span className="pj-payment-doc-info">
                      <span className="pj-payment-doc-label">
                        {commercialPaymentPlanUrl ? 'Residential Payment Plan' : 'Payment Plan'}
                      </span>
                      <span className="pj-payment-doc-sub">PDF — Click to download</span>
                    </span>
                    <span className="pj-payment-doc-arrow" aria-hidden="true">
                      <DownloadIcon />
                    </span>
                  </a>
                )}

                {commercialPaymentPlanUrl && (
                  <a
                    className="pj-payment-doc-item pj-payment-doc-item--primary"
                    href={commercialPaymentPlanUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="pj-payment-doc-icon" aria-hidden="true">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2"/>
                        <line x1="8" y1="21" x2="16" y2="21"/>
                        <line x1="12" y1="17" x2="12" y2="21"/>
                      </svg>
                    </span>
                    <span className="pj-payment-doc-info">
                      <span className="pj-payment-doc-label">Commercial Payment Plan</span>
                      <span className="pj-payment-doc-sub">PDF — Click to download</span>
                    </span>
                    <span className="pj-payment-doc-arrow" aria-hidden="true">
                      <DownloadIcon />
                    </span>
                  </a>
                )}
              </div>

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
                  Register Interest
                </MagneticButton>
                <a
                  className="btn btn-whatsapp"
                  href={`${SITE_CONTACT.whatsappHref}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon width="18" height="18" /> WhatsApp Us
                </a>
              </div>
            </>
          ) : (
            <>
              <h3 className="pj-payment-heading">Request Latest Payment Plan</h3>
              <p className="pj-payment-body">
                Payment plans and current availability for {project.displayName} are subject to
                confirmation from Landmark Developers. Contact our team directly for the most
                accurate and up-to-date pricing, payment schedules, and installment options.
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
                  href={`${SITE_CONTACT.whatsappHref}?text=${waText}`}
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
                  Official Page
                </a>
              </div>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
