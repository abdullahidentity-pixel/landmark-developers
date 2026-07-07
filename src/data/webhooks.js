/**
 * Webhook & CRM integration endpoints.
 * Replace the placeholder values with real URLs when ready.
 *
 * CRM_WEBHOOK      — receives every lead (name, phone, email, project, message)
 * CALENDAR_WEBHOOK — receives tour bookings (same fields + preferred date/time)
 *
 * Both endpoints should accept a POST request with JSON body.
 * Leave as empty string '' to skip that integration silently.
 */

export const WEBHOOKS = {
  CRM_WEBHOOK:      '',   // e.g. 'https://hooks.zapier.com/hooks/catch/xxxx/yyyy/'
  CALENDAR_WEBHOOK: '',   // e.g. 'https://hooks.zapier.com/hooks/catch/xxxx/zzzz/'
};

export const PROJECTS_LIST = [
  'Grand 15',
  'Grand 14',
  'Grand X',
  'Grand 11',
  'Grand 12',
];
