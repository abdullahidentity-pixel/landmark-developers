# SIT — Skin Intelligence Tool · Launch Readiness Audit

_Prepared for the Sebble founder. Plain-English where possible; technical detail flagged with **[tech]**._

---

## 1. Summary

SIT is a premium **cosmetic skin analyst** built into the Sebble storefront. It runs four flows — Quick Skin Match, Full Consultation, Photo Analysis, and Ask a Question — and recommends from the real product range: **6 serums + Support Cream + Support Spray**.

This audit covered a reasoning-engine upgrade, a full human-style QA pass, bug fixing, and a privacy/conversion review. SIT is **launch-ready for a demo/preview environment**. Three integrations remain simulated and need real keys before a live commercial launch (Section 8).

**Headline result:** the most important issue found and fixed was a **safety bug** — pregnant, breastfeeding, sensitive, and beginner users could previously be recommended the retinoid night serum. That is now impossible.

---

## 2. What changed in this pass

| Area | Before | After |
|---|---|---|
| Serum count in engine | Hard-coded for 8 serums (2 phantom) | Correct 6-serum lineup |
| Pregnancy safety | Penalty targeted a non-existent serum slot — retinoid could slip through | Retinoid (Retinal Bio-Lift Night) is hard-removed for pregnancy/breastfeeding |
| Sensitive / "not sure" skin | Could be shown stronger actives + a second serum | Gentler serums prioritised; capped at 1 serum + cream |
| Beginners | Could be led with the retinoid | Led with a gentler serum; retinoid only introduced later |
| "Why this serum?" | Not shown | New **reasoning engine** explains the choice + why not the others |
| Over-recommending | Spray/second serum padded into some carts | Strict per-profile limits (Section 7) |
| Safety-stop fallback | Pointed to the wrong serum | Points to the gentle barrier serum (Peptide Repair) |

---

## 3. UX audit

- **Four entry modes** all open, render, and close cleanly; Escape and the close button both work.
- **Report screen** leads with a confidence score, primary serum, optional supporting serum, support products, AM/PM routine, a 4-week introduction plan, a "what to avoid" list, an add-to-bag bundle, and email capture.
- **Tone** uses soft, non-medical language throughout ("may", "appears", "scored lower", "could benefit from"). No diagnostic claims.
- **Deep links** work: other pages can open a flow via `?sit=quick|full|photo|chat` and pre-seed a concern via `?concern=`.
- **Mobile [tech]:** the widget is a full-height sheet using `100%` height containers, not `h-screen`, so it doesn't jump on mobile browsers.

**Verdict:** Clean, premium, no broken states found.

---

## 4. Technical audit **[tech]**

- **No JavaScript console errors** across quiz, photo, chat, results, cart, and email flows.
- **Product handles** all resolve (`serum-01`…`serum-06`, `support-cream`, `support-spray`). The phantom `serum-07/08` references are gone.
- **Latent bug fixed:** `buildReport` read the safety flags _before_ they were computed (the score step replaces the flags object). It now re-reads flags after scoring, so pregnancy/sensitive logic and safety banners always reflect the user's real answers.
- **Reasoning is data-driven:** safety penalties read each product's own metadata (`avoid_if`, `am_pm`, and `safetyRules.pregnancy.avoid_products`) rather than hard-coded slots, so the logic stays correct if the serum lineup changes.
- **Cart** is a simulated Shopify AJAX add (bumps the header bag count). Ready to swap for the real cart endpoint.

---

## 5. AI / reasoning audit

A new **reasoning engine** (`buildReasoning`) produces a structured object for every recommendation:

- `customer_profile_summary`, `main_skin_goals`, `supporting_signals`, `risk_or_safety_flags`
- `product_scores[]` — every serum with a 6-part `score_breakdown` (goal match, skin-type match, sensitivity match, routine fit, photo support, safety fit) plus `reason_selected` / `reason_not_selected`
- `primary_recommendation_reason`, `secondary_recommendation_reason`, `support_product_reason`, `routine_reasoning`
- `confidence_level` (`high` / `medium` / `low` / `safety_redirect`)
- `customer_facing_summary`, `next_best_action`

