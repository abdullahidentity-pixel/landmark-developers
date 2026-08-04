import { useState } from 'react';
import { Reveal, RevealGroup, RevealItem } from '../Reveal.jsx';
import MagneticButton from '../MagneticButton.jsx';
import PhoneField from '../PhoneField.jsx';
import { PhoneIcon, WhatsAppIcon } from '../Icons.jsx';
import { deliverLead } from '../../lib/leadDelivery.js';
import { DEFAULT_COUNTRY, dialOf } from '../../data/countries.js';
import { CONTACT } from '../../data/site.js';
import { AZADI, APARTMENT_OPTIONS, INTEREST_OPTIONS, WA_MESSAGES } from '../../data/azadi.js';

const waHref = (msg) => `${CONTACT.whatsappHref}?text=${encodeURIComponent(msg)}`;

const EMPTY = {
  name: '',
  country: DEFAULT_COUNTRY,
  phone: '',
  apartment: '',
  interest: '',
  message: '',
};

// Only name + phone are required. The rest of the site works this way, and a
// campaign landing page is the last place to add friction.
function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Please enter your name';
  const digits = v.phone.replace(/\D/g, '');
  if (!v.phone.trim()) e.phone = 'Please enter your phone number';
  else if (digits.length < 10 || digits.length > 13) e.phone = 'Enter a valid phone number';
  return e;
}

export default function AzadiLeadForm() {
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
    deliverLead({
      subject: `Azadi Deal Enquiry — ${AZADI.projectShort}`,
      from_name: 'Landmark Developers Website',
      source: 'Campaign page: Grand 15 Azadi Deal',
      name: values.name.trim(),
      phone: `${dialOf(values.country)} ${values.phone.trim()}`.trim(),
      project: AZADI.project,
      unit: values.apartment,
      interest: values.interest,
      message: values.message.trim(),
    });
    setSent(true);
    setValues(EMPTY);
  };

  return (
    <section className="az-section az-lead" id="azadi-register" aria-labelledby="az-lead-title">
      <div className="container az-lead-inner">
        <Reveal className="az-lead-intro" y={36}>
          <p className="az-eyebrow">Register Interest</p>
          <h2 id="az-lead-title" className="az-title az-title--left">
            Register Your Interest in the Azadi Deal
          </h2>
          <p className="az-sub az-sub--left">
            Share your details and Landmark&rsquo;s team will contact you with Azadi Deal
            pricing, furnished-apartment options, and current availability in Grand 15.
          </p>

          <div className="az-lead-contacts">
            <a className="az-lead-contact" href={CONTACT.phoneHref}>
              <PhoneIcon width="21" height="21" />
              <span><em>Call</em>{CONTACT.phoneDisplay}</span>
            </a>
            <a
              className="az-lead-contact"
              href={waHref(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon width="21" height="21" />
              <span><em>WhatsApp</em>{CONTACT.phoneDisplay}</span>
            </a>
          </div>

          <p className="az-lead-office">{CONTACT.office}</p>
          <p className="az-lead-timing">
            {CONTACT.timing} · <span>{CONTACT.timingNote}</span>
          </p>
        </Reveal>

        <RevealGroup as="form" className="az-form" stagger={0.07} onSubmit={onSubmit} noValidate>
          {sent && (
            <div className="lead-success az-form-success" role="status">
              <p>
                Thank you. Landmark&rsquo;s team will contact you shortly with Grand Lifestyle 15
                Azadi Deal details.
              </p>
              <a
                className="btn btn-whatsapp"
                href={waHref(WA_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon width="18" height="18" />
                Need faster response? WhatsApp now
              </a>
            </div>
          )}

          <RevealItem className={`field ${errors.name ? 'has-error' : ''}`} y={24}>
            <label htmlFor="azf-name">Full Name</label>
            <input
              id="azf-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              value={values.name}
              onChange={update('name')}
              aria-invalid={!!errors.name}
              // Point at the message only while it exists — a describedby that
              // references a missing id is read as nothing by some screen
              // readers and as the literal id by others.
              aria-describedby={errors.name ? 'azf-name-err' : undefined}
            />
            {errors.name && (
              <span className="field-error" id="azf-name-err" role="alert">
                {errors.name}
              </span>
            )}
          </RevealItem>

          <RevealItem className={`field ${errors.phone ? 'has-error' : ''}`} y={24}>
            <label htmlFor="azf-phone">Phone / WhatsApp Number</label>
            <PhoneField
              id="azf-phone"
              country={values.country}
              phone={values.phone}
              onCountry={update('country')}
              onPhone={update('phone')}
              ariaInvalid={!!errors.phone}
              ariaDescribedBy={errors.phone ? 'azf-phone-err' : undefined}
            />
            {errors.phone && (
              <span className="field-error" id="azf-phone-err" role="alert">
                {errors.phone}
              </span>
            )}
          </RevealItem>

          <RevealItem className="field" y={24}>
            <label htmlFor="azf-apartment">Interested Apartment Type</label>
            <select
              id="azf-apartment"
              name="apartment"
              value={values.apartment}
              onChange={update('apartment')}
            >
              <option value="">Select an apartment type</option>
              {APARTMENT_OPTIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </RevealItem>

          <RevealItem className="field" y={24}>
            <label htmlFor="azf-interest">Interest</label>
            <select
              id="azf-interest"
              name="interest"
              value={values.interest}
              onChange={update('interest')}
            >
              <option value="">What are you looking for?</option>
              {INTEREST_OPTIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </RevealItem>

          <RevealItem className="field" y={24}>
            <label htmlFor="azf-message">
              Message <span className="az-field-opt">(optional)</span>
            </label>
            <textarea
              id="azf-message"
              name="message"
              rows="3"
              placeholder="Anything specific you would like to know?"
              value={values.message}
              onChange={update('message')}
            />
          </RevealItem>

          <RevealItem y={20}>
            <MagneticButton
              as="button"
              type="submit"
              variant="primary"
              className="btn-lg az-form-submit"
            >
              Register My Interest
            </MagneticButton>
          </RevealItem>

          <RevealItem y={16}>
            <p className="az-legal-note">
              Submitting this form is an enquiry only and does not reserve a unit
              or constitute a sales agreement.{' '}
              <a href="#az-legal">Read the full disclaimer</a>.
            </p>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
