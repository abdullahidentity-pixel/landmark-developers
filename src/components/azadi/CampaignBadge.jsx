import { AZADI_DEADLINE_LABEL } from '../../data/azadi.js';

/**
 * The campaign validity badge.
 *
 * Deadline urgency is normally rendered in red, which on a luxury property page
 * reads as a discount-retail banner and cheapens everything near it. This uses
 * the page's own gold on a glass ground instead, with a green pulse doing the
 * work that red would otherwise do — present, but never shouting.
 *
 * The pulse is one composited `opacity`/`transform` keyframe on a 7px dot, and
 * it stops under `prefers-reduced-motion`.
 */
export default function CampaignBadge({ label = AZADI_DEADLINE_LABEL, className = '' }) {
  return (
    <span className={`az-campaign-badge ${className}`}>
      <span className="az-campaign-pulse" aria-hidden="true" />
      {label}
    </span>
  );
}
