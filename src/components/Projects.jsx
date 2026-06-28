import { Link } from 'react-router-dom';
import { RevealGroup, RevealItem } from './Reveal.jsx';
import { useTilt } from '../hooks/useTilt.js';
import { WhatsAppIcon } from './Icons.jsx';
import { PROJECTS_DATA } from '../data/projects.js';
import { CONTACT } from '../data/site.js';

/* Display order: flagship → active selling → legacy delivered */
const DISPLAY_ORDER = ['grand-15', 'grand-14', 'grand-x', 'grand-11', 'grand-12'];
const ORDERED = DISPLAY_ORDER.map((slug) => PROJECTS_DATA.find((p) => p.slug === slug)).filter(Boolean);

/* Unit labels per project */
const UNIT_MAP = {
  'grand-15': ['1 Bed', '2 Bed', '3 Bed', 'Commercials'],
  'grand-14': ['Studio', '1 Bed', '2 Bed', 'Commercials'],
  'grand-x':  ['Studio', '1 Bed', 'Commercial Outlets'],
  'grand-11': ['Studio', '1 Bed', 'Commercial'],
  'grand-12': ['Studio', '1 Bed', '2 Bed', 'Commercial'],
};

function ProjectCard({ project, index }) {
  const tilt = useTilt();
  const units = UNIT_MAP[project.slug] || [];
  const isFeatured = project.slug === 'grand-15';
  const tone = ['gold', 'pearl', 'bronze', 'gold', 'pearl'][index % 5];

  return (
    <RevealItem className={`project-cell project-cell--${index + 1}`}>
      <article
        className={`project-card tone-${tone} ${isFeatured ? 'is-featured' : ''}`}
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
      >
        <div className="project-glare" aria-hidden="true" />
        <div className="project-card-inner">

          {/* ── Hero image ── */}
          <div className="project-media">
            <img
              className="project-media-img"
              src={project.cardImage || project.heroImage || project.localHero}
              alt={project.name}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/600x360/1a1510/d9b878?text=${encodeURIComponent(project.name)}`;
              }}
            />
            <div className="project-media-overlay" aria-hidden="true" />
            <span className="project-status-badge">{project.status}</span>
            <span className="project-media-shine" aria-hidden="true" />
          </div>

          {/* ── Text ── */}
          <header className="project-head">
            <span className="project-badge">{project.badge}</span>
            <h3 className="project-name">{project.name}</h3>
            <p className="project-blurb">{project.description}</p>
          </header>

          <ul className="unit-list" aria-label={`${project.name} unit types`}>
            {units.map((u) => (
              <li key={u} className="unit-chip">{u}</li>
            ))}
          </ul>

          <div className="project-actions">
            <Link className="btn btn-primary btn-sm" to={`/${project.slug}`}>
              Explore {project.name}
            </Link>
            <a
              className="btn btn-whatsapp btn-sm"
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp about ${project.name}`}
            >
              <WhatsAppIcon width="18" height="18" /> WhatsApp Now
            </a>
          </div>
        </div>
      </article>
    </RevealItem>
  );
}

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Our Developments</p>
          <h2 className="section-title">Five addresses built to appreciate</h2>
          <p className="section-sub">
            From Bahria Town Lahore to Islamabad — each project a distinct investment thesis, all sharing
            Landmark's promise of on-time delivery and premium build quality.
          </p>
        </div>

        <RevealGroup className="project-grid" stagger={0.1}>
          {ORDERED.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
