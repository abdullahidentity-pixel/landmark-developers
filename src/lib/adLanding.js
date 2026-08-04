/**
 * Send paid-ad traffic to the campaign it was sold on.
 *
 * Every ad currently running on Meta, Instagram and YouTube promotes the Azadi
 * Deal, but the ad accounts point at the site root. A visitor who clicked an
 * "Azadi Deal" creative therefore landed on the home page and had to find the
 * offer again — the single most expensive click on the site, spent on a page
 * that doesn't mention what they clicked.
 *
 * The right long-term fix is the destination URL in Ads Manager / Google Ads;
 * this is the safety net that also covers every creative already live, every
 * old post someone shares later, and the ads nobody remembers to re-point.
 *
 * Deliberately narrow, because getting this wrong hijacks organic traffic:
 *
 *   • Only the home page redirects. Every other route is left alone — someone
 *     who clicks an ad for a different project later still lands where the ad
 *     sent them.
 *   • Only a recognised *paid* click qualifies. A click ID (fbclid, gclid,
 *     gbraid/wbraid, ttclid, msclkid) or an explicitly paid utm_medium, or a
 *     utm_source matched EXACTLY against the ad platforms. Exactly, not by
 *     substring: the site's own Instagram profile link carries
 *     `utm_source=ig_web_button_share_sheet`, which is organic and must not
 *     match "ig".
 *   • Once per session. If a redirected visitor then clicks "Home" in the nav
 *     they stay on the home page instead of being bounced back into the
 *     campaign forever — a redirect the user can't escape is a trap.
 *   • The query string travels with them, so fbclid/gclid attribution and the
 *     UTM tags survive the hop and the conversion still reports against the
 *     right ad.
 *
 * When the campaign ends, set CAMPAIGN_LANDING to null. That is the whole
 * switch — nothing else needs touching.
 */

// The route paid traffic should land on, or null to disable the redirect.
export const CAMPAIGN_LANDING = '/azadi-deal';

// Set once we've redirected, so this only ever happens on the first landing.
const SESSION_KEY = 'lm-ad-landing-done';

// Click identifiers appended by the ad platforms themselves. Their presence is
// proof of a paid click regardless of how the UTMs were (or weren't) filled in.
const CLICK_IDS = ['fbclid', 'gclid', 'gbraid', 'wbraid', 'ttclid', 'msclkid', 'li_fat_id'];

// utm_medium values that mean "this click was paid for".
const PAID_MEDIUMS = new Set([
  'cpc', 'ppc', 'paid', 'paidsocial', 'paid_social', 'paid-social', 'cpm', 'display', 'ppe',
]);

// utm_source values, matched exactly. See the note about ig_web_button_share_sheet.
const AD_SOURCES = new Set([
  'facebook', 'fb', 'instagram', 'ig', 'meta', 'youtube', 'yt', 'google', 'googleads',
  'google_ads', 'adwords', 'tiktok', 'messenger', 'audience_network',
]);

/** Does this query string represent a click on one of our ads? */
export function isPaidAdClick(search) {
  const q = new URLSearchParams(search || '');
  if (CLICK_IDS.some((id) => q.has(id))) return true;

  const medium = (q.get('utm_medium') || '').toLowerCase();
  if (PAID_MEDIUMS.has(medium)) return true;

  const source = (q.get('utm_source') || '').toLowerCase();
  return AD_SOURCES.has(source);
}

/**
 * Rewrite the URL before React mounts, so the home page is never rendered and
 * the visitor sees no flash of the wrong page. `replaceState`, not `assign` —
 * this must not cost a second round trip, and it must not leave a history entry
 * that the back button drops the visitor straight back onto.
 *
 * Returns true if the redirect fired, for the benefit of tests and the console.
 */
export function applyAdLanding() {
  if (!CAMPAIGN_LANDING || typeof window === 'undefined') return false;

  const { pathname, search, hash } = window.location;
  if (pathname !== '/' && pathname !== '') return false;
  if (!isPaidAdClick(search)) return false;

  // sessionStorage throws in Safari's private mode on some versions; a failure
  // here should cost us the once-per-session guard, not the redirect.
  try {
    if (window.sessionStorage.getItem(SESSION_KEY)) return false;
    window.sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    /* no-op */
  }

  window.history.replaceState(null, '', `${CAMPAIGN_LANDING}${search}${hash}`);
  return true;
}
