import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLeadModal } from '../context/LeadModalContext.jsx';
import { CONTACT } from '../data/site.js';
import Logo from './Logo.jsx';

const EASE = [0.22, 1, 0.36, 1];

function triggerDownload(url) {
  const a = document.createElement('a');
  a.href = url;
  a.download = url.split('/').pop();
  a.target = '_blank';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * Booking / lead-capture modal.
 *
 * Every "Book" CTA on the site funnels through `openTour()` / `openDownload()`,
 * so embedding the JotForm here wires it to ALL of them at once. Submissions are
 * handled by JotForm, which emails the lead to landmarkdevelopersworld@gmail.com
 * (configured inside JotForm itself). We listen to JotForm's postMessage events
 * to (a) auto-size the iframe to its content — no nested scrollbar — and
 * (b) release the gated PDF once a download-mode form is submitted.
 */
export default function LeadModal() {
  const { open, mode, downloadUrl, downloadLabel, close } = useLeadModal();

  const [frameHeight, setFrameHeight] = useState(640);
  const [submitted, setSubmitted]     = useState(false);
  const iframeRef = useRef(null);

  const isDownload = mode === 'download';

  // Reset per-open state
  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setFrameHeight(640);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') close(); };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, close]);

  // Listen to JotForm's iframe messages: auto-resize + submit completion.
  useEffect(() => {
    if (!open) return;

    const onMessage = (e) => {
      if (typeof e.origin === 'string' && !e.origin.includes('jotform')) return;
      const data = e.data;

      // Resize — JotForm posts "setHeight:<px>:<formID>"
      if (typeof data === 'string') {
        if (data.startsWith('setHeight:')) {
          const h = parseInt(data.split(':')[1], 10);
          if (!Number.isNaN(h) && h > 0) setFrameHeight(h);
        }
        if (data.includes('submission-completed')) {
          setSubmitted(true);
          if (isDownload && downloadUrl) triggerDownload(downloadUrl);
        }
      } else if (data && typeof data === 'object') {
        if (data.type === 'setHeight' && data.height) setFrameHeight(data.height);
        if (data.action === 'submission-completed') {
          setSubmitted(true);
          if (isDownload && downloadUrl) triggerDownload(downloadUrl);
        }
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [open, isDownload, downloadUrl]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="lm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={close}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            className="lm-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lm-title"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.38, ease: EASE }}
          >
            {/* Close */}
            <button className="lm-close" onClick={close} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <div className="lm-head">
              <div className="lm-logo" aria-hidden="true"><Logo /></div>
              <p className="lm-eyebrow">
                {isDownload ? 'One quick step' : 'Book a Tour'}
              </p>
              <h2 id="lm-title" className="lm-title">
                {isDownload
                  ? `Get your ${downloadLabel || 'document'}`
                  : 'Schedule a private viewing'}
              </h2>
              <p className="lm-sub">
                {isDownload
                  ? 'Share your details below and your document link opens right after.'
                  : 'Fill in your details and our team will confirm your visit within 24 hours.'}
              </p>
            </div>

            {/* Embedded JotForm — routes submissions to Landmark Developers' inbox */}
            <div className="lm-embed">
              <iframe
                ref={iframeRef}
                title="Landmark Developers Lead Capture"
                src={CONTACT.bookingFormHref}
                scrolling="no"
                allow="geolocation; microphone; camera; fullscreen; payment"
                style={{
                  width: '100%',
                  height: frameHeight,
                  minHeight: 520,
                  border: 'none',
                  borderRadius: 12,
                  background: 'transparent',
                  display: 'block',
                }}
              />
            </div>

            {/* Download fallback — always reachable even if the postMessage
                submit signal is blocked by the browser. */}
            {isDownload && downloadUrl && (
              <button
                type="button"
                className="lm-download-fallback"
                onClick={() => triggerDownload(downloadUrl)}
              >
                {submitted ? 'Download started — tap to retry' : `Download ${downloadLabel || 'document'}`}
              </button>
            )}

            <p className="lm-privacy">
              Your information is private and will only be used by Landmark Developers to process your request.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
