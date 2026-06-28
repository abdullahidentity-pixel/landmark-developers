import { Link } from 'react-router-dom';
import { Reveal, RevealGroup, RevealItem } from '../Reveal.jsx';
import { PROJECTS_DATA, PROJECT_INDEX_META } from '../../data/projects.js';

const ROWS = PROJECTS_DATA.map((p) => {
  const meta = PROJECT_INDEX_META[p.slug] || {};
  return {
    slug: p.slug,
    name: p.displayName,
    location: p.location,
    bestFor: meta.bestFor || [],
    offeringTypes: meta.offeringTypes || [],
    status: p.status,
  };
});

export default function ProjsComparison() {
  return (
    <section className="pjidx-compare" id="compare" aria-labelledby="compare-title">
      <div className="container">
        <Reveal className="pjidx-section-head">
          <p className="eyebrow">Side by Side</p>
          <h2 id="compare-title" className="pjidx-section-title">
            Find your perfect Landmark match
          </h2>
          <p className="pjidx-section-sub">
            Every project serves a different investor profile. Here's how they compare.
          </p>
        </Reveal>

        <Reveal className="pjidx-compare-wrap" y={36}>
          <div className="pjidx-compare-table" role="table" aria-label="Project comparison">
            {/* Header */}
            <div className="pjidx-compare-head" role="row">
              <div role="columnheader">Project</div>
              <div role="columnheader">Location</div>
              <div role="columnheader">Best For</div>
              <div role="columnheader">Offerings</div>
              <div role="columnheader">Status</div>
              <div role="columnheader"><span className="sr-only">Action</span></div>
            </div>

            {/* Rows */}
            {ROWS.map((row, i) => (
              <div
                key={row.slug}
                className="pjidx-compare-row"
                role="row"
                style={{ '--row-delay': `${i * 0.07}s` }}
              >
                <div className="pjidx-cmp-name" role="cell">
                  <span className="pjidx-cmp-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{row.name}</span>
                </div>

                <div className="pjidx-cmp-location" role="cell">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/>
                  </svg>
                  {row.location}
                </div>

                <div className="pjidx-cmp-best" role="cell">
                  <ul>
                    {row.bestFor.slice(0, 3).map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>

                <div className="pjidx-cmp-offerings" role="cell">
                  <div className="pjidx-cmp-chips">
                    {row.offeringTypes.map((t) => (
                      <span key={t} className="pjidx-cmp-chip">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="pjidx-cmp-status" role="cell">
                  <span className={`pjidx-status-badge ${row.status === 'Completed' ? 'done' : row.status === 'Flagship Launch' ? 'flagship' : ''}`}>
                    {row.status}
                  </span>
                </div>

                <div className="pjidx-cmp-action" role="cell">
                  <Link to={`/${row.slug}`} className="pjidx-cmp-link">
                    View
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
