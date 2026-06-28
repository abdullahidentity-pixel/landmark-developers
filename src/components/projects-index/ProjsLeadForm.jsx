import { useState } from 'react';
import { Reveal, RevealGroup, RevealItem } from '../Reveal.jsx';
import MagneticButton from '../MagneticButton.jsx';
import { PhoneIcon, WhatsAppIcon } from '../Icons.jsx';
import { CONTACT } from '../../data/site.js';
import { PROJECTS_DATA } from '../../data/projects.js';

const INTEREST_OPTIONS = [
  'Residential Apartment',
  'Commercial Outlet',
  'Hotel Apartment',
  'Corporate Office',
  'Not Sure — Need Advice',
];

const EMPTY = { name: '', phone: '', project: '', interest: '', message: '' };

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Please enter your name';
  const digits = v.phone.replace(/\D/g, '');
  if (!v.phone.trim()) e.phone = 'Please enter your phone number';
  else if (digits.length < 10 || digits.length > 13) e.phone = 'Enter a valid phone number';
  return e;
}

export default function ProjsLeadForm() {
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
    const text =
      `Project recommendation request%0A` +
      `Name: ${values.name}%0APhone: ${values.phone}%0A` +
      `Preferred project: ${values.project || 'Not specified'}%0A` +
      `Investment interest: ${values.interest || 'Not specified'}%0A` +
      `Message: ${values.message || '—'}`;
    window.open(`${CONTACT.whatsappHref}?text=${text}`, '_blank', 'noopener');
    setSent(true);
    setValues(EMPTY);
  };

  return (
    <section className="pjidx-lead" id="enquire" aria-labelledby="pjidx-lead-title">
      <div className="container pjidx-lead-inner">

        <Reveal className="pjidx-lead-intro" y={40}>
          <p className="eyebrow">Find Your Match</p>
          <h2 id="pjidx-lead-title" className="pjidx-section-title left">
            Need help choosing the right Landmark project?
          </h2>
          <p className="pjidx-lead-sub">
            Tell us your investment goals and preferred project. Our team will send you a
            personalised project recommendation within hours.
          </p>

          <div className="lead-contacts">
            <a className="lead-contact" href={CONTACT.phoneHref}>
              <PhoneIcon width="22" height="22" />
              <span><em>Call directly</em>{CONTACT.phoneDisplay}</span>
            </a>
            <a className="lead-contact" href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon width="22" height="22" />
              <span><em>WhatsApp</em>{CONTACT.phoneDisplay}</span>
            </a>
          </div>
          <p className="lead-timing">{CONTACT.timing} · <span>{CONTACT.timingNote}</span></p>
        </Reveal>

        <RevealGroup as="form" className="lead-form pjidx-form" stagger={0.07} onSubmit={onSubmit} noValidate>
          {sent && (
            <div className="lead-success" role="status">
              <p>Thank you — our investment team will be in touch shortly with personalised recommendations.</p>
              <a className="btn btn-whatsapp" href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon width="18" height="18" /> WhatsApp us now for faster response
              </a>
            </div>
          )}

          <RevealItem className={`field ${errors.name ? 'has-error' : ''}`} y={24}>
            <label htmlFor="pjidx-name">Your Name</label>
            <input id="pjidx-name" name="name" type="text" autoComplete="name"
              placeholder="Full name" value={values.name} onChange={update('name')}
              aria-invalid={!!errors.name} />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </RevealItem>

          <RevealItem className={`field ${errors.phone ? 'has-error' : ''}`} y={24}>
            <label htmlFor="pjidx-phone">Phone Number</label>
            <input id="pjidx-phone" name="phone" type="tel" autoComplete="tel"
              placeholder="+92 3XX XXXXXXX" value={values.phone} onChange={update('phone')}
              aria-invalid={!!errors.phone} />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </RevealItem>

          <RevealItem className="field" y={24}>
            <label htmlFor="pjidx-project">Preferred Project</label>
            <select id="pjidx-project" name="project" value={values.project} onChange={update('project')}>
              <option value="">Any project</option>
              {PROJECTS_DATA.map((p) => (
                <option key={p.slug} value={p.displayName}>{p.displayName}</option>
              ))}
            </select>
          </RevealItem>

          <RevealItem className="field" y={24}>
            <label htmlFor="pjidx-interest">Investment Interest</label>
            <select id="pjidx-interest" name="interest" value={values.interest} onChange={update('interest')}>
              <option value="">Select interest</option>
              {INTEREST_OPTIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </RevealItem>

          <RevealItem className="field" y={24}>
            <label htmlFor="pjidx-message">Your Budget or Questions <span className="field-optional">(optional)</span></label>
            <textarea id="pjidx-message" name="message" rows="3"
              placeholder="Tell us your budget, timeline, or any specific questions…"
              value={values.message} onChange={update('message')} />
          </RevealItem>

          <RevealItem y={20}>
            <MagneticButton as="button" type="submit" variant="primary" className="btn-lg lead-submit">
              Get Project Recommendations
            </MagneticButton>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
