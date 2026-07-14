import { useEffect, useState } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll.js';
import CursorGlow from '../components/CursorGlow.jsx';
import FloatingWhatsApp from '../components/FloatingWhatsApp.jsx';
import MobileCTABar from '../components/MobileCTABar.jsx';
import Footer from '../components/Footer.jsx';
import InnerHeader from '../components/inner/InnerHeader.jsx';
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal.jsx';
import { CONTACT } from '../data/site.js';
import '../styles/inner-pages.css';

const PROJECT_OPTIONS = [
  'Grand X',
  'Grand 11',
  'The View — Grand 12',
  'The Oasis — Grand 14',
  'The Grand Lifestyle — Grand 15',
  'Not sure yet',
];

const INFO_CARDS = [
  {
    label: 'Call Us',
    value: '+92 321 000 4000',
    sub: 'Mon–Sat, 10:00 AM – 8:00 PM',
    href: 'tel:+923210004000',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.46 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.37 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    value: 'Chat with Our Team',
    sub: 'Instant responses during office hours',
    href: 'https://wa.me/923210004000',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    label: 'Visit Our Office',
    value: 'Plaza 39 AA Commercial',
    sub: 'Main Boulevard, Bahria Town, Lahore',
    href: CONTACT.mapsHref,
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: 'Office Hours',
    value: 'Mon – Sat',
    sub: '10:00 AM – 8:00 PM · Sunday closed',
    href: null,
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

/* ── Page ─────────────────────────────────────────────────── */

export default function ContactPage() {
  useSmoothScroll();

  const [form, setForm]     = useState({ name: '', phone: '', project: '', message: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Contact Landmark Developers | Bahria Town Lahore';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content',
      'Get in touch with Landmark Developers. Call, WhatsApp, or visit our office at Plaza 39 AA Commercial, Main Boulevard, Bahria Town, Lahore. Mon–Sat 10 AM–8 PM.'
    );
    return () => { document.title = 'Landmark Developers — Premium Living in Bahria Town Lahore'; };
  }, []);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim())  errs.name  = 'Please enter your name';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    else if (form.phone.replace(/\D/g, '').length < 10) errs.phone = 'Enter a valid phone number';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const msg =
      `*New Enquiry — Landmark Developers Website*\n\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Interested In: ${form.project || 'Not specified'}\n` +
      `Message: ${form.message || '—'}`;
    window.open(`https://wa.me/923210004000?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="inner-page contact-page">
      <CursorGlow />
      <InnerHeader />

      <main>
        {/* ── Hero ── */}
        <section className="ip-hero contact-hero">
          <div className="ip-hero-bg" aria-hidden="true">
            <div className="ip-orb ip-orb-1" />
            <div className="ip-orb ip-orb-2" />
          </div>
          <div className="container ip-hero-inner">
            <Reveal>
              <p className="ip-label">Contact · Landmark Developers</p>
            </Reveal>
            <Reveal delay={0.07}>
              <h1 className="ip-hero-h1">
                Let's discuss your<br />
                <span className="gold-word">next investment.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="ip-hero-sub">
                Our investment team is available 6 days a week to answer your questions,
                share payment plans, and help you secure the right unit.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Info cards ── */}
        <section className="ip-section">
          <div className="container">
            <RevealGroup className="contact-cards-grid" stagger={0.09}>
              {INFO_CARDS.map((card) => {
                const inner = (
                  <>
                    <div className="contact-card-icon">{card.icon}</div>
                    <p className="contact-card-lbl">{card.label}</p>
                    <p className="contact-card-val">{card.value}</p>
                    <p className="contact-card-sub">{card.sub}</p>
                  </>
                );
                return (
                  <RevealItem key={card.label}>
                    {card.href ? (
                      <a
                        href={card.href}
                        className="contact-info-card"
                        target={card.href.startsWith('http') ? '_blank' : undefined}
                        rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="contact-info-card">{inner}</div>
                    )}
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </section>

        {/* ── Form + Map ── */}
        <section className="ip-section">
          <div className="container">
            <div className="contact-form-layout">
              {/* Form */}
              <Reveal>
                <div className="contact-form-side">
                  <p className="ip-label">Send a Message</p>
                  <h2>We'll get back to<br />you within hours.</h2>
                  <p>
                    Share your details and our consultation team will follow up with project
                    information, pricing, and availability tailored to your interests.
                  </p>

                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="ip-field-row">
                      <div className="ip-field">
                        <label htmlFor="c-name">Your Name</label>
                        <input
                          id="c-name"
                          name="name"
                          type="text"
                          placeholder="Full name"
                          value={form.name}
                          onChange={handleChange}
                          style={errors.name ? { borderColor: '#e05c5c' } : {}}
                        />
                        {errors.name && <span style={{ fontSize: '0.75rem', color: '#e05c5c', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
                      </div>
                      <div className="ip-field">
                        <label htmlFor="c-phone">Phone Number *</label>
                        <input
                          id="c-phone"
                          name="phone"
                          type="tel"
                          placeholder="+92 3XX XXXXXXX"
                          value={form.phone}
                          onChange={handleChange}
                          style={errors.phone ? { borderColor: '#e05c5c' } : {}}
                        />
                        {errors.phone && <span style={{ fontSize: '0.75rem', color: '#e05c5c', marginTop: '4px', display: 'block' }}>{errors.phone}</span>}
                      </div>
                    </div>

                    <div className="ip-field">
                      <label htmlFor="c-project">Interested Project</label>
                      <select id="c-project" name="project" value={form.project} onChange={handleChange}>
                        <option value="">Any project</option>
                        {PROJECT_OPTIONS.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>

                    <div className="ip-field">
                      <label htmlFor="c-message">Your Message <span style={{ opacity: 0.5 }}>(optional)</span></label>
                      <textarea
                        id="c-message"
                        name="message"
                        placeholder="Ask about pricing, payment plans, availability…"
                        value={form.message}
                        onChange={handleChange}
                      />
                    </div>

                    <button type="submit" className="ip-submit">
                      Send via WhatsApp →
                    </button>
                  </form>
                </div>
              </Reveal>

              {/* Map */}
              <Reveal delay={0.1}>
                <div className="contact-map-side">
                  <p className="ip-label">Find Us</p>
                  <h2>Visit our<br />Bahria Town office.</h2>

                  <div className="contact-map-frame">
                    <iframe
                      title="Landmark Developers Office Location"
                      src="https://maps.google.com/maps?q=Bahria+Town+Main+Boulevard+Lahore&output=embed"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>

                  <div className="contact-map-address">
                    <span className="addr-label">Office Address</span>
                    <span className="addr-text">
                      Plaza no. 39 AA Commercial<br />
                      Main Boulevard, Bahria Town, Lahore
                    </span>
                    <span className="addr-timing">
                      Mon–Sat · 10:00 AM – 8:00 PM · Sunday closed
                    </span>
                    <a
                      href={CONTACT.mapsHref}
                      className="addr-directions"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 24 24">
                        <line x1="12" y1="19" x2="12" y2="5" />
                        <polyline points="5 12 12 5 19 12" />
                      </svg>
                      Get Directions
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="ip-section ip-cta-section contact-cta-section">
          <div className="container ip-cta-inner">
            <Reveal>
              <h2 className="ip-cta-h2">
                WhatsApp<br />
                <span className="gold-word">+92 321 000 4000</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="ip-cta-btns">
                <a
                  href={CONTACT.whatsappHref}
                  className="btn btn-primary btn-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open WhatsApp
                </a>
                <a href={CONTACT.phoneHref} className="btn btn-glass btn-lg">
                  Call Now
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
      <MobileCTABar />
    </div>
  );
}
