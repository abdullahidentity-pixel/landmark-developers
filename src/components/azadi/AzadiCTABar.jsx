import { PhoneIcon, WhatsAppIcon } from '../Icons.jsx';
import { CONTACT } from '../../data/site.js';
import { WA_MESSAGES } from '../../data/azadi.js';

const waHref = (msg) => `${CONTACT.whatsappHref}?text=${encodeURIComponent(msg)}`;

/**
 * Sticky bottom action bar for the campaign page — mobile only (CSS-gated).
 *
 * "Register" scrolls to the form rather than opening the global lead modal: the
 * campaign form captures apartment type + interest, which the generic modal
 * doesn't. Scrolling is routed through Lenis when present so the bar behaves the
 * same as every other in-page anchor on the site.
 *
 * `body.kb-open` (set globally in App.jsx while a field has focus) slides this
 * bar out of the way, so it can never sit on top of the form inputs.
 */
export default function AzadiCTABar() {
  const toForm = () => {
    const el = document.getElementById('azadi-register');
    if (!el) return;
    const header = document.querySelector('.site-header');
    const y = Math.max(
      0,
      window.scrollY + el.getBoundingClientRect().top - ((header?.offsetHeight ?? 84) + 12)
    );
    if (typeof window.__lenis?.scrollTo === 'function') window.__lenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: 'smooth' });
    // Focus the first field once the scroll has settled, so keyboard and screen
    // reader users land inside the form instead of merely near it.
    window.setTimeout(() => document.getElementById('azf-name')?.focus(), 700);
  };

  return (
    <div className="mobile-cta-bar az-cta-bar" role="region" aria-label="Azadi Deal quick actions">
      <a className="mcta mcta-call" href={CONTACT.phoneHref}>
        <PhoneIcon width="19" height="19" />
        Call
      </a>
      <a
        className="mcta mcta-wa"
        href={waHref(WA_MESSAGES.general)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon width="19" height="19" />
        WhatsApp
      </a>
      <button className="mcta mcta-book" type="button" onClick={toForm}>
        Register
      </button>
    </div>
  );
}
