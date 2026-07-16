import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLeadModal } from '../context/LeadModalContext.jsx';
import { PROJECT_OPTIONS, UNIT_OPTIONS } from '../data/site.js';
import { COUNTRIES, DEFAULT_COUNTRY, dialOf } from '../data/countries.js';
import { deliverLead } from '../lib/leadDelivery.js';
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
 * so this one custom form serves ALL of them. On submit the lead is sent through
 * BOTH channels at once: it opens WhatsApp with the details prefilled AND emails
 * the same lead straight to landmarkdevelopersworld@gmail.com via Web3Forms.
 * (If the Web3Forms key isn't set yet, only the WhatsApp channel fires — so a
 * lead is never lost.)
 */
export default function LeadModal() {
  const { open, mode, project, downloadUrl, downloadLabel, close } = useLeadModal();

  const [form, setForm] = useState({
    name: '', country: DEFAULT_COUNTRY, phone: '', email: '', project: '', unit: '', message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success
  const firstInput = useRef(null);

  const isDownload = mode === 'download';

  // Pre-fill project when modal opens + reset transient state
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
    if (!form.name.trim()) e.name = 'Full name is required';
    const digits = form.phone.replace(/\D/g, '');
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (digits.length < 10 || digits.length > 13) e.phone = 'Enter a valid phone number';
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = 'Enter a valid email';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('submitting');

    const subject = isDownload
      ? `Download request: ${downloadLabel || 'Document'}`
      : 'New Tour Booking';

    const fields = {
      subject: `Landmark Lead — ${subject}`,
      from_name: 'Landmark Developers Website',
      name:    form.name.trim(),
      phone:   `${dialOf(form.country)} ${form.phone.trim()}`.trim(),
      email:   form.email.trim(),
      project: form.project || project,
      unit:    form.unit,
      source:  isDownload ? `Download: ${downloadLabel}` : 'Book a Tour',
      message: form.message.trim(),
    };

    // Fire BOTH channels together (WhatsApp opens instantly, email sends in the
    // background) via the shared lead-delivery pipeline.
    await deliverLead(fields);

    if (isDownload && downloadUrl) triggerDownload(downloadUrl);

    setStatus('success');
    setForm({ name: '', country: DEFAULT_COUNTRY, phone: '', email: '', project: '', unit: '', message: '' });
    setTimeout(() => close(), 3000);
  };

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

                  {/* Phone — country dial-code selector + local number */}
                  <div className={`lm-field ${errors.phone ? 'has-error' : ''}`}>
                    <label className="lm-label" htmlFor="lm-phone">Phone Number *</label>
                    <div className="lm-phone-group">
                      <select
                        id="lm-country"
                        className="lm-input lm-select lm-dial"
                        value={form.country}
                        onChange={set('country')}
                        aria-label="Country dialing code"
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c.iso} value={c.iso}>
                            {c.flag} {c.dial} {c.name}
                          </option>
                        ))}
                      </select>
                      <input
                        id="lm-phone"
                        className="lm-input"
                        type="tel"
                        placeholder="300 0000000"
                        value={form.phone}
                        onChange={set('phone')}
                        autoComplete="tel-national"
                      />
                    </div>
                    {errors.phone && <span className="lm-error">{errors.phone}</span>}
                  </div>

                  {/* Email */}
                  <div className={`lm-field ${errors.email ? 'has-error' : ''}`}>
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
                    {errors.email && <span className="lm-error">{errors.email}</span>}
                  </div>

                  {/* Project + Unit */}
                  <div className="lm-row">
                    <div className="lm-field">
                      <label className="lm-label" htmlFor="lm-project">Project of Interest</label>
                      <select
                        id="lm-project"
                        className="lm-input lm-select"
                        value={form.project}
                        onChange={set('project')}
                      >
                        <option value="">Select a project…</option>
                        {PROJECT_OPTIONS.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                    <div className="lm-field">
                      <label className="lm-label" htmlFor="lm-unit">Unit Type</label>
                      <select
                        id="lm-unit"
                        className="lm-input lm-select"
                        value={form.unit}
                        onChange={set('unit')}
                      >
                        <option value="">Any unit</option>
                        {UNIT_OPTIONS.map((u) => (
                          <option key={u} value={u}>{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
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
                      'Confirm Your Request'
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
