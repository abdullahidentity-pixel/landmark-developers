import { RevealGroup, RevealItem } from '../Reveal.jsx';
import { AmenityIcon } from '../Icons.jsx';
import MagneticButton from '../MagneticButton.jsx';
import { useLeadModal } from '../../context/LeadModalContext.jsx';

const AMENITY_LABELS = {
  pool: 'Swimming Pool',
  spa: 'Spa',
  gym: 'Gymnasium',
  rooftop: 'Rooftop Terrace',
  lift: 'High-Speed Lifts',
  shop: 'Commercial Outlets',
  daycare: 'Daycare',
  game: 'Gaming Zone',
};

export default function ProjAmenities({ project }) {
  const { openTour } = useLeadModal();
  const items = (project.amenities || []).map((key) => ({
    key,
    label: AMENITY_LABELS[key] || key,
  }));

  return (
    <section className="pj-amenities" id="amenities" aria-labelledby="amenities-title">
      <div className="container">
        <div className="pj-section-head">
          <p className="eyebrow">Lifestyle & Facilities</p>
          <h2 id="amenities-title" className="pj-section-title">
            World-class amenities
          </h2>
          <p className="pj-section-sub">
            Every amenity curated to elevate your everyday — from wellness to entertainment.
          </p>
        </div>

        <RevealGroup className="pj-amenities-grid" stagger={0.07}>
          {items.map(({ key, label }) => (
            <RevealItem key={key} className="pj-amenity-card" y={32}>
              <div className="pj-amenity-icon">
                <AmenityIcon name={key} width={26} height={26} />
              </div>
              <span className="pj-amenity-label">{label}</span>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="pj-amenities-cta">
          <MagneticButton as="button" variant="primary" onClick={() => openTour(project.name)}>
            Ask About Amenities
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
