import { BRAND } from '../data/site.js';

/** Brand wordmark — remote logo with a styled text fallback if it fails to load. */
export default function Logo({ className = '' }) {
  return (
    <span className={`logo ${className}`}>
      <img
        src={BRAND.logoAlt}
        alt={`${BRAND.name} logo`}
        width="160"
        height="40"
        loading="eager"
        decoding="async"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextSibling.style.display = 'inline';
        }}
      />
      <span className="logo-fallback" style={{ display: 'none' }}>
        Landmark<em>Developers</em>
      </span>
    </span>
  );
}
