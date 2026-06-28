/* Lightweight inline SVG icon set — stroke inherits currentColor. */

const base = {
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const WhatsAppIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M3 21l1.65-4.5A8 8 0 1 1 12 20a8 8 0 0 1-4-1.07L3 21z" />
    <path d="M8.5 9c0 4 2.5 6 6 6 .6 0 1-.4 1-1l-.2-1.2-2-.6-1 1c-1-.5-1.8-1.3-2.3-2.3l1-1-.6-2L9.5 8c-.6 0-1 .4-1 1z" />
  </svg>
);

export const PhoneIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L19 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </svg>
);

export const PinIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const amenityIcons = {
  daycare: (p) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="6" r="2.5" />
      <path d="M6 21v-5a6 6 0 0 1 12 0v5M9 14l-3 2M15 14l3 2" />
    </svg>
  ),
  game: (p) => (
    <svg {...base} {...p}>
      <rect x="3" y="8" width="18" height="9" rx="4.5" />
      <path d="M8 11v3M6.5 12.5h3M15 12h.01M17.5 14h.01" />
    </svg>
  ),
  gym: (p) => (
    <svg {...base} {...p}>
      <path d="M5 9v6M3 11v2M19 9v6M21 11v2M7 12h10" />
    </svg>
  ),
  lift: (p) => (
    <svg {...base} {...p}>
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path d="M12 3v18M9 8l1.2-1.5L11.4 8M14.6 16l-1.2 1.5L12.2 16" />
    </svg>
  ),
  rooftop: (p) => (
    <svg {...base} {...p}>
      <path d="M3 11l9-6 9 6M5 10v10h14V10M9 20v-5h6v5" />
    </svg>
  ),
  spa: (p) => (
    <svg {...base} {...p}>
      <path d="M12 13c0-4 2-7 5-8-1 4-2.5 6-5 8zM12 13c0-4-2-7-5-8 1 4 2.5 6 5 8zM4 16c4 3 12 3 16 0" />
    </svg>
  ),
  pool: (p) => (
    <svg {...base} {...p}>
      <path d="M3 17c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0M3 20c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0M8 14V5a2 2 0 0 1 4 0M12 11h4" />
    </svg>
  ),
  shop: (p) => (
    <svg {...base} {...p}>
      <path d="M4 9h16l-1 11H5L4 9zM4 9l1.5-4h13L20 9M9 13v3M15 13v3" />
    </svg>
  ),
};

export function AmenityIcon({ name, ...p }) {
  const C = amenityIcons[name];
  return C ? <C {...p} /> : null;
}
