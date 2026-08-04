import { Link, useLocation } from 'react-router-dom';

/**
 * The Independence Day campaign's entry point in the primary navigation.
 *
 * Every other item in the nav is a permanent section of the site; this one is a
 * dated offer, so it is styled as a pill rather than a text link — the shape
 * says "this is an offer, not a page", and it stops the eye without needing a
 * larger size or a different typeface.
 *
 * The glow is the green of the flag rather than the site's gold. Gold is the
 * brand's own accent and is already spent on "All Projects" and the header CTA;
 * a third gold element in a 70px bar would just be noise. Green reads instantly
 * as the campaign and belongs to nothing else in the chrome.
 *
 * On /azadi-deal itself the pill drops its animation and takes `aria-current`.
 * A pulsing button that navigates nowhere is a dead control, and leaving it lit
 * would tell the user there is somewhere else to go.
 */
export default function AzadiNavLink({ className = '', onClick }) {
  const { pathname } = useLocation();
  const here = pathname === '/azadi-deal';

  return (
    <Link
      to="/azadi-deal"
      className={`az-nav-pill ${here ? 'is-current' : ''} ${className}`}
      aria-current={here ? 'page' : undefined}
      onClick={onClick}
    >
      <span className="az-nav-pill-dot" aria-hidden="true" />
      Azadi Deal
    </Link>
  );
}
