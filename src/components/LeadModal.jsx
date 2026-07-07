import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLeadModal } from '../context/LeadModalContext.jsx';
import { WEBHOOKS, PROJECTS_LIST } from '../data/webhooks.js';
import Logo from './Logo.jsx';

const EASE = [0.22, 1, 0.36, 1];

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM',
];

function triggerDownload(url) {
  const a = document.createElement('a');
  a.href = url;
  a.download = url.split('/').pop();
  a.target = '_blank';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

async function postToWebhook(url, data) {
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      mode: 'no-cors',
    });
  } catch (_) {
    // Silently fail — don't block UX
  }
}

export default function LeadModal() {
  const { open, mode, project, downloadUrl, downloadLabel, close } = useLeadModal();

  const [form, setForm] = useState({ name: '', phone: '', email: '', project: '', date: '', time: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success
  const firstInput = useRef(null);

  // Pre-fill project when modal opens
  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...f, project: project || '' }));
      setStatus('idle');
      setErrors({});
      setTimeout(() => firstInput.current?.focus(), 120);
    }
  }, [open, project]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') close(); };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, close]);

  const set = useCallback((field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: '' }));
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Full name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (mode === 'tour' && !form.date) e.date = 'Please pick a preferred date';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('submitting');

    const payload = {
      name:    form.name.trim(),
      phone:   form.phone.trim(),
      email:   form.email.trim(),
      project: form.project || project,
      source:  mode === 'tour' ? 'Book a Tour' : `Download: ${downloadLabel}`,
      ...(mode === 'tour' && {
        preferred_date: form.date,
        preferred_time: form.time,
        message: form.message.trim(),
      }),
      submitted_at: new Date().toISOString(),
    };

    // Send to CRM
    await postToWebhook(WEBHOOKS.CRM_WEBHOOK, payload);

    // Send to Google Calendar if tour
    if (mode === 'tour') {
      await postToWebhook(WEBHOOKS.CALENDAR_WEBHOOK, payload);
    }

    // Trigger download if gated PDF
    if (mode === 'download' && downloadUrl) {
      triggerDownload(downloadUrl);
    }

    setStatus('success');

    // Auto-close after success
    setTimeout(() => close(), 2800);
  };

  const isTour     = mode === 'tour';
  const isDownload = mode === 'download';

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

            {status === 'success' ? (
              /* ── Success state ── */
              <motion.div
                className="lm-success"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="lm-success-icon" aria-hidden="true">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="lm-success-title">
                  {isDownload ? 'Downloading now…' : 'Tour request received!'}
                </h3>
                <p className="lm-success-body">
                  {isDownload
                    ? 'Your download has started. Our team will be in touch shortly.'
                    : 'Our team will confirm your booking within 24 hours. Check your WhatsApp or email.'}
                </p>
              </motion.div>
            ) : (
              /* ── Form ── */
              <>
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
                      ? 'Leave your details and the PDF will download instantly.'
                      : 'Fill in your details and we\'ll confirm your tour within 24 hours.'}
                  </p>
                </div>

                <form className="lm-form" onSubmit={handleSubmit} noValidate>
                  {/* Name */}
                  <div className={`lm-field ${errors.name ? 'has-error' : ''}`}>
                    <label className="lm-label" htmlFor="lm-name">Full Name *</label>
                    <input
                      ref={firstInput}
                      id="lm-name"
                      className="lm-input"
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={set('name')}
                      autoComplete="name"
                    />
                    {errors.name && <span className="lm-error">{errors.name}</span>}
                  </div>

                  {/* Phone */}
                  <div className={`lm-field ${errors.phone ? 'has-error' : ''}`}>
                    <label className="lm-label" htmlFor="lm-phone">Phone Number *</label>
                    <input
                      id="lm-phone"
                      className="lm-input"
                      type="tel"
                      placeholder="+92 300 0000000"
                      value={form.phone}
                      onChange={set('phone')}
                      autoComplete="tel"
                    />
                    {errors.phone && <span className="lm-error">{errors.phone}</span>}
                  </div>

                  {/* Email */}
                  <div className="lm-field">
                    <label className="lm-label" htmlFor="lm-email">Email Address <span className="lm-optional">(optional)</span></label>
                    <input
                      id="lm-email"
                      className="lm-input"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={set('email')}
                      autoComplete="email"
                    />
                  </div>

                  {/* Project */}
                  <div className="lm-field">
                    <label className="lm-label" htmlFor="lm-project">Project of Interest</label>
                    <select
                      id="lm-project"
                      className="lm-input lm-select"
                      value={form.project}
                      onChange={set('project')}
                    >
                      <option value="">Select a project…</option>
                      {PROJECTS_LIST.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  {/* Tour-only: date + time */}
                  {isTour && (
                    <div className="lm-row">
                      <div className={`lm-field ${errors.date ? 'has-error' : ''}`}>
                        <label className="lm-label" htmlFor="lm-date">Preferred Date *</label>
                        <input
                          id="lm-date"
                          className="lm-input"
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={form.date}
                          onChange={set('date')}
                        />
                        {errors.date && <span className="lm-error">{errors.date}</span>}
                      </div>
                      <div className="lm-field">
                        <label className="lm-label" htmlFor="lm-time">Preferred Time</label>
                        <select
                          id="lm-time"
                          className="lm-input lm-select"
                          value={form.time}
                          onChange={set('time')}
                        >
                          <option value="">Any time</option>
                          {TIME_SLOTS.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Message (tour only) */}
                  {isTour && (
                    <div className="lm-field">
                      <label className="lm-label" htmlFor="lm-msg">Message <span className="lm-optional">(optional)</span></label>
                      <textarea
                        id="lm-msg"
                        className="lm-input lm-textarea"
                        placeholder="Any specific questions or requests…"
                        rows={3}
                        value={form.message}
                        onChange={set('message')}
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="lm-submit"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? (
                      <span className="lm-spinner" aria-hidden="true" />
                    ) : isDownload ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="7 10 12 15 17 10"/>
                          <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Download Now
                      </>
                    ) : (
                      'Confirm Tour Request'
                    )}
                  </button>

                  <p className="lm-privacy">
                    Your information is private and will only be used by Landmark Developers to process your request.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
