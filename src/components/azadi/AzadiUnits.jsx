import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Reveal } from '../Reveal.jsx';
import MagneticButton from '../MagneticButton.jsx';
import { WhatsAppIcon, PhoneIcon } from '../Icons.jsx';
import AzadiDocButton from './AzadiDocButton.jsx';
import {
  UNIT_TYPES,
  RATE,
  AVAILABILITY_NOTE,
  WA_MESSAGES,
  AZADI_PAYMENT_PLAN_PDF_URL,
  fmt,
  toLac,
} from '../../data/azadi.js';
import { CONTACT } from '../../data/site.js';

const EASE = [0.22, 1, 0.36, 1];
const waHref = (msg) => `${CONTACT.whatsappHref}?text=${encodeURIComponent(msg)}`;

/** One priced configuration. A unit type may have more than one area option. */
function VariantPanel({ unit, v }) {
  return (
    <div className="az-price-panel">
      <div className="az-price-top">
        <div className="az-price-area">
          <span className="az-price-num">{fmt(v.area)}</span>
          <span className="az-price-unit">sqft</span>
        </div>
        <div className="az-price-rate">
          <span className="az-rate-old">PKR {fmt(RATE.old)}</span>
          <span className="az-rate-new">
            PKR {fmt(RATE.azadi)} <em>{RATE.unit}</em>
          </span>
        </div>
      </div>

      <div className="az-price-total">
        <span className="az-price-total-lbl">Total Price</span>
        <span className="az-price-total-val">PKR {fmt(v.total)}</span>
        <span className="az-price-total-lac">{toLac(v.total)}</span>
      </div>

      <dl className="az-price-rows">
        <div className="az-price-row">
          <dt>Down Payment</dt>
          <dd>
            PKR {fmt(v.down)} <span>{toLac(v.down)}</span>
          </dd>
        </div>
        <div className="az-price-row">
          <dt>On Confirmation</dt>
          <dd>
            PKR {fmt(v.confirmation)} <span>{toLac(v.confirmation)}</span>
          </dd>
        </div>
        <div className="az-price-row az-price-row--hero">
          <dt>
            36 Monthly Installments
            <span className="az-pill az-pill-gold">{RATE.installmentsBadge}</span>
          </dt>
          <dd>
            PKR {fmt(v.installment)} <span>per month</span>
          </dd>
        </div>
      </dl>

      <div className="az-price-actions">
        <a
          className="btn btn-whatsapp"
          href={waHref(WA_MESSAGES.availability(`${unit.name} (${fmt(v.area)} sqft)`))}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon width="17" height="17" />
          WhatsApp for Availability
        </a>
      </div>
    </div>
  );
}

export default function AzadiUnits() {
  const [active, setActive] = useState(UNIT_TYPES[0].id);
  const reduce = useReducedMotion();
  const unit = UNIT_TYPES.find((u) => u.id === active) ?? UNIT_TYPES[0];

  return (
    <section className="az-section az-units" id="azadi-units">
      <div className="container">
        <Reveal className="az-head">
          <p className="az-eyebrow">Offering Types</p>
          <h2 className="az-title">Azadi Deal Apartments With Complete Furniture Package</h2>
          <p className="az-sub">
            Choose from premium serviced apartment options with the Azadi furnished
            apartment offer.
          </p>
        </Reveal>

        {/* Rate headline */}
        <Reveal className="az-rate-banner" delay={0.06}>
          <div className="az-rate-block">
            <span className="az-rate-lbl">Previous Rate</span>
            <s className="az-rate-strike">PKR {fmt(RATE.old)}</s>
          </div>
          <span className="az-rate-arrow" aria-hidden="true" />
          <div className="az-rate-block az-rate-block--hero">
            <span className="az-rate-lbl">{RATE.badge}</span>
            <strong className="az-rate-hero">
              PKR {fmt(RATE.azadi)} <em>{RATE.unit}</em>
            </strong>
          </div>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={0.1}>
          <div className="az-tabs" role="tablist" aria-label="Apartment types">
            {UNIT_TYPES.map((u) => (
              <button
                key={u.id}
                role="tab"
                id={`az-tab-${u.id}`}
                aria-selected={active === u.id}
                aria-controls={`az-panel-${u.id}`}
                className={`az-tab ${active === u.id ? 'is-active' : ''}`}
                onClick={() => setActive(u.id)}
              >
                {u.short}
                {active === u.id && !reduce && (
                  <motion.span
                    layoutId="az-tab-pill"
                    className="az-tab-pill"
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Panel */}
        <div
          className="az-unit-stage"
          role="tabpanel"
          id={`az-panel-${unit.id}`}
          aria-labelledby={`az-tab-${unit.id}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={unit.id}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <div className="az-unit-head">
                <h3>{unit.name}</h3>
                <p>{unit.blurb}</p>
              </div>

              <div
                className={`az-price-grid ${
                  unit.variants.length > 1 ? 'az-price-grid--two' : ''
                }`}
              >
                {unit.variants.map((v) => (
                  <VariantPanel key={v.area} unit={unit} v={v} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

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
          {/* A whole-stock availability check, distinct from the per-variant
              "WhatsApp for Availability" above: a buyer who hasn't settled on a
              unit type still needs a way in. */}
          <a
            className="btn btn-whatsapp btn-lg"
            href={waHref(WA_MESSAGES.availability('any available apartment type'))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon width="18" height="18" />
            Check Apartment Availability
          </a>
          <a className="btn btn-glass btn-lg" href={CONTACT.phoneHref}>
            <PhoneIcon width="18" height="18" />
            Call Landmark
          </a>
        </Reveal>

        <p className="az-microcopy">{AVAILABILITY_NOTE}</p>
      </div>
    </section>
  );
}
