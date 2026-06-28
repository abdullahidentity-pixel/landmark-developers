import { Link } from 'react-router-dom';
import { RevealGroup, RevealItem } from '../Reveal.jsx';
import { PROJECTS_DATA } from '../../data/projects.js';

export default function ProjRelated({ project }) {
  const others = PROJECTS_DATA.filter((p) => p.slug !== project.slug);

  return (
    <section className="pj-related" id="related" aria-labelledby="related-title">
      <div className="container">
        <div className="pj-section-head">
          <p className="eyebrow">The Portfolio</p>
          <h2 id="related-title" className="pj-section-title">
            Other Landmark projects
          </h2>
        </div>

        <RevealGroup className="pj-related-grid" stagger={0.08}>
          {others.map((p) => (
            <RevealItem key={p.slug} className="pj-related-card" y={40}>
              <Link to={`/${p.slug}`} className="pj-related-link" aria-label={p.displayName}>
                <div className="pj-related-img-wrap">
                  <img
                    src={p.heroImage}
                    alt={`${p.displayName} preview`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.currentTarget.src = p.localHero; }}
                  />
                  <div className="pj-related-overlay" aria-hidden="true" />
                </div>
                <div className="pj-related-info">
                  <span className="pj-related-badge">{p.badge}</span>
                  <h3 className="pj-related-name">{p.displayName}</h3>
                  <p className="pj-related-location">{p.locationDetail}</p>
                  <span className="pj-related-cta">
                    View Project
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
