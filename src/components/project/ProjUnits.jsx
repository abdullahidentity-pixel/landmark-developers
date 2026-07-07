import { RevealGroup, RevealItem } from '../Reveal.jsx';
import MagneticButton from '../MagneticButton.jsx';
import { useLeadModal } from '../../context/LeadModalContext.jsx';

// Unit type icons (compact SVG)
function UnitIcon({ type }) {
  const base = { width: 32, height: 32, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  if (type.includes('Studio'))
    return <svg {...base}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>;
  if (type.includes('One Bed'))
    return <svg {...base}><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9M10 8v9"/></svg>;
  if (type.includes('Two Bed'))
    return <svg {...base}><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9M10 8v9M14 8v9"/></svg>;
  if (type.includes('Commercial'))
    return <svg {...base}><path d="M4 9h16l-1 11H5L4 9z"/><path d="M4 9l1.5-4h13L20 9"/><path d="M9 13v3M15 13v3"/></svg>;
  if (type.includes('Corporate'))
    return <svg {...base}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
  if (type.includes('Hotel') || type.includes('Furnished'))
    return <svg {...base}><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/><circle cx="13" cy="13" r="1"/></svg>;
  return <svg {...base}><rect x="3" y="3" width="18" height="18" rx="2"/></svg>;
}

export default function ProjUnits({ project }) {
  const { openTour } = useLeadModal();
  return (
    <section className="pj-units" id="units" aria-labelledby="units-title">
      <div className="container">
        <div className="pj-section-head">
          <p className="eyebrow">Offering Types</p>
          <h2 id="units-title" className="pj-section-title">
            What's available at {project.name}
          </h2>
          <p className="pj-section-sub">
            A curated selection of residential and commercial opportunities for every investor profile.
          </p>
        </div>

        <RevealGroup className="pj-units-grid" stagger={0.1}>
          {project.units.map((u, i) => (
            <RevealItem key={u.type} className="pj-unit-card" y={44}>
              <div className="pj-unit-icon">
                <UnitIcon type={u.type} />
              </div>
              <div className="pj-unit-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="pj-unit-type">{u.type}</h3>
              <p className="pj-unit-detail">{u.detail}</p>
              <button className="pj-unit-cta" onClick={() => openTour(project.name)}>
                Enquire about availability
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="pj-units-note">
          <p>
            Pricing, availability, and floor plans are subject to confirmation from Landmark Developers.
          </p>
          <MagneticButton as="button" variant="primary" onClick={() => openTour(project.name)}>
            Send Me Project Details
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
