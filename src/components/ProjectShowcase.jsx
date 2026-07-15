import FullScreenScrollFX from './FullScreenScrollFX.jsx';

const SECTIONS = [
  {
    id: 'grand-15',
    background: '/images/grand-15-render.jpg',
    leftLabel: 'Bahria Downtown Lahore',
    title: 'Grand 15',
    rightLabel: 'Flagship Launch',
  },
  {
    id: 'grand-14',
    background: '/images/grand-14-render.jpg',
    leftLabel: 'Main Boulevard, BTL',
    title: 'Grand 14',
    rightLabel: 'Now Selling',
  },
  {
    id: 'grand-x',
    background: '/images/grand-x-render.jpg',
    leftLabel: 'Theme Park, BTL',
    title: 'Grand X',
    rightLabel: 'New Investment',
  },
  {
    id: 'grand-11',
    background: '/images/grand 11.jpg',
    leftLabel: 'Midway Commercial, BTL',
    title: 'Grand 11',
    rightLabel: 'Now Selling',
  },
  {
    id: 'grand-12',
    background: '/images/grand-12-render.jpg',
    leftLabel: 'Phase 8, Islamabad',
    title: 'Grand 12',
    rightLabel: 'Now Selling',
  },
];

const FX_COLORS = {
  text: 'rgba(245, 240, 230, 0.94)',
  overlay:
    'linear-gradient(180deg, rgba(6,5,4,0.55) 0%, rgba(6,5,4,0.32) 45%, rgba(6,5,4,0.72) 100%)',
  pageBg: '#060504',
  stageBg: '#060504',
};

/** Pinned, full-screen scroll showcase of the flagship developments. */
export default function ProjectShowcase() {
  return (
    <section className="showcase" id="showcase" aria-label="Flagship developments showcase">
      <FullScreenScrollFX
        sections={SECTIONS}
        colors={FX_COLORS}
        durations={{ change: 0.8, snap: 900 }}
        parallaxAmount={5}
        ariaLabel="Landmark flagship developments"
        header={<span className="showcase-eyebrow">The Portfolio</span>}
        footer="Bahria Town Lahore"
      />
    </section>
  );
}
