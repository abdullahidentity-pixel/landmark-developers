// Single lead-delivery pipeline shared by every form + CTA on the site.
// Each qualified lead is sent through BOTH channels at once:
//   1. WhatsApp — opens wa.me with the lead prefilled (instant, always works)
//   2. Email    — POSTed to Web3Forms, which emails it to CONTACT.leadEmail
//
// WhatsApp is fired first, synchronously, so it still counts as a user gesture
// and isn't swallowed by the browser's popup blocker. Email then fires in the
// background. If the Web3Forms key isn't set yet, only WhatsApp runs — so a
// lead is never lost.

import { CONTACT } from '../data/site.js';

export const WEB3FORMS_ARMED =
  !!CONTACT.web3formsKey && !CONTACT.web3formsKey.startsWith('REPLACE_');

// Order + labels for the WhatsApp message body. Only present fields are shown.
const WA_ORDER = [
  'name', 'phone', 'email', 'project', 'unit',
  'interest', 'preferred_date', 'preferred_time', 'message',
];
const WA_LABELS = {
  name: 'Name',
  phone: 'Phone',
  email: 'Email',
  project: 'Project',
  unit: 'Unit',
  interest: 'Investment interest',
  preferred_date: 'Preferred date',
  preferred_time: 'Preferred time',
  message: 'Message',
};

/** Email the lead to the Landmark inbox via Web3Forms. Returns true on success. */
export async function emailLead(fields) {
  if (!WEB3FORMS_ARMED) return false;
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: CONTACT.web3formsKey, ...fields }),
    });
    const data = await res.json();
    return !!data.success;
  } catch {
    return false;
  }
}

/** Open WhatsApp with the lead details prefilled. Must run inside a click. */
export function openWhatsAppLead(fields) {
  const lines = [`*New Lead — ${fields.subject || 'Enquiry'}*`];
  for (const key of WA_ORDER) {
    if (fields[key]) lines.push(`${WA_LABELS[key]}: ${fields[key]}`);
  }
  const text = encodeURIComponent(lines.join('\n'));
  window.open(`${CONTACT.whatsappHref}?text=${text}`, '_blank', 'noopener');
}

/**
 * Deliver a lead through BOTH channels.
 * Call from a submit handler (a real user gesture). WhatsApp opens immediately;
 * the returned promise resolves to whether the email was accepted.
 */
export async function deliverLead(fields) {
  openWhatsAppLead(fields);
  return emailLead(fields);
}
