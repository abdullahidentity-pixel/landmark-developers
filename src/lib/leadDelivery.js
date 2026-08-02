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

const isFile = (v) => typeof File !== 'undefined' && v instanceof File;

/** Email the lead to the Landmark inbox via Web3Forms. Returns true on success.
 *  If any field value is a File (e.g. a CV upload), the whole payload is sent as
 *  multipart/form-data so Web3Forms attaches the file to the email — a JSON body
 *  can't carry a file. Otherwise we keep the lighter JSON path. */
export async function emailLead(fields) {
  if (!WEB3FORMS_ARMED) return false;
  try {
    const hasFile = Object.values(fields).some(isFile);
    let res;
    if (hasFile) {
      const fd = new FormData();
      fd.append('access_key', CONTACT.web3formsKey);
      for (const [key, val] of Object.entries(fields)) {
        if (val == null || val === '') continue;
        fd.append(key, val);            // File objects append as real attachments
      }
      res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
    } else {
      res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: CONTACT.web3formsKey, ...fields }),
        // On mobile, opening WhatsApp or navigating a PDF download backgrounds the
        // page, which normally cancels an in-flight fetch — the lead would silently
        // never reach the inbox. `keepalive` tells the browser to finish sending
        // this request even after the page is backgrounded or unloaded. (It caps the
        // body at ~64KB, which is fine for a JSON lead; the CV-upload multipart path
        // above deliberately doesn't use it because file bodies exceed that limit.)
        keepalive: true,
      });
    }
    const data = await res.json();
    return !!data.success;
  } catch {
    return false;
  }
}

/**
 * Fire ad-platform conversion events for a qualified lead. Safe to call even if
 * a script is blocked/not yet loaded — each call is guarded so it never throws.
 *   • Google Ads — records the conversion action defined by the label below.
 *   • Meta Pixel — records a standard "Lead" event.
 * Both base tags live in index.html (loaded on every page of this SPA).
 */
export function trackLeadConversion() {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-18236939136/k9jECKyXw9YcEIC3hvhD',
      });
    }
  } catch { /* analytics must never break a submit */ }
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'Lead');
    }
  } catch { /* analytics must never break a submit */ }
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
 * Deliver a lead.
 * Call from a submit handler (a real user gesture). The email request is started
 * FIRST (with keepalive) so it's guaranteed to reach the inbox even if the page
 * is then backgrounded by WhatsApp opening or a PDF download starting. WhatsApp
 * is opened afterwards, still inside the same gesture.
 *
 * `whatsapp` defaults to true (tour bookings expect a WhatsApp hand-off). Pass
 * `{ whatsapp: false }` for flows like a brochure/document download, where the
 * only goal is to capture the lead in the inbox and let the file download — with
 * no jarring app switch on mobile.
 */
export async function deliverLead(fields, { whatsapp = true } = {}) {
  const emailPromise = emailLead(fields); // start email first — keepalive protects it
  trackLeadConversion();                  // record the lead in Google Ads + Meta
  if (whatsapp) openWhatsAppLead(fields);
  return emailPromise;
}
