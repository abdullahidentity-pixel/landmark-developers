/**
 * The hero's cinematic background — everything behind the copy and the render.
 *
 * ── On the absence of photography ──────────────────────────────────────────
 * Every element here is drawn with SVG geometry and CSS gradients. Nothing is a
 * photograph. That is a deliberate constraint, not a shortcut: the two obvious
 * candidates for a "14 August" background — a Quaid-e-Azam portrait and a
 * Minar-e-Pakistan photograph — are almost never rights-cleared, and this page
 * runs paid traffic, where an uncleared asset is a real liability. Drawn
 * silhouettes at 6–14% opacity give the same atmosphere with none of the
 * exposure, and they scale to any viewport without stretching artefacts.
 *
 * If a licensed photograph is supplied later, it belongs *here*, as one more
 * layer between `az-bg-map` and `az-bg-tribute` — the stacking, masking and
 * vignette above it already handle blending it down to a shadow.
 *
 * Layer order, far to near:
 *   rays    — slow rotating light fan
 *   glows   — green and gold blooms that set the colour temperature
 *   map     — Pakistan silhouette, the deepest and faintest element
 *   tribute — an abstract bust: shoulders, head, karakul cap. Suggestion only;
 *             it is a shadow in the far background, never a portrait.
 *   minar   — a vertical landmark that reads as Minar-e-Pakistan from a
 *             distance and ties into the Eiffel-style tower used elsewhere
 *   motif   — tiled crescents at the threshold of visibility, as texture
 *   dust    — drifting gold particles
 *   vignette— darkens the frame edges so the composition holds together
 */
export default function PatrioticBackgroundLayer({ reduce = false }) {
  return (
    <div className="az-hero-atmos" aria-hidden="true">
      <div className="az-rays" />
      <div className="az-glow az-glow-green" />
      <div className="az-glow az-glow-gold" />

      {/* ── Pakistan silhouette ─────────────────────────────────────────
          A simplified outline, not a survey-grade boundary — it sits at ~9%
          opacity under a heavy blur, where it reads as a landmass rather than
          as a map anyone would trace. It is not a statement of borders. */}
      <div className="az-bg-map">
        <svg viewBox="0 0 180 145" preserveAspectRatio="xMidYMid meet">
          <path
            d="M150 6 L135 5 L110 10 L105 25 L88 45 L90 57 L75 60 L59 76 L20 81
               L4 77 L12 109 L11 123 L35 121 L60 121 L70 133 L78 137 L95 132
               L105 98 L125 79 L141 65 L149 50 L138 35 L155 25 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* ── Abstract tribute silhouette ─────────────────────────────────
          Shoulders, neck, head and karakul cap, drawn as soft geometry. Heavily
          blurred and barely present on purpose: the brief is a cinematic shadow
          layer, and anything sharper would read as a poster pasted on the page. */}
      <div className="az-bg-tribute">
        <svg viewBox="0 0 200 240" preserveAspectRatio="xMidYMax meet">
          <g fill="currentColor">
            {/* shoulders */}
            <path d="M18 240 C22 186 54 160 100 160 C146 160 178 186 182 240 Z" />
            {/* neck */}
            <path d="M84 150 h32 v22 h-32 Z" />
            {/* head */}
            <ellipse cx="100" cy="112" rx="34" ry="42" />
            {/* karakul cap — the one shape that anchors the reference */}
            <path d="M64 78 C66 56 82 44 100 44 C118 44 134 56 136 78 C124 71 76 71 64 78 Z" />
          </g>
        </svg>
      </div>

      {/* ── Vertical landmark ───────────────────────────────────────────
          Tapering shaft, platform tiers and a crescent finial. */}
      <div className="az-bg-minar">
        <svg viewBox="0 0 120 300" preserveAspectRatio="xMidYMax meet">
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M60 16 V44" />
            <circle cx="60" cy="10" r="6" />
            <path d="M52 44 C50 120 44 200 34 268" />
            <path d="M68 44 C70 120 76 200 86 268" />
            <path d="M46 132 H74" />
            <path d="M40 208 H80" />
            <path d="M28 268 H92" />
            <path d="M18 288 H102" />
          </g>
        </svg>
      </div>

      {/* Tiled crescent texture, at the threshold of visibility. */}
      <div className="az-bg-motif" />

      {!reduce && (
        <div className="az-particles">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className={`az-particle ${i % 3 === 0 ? 'is-green' : ''}`}
              style={{
                left: `${(i * 37) % 100}%`,
                animationDelay: `${(i % 9) * 1.35}s`,
                animationDuration: `${13 + (i % 6) * 2.4}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="az-bg-vignette" />
    </div>
  );
}
