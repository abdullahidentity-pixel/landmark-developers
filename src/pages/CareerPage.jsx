import { useEffect, useState } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll.js';
import CursorGlow from '../components/CursorGlow.jsx';
import FloatingWhatsApp from '../components/FloatingWhatsApp.jsx';
import MobileCTABar from '../components/MobileCTABar.jsx';
import Footer from '../components/Footer.jsx';
import InnerHeader from '../components/inner/InnerHeader.jsx';
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal.jsx';
import { CONTACT } from '../data/site.js';
import { deliverLead } from '../lib/leadDelivery.js';
import '../styles/inner-pages.css';

/* ── Data ─────────────────────────────────────────────────── */

const PILLARS = [
  {
    title: 'Quality-Driven Culture',
    body: 'Work on developments where the standard is set by the product — not cut by budget.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: 'Real Growth',
    body: 'A growing portfolio means real career growth — new projects, new challenges, new markets.',
    icon: (
      <svg viewBox="0 0 24 24">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    title: 'Collaborative Team',
    body: 'A small, focused team where your contribution is visible and your voice is heard.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Client-First Values',
    body: 'We build for buyers and investors who trust us — every role here supports that mission.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

const POSITION_OPTIONS = [
  'Sales Executive',
  'Investment Consultant',
  'Site Engineer',
  'Project Manager',
  'Marketing Executive',
  'Customer Support',
  'Finance & Accounts',
  'Other / Open to Discussion',
];

/* ── Page ─────────────────────────────────────────────────── */

export default function CareerPage() {
  useSmoothScroll();

  const [form, setForm]     = useState({ name: '', phone: '', email: '', position: '', message: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Careers at Landmark Developers | Join Our Team';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content',
      'Build your career with Landmark Developers. Join a team focused on quality construction, modern real estate development, and client trust in Bahria Town Lahore.'
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
    // Deliver through BOTH channels: WhatsApp opens instantly + email to inbox.
    deliverLead({
      subject: 'Career Application',
      from_name: 'Landmark Developers Website',
      source: 'Careers page',
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: (form.email || '').trim(),
      interest: form.position || 'Open position',
      message: (form.message || '').trim(),
    });
  };

  return (
    <div className="inner-page career-page">
      <CursorGlow />
      <InnerHeader />

      <main>
        {/* ── Hero ── */}
        <section className="ip-hero">
          <div className="ip-hero-bg" aria-hidden="true">
            <div className="ip-orb ip-orb-1" />
            <div className="ip-orb ip-orb-2" />
          </div>
          <div className="container ip-hero-inner">
            <Reveal>
              <p className="ip-label">Careers · Landmark Developers</p>
            </Reveal>
            <Reveal delay={0.07}>
              <h1 className="ip-hero-h1">
                Build your career<br />
                <span className="gold-word">with Landmark.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="ip-hero-sub">
                Join a team focused on quality construction, modern real estate development,
                and client trust — building Pakistan's most respected residential and
                commercial addresses.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Why Join ── */}
        <section className="ip-section">
          <div className="container">
            <div className="career-why-grid">
              {/* Left: copy + pillars */}
              <Reveal>
                <div className="career-why-text">
                  <p className="ip-label">Why Join Us</p>
                  <h2>
                    Work on what<br />
                    <span className="gold-word">people live in.</span>
                  </h2>
                  <p>
                    At Landmark Developers, you're not working on abstract products — you're working on
                    homes, businesses, and investments that shape people's lives and communities.
                  </p>
                  <p>
                    We look for people who take pride in their craft, communicate honestly, and care
                    about the outcome for the end buyer — not just the deadline.
                  </p>

                  <div className="career-pillars">
                    {PILLARS.map((p) => (
                      <div key={p.title} className="career-pillar">
                        <div className="career-pillar-icon">{p.icon}</div>
                        <div className="career-pillar-text">
                          <strong>{p.title}</strong>
                          <span>{p.body}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Right: company stats panel */}
              <Reveal delay={0.12}>
                <div className="career-why-stats">
                  <h3>Landmark by the numbers</h3>

                  <div className="career-why-stat">
                    <strong>9+</strong>
                    <span>Years of Operation</span>
                  </div>
                  <div className="career-why-stat">
                    <strong>15</strong>
                    <span>Completed Projects</span>
                  </div>
                  <div className="career-why-stat">
                    <strong>500+</strong>
                    <span>Units Delivered</span>
                  </div>
                  <div className="career-why-stat">
                    <strong>2</strong>
                    <span>Cities — Lahore & Islamabad</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Open Positions ── */}
        <section className="ip-section">
          <div className="container">
            <Reveal><p className="ip-label">Open Positions</p></Reveal>
            <Reveal delay={0.07}>
              <h2 className="ip-section-h2">
                Current<br />
                <span className="gold-word">openings.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="career-openings-card">
                <div className="career-openings-icon">
                  <svg viewBox="0 0 24 24">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <h3>No current openings listed</h3>
                <p>
                  We are not actively hiring at the moment, but we welcome talented people to
                  submit their profile for future opportunities. Our team is always growing as
                  new projects launch.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Application Form ── */}
        <section className="ip-section">
          <div className="container">
            <div className="career-form-layout">
              {/* Copy */}
              <Reveal>
                <div className="career-form-copy">
                  <p className="ip-label">Submit Your Profile</p>
                  <h2>
                    Join us when<br />
                    <span className="gold-word">the time is right.</span>
                  </h2>
                  <p>
                    Send us your details and let us know what role interests you most.
                    When an opening that matches your profile arises, you'll be the
                    first to hear from us.
                  </p>
                  <p>
                    Our team responds to all applications directly via WhatsApp or phone
                    — no automated rejections, no black holes.
                  </p>
                  <div className="cf-note">
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    You can also send your CV directly to our WhatsApp at {CONTACT.phoneDisplay}.
                    We review every application personally.
                  </div>
                </div>
              </Reveal>

              {/* Form */}
              <Reveal delay={0.1}>
                <form className="career-form" onSubmit={handleSubmit}>
                  <div className="ip-field-row">
                    <div className="ip-field">
                      <label htmlFor="cr-name">Full Name</label>
                      <input
                        id="cr-name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        style={errors.name ? { borderColor: '#e05c5c' } : {}}
                      />
                      {errors.name && <span style={{ fontSize: '0.75rem', color: '#e05c5c', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
                    </div>
                    <div className="ip-field">
                      <label htmlFor="cr-phone">Phone Number *</label>
                      <input
                        id="cr-phone"
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
                    <label htmlFor="cr-email">Email Address</label>
                    <input
                      id="cr-email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="ip-field">
                    <label htmlFor="cr-position">Position Interested In</label>
                    <select
                      id="cr-position"
                      name="position"
                      value={form.position}
                      onChange={handleChange}
                    >
                      <option value="">Select a role…</option>
                      {POSITION_OPTIONS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div className="ip-field">
                    <label htmlFor="cr-message">Cover Note <span style={{ opacity: 0.5 }}>(optional)</span></label>
                    <textarea
                      id="cr-message"
                      name="message"
                      placeholder="Tell us about your experience and why you'd like to join Landmark…"
                      value={form.message}
                      onChange={handleChange}
                      style={{ minHeight: '140px' }}
                    />
                  </div>

                  <button type="submit" className="ip-submit">
                    Submit Profile via WhatsApp →
                  </button>
                </form>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="ip-section ip-cta-section career-cta-section">
          <div className="container ip-cta-inner">
            <Reveal><p className="ip-label">Reach Out Directly</p></Reveal>
            <Reveal delay={0.08}>
              <h2 className="ip-cta-h2">
                Questions about<br />
                <span className="gold-word">joining our team?</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="ip-cta-btns">
                <a
                  href={CONTACT.whatsappHref}
                  className="btn btn-primary btn-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Us
                </a>
                <a href={CONTACT.phoneHref} className="btn btn-glass btn-lg">
                  Call {CONTACT.phoneDisplay}
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
