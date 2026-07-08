export const BLOG_POSTS = [
  {
    slug: 'why-bahria-town-lahore-is-pakistans-top-investment-destination',
    title: 'Why Bahria Town Lahore Is Pakistan\'s Top Investment Destination',
    excerpt:
      'With controlled infrastructure, 24/7 utilities, and compounding appreciation, Bahria Town Lahore has delivered consistent returns for a decade. Here\'s why it remains the safest bet.',
    category: 'Investment',
    date: 'June 18, 2026',
    readTime: '5 min read',
    coverImage: '/images/grand-15-render.png',
    coverAccent: '#d9b878',
    featured: true,
  },
  {
    slug: 'off-plan-vs-ready-to-move-which-is-right-for-you',
    title: 'Off-Plan vs Ready-to-Move: Which Is Right for You?',
    excerpt:
      'Both have their merits. Off-plan offers lower entry price and higher upside; ready units offer immediate returns. We break down the decision framework every serious investor needs.',
    category: 'Buyers Guide',
    date: 'June 10, 2026',
    readTime: '6 min read',
    coverImage: '/images/grand-14-render.png',
    coverAccent: '#78b4d9',
    featured: false,
  },
  {
    slug: 'grand-15-flagship-launch-everything-you-need-to-know',
    title: 'Grand 15 Flagship Launch: Everything You Need to Know',
    excerpt:
      'Service apartments, branded commercial outlets, and rooftop living — Grand 15 is Landmark\'s most ambitious project. Here\'s a full breakdown of floors, units, and investment upside.',
    category: 'Project News',
    date: 'June 4, 2026',
    readTime: '4 min read',
    coverImage: '/images/grand-x-render.png',
    coverAccent: '#f0d49b',
    featured: false,
  },
  {
    slug: 'overseas-pakistanis-guide-to-buying-property-in-bahria-town',
    title: 'Overseas Pakistanis: Complete Guide to Buying Property in Bahria Town',
    excerpt:
      'From POC to NRP accounts, documentation requirements, and trusted developer vetting — everything you need to safely invest in Pakistan real estate from abroad.',
    category: 'Buyers Guide',
    date: 'May 27, 2026',
    readTime: '8 min read',
    coverImage: '/images/grand-12-render.png',
    coverAccent: '#9b78d9',
    featured: false,
  },
  {
    slug: 'commercial-real-estate-in-bahria-town-why-ground-floor-wins',
    title: 'Commercial Real Estate in Bahria Town: Why Ground Floor Always Wins',
    excerpt:
      'With 5,000+ daily footfall projected at Grand X and established retail at Grand 11, commercial ground-floor units in BTL have outperformed residential by 2× over 5 years.',
    category: 'Investment',
    date: 'May 19, 2026',
    readTime: '5 min read',
    coverImage: '/images/grand-11-1.png',
    coverAccent: '#d9d478',
    featured: false,
  },
  {
    slug: 'landmark-developers-track-record-500-units-delivered',
    title: 'Landmark Developers Track Record: 500+ Units, Zero Delays',
    excerpt:
      'In a market where delivery failures are common, Landmark has maintained a 100% on-time handover record across all completed projects. Here\'s how we do it.',
    category: 'Company',
    date: 'May 12, 2026',
    readTime: '4 min read',
    coverImage: '/images/grand-x-render.png',
    coverAccent: '#d978c8',
    featured: false,
  },
];

export function getBlogPost(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}

export const BLOG_CATEGORIES = ['All', 'Investment', 'Buyers Guide', 'Project News', 'Company'];
