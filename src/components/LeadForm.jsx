import { useState } from 'react';
import { Reveal, RevealGroup, RevealItem } from './Reveal.jsx';
import { PhoneIcon, WhatsAppIcon } from './Icons.jsx';
import { CONTACT, PROJECT_OPTIONS, UNIT_OPTIONS } from '../data/site.js';

const EMPTY = { name: '', phone: '', project: '', unit: '', message: '' };

function validate(values) {
  const e = {};
  if (!values.name.trim()) e.name = 'Please enter your name';
  const digits = values.phone.replace(/\D/g, '');
  if (!values.phone.trim()) e.phone = 'Please enter your phone number';
  else if (digits.length < 10 || digits.length > 13) e.phone = 'Enter a valid phone number';
  if (!values.project) e.project = 'Select a project';
  return e;
}

export default function LeadForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (k) => (ev) => {
    setValues((v) => ({ ...v, [k]: ev.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = validate(values);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = ev.currentTarget.querySelector(`[name="${Object.keys(e)[0]}"]`);
      first?.focus();
      return;
    }
    // No backend in this build — hand the qualified lead straight to WhatsApp.
    const text =
      `New investment enquiry%0A` +
      `Name: ${values.name}%0A` +
      `Phone: ${values.phone}%0A` +
      `Project: ${values.project}%0A` +
      `Unit: ${values.unit || '—'}%0A` +
      `Message: ${values.message || '—'}`;
    window.open(`${CONTACT.whatsappHref}?text=${text}`, '_blank', 'noopener');
    setSent(true);
    setValues(EMPTY);
  };

  return (
    <section className="lead" id="contact">
      <div className="container lead-inner">
        <Reveal className="lead-intro" y={36}>
          <p className="eyebrow">Get Investment Details</p>
          <h2 className="section-title left">Reserve your spot in a Landmark address</h2>
          <p className="section-sub left">
            Share a few details and our investment team will send pricing, availability
            and projected returns — fast.
          </p>

          <div className="lead-contacts">
            <a className="lead-contact" href={CONTACT.phoneHref}>
              <PhoneIcon width="22" height="22" />
              <span>
                <em>Call</em>
                {CONTACT.phoneDisplay}
              </span>
            </a>
            <a
              className="lead-contact"
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon width="22" height="22" />
              <span>
                <em>WhatsApp</em>
                {CONTACT.phoneDisplay}
              </span>
            </a>
          </div>
          <p className="lead-timing">
            {CONTACT.timing} · <span>{CONTACT.timingNote}</span>
          </p>
        </Reveal>

        <RevealGroup as="form" className="lead-form" stagger={0.07} onSubmit={onSubmit} noValidate>
          {sent && (
            <p className="lead-success" role="status">
              Thanks! We’ve opened WhatsApp with your details — send it to reach our team instantly.
            </p>
          )}

          <RevealItem className={`field ${errors.name ? 'has-error' : ''}`} y={24}>
            <label htmlFor="lf-name">Name</label>
            <input
              id="lf-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              value={values.name}
              onChange={update('name')}
              aria-invalid={!!errors.name}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </RevealItem>

          <RevealItem className={`field ${errors.phone ? 'has-error' : ''}`} y={24}>
            <label htmlFor="lf-phone">Phone</label>
            <input
              id="lf-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+92 3XX XXXXXXX"
              value={values.phone}
              onChange={update('phone')}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </RevealItem>

          <RevealItem className="field-row" y={24}>
            <div className={`field ${errors.project ? 'has-error' : ''}`}>
              <label htmlFor="lf-project">Interested Project</label>
              <select
                id="lf-project"
                name="project"
                value={values.project}
                onChange={update('project')}
                aria-invalid={!!errors.project}
              >
                <option value="">Select project</option>
                {PROJECT_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              {errors.project && <span className="field-error">{errors.project}</span>}
            </div>

            <div className="field">
              <label htmlFor="lf-unit">Unit Type</label>
              <select id="lf-unit" name="unit" value={values.unit} onChange={update('unit')}>
                <option value="">Any unit</option>
                {UNIT_OPTIONS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </RevealItem>

          <RevealItem className="field" y={24}>
            <label htmlFor="lf-message">Message</label>
            <textarea
              id="lf-message"
              name="message"
              rows="3"
              placeholder="Tell us your budget or questions (optional)"
              value={values.message}
              onChange={update('message')}
            />
          </RevealItem>

          <RevealItem as="button" type="submit" className="btn btn-primary btn-lg lead-submit" y={20}>
            Get Investment Details
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
