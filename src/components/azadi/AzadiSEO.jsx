import { useEffect } from 'react';
import { BRAND, CONTACT } from '../../data/site.js';
import { AZADI, AZADI_SEO, RATE, UNIT_TYPES } from '../../data/azadi.js';

const CANONICAL = `${BRAND.website.replace(/\/$/, '')}/azadi-deal`;
const abs = (p) => (/^https?:/.test(p) ? p : `${BRAND.website.replace(/\/$/, '')}${p}`);

/**
 * Head metadata for the campaign page. Same DOM-driven approach as ProjSEO
 * (React 18, no helmet dependency), plus a canonical link and Offer structured
 * data — a campaign page is exactly the case where a search engine benefits from
 * knowing the price floor and the offer's validity window.
 */
export default function AzadiSEO() {
  useEffect(() => {
    const { title, description, ogTitle, ogDescription, ogImage } = AZADI_SEO;
    document.title = title;

    const created = [];
    function setMeta(sel, val) {
      let el = document.querySelector(sel);
      if (!el) {
        el = document.createElement('meta');
        const parts = sel.match(/\[(.+?)="(.+?)"\]/);
        if (parts) el.setAttribute(parts[1], parts[2]);
        document.head.appendChild(el);
        created.push(el);
      }
      el.setAttribute('content', val);
    }

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', ogTitle);
    setMeta('meta[property="og:description"]', ogDescription);
    setMeta('meta[property="og:image"]', abs(ogImage));
    setMeta('meta[property="og:type"]', 'website');
    setMeta('meta[property="og:url"]', CANONICAL);
    setMeta('meta[name="twitter:card"]', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', ogTitle);
    setMeta('meta[name="twitter:description"]', ogDescription);
    setMeta('meta[name="twitter:image"]', abs(ogImage));

    // Canonical — the campaign is reachable from ads with tracking params, so an
    // explicit canonical stops those variants being indexed as separate pages.
    let canonical = document.querySelector('link[rel="canonical"]');
    const hadCanonical = !!canonical;
    const prevCanonical = canonical?.getAttribute('href');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', CANONICAL);

    // Lowest advertised total across all apartment variants — the honest
    // "priceFrom" for the offer. Derived, never hand-typed.
    const lowest = Math.min(
      ...UNIT_TYPES.flatMap((u) => u.variants.map((v) => v.total))
    );

    const ldJson = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${AZADI.project} — ${AZADI.campaign}`,
      description,
      image: abs(ogImage),
      brand: { '@type': 'Brand', name: BRAND.name },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'PKR',
        lowPrice: lowest,
        offerCount: UNIT_TYPES.reduce((n, u) => n + u.variants.length, 0),
        availability: 'https://schema.org/LimitedAvailability',
        url: CANONICAL,
        seller: {
          '@type': 'RealEstateAgent',
          name: BRAND.name,
          telephone: CONTACT.phoneDisplay,
          url: BRAND.website,
          address: {
            '@type': 'PostalAddress',
            streetAddress: CONTACT.office,
            addressCountry: 'PK',
          },
        },
      },
      additionalProperty: {
        '@type': 'PropertyValue',
        name: 'Azadi Deal rate',
        value: `${RATE.currency} ${RATE.azadi} ${RATE.unit}`,
      },
    };

    let script = document.querySelector('script[data-az-ld]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-az-ld', 'true');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(ldJson);

    return () => {
      document.title = `${BRAND.name} — Premium Living in Bahria Town Lahore`;
      document.querySelector('script[data-az-ld]')?.remove();
      for (const el of created) el.remove();
      if (hadCanonical && prevCanonical) canonical.setAttribute('href', prevCanonical);
      else if (!hadCanonical) canonical.remove();
    };
  }, []);

  return null;
}
