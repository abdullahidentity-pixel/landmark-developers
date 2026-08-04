// ─────────────────────────────────────────────────────────────────────────────
// GRAND LIFESTYLE 15 — "AZADI DEAL" CAMPAIGN CONTENT
//
// Single source of truth for the /azadi-deal landing page. Every figure here is
// transcribed from the official Landmark Developers Azadi Deal brochure. Edit
// copy, pricing and document URLs in this file — the components read from it and
// contain no hard-coded campaign content.
//
// ⚠️  PRICING IS CONTRACTUAL-ADJACENT. If a figure changes in the brochure, change
//     it here and nowhere else. The installment values below reconcile exactly:
//     (total − downPayment − confirmation) ÷ 36, to the rupee.
// ─────────────────────────────────────────────────────────────────────────────

/* ── Document URLs ──────────────────────────────────────────────────────────
   These point at real files in /public/docs. If a document does not exist yet,
   set it to `null` — the UI detects that and falls back to a prefilled WhatsApp
   request instead of serving a dead link or a 404 download. */

export const AZADI_PAYMENT_PLAN_PDF_URL = '/docs/grand-15-signature-payment-plan.pdf';
export const AZADI_LAYOUT_PLAN_PDF_URL = '/docs/grand-15-layout-plan.pdf';
// The official 10-page Azadi Deal brochure, supplied by Landmark. Its cover is
// the campaign itself — "The Grand Lifestyle Grand 15 / AZADI DEAL / Non-Furnished
// کی قیمت میں Furnished Apartment / Booking from 10 Lac" — so it is the campaign's
// own document, not the generic Grand 15 layout plan that lives alongside it.
export const AZADI_DETAILED_BROCHURE_PDF_URL = '/docs/grand-15-azadi-deal-brochure.pdf';

/* ── Campaign window ────────────────────────────────────────────────────────
   The offer runs to the end of 14 August. `deadline()` returns the next
   15 August 00:00 local time, so the whole of the 14th counts, and the page
   keeps working year-on-year without a code edit. */

export const AZADI_DEADLINE_LABEL = 'Valid till 14th August Only';

export function azadiDeadline(now = new Date()) {
  const year = now.getFullYear();
  const thisYear = new Date(year, 7, 15, 0, 0, 0, 0); // 15 Aug 00:00 = end of the 14th
  return now < thisYear ? thisYear : new Date(year + 1, 7, 15, 0, 0, 0, 0);
}

/* ── Brand / campaign identity ──────────────────────────────────────────── */

export const AZADI = {
  campaign: 'Azadi Deal',
  project: 'The Grand Lifestyle — Grand 15',
  projectShort: 'Grand 15',
  projectSlug: 'grand-15',
  pageName: 'Grand Lifestyle 15 — Azadi Deal',

  heroKicker: 'Landmark Developers · Independence Day Campaign',
  heroTitle: 'Azadi Deal!',
  heroStatement: 'Facing Park Apartment With Complete Furniture Package',
  heroSub:
    'This Independence, experience the luxury and view of the park from your private terrace apartment in Grand Lifestyle 15.',
  clockLine: 'Own Your Dream Apartment Before the Clock Runs Out',

  badges: [
    'Booking from PKR 10 Lac',
    'Furnished Apartment',
    'Facing Park',
    'Near Eiffel Tower',
    'Dubai Downtown & Raya Concept',
    AZADI_DEADLINE_LABEL,
  ],

  // Floating hero glass cards.
  //
  // Two, deliberately. The render is the campaign asset — the banner down the
  // tower, the flags along the boulevard — and every extra panel in front of it
  // buys one line of copy at the cost of covering the thing it is selling. The
  // two that were dropped each repeated something the page already says louder:
  // "Park-Facing Private Terrace" is the overview section's own headline, and
  // "Valid till 14th August" is both the CampaignBadge and the countdown.
  heroCards: [
    { title: 'Booking from 10 Lac', meta: 'Start your ownership journey' },
    { title: 'Complete Furniture Package', meta: 'Non-furnished price, furnished home' },
  ],
};

/* ── Section 2 — Project overview ───────────────────────────────────────── */

export const OVERVIEW = {
  title: 'This Independence, Experience Park-Facing Luxury',
  body:
    'Experience the luxury and view of the park from your private terrace apartment in The Grand Lifestyle — Grand 15. Inspired by Dubai Downtown and the Raya concept, Grand 15 brings together fountains, park views, Eiffel Tower-inspired surroundings, premium amenities, and a complete furnished apartment offer under the Azadi Deal.',
  cards: [
    { title: 'Park-Facing Apartments', body: 'Homes oriented to the open green, not to the next wall.' },
    { title: 'Private Terrace Lifestyle', body: 'Your own outdoor room, above the noise of the street.' },
    { title: 'Complete Furniture Package', body: 'Included on selected Azadi Deal apartments.' },
    { title: 'Near Eiffel Tower', body: "Moments from Bahria Town's Eiffel Tower replica." },
    { title: 'Dubai Downtown & Raya Concept', body: 'An architectural language borrowed from the world stage.' },
    { title: 'Fountains, Park & Landmark Views', body: 'A skyline outlook that stays worth looking at.' },
  ],
  cta: 'Register Your Interest In Grand Lifestyle 15 Azadi Deal',
};