This is surfaced to the customer as a **"Why SIT chose this"** section with an expandable **"Why not the other serums?"** list. The full object is available at `window.SIT.reasoning` for debugging or export.

**Spot-check results:**

| User | Primary | 2nd serum | Notes |
|---|---|---|---|
| Pregnant, wants texture | Caviar Lift | Glow + Marks | Retinoid correctly excluded |
| Sensitive, wants brightening | Calm serum | none | Capped at 1 serum + cream |
| Beginner, wants texture | Glow + Marks | none | Retinoid deferred, not first step |
| Advanced, age support, full | Caviar Lift | Exosome PDRN | 2-serum routine allowed |
| Bleeding/painful (chat) | — | — | Safety redirect to dermatologist |

---

## 6. Privacy / GDPR audit

- **Photo consent is required** before any analysis (the Continue button is disabled until ticked). Saving the image/answers is a **separate, optional** consent.
- **Images are never written to storage.** Only the non-image session summary (mode, answers, date, primary handle) is saved to `localStorage`; the uploaded image lives in memory only and is discarded on close. Microcopy states this to the user.
- **Images are deletable** at the upload step (Replace / Remove).
- **No images, emails, or raw answers are sent to analytics.** Tracked events carry only event name, mode, confidence level, product handles, and counts.
- **Email capture** has its own opt-in checkbox and is wired to a Klaviyo placeholder, not a live send.

**Verdict:** Privacy-by-default. Solid for launch; confirm wording with your own privacy policy.

---

## 7. Conversion audit

- **"Recommended by SIT"** framing on the cart bundle ("Recommended by SIT for your skin profile").
- **Why-this** reasoning shown inline, which supports trust and conversion.
- **Add full routine to bag** in one click; line items are individually toggle-able with a live total.
- **Over-recommend guardrails** (deliberately conservative to protect trust):
  - **Beginner:** 1 serum + optional cream
  - **Sensitive / "not sure":** 1 serum + cream (no spray padding)
  - **Advanced:** up to 2 serums if compatible
  - **Full-routine preference:** serum(s) + cream + spray
  - **Safety flag:** no products pushed — redirect to a professional

---

## 8. Remaining risks — needs real keys/config before live launch **[tech]**

1. **Photo analysis** — currently a simulated `/api/sit/photo-analysis` response. Needs a real multimodal vision endpoint + key. Questionnaire answers already take priority over photo, which is the safe default.
2. **Email capture (Klaviyo)** — placeholder only. Add your Klaviyo public key and uncomment the identify call in `captureEmail`.
3. **Cart** — simulated AJAX add. Wire to the live Shopify cart/AJAX API and map serum handles to real variant IDs.
4. **Analytics** — events push to `window.dataLayer`; connect GTM/GA4 (or your tool) to receive them.

None of these block a **demo**; all are required for **commercial** launch.

---

## 9. Founder next steps

1. Read `SIT-README.md` — it explains how to edit products, ingredients, Q&A, safety rules, tone, and weights via the nine `sit-*.json` files (no coding needed).
2. Decide on a vision provider for photo analysis and supply the endpoint/key.
3. Add the Klaviyo key and connect the live Shopify cart + variant IDs.
4. Connect analytics and confirm the privacy policy wording matches Section 6.
5. Optional: have a dermatologist or compliance reviewer read the safety copy in `sit-safety-rules.json` and the on-screen disclaimer.

---

## 10. Quality standard checklist

- [x] No visible UI bugs
- [x] No JavaScript console errors
- [x] Cart add works (simulated) and totals correctly
- [x] Mobile-safe layout (no viewport jump)
- [x] Safety flags trigger and redirect correctly
- [x] SIT never diagnoses, treats, or prescribes
- [x] Recommendations explain their reasoning
- [x] Pregnancy / sensitive / beginner never shown the retinoid as a first step
- [ ] Live photo, email, cart, analytics integrations (pending real keys — Section 8)
