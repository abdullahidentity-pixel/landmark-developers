import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTilt } from '../../hooks/useTilt.js';
import { Reveal, RevealGroup, RevealItem } from '../Reveal.jsx';
import { PROJECTS_DATA, PROJECT_INDEX_META } from '../../data/projects.js';

const EASE = [0.22, 1, 0.36, 1];

function ProjectCard({ project, featured = false }) {
  const tilt = useTilt({ max: featured ? 6 : 9 });
  const navigate = useNavigate();
  const meta = PROJECT_INDEX_META[project.slug] || {};
  const go = () => navigate(`/${project.slug}`);

  return (
    <article
      id={`card-${project.slug}`}
      className={`pjidx-card ${featured ? 'pjidx-card--featured' : ''}`}
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      onClick={go}
      role="link"
      tabIndex={0}
      aria-label={`View ${project.displayName}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } }}
      style={{ '--card-accent': meta.accent || 'var(--gold)', cursor: 'pointer' }}
    >
      {/* Background image */}
      <div className="pjidx-card-bg">
        <img
          src={project.heroImage}
          alt={`${project.displayName} render`}
          loading="lazy"
          decoding="async"
          onError={(e) => { e.currentTarget.src = project.localHero; }}
        />
        <div className="pjidx-card-overlay" />
      </div>

      {/* Glare layer driven by --mx/--my */}
      <div className="pjidx-card-glare" aria-hidden="true" />

      {/* Content */}
      <div className="pjidx-card-content">
        <div className="pjidx-card-top">
          <span className="pjidx-card-badge">{project.badge}</span>
          <span className="pjidx-card-location">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>
            </svg>
            {project.location}
          </span>
        </div>

        <div className="pjidx-card-bottom">
          <h2 className="pjidx-card-name">{project.displayName}</h2>
          <p className="pjidx-card-tagline">{project.tagline}</p>

          {/* Offering chips */}
          {meta.offeringTypes && (
            <ul className="pjidx-card-chips" aria-label="Offering types">
              {meta.offeringTypes.map((t) => (
                <li key={t} className="pjidx-card-chip">{t}</li>
              ))}
            </ul>
          )}

          <div className="pjidx-card-actions">
            <Link
              to={`/${project.slug}`}
              className="pjidx-card-cta"
              aria-label={`View ${project.displayName}`}
              onClick={(e) => e.stopPropagation()}
            >
              View {project.name}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Status ribbon */}
      <div className={`pjidx-status-dot ${project.status === 'Completed' ? 'completed' : ''}`}
        aria-label={`Status: ${project.status}`}
        title={project.status}
      />
    </article>
  );
}

export default function ProjsGrid() {
  const [featured, ...rest] = PROJECTS_DATA.slice().reverse(); // Grand 15 as featured (last in array = flagship)

  return (
    <section className="pjidx-grid-section" id="projects-grid" aria-labelledby="pjidx-grid-title">
      <div className="container">
        <Reveal className="pjidx-section-head">
          <p className="eyebrow">All Projects</p>
          <h2 id="pjidx-grid-title" className="pjidx-section-title">
            Five addresses.<br />One standard of excellence.
          </h2>
        </Reveal>

        {/* Featured flagship card */}
        <Reveal className="pjidx-featured-wrap" y={50} delay={0.05}>
          <ProjectCard project={featured} featured />
        </Reveal>

        {/* 2×2 grid for remaining projects */}
        <RevealGroup className="pjidx-cards-grid" stagger={0.1}>
          {rest.map((project) => (
            <RevealItem key={project.slug} y={44}>
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