/* ── Sections 3 & 4 — Unit types and payment plan ───────────────────────── */

export const RATE = {
  old: 18_000,
  azadi: 17_000,
  currency: 'PKR',
  unit: 'per sqft',
  badge: 'Azadi Exclusive Offer',
  installmentsBadge: '36 Installments',
  premiumNote:
    'Facing Fountains & Raya Concept units come with a premium of 10% additional charges.',
};

/**
 * Apartment types. `variants` exists because the 1 Bed is offered in two
 * areas at the same rate — modelling it as variants keeps one card per bedroom
 * count instead of showing "1 Bed" twice in the tab strip.
 */
export const UNIT_TYPES = [
  {
    id: 'studio',
    name: 'Studio Apartment',
    short: 'Studio',
    blurb: 'An efficient, high-yield entry point into Grand 15.',
    variants: [
      { area: 350, total: 5_950_000, down: 600_000, confirmation: 600_000, installment: 131_945 },
    ],
  },
  {
    id: '1-bed',
    name: '1 Bed Apartment',
    short: '1 Bed',
    blurb: 'A complete home with a private terrace and park outlook.',
    variants: [
      { area: 500, total: 8_500_000, down: 1_000_000, confirmation: 1_000_000, installment: 180_555 },
      { area: 515, total: 8_755_000, down: 1_000_000, confirmation: 1_000_000, installment: 187_639 },
    ],
  },
  {
    id: '2-bed',
    name: '2 Bed Apartment',
    short: '2 Bed',
    blurb: 'Family scale with full-width park and fountain views.',
    variants: [
      { area: 1_000, total: 17_000_000, down: 2_000_000, confirmation: 2_000_000, installment: 361_112 },
    ],
  },
  {
    id: '3-bed',
    name: '3 Bed Apartment',
    short: '3 Bed',
    blurb: 'The signature residence — the largest floor plate on offer.',
    variants: [
      { area: 1_500, total: 25_500_000, down: 3_000_000, confirmation: 3_000_000, installment: 541_667 },
    ],
  },
];

export const AVAILABILITY_NOTE =
  'Availability and final allocation are subject to confirmation from Landmark Developers.';

/* ── Section 5 — Floor journey ──────────────────────────────────────────── */

export const FLOORS = [
  {
    level: 'Lower Ground',
    title: 'Brand Outlets',
    body: 'Street-connected retail at the base of the building.',
  },
  {
    level: 'Ground Floor',
    title: 'Brand Outlets',
    body: 'Flagship frontage at the level of maximum footfall.',
  },
  {
    level: '1st – 9th Floor',
    title: 'Premium Service Apartments',
    body: 'Nine floors of serviced residences with private terraces.',
  },
];

/* ── Section 6 — Amenities ──────────────────────────────────────────────── */
// `icon` maps to the shared Icons.jsx set used across the rest of the site.

export const AMENITIES = [
  { label: 'Infinity Pool', icon: 'pool' },
  { label: 'Luxury Spa', icon: 'spa' },
  { label: 'Fitness Club', icon: 'gym' },
  { label: 'Gym', icon: 'gym' },
  { label: 'Swimming Pool', icon: 'pool' },
  { label: 'Sauna & Spa', icon: 'sauna' },
  { label: 'Rooftop Garden', icon: 'rooftop' },
  { label: 'Cargo Lifts', icon: 'lift' },
  { label: 'Daycare Center', icon: 'daycare' },
  { label: '24/7 Security', icon: 'shield' },
  { label: 'Gaming Zone', icon: 'game' },
];

export const AMENITIES_HEAD = {
  // No count in the headline. Only the amenities confirmed by the official
  // brochure are listed below, and asserting a larger number than we can show
  // would be an unsupported claim on a page that runs paid traffic. If more get
  // confirmed later, add them to AMENITIES — this headline needs no edit.
  title: 'World-Class Amenities',
  sub: 'Elevated living, curated experiences.',
};

/* ── Section 7 — Furnished package ──────────────────────────────────────── */

export const FURNISHED = {
  title: 'Non-Furnished Price. Furnished Apartment Lifestyle.',
  sub: 'Under the Grand 15 Azadi Deal, selected apartments come with a complete furniture package.',
  body:
    'Move closer to a ready lifestyle with a furniture package designed for comfort, convenience, and premium living. Furniture package details, specifications, and eligibility are subject to official confirmation from Landmark Developers.',
  cards: [
    'Complete Furniture Package',
    'Ready Lifestyle',
    'Park-Facing Apartment',
    'Private Terrace View',
    'Premium Service Apartment',
    'Brochure-Based Details',
  ],
  cta: 'Ask About Furniture Package',
};

