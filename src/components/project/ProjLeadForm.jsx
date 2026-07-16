import { useState } from 'react';
import { Reveal, RevealGroup, RevealItem } from '../Reveal.jsx';
import MagneticButton from '../MagneticButton.jsx';
import { PhoneIcon, WhatsAppIcon } from '../Icons.jsx';
import { CONTACT, UNIT_OPTIONS } from '../../data/site.js';
import { deliverLead } from '../../lib/leadDelivery.js';

const EMPTY = { name: '', phone: '', unit: '', message: '' };

function validate(values) {
  const e = {};
  if (!values.name.trim()) e.name = 'Please enter your name';
  const digits = values.phone.replace(/\D/g, '');
  if (!values.phone.trim()) e.phone = 'Please enter your phone number';
  else if (digits.length < 10 || digits.length > 13) e.phone = 'Enter a valid phone number';
  return e;
}

export default function ProjLeadForm({ project }) {
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
      ev.currentTarget.querySelector(`[name="${Object.keys(e)[0]}"]`)?.focus();
      return;
    }
    // Deliver through BOTH channels: WhatsApp opens instantly + email to inbox.
    deliverLead({
      subject: `Project Enquiry — ${project.displayName}`,
      from_name: 'Landmark Developers Website',
      source: `Project page: ${project.displayName}`,
      name: values.name.trim(),
      phone: values.phone.trim(),
      project: project.displayName,
      unit: values.unit,
      message: values.message.trim(),
    });
    setSent(true);
    setValues(EMPTY);
  };

  return (
    <section className="pj-lead" id="pj-contact" aria-labelledby="pj-lead-title">
      <div className="container pj-lead-inner">

        <Reveal className="pj-lead-intro" y={36}>
          <p className="eyebrow">Get Investment Details</p>
          <h2 id="pj-lead-title" className="pj-section-title left">
            Register your interest in {project.name}
          </h2>
          <p className="pj-lead-sub">
            Share your details and our investment team will get back to you with the latest
            pricing, availability, and payment options for {project.displayName}.
          </p>

          <div className="lead-contacts">
            <a className="lead-contact" href={CONTACT.phoneHref}>
              <PhoneIcon width="22" height="22" />
              <span><em>Call</em>{CONTACT.phoneDisplay}</span>
            </a>
            <a className="lead-contact" href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon width="22" height="22" />
              <span><em>WhatsApp</em>{CONTACT.phoneDisplay}</span>
            </a>
          </div>
          <p className="lead-timing">
            {CONTACT.timing} · <span>{CONTACT.timingNote}</span>
          </p>
        </Reveal>

        <RevealGroup as="form" className="lead-form" stagger={0.07} onSubmit={onSubmit} noValidate>
          {sent && (
            <div className="lead-success" role="status">
              <p>
                Thank you. Landmark's team will contact you shortly.
              </p>
              <a
                className="btn btn-whatsapp"
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon width="18" height="18" /> Need faster response? WhatsApp now
              </a>
            </div>
          )}

          <RevealItem className={`field ${errors.name ? 'has-error' : ''}`} y={24}>
            <label htmlFor="pjf-name">Name</label>
            <input id="pjf-name" name="name" type="text" autoComplete="name"
              placeholder="Your full name" value={values.name} onChange={update('name')}
              aria-invalid={!!errors.name} />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </RevealItem>

          <RevealItem className={`field ${errors.phone ? 'has-error' : ''}`} y={24}>
            <label htmlFor="pjf-phone">Phone</label>
            <input id="pjf-phone" name="phone" type="tel" autoComplete="tel"
              placeholder="+92 3XX XXXXXXX" value={values.phone} onChange={update('phone')}
              aria-invalid={!!errors.phone} />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </RevealItem>

          <RevealItem className="field" y={24}>
            <label htmlFor="pjf-unit">Unit Type</label>
            <select id="pjf-unit" name="unit" value={values.unit} onChange={update('unit')}>
              <option value="">Any unit</option>
              {project.units.map((u) => (
                <option key={u.type} value={u.type}>{u.type}</option>
              ))}
            </select>
          </RevealItem>

          <RevealItem className="field" y={24}>
            <label htmlFor="pjf-message">Message</label>
            <textarea id="pjf-message" name="message" rows="3"
              placeholder="Questions about pricing, floor plans, or availability…"
              value={values.message} onChange={update('message')} />
          </RevealItem>

          <RevealItem y={20}>
            <MagneticButton as="button" type="submit" variant="primary" className="btn-lg lead-submit">
              Send Me Project Details
            </MagneticButton>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
