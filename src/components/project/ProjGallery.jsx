import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../Reveal.jsx';

const EASE = [0.22, 1, 0.36, 1];

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  // Touch-swipe navigation: on phones, dragging the image left/right is the
  // natural gesture, so the side arrows no longer have to be the only way to
  // move between shots. A >45px horizontal travel counts as a swipe; anything
  // smaller is treated as a tap and left alone.
  const startX = useRef(null);
  const startY = useRef(null);
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    const dy = e.changedTouches[0].clientY - startY.current;
    // Only a clearly-horizontal swipe navigates (ignore vertical scrolls).
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) onNext();
      else onPrev();
    }
    startX.current = null;
    startY.current = null;
  };

  return (
    <AnimatePresence>
      <motion.div
        className="pj-lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
      >
        <button className="pj-lb-close" onClick={onClose} aria-label="Close lightbox">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {images.length > 1 && (
          <>
            <button className="pj-lb-prev" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button className="pj-lb-next" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </>
        )}

        <motion.img
          key={index}
          className="pj-lb-img"
          src={images[index]}
          alt={`Gallery image ${index + 1}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35, ease: EASE }}
          onClick={(e) => e.stopPropagation()}
        />

        <span className="pj-lb-counter" aria-live="polite">
          {index + 1} / {images.length}
        </span>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProjGallery({ project }) {
  const [lbIndex, setLbIndex] = useState(null);
  const images = project.galleryImages || [];

  const openLb = useCallback((i) => setLbIndex(i), []);
  const closeLb = useCallback(() => setLbIndex(null), []);
  const prevImg = useCallback(() => setLbIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const nextImg = useCallback(() => setLbIndex((i) => (i + 1) % images.length), [images.length]);

  // Keyboard nav for lightbox
  const onKey = useCallback((e) => {
    if (lbIndex === null) return;
    if (e.key === 'ArrowLeft') prevImg();
    if (e.key === 'ArrowRight') nextImg();
    if (e.key === 'Escape') closeLb();
  }, [lbIndex, prevImg, nextImg, closeLb]);

  return (
    <section className="pj-gallery" id="gallery" aria-labelledby="gallery-title" onKeyDown={onKey}>
      <div className="container">
        <div className="pj-section-head">
          <p className="eyebrow">Visual Tour</p>
          <h2 id="gallery-title" className="pj-section-title">
            Project renders &amp; imagery
          </h2>
        </div>

        {images.length > 0 ? (
          <div className="pj-gallery-grid">
            {images.map((src, i) => (
              <Reveal key={src} className="pj-gallery-item" y={30} delay={i * 0.08}>
                <button
                  className="pj-gallery-btn"
                  onClick={() => openLb(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img
                    src={src}
                    alt={`${project.displayName} render ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.currentTarget.src = project.localHero; }}
                  />
                  <div className="pj-gallery-hover" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                    </svg>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        ) : null}

        {/* 3D Renders & Video Walkthrough */}
        {project.videoUrl ? (
          <Reveal className="pj-video-block" y={24}>
            <div className="pj-video-head">
              <p className="pj-video-eyebrow">3D Walkthrough</p>
              <p className="pj-video-title">Render footage &amp; video tour</p>
            </div>
            <div className="pj-video-frame">
              <iframe
                src={project.videoUrl}
                title={`${project.displayName} — 3D render video tour`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Reveal>
        ) : (
          <Reveal className="pj-footage-placeholder" y={24}>
            <div className="pj-footage-card">
              <div className="pj-footage-icon" aria-hidden="true">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </div>
              <p className="pj-footage-title">Render Footage</p>
              <p className="pj-footage-sub">
                Contact Landmark Developers for the latest 3D walkthroughs and render videos of {project.displayName}.
              </p>
            </div>
          </Reveal>
        )}
      </div>

      {lbIndex !== null && (
        <Lightbox
          images={images}
          index={lbIndex}
          onClose={closeLb}
          onPrev={prevImg}
          onNext={nextImg}
        />
      )}
    </section>
  );
}
