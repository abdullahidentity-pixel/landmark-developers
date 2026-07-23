import { useEffect, useState } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll.js';
import CursorGlow from '../components/CursorGlow.jsx';
import FloatingWhatsApp from '../components/FloatingWhatsApp.jsx';
import MobileCTABar from '../components/MobileCTABar.jsx';
import Footer from '../components/Footer.jsx';
import InnerHeader from '../components/inner/InnerHeader.jsx';
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal.jsx';
import { CONTACT } from '../data/site.js';
import { DEFAULT_COUNTRY, dialOf } from '../data/countries.js';
import PhoneField from '../components/PhoneField.jsx';
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

const JOB_OPENINGS = [
  {
    title: 'Business Development Representative',
    department: 'Sales & Marketing',
    type: 'Full-time',
    location: 'Bahria Town, Lahore',
    blurb:
      'Generate qualified leads, build relationships with prospective buyers and investors, and represent Landmark’s portfolio across calls, walk-ins, and site visits.',
    highlights: [
      '1–3 years in sales, real estate, or business development',
      'Confident communicator, fluent in Urdu & English',
      'Comfortable with CRM tools and daily follow-ups',
    ],
  },
  {
    title: 'Manager Sales',
    department: 'Sales & Marketing',
    type: 'Full-time',
    location: 'Bahria Town, Lahore',
    blurb:
      'Lead and mentor the sales team, own revenue targets across our projects, and build the strategy that turns interest into closed, high-value investments.',
    highlights: [
      '5+ years in real estate sales with a proven closing record',
      'Experience leading and coaching a sales team',
      'Strong pipeline, negotiation, and reporting skills',
    ],
  },
];

const POSITION_OPTIONS = [
  'Business Development Representative',
  'Manager Sales',
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

  const [form, setForm]     = useState({ name: '', country: DEFAULT_COUNTRY, phone: '', email: '', position: '', message: '', cv: null });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Scroll position handled globally by <ScrollToTop> in App.jsx — SEO only here.
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

  const handleCv = (e) => {
    const file = e.target.files?.[0] || null;
    // Web3Forms caps attachments at ~5 MB; reject early with a clear message.
    if (file && file.size > 5 * 1024 * 1024) {
      setErrors((er) => ({ ...er, cv: 'File is too large — max 5 MB.' }));
      setForm((f) => ({ ...f, cv: null }));
      e.target.value = '';
      return;
    }
    setErrors((er) => ({ ...er, cv: '' }));
    setForm((f) => ({ ...f, cv: file }));
  };

  const applyFor = (title) => {
    setForm((f) => ({ ...f, position: title }));
    document.getElementById('career-apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim())  errs.name  = 'Please enter your name';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    else if (form.phone.replace(/\D/g, '').length < 10) errs.phone = 'Enter a valid phone number';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    // Deliver through BOTH channels: WhatsApp opens instantly + email to inbox.
    // The CV (if attached) rides the email channel only — WhatsApp deep-links
    // can't carry a file, so the copy asks candidates to attach it there too.
    deliverLead({
      subject: 'Career Application',
      from_name: 'Landmark Developers Website',
      source: 'Careers page',
      name: form.name.trim(),
      phone: `${dialOf(form.country)} ${form.phone.trim()}`.trim(),
      email: (form.email || '').trim(),
      interest: form.position || 'Open position',
      message: (form.message || '').trim(),
      ...(form.cv ? { cv: form.cv } : {}),
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
              <p className="career-openings-lead">
                We’re growing our Sales &amp; Marketing team. If you thrive on building
                relationships and closing high-value real-estate investments, we’d love to
                hear from you.
              </p>
            </Reveal>

            <RevealGroup className="career-jobs" stagger={0.08}>
              {JOB_OPENINGS.map((job) => (
                <RevealItem key={job.title} className="career-job">
                  <div className="career-job-head">
                    <span className="career-job-dept">{job.department}</span>
                    <h3 className="career-job-title">{job.title}</h3>
                    <div className="career-job-meta">
                      <span>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {job.type}
                      </span>
                      <span>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {job.location}
                      </span>
                    </div>
                  </div>

                  <p className="career-job-blurb">{job.blurb}</p>

                  <ul className="career-job-list">
                    {job.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className="career-job-apply"
                    onClick={() => applyFor(job.title)}
                  >
                    Apply for this role
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ── Application Form ── */}
        <section className="ip-section" id="career-apply">
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
                      <PhoneField
                        id="cr-phone"
                        country={form.country}
                        phone={form.phone}
                        onCountry={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                        onPhone={handleChange}
                        ariaInvalid={!!errors.phone}
                        errorStyle={errors.phone ? { borderColor: '#e05c5c' } : undefined}
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

                  <div className="ip-field">
                    <label htmlFor="cr-cv">Attach Your CV <span style={{ opacity: 0.5 }}>(optional · PDF or Word, max 5 MB)</span></label>
                    <label htmlFor="cr-cv" className={`cv-dropzone${form.cv ? ' has-file' : ''}`}>
                      <input
                        id="cr-cv"
                        name="cv"
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleCv}
                        className="cv-input"
                      />
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="cv-icon">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <span className="cv-text">
                        {form.cv ? form.cv.name : 'Click to upload your CV'}
                      </span>
                      {form.cv && (
                        <span className="cv-size">{(form.cv.size / 1024).toFixed(0)} KB</span>
                      )}
                    </label>
                    {errors.cv && <span style={{ fontSize: '0.75rem', color: '#e05c5c', marginTop: '4px', display: 'block' }}>{errors.cv}</span>}
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
