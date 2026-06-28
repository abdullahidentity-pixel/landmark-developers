import { RevealGroup, RevealItem } from '../Reveal.jsx';

// Project-appropriate icons by key
function HighlightIcon({ type }) {
  const base = {
    width: 24, height: 24, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor', strokeWidth: 1.5,
    strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true
  };
  const icons = {
    location: <svg {...base}><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>,
    mall:     <svg {...base}><path d="M4 9h16l-1 11H5L4 9z"/><path d="M4 9l1.5-4h13L20 9"/><path d="M9 13v3M15 13v3"/></svg>,
    footfall: <svg {...base}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    roi:      <svg {...base}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    building: <svg {...base}><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 2v20M4 8h5M4 14h5M15 8h.01M15 14h.01M15 20h.01"/></svg>,
    connectivity: <svg {...base}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>,
    boulevard: <svg {...base}><path d="M3 12h18M12 3v18M3 7l9-5 9 5M3 17l9 5 9-5"/></svg>,
    flagship: <svg {...base}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>,
    spa:      <svg {...base}><path d="M12 13c0-4 2-7 5-8-1 4-2.5 6-5 8z"/><path d="M12 13c0-4-2-7-5-8 1 4 2.5 6 5 8z"/><path d="M4 16c4 3 12 3 16 0"/></svg>,
    shop:     <svg {...base}><path d="M4 9h16l-1 11H5L4 9z"/><path d="M4 9l1.5-4h13L20 9"/></svg>,
    architecture: <svg {...base}><polygon points="12 2 22 20 2 20"/><polyline points="12 7 16 15 8 15"/></svg>,
    lifestyle: <svg {...base}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  };
  return icons[type] || icons.roi;
}

export default function ProjHighlights({ project }) {
  return (
    <section className="pj-highlights" id="highlights" aria-labelledby="highlights-title">
      <div className="container">
        <div className="pj-section-head">
          <p className="eyebrow">Key Highlights</p>
          <h2 id="highlights-title" className="pj-section-title">
            What sets {project.name} apart
          </h2>
        </div>

        <RevealGroup className="pj-highlights-grid" stagger={0.1}>
          {project.highlights.map((h, i) => (
            <RevealItem key={h.title} className="pj-highlight-card" y={40}>
              <div className="pj-highlight-icon">
                <HighlightIcon type={h.icon} />
              </div>
              <div className="pj-highlight-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="pj-highlight-title">{h.title}</h3>
              <p className="pj-highlight-body">{h.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