/* ── Section 8 — Azadi visual story ─────────────────────────────────────── */

export const STORY = {
  title: 'Make This Azadi a Landmark Moment',
  body:
    'Own your dream apartment before the clock runs out. Exclusive Azadi Deal valid till 14th August only.',
  cta: 'Claim Azadi Deal',
};

/* ── Section 9 — Brochure previews ──────────────────────────────────────── */
// Only real assets present in /public are listed. Nothing invented.

// Each entry carries two files. `src` is the full-resolution original, used by
// the lightbox where the visitor has actually asked to see detail. `thumb` is
// the 800px WebP the grid uses.
//
// The grid was serving the originals: 1448×1086 JPEGs, 390–575 KB each, painted
// into a 343px-wide box on a phone. That is roughly eighteen times more pixels
// than the screen can show, and the cost is not the download — it is that the
// browser has to decode all six at full size, on the main thread, exactly as
// they scroll into view. The thumbnails are 62–106 KB and drop 2.3 MB from the
// page.
export const GALLERY = [
  { src: '/images/grand-15-2.jpg', thumb: '/images/grand-15-2-800.webp', label: 'Grand 15 — Facade' },
  { src: '/images/grand-15-1.jpg', thumb: '/images/grand-15-1-800.webp', label: 'Park & Fountain Outlook' },
  { src: '/images/grand-15-3.jpg', thumb: '/images/grand-15-3-800.webp', label: 'Residence Interiors' },
  { src: '/images/grand-15-4.jpg', thumb: '/images/grand-15-4-800.webp', label: 'Terrace Lifestyle' },
  { src: '/images/grand-15-5.jpg', thumb: '/images/grand-15-5-800.webp', label: 'Amenity Floor' },
  { src: '/images/grand-15-6.jpg', thumb: '/images/grand-15-6-800.webp', label: 'Commercial Frontage' },
];

/* ── Section 10 — Register interest form ───────────────────────────────── */

export const APARTMENT_OPTIONS = [
  'Studio Apartment',
  '1 Bed Apartment',
  '2 Bed Apartment',
  '3 Bed Apartment',
  'Not Sure',
];

export const INTEREST_OPTIONS = [
  'Book from 10 Lac',
  'Furnished Apartment Package',
  'Payment Plan',
  'Layout Plan',
  'Brochure',
];

/* ── WhatsApp prefills ──────────────────────────────────────────────────── */

export const WA_MESSAGES = {
  general:
    'Hi, I am interested in the Grand Lifestyle 15 Azadi Deal. Please send me details about booking from 10 Lac, furnished apartments, payment plan, and availability.',
  documents:
    'Hi, I want the Grand Lifestyle 15 Azadi Deal payment plan and brochure.',
  availability: (unit) =>
    `Hi, I want to check availability for a ${unit} in the Grand Lifestyle 15 Azadi Deal.`,
  furniture:
    'Hi, please share the furniture package details for the Grand Lifestyle 15 Azadi Deal.',
  layout:
    'Hi, please share the Grand Lifestyle 15 layout plan and available units.',
};

/* ── Section 12 — Disclaimer ────────────────────────────────────────────── */

export const DISCLAIMER =
  'Azadi Deal offers, prices, booking amount, furnishing package, payment plan, apartment availability, floor allocation, view category, and validity are subject to official confirmation from Landmark Developers. Facing Fountains & Raya Concept units may include additional premium charges. This page is for campaign enquiry purposes only and does not constitute a final sales agreement.';

/* ── SEO ────────────────────────────────────────────────────────────────── */

export const AZADI_SEO = {
  title: 'Grand 15 Azadi Deal | Furnished Apartments from 10 Lac Booking',
  description:
    'Register your interest in The Grand Lifestyle Grand 15 Azadi Deal. Facing-park furnished apartments, booking from PKR 10 Lac, special payment plan, and premium amenities.',
  ogTitle: 'Grand Lifestyle 15 Azadi Deal',
  ogDescription:
    'Facing-park furnished apartments with complete furniture package. Booking from PKR 10 Lac. Valid till 14th August only.',
  ogImage: '/images/grand-15-2.jpg',
};

/* ── Formatting helpers ─────────────────────────────────────────────────── */

/** 5950000 → "59,50,000" is wrong for PKR; we use international grouping. */
export function fmt(n) {
  return n.toLocaleString('en-US');
}

/** 5_950_000 → "PKR 59.5 Lac" — the unit Pakistani buyers actually think in. */
export function toLac(n) {
  const lac = n / 100_000;
  const rounded = Math.round(lac * 10) / 10;
  return `${rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1)} Lac`;
}
