import { RevealGroup, RevealItem } from './Reveal.jsx';
import { PinIcon } from './Icons.jsx';
import { CONTACT } from '../data/site.js';

export default function Location() {
  return (
    <section className="location" id="location">
      <span className="section-watermark" aria-hidden="true">
        BAHRIA&nbsp;TOWN
      </span>
      <RevealGroup className="container location-inner" stagger={0.14}>
        <RevealItem className="location-info" y={40}>
          <p className="eyebrow">Find Us</p>
          <h2 className="section-title left">On Bahria Town’s Main Boulevard</h2>
          <p className="location-address">
            <PinIcon width="22" height="22" /> {CONTACT.office}
          </p>
          <p className="location-timing">
            {CONTACT.timing} · {CONTACT.timingNote}
          </p>
          <a
            className="btn btn-primary"
            href={CONTACT.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions
          </a>
        </RevealItem>

        <RevealItem className="location-map" y={40}>
          <iframe
            className="location-map-iframe"
            src="https://maps.google.com/maps?q=Bahria+Town+Main+Boulevard+Lahore&output=embed"
            title="Landmark Developers office location"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a
            className="map-tag"
            href={CONTACT.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <PinIcon width="14" height="14" /> Open in Google Maps
          </a>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
