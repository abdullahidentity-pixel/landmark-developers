// Single source of truth for all Landmark Developers content + contact details.
// Edit copy/projects here — components read from these constants.

export const BRAND = {
  name: 'Landmark Developers',
  short: 'Landmark',
  tagline: 'Premium living in Bahria Town Lahore',
  website: 'https://landmarkdevelopers.landmarkdevelopers.com.pk/',
  logo: 'https://landmarkdevelopers.landmarkdevelopers.com.pk/wp-content/uploads/2025/11/Landmark-Website-Logo-scaled.png',
  logoAlt: 'https://landmarkdevelopers.landmarkdevelopers.com.pk/wp-content/uploads/2025/11/logo-1-1.png',
};

const RAW_PHONE = '+92 321 000 4000';
const DIGITS = '923210004000';

export const CONTACT = {
  phoneDisplay: RAW_PHONE,
  phoneHref: `tel:+${DIGITS}`,
  whatsappHref: `https://wa.me/${DIGITS}`,
  office: 'Plaza no. 39 AA Commercial, Main Boulevard, Bahria Town, Lahore',
  timing: 'Mon–Sat · 10:00 AM – 8:00 PM',
  timingNote: 'Sunday closed',
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Bahria Town Main Boulevard, Lahore'),
};

export const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Why Landmark', href: '#why' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
];

export const STATS = [
  { value: 9, suffix: '+', label: 'Years of Excellence' },
  { value: 500, suffix: '+', label: 'Units Delivered' },
  { value: 15, suffix: '', label: 'Successful Projects' },
  { value: 100, suffix: '%', label: 'On-Time Delivery' },
];

// Hero floating panels — the three flagship launches.
export const HERO_CARDS = [
  { name: 'Grand 15', meta: '1 · 2 · 3 Bed + Commercial', tone: 'gold' },
  { name: 'Grand 14', meta: 'Studio · 1 · 2 Bed + Commercial', tone: 'pearl' },
  { name: 'Grand X', meta: 'Studio · 1 · 2 Bed + Commercial', tone: 'bronze' },
];

export const PROJECTS = [
  {
    name: 'Grand 15',
    badge: 'Flagship Launch',
    blurb: 'Signature residences and prime commercial frontage on Main Boulevard.',
    units: ['1 Bed', '2 Bed', '3 Bed', 'Commercials'],
    featured: true,
  },
  {
    name: 'Grand 14',
    badge: 'Now Selling',
    blurb: 'Smart studios to family homes, engineered for lifestyle and yield.',
    units: ['Studio', '1 Bed', '2 Bed', 'Commercials'],
  },
  {
    name: 'Grand X',
    badge: 'New Investment',
    blurb: 'A modern address built for high returns and everyday convenience.',
    units: ['Studio', '1 Bed', '2 Bed', 'Commercials'],
  },
];

export const LEGACY = ['Grand 11', 'Grand 12'];

export const WHY = [
  {
    title: 'Trusted in Bahria Town',
    body: 'A name investors recognise — built on nine years of delivery in Lahore’s most sought-after community.',
  },
  {
    title: 'Proven Delivery Record',
    body: '500+ units handed over on schedule. With Landmark, on-time completion is a guarantee, not a hope.',
  },
  {
    title: 'Quality Construction',
    body: 'Modern architecture and premium finishes, engineered to hold their value for decades.',
  },
  {
    title: 'Residential + Commercial',
    body: 'Apartments, studios and prime retail under one brand — diversify your portfolio in one address.',
  },
  {
    title: 'Built for Returns',
    body: 'Every project is positioned for lifestyle appeal and strong, high-return appreciation.',
  },
];

export const AMENITIES = [
  { label: 'Daycare', icon: 'daycare' },
  { label: 'Gaming Zone', icon: 'game' },
  { label: 'Gym', icon: 'gym' },
  { label: 'High-Speed Lifts', icon: 'lift' },
  { label: 'Rooftop Terrace', icon: 'rooftop' },
  { label: 'Spa', icon: 'spa' },
  { label: 'Swimming Pool', icon: 'pool' },
  { label: 'Commercial Outlets', icon: 'shop' },
];

export const PROJECT_OPTIONS = ['Grand 15', 'Grand 14', 'Grand X', 'Grand 11', 'Grand 12'];
export const UNIT_OPTIONS = ['Studio', '1 Bed', '2 Bed', '3 Bed', 'Commercial'];
