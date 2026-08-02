// Definition of the "what are you looking for?" field.
//
// SCOPE: this is used by the Grand 15 project page ONLY. Every other form on the
// site (home lead form, the other project pages, projects index, contact page,
// the Book-a-Tour / download modal and the Careers cover note) keeps its original
// optional "Message" field and does NOT import from here.
//
// It lives in its own module so the wording, the placeholder and the validation
// rule stay together, and so widening the scope later is a one-line change in
// ProjLeadForm's REQUIRE_MESSAGE_SLUGS list rather than a copy-paste.

export const MESSAGE_LABEL = 'What kind of information are you looking for?';

export const MESSAGE_PLACEHOLDER =
  'e.g. pricing, floor plans, payment plan, or availability…';

export const MESSAGE_ERROR = 'Please tell us what information you need';

// Short enough that a genuine answer like "price" passes, long enough to reject
// an accidental single keystroke.
export const MIN_MESSAGE_LENGTH = 3;

/** Returns an error string when the message is missing/too short, else undefined. */
export function validateMessage(value) {
  return (value || '').trim().length < MIN_MESSAGE_LENGTH ? MESSAGE_ERROR : undefined;
}
