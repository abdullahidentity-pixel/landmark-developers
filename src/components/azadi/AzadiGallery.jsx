import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Reveal, RevealGroup, RevealItem } from '../Reveal.jsx';
import { WhatsAppIcon } from '../Icons.jsx';
import AzadiDocButton from './AzadiDocButton.jsx';
import {
  GALLERY,
  WA_MESSAGES,
  AZADI_PAYMENT_PLAN_PDF_URL,
  AZADI_DETAILED_BROCHURE_PDF_URL,
} from '../../data/azadi.js';
import { CONTACT } from '../../data/site.js';

const EASE = [0.22, 1, 0.36, 1];
const waHref = (msg) => `${CONTACT.whatsappHref}?text=${encodeURIComponent(msg)}`;

export default function AzadiGallery() {
  const [index, setIndex] = useState(null);
  const reduce = useReducedMotion();
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (d) => setIndex((i) => (i === null ? i : (i + d + GALLERY.length) % GALLERY.length)),
    []
  );

  // Keyboard control + background scroll lock while the lightbox is open.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  return (
    <section className="az-section az-gallery" id="azadi-gallery">
      <div className="container">
        <Reveal className="az-head">
          <p className="az-eyebrow">Gallery & Documents</p>
          <h2 className="az-title">View the Official Azadi Deal Brochure</h2>
          <p className="az-sub">
            Renders, layout and payment plan for The Grand Lifestyle — Grand 15.
          </p>
        </Reveal>

        <RevealGroup className="az-gal-grid" stagger={0.06}>
          {GALLERY.map((g, i) => (
            <RevealItem key={g.src}>
              <button
                className="az-gal-item"
                onClick={() => setIndex(i)}
                aria-label={`Open image: ${g.label}`}
              >
                {/* The thumbnail, not the original — see GALLERY in data/azadi.js.
                    `width`/`height` are the thumbnail's real pixel dimensions so
                    the browser can reserve the box before the file arrives; six
                    lazy images collapsing to nothing and then popping open as
                    they load is its own kind of scroll jank. */}
                <img
                  src={g.thumb}
                  alt={g.label}
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
                <span className="az-gal-cap">{g.label}</span>
                <span className="az-gal-zoom" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M20 20l-3.5-3.5M11 8v6M8 11h6" />
                  </svg>
                </span>
              </button>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="az-section-cta az-section-cta--multi" delay={0.1}>
          <AzadiDocButton
            url={AZADI_DETAILED_BROCHURE_PDF_URL}
            label="Grand 15 Detailed Brochure"
            variant="primary"
            className="btn-lg"
          >
            Download Detailed Brochure
          </AzadiDocButton>
          <AzadiDocButton
            url={AZADI_PAYMENT_PLAN_PDF_URL}
            label="Grand 15 Azadi Deal Payment Plan"
            variant="glass"
            className="btn-lg"
          >
            Download Special Payment Plan
          </AzadiDocButton>
          <a
            className="btn btn-whatsapp btn-lg"
            href={waHref(WA_MESSAGES.documents)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon width="18" height="18" />
            WhatsApp Me the Brochure
          </a>
        </Reveal>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="az-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={GALLERY[index].label}
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? false : { opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          >
            <button className="az-lb-close" onClick={close} aria-label="Close">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <button
              className="az-lb-nav az-lb-prev"
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              aria-label="Previous image"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <motion.figure
              className="az-lb-figure"
              onClick={(e) => e.stopPropagation()}
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              animate={reduce ? false : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: EASE }}
              key={GALLERY[index].src}
            >
              <img src={GALLERY[index].src} alt={GALLERY[index].label} />
              <figcaption>{GALLERY[index].label}</figcaption>
            </motion.figure>

            <button
              className="az-lb-nav az-lb-next"
              onClick={(e) => { e.stopPropagation(); step(1); }}
              aria-label="Next image"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
