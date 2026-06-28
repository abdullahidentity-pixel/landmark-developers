# SIT — Skin Intelligence Tool

A premium AI-style skincare consultation system for the Sebble brand. Built as a
self-contained front-end (this is a static preview, not a live Shopify theme), with
the data/knowledge layer separated into editable JSON so the brand can update copy,
products, and rules without touching code.

> **Positioning:** SIT is a cosmetic *Skin Intelligence Tool* and routine advisor.
> It is **not** a doctor and does **not** diagnose, treat, or replace dermatologist advice.

**Core disclaimer (used verbatim throughout):**
> SIT provides general skincare guidance and product recommendations. It does not
> diagnose, treat, or replace advice from a qualified dermatologist or medical
> professional. If your skin concern is painful, severe, persistent, rapidly changing,
> infected, bleeding, or medically concerning, please consult a dermatologist.

---

## Experience

Three consultation modes plus a conversational assistant:

| Mode | What it does | Entry |
|------|--------------|-------|
| **Quick Match** | 5-question, ~60s product match | `sit.html?sit=quick` |
| **Full Consultation** | 20-question routine builder + 4-week plan | `sit.html?sit=full` |
| **Photo Skin Analysis** | Consent-gated upload, visible-pattern review (non-diagnostic) | `sit.html?sit=photo` |
| **Ask SIT (chat)** | RAG-style Q&A over the knowledge base, with safety + handoffs | `sit.html?sit=chat` |

SIT surfaces in: the top nav ("Skin Consultant"), a floating bottom-right launcher on
every page, homepage / collection / product / routine CTAs, and the dedicated
`sit.html` page.

---

## File map

| File | Role |
|------|------|
| `sit.html` | Dedicated page — full UI, the three modes, chat, scoring engine, and consultation report (inline CSS/JS). |
| `sit-knowledge.js` | The runtime knowledge base (`SIT_KB`). Loaded as a classic script; sets `window.SIT_KB`. **Single source of truth at runtime.** |
| `sit-widget.js` | Portable floating launcher + mini-chat for all other pages. Reuses `SIT_KB`; deep-links into `sit.html`. |
| `sit-products.json` | Product brain (6 serums + cream + spray). |
| `sit-ingredients.json` | Ingredient education. |
| `sit-qa.json` | Brand-approved Q&A (RAG retrieval source). |
| `sit-safety-rules.json` | Medical-boundary logic (hard stops, pregnancy, prescription, referrals). |
| `sit-routine-rules.json` | Morning/evening routine templates by depth. |
| `sit-questionnaire.json` | Quick (5) + Full (20) question sets with branching metadata. |
| `sit-photo-labels.json` | Non-diagnostic photo wording. |
| `sit-recommendation-weights.json` | Scoring matrix: answer value → per-serum score deltas. |
| `sit-tone-rules.json` | Brand voice, safe-language list, banned claims, confidence policy, chat responses. |
| `sit-test-cases.json` | 15 QC scenarios with expected safety/behaviour/tone/products. |

### Editing content

The JSON files are the **admin-editable mirror** of `SIT_KB`. To change live behaviour
on this static build, edit the matching section inside `sit-knowledge.js` (the JSON
files document and version the same data). In a real Shopify/CMS deployment these JSON
files would be the source of truth and loaded at build/runtime into `SIT_KB`.

Regenerate the JSON files from the live KB at any time:
```
node /tmp/sit-extract.js   # reads sit-knowledge.js, rewrites the 9 JSON files
```

---

## Recommendation engine

The consultation scores all 6 serums from the answer set:

1. Each answer value adds/subtracts per-serum points from `sit-recommendation-weights.json`
   (keys `s01..s06` map to `serum-01..serum-06`).
2. Safety/flag penalties apply, read from each product's own metadata
   (e.g. pregnancy hard-excludes the retinoid night serum; beginner/sensitive
   profiles penalise strong actives and prioritise gentle, barrier-first serums).
3. Top-ranked serum becomes the **primary**; a complementary second may be added
   only when the profile allows it (see over-recommend limits below).
4. A **reasoning engine** (`buildReasoning`) then produces a structured object —
   profile summary, per-serum score breakdown, chosen/not-chosen reasons, confidence
   level, and next best action — surfaced as the "Why SIT chose this" report section.
5. Support cream/spray, AM/PM routines, a 4-week introduction plan, "what to avoid",
   patch-test + SPF reminders, and a cart bundle are assembled into the report.

**Over-recommend limits:** beginner → 1 serum + optional cream; sensitive/"not sure"
→ 1 serum + cream; advanced → up to 2 serums; full-routine preference → serum(s) +
cream + spray; safety flag → no products, redirect to a professional.

> A full launch-readiness review lives in `SIT-LAUNCH-AUDIT.md`.

Confidence policy (`sit-tone-rules.json`): **high** → recommend directly · **medium** →
recommend + one follow-up · **low** → ask more first · **safety** → refer out, no product
as a solution.

---

## Safety model

A safety check runs **before** any recommendation. Triggers (painful, bleeding,
infected, swollen, spreading, rapidly changing, lesion/mole, etc.) cause a hard stop:
no product claims, a calm dermatologist referral, and gentle basics only. Photo analysis
never overrides questionnaire safety answers. SIT never diagnoses named conditions,
never prescribes, and never tells a user to stop medication. All output uses safe
language ("may suggest", "appears to show", "visible signs").

---

## API endpoint placeholders

This static build simulates the backend in-browser. In production these would back the
same flows:

| Endpoint | Used by |
|----------|---------|
| `/api/sit/chat` | Chat assistant turns |
| `/api/sit/rag-answer` | Knowledge retrieval + answer generation |
| `/api/sit/questionnaire` | Quiz progression / branching |
| `/api/sit/photo-analysis` | Multimodal image review |
| `/api/sit/recommendation` | Scoring + product match |
| `/api/sit/report` | Final report assembly |
| `/api/sit/cart` | Add-to-cart (Shopify AJAX in production) |

Suggested production stack (placeholders in code): Supabase Vector / Pinecone for
embeddings, OpenAI embeddings, Claude/OpenAI generation, Shopify product metafields +
AJAX cart, Klaviyo for email capture.

---

## Analytics events

Pushed to `window.dataLayer`:
`sit_opened`, `sit_quick_match_started`, `sit_full_consultation_started`,
`sit_photo_uploaded`, `sit_safety_flag_triggered`, `sit_recommendation_generated`,
`sit_primary_product_clicked`, `sit_routine_added_to_cart`, `sit_email_captured`,
plus widget events (`sit_widget_opened`, `sit_widget_action`, `sit_widget_message`,
`sit_widget_safety_flag`).

---

## Integrating on a new page

```html
<!-- nav -->
<a href="sit.html" class="header-nav__sit">Skin Consultant</a>

<!-- before </body> -->
<script src="sit-knowledge.js"></script>
<script src="sit-widget.js"></script>
```

The widget auto-injects its FAB and mini-chat, and skips itself on `sit.html`
(which has the full inline experience). Deep-link CTAs use `sit.html?sit=<mode>`
and optionally `&concern=<goal>` to pre-seed the first answer.
