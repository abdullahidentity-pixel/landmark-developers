import { Reveal, RevealGroup, RevealItem } from '../Reveal.jsx';
import MagneticButton from '../MagneticButton.jsx';
import AzadiDocButton from './AzadiDocButton.jsx';
import {
  UNIT_TYPES,
  RATE,
  AZADI_PAYMENT_PLAN_PDF_URL,
  AZADI_DETAILED_BROCHURE_PDF_URL,
  fmt,
} from '../../data/azadi.js';

/** Flatten unit types → one row per priced configuration. */
const ROWS = UNIT_TYPES.flatMap((u) =>
  u.variants.map((v) => ({ name: u.name, ...v }))
);

/**
 * Full Azadi payment plan.
 *
 * One table in the DOM, two presentations: a real <table> on desktop, and on
 * mobile the same cells re-flow into stacked cards using the `data-label`
 * attributes for their headings. This keeps a single semantic source (screen
 * readers still get a proper table) without duplicating markup or forcing the
 * user to scroll a wide table sideways on a phone.
 */
export default function AzadiPaymentPlan({ onRegister }) {
  return (
    <section className="az-section az-payplan" id="azadi-payment-plan">
      <div className="container">
        <Reveal className="az-head">
          <p className="az-eyebrow">Investment Structure</p>
          <h2 className="az-title">Exclusive Azadi Deal Payment Plan</h2>
          <p className="az-sub">
            Special Azadi offer structure for Grand Lifestyle 15 park-facing furnished
            apartments.
          </p>
        </Reveal>

        <RevealGroup className="az-plan-badges" stagger={0.06}>
          <RevealItem className="az-plan-badge az-plan-badge--rate">
            <span className="az-plan-badge-lbl">Azadi Rate</span>
            <strong>
              PKR {fmt(RATE.azadi)} <em>{RATE.unit}</em>
            </strong>
            <s>PKR {fmt(RATE.old)}</s>
          </RevealItem>
          <RevealItem className="az-plan-badge">
            <span className="az-plan-badge-lbl">Offer</span>
            <strong>{RATE.badge}</strong>
          </RevealItem>
          <RevealItem className="az-plan-badge">
            <span className="az-plan-badge-lbl">Structure</span>
            <strong>{RATE.installmentsBadge}</strong>
          </RevealItem>
        </RevealGroup>

        <Reveal className="az-table-wrap" delay={0.08}>
          <table className="az-table">
            <caption className="sr-only">
              Azadi Deal payment plan for Grand Lifestyle 15 apartments, at PKR{' '}
              {fmt(RATE.azadi)} per square foot over 36 monthly installments.
            </caption>
            <thead>
              <tr>
                <th scope="col">Apartment</th>
                <th scope="col">Area</th>
                <th scope="col">Total Price</th>
                <th scope="col">Down Payment</th>
                <th scope="col">Confirmation</th>
                <th scope="col">36 Installments</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={`${r.name}-${r.area}`}>
                  <th scope="row" data-label="Apartment">
                    {r.name}
                  </th>
                  <td data-label="Area">{fmt(r.area)} sqft</td>
                  <td data-label="Total Price">PKR {fmt(r.total)}</td>
                  <td data-label="Down Payment">PKR {fmt(r.down)}</td>
                  <td data-label="Confirmation">PKR {fmt(r.confirmation)}</td>
                  <td data-label="36 Installments" className="az-td-hero">
                    PKR {fmt(r.installment)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal className="az-premium-note" delay={0.06}>
          <span className="az-pill az-pill-green">Premium</span>
          <p>{RATE.premiumNote}</p>
        </Reveal>

        <Reveal className="az-section-cta az-section-cta--multi" delay={0.1}>
          <AzadiDocButton
            url={AZADI_PAYMENT_PLAN_PDF_URL}
            label="Grand 15 Azadi Deal Payment Plan"
            variant="primary"
            className="btn-lg"
          >
            Download Special Payment Plan
          </AzadiDocButton>
          <AzadiDocButton
            url={AZADI_DETAILED_BROCHURE_PDF_URL}
            label="Grand 15 Detailed Brochure"
            variant="glass"
            className="btn-lg"
          >
            Download Detailed Brochure
          </AzadiDocButton>
          <MagneticButton
            as="button"
            type="button"
            variant="glass"
            className="btn-lg"
            onClick={onRegister}
          >
            Register Interest
          </MagneticButton>
        </Reveal>

        {/* The full disclaimer lives once, at the foot of the page. Repeating all
            three sentences here and again under the form would triple a wall of
            legal text; a short pointer keeps the caveat adjacent to the numbers
            it qualifies while there is still a single authoritative copy. */}
        <p className="az-legal-note">
          Prices, booking amounts and availability are subject to official
          confirmation from Landmark Developers.{' '}
          <a href="#az-legal">Read the full disclaimer</a>.
        </p>
      </div>
    </section>
  );
}
