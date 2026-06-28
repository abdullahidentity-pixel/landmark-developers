import { useEffect } from 'react';
import { BRAND, CONTACT } from '../../data/site.js';

/**
 * Injects project-specific SEO metadata into <head>.
 * React 18 — no react-helmet needed; just direct DOM manipulation.
 */
export default function ProjSEO({ project }) {
  useEffect(() => {
    const { seo, displayName, description, locationDetail, heroImage } = project;
    const title = seo?.title ?? `${displayName} | Landmark Developers`;
    const desc = seo?.description ?? description;
    const ogImg = seo?.ogImage ?? heroImage;

    // Title
    document.title = title;

    // Meta helpers
    function setMeta(sel, attr, val) {
      let el = document.querySelector(sel);
      if (!el) {
        el = document.createElement('meta');
        const parts = sel.match(/\[(.+?)="(.+?)"\]/);
        if (parts) el.setAttribute(parts[1], parts[2]);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, val);
    }

    setMeta('meta[name="description"]', 'content', desc);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', desc);
    setMeta('meta[property="og:image"]', 'content', ogImg);
    setMeta('meta[property="og:type"]', 'content', 'website');
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', desc);
    setMeta('meta[name="twitter:image"]', 'content', ogImg);

    // Structured data
    const ldJson = {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: BRAND.name,
      description: desc,
      url: BRAND.website,
      logo: BRAND.logo,
      telephone: CONTACT.phoneDisplay,
      address: {
        '@type': 'PostalAddress',
        streetAddress: CONTACT.office,
        addressCountry: 'PK',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: displayName,
        description: desc,
        areaServed: locationDetail,
      },
    };

    let script = document.querySelector('script[data-pj-ld]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-pj-ld', 'true');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(ldJson);

    return () => {
      document.title = `${BRAND.name} — Premium Living in Bahria Town Lahore`;
      const el = document.querySelector('script[data-pj-ld]');
      el?.remove();
    };
  }, [project]);

  return null;
}
