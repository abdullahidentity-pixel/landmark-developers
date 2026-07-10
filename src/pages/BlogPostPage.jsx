import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useSmoothScroll } from '../hooks/useSmoothScroll.js';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import FloatingWhatsApp from '../components/FloatingWhatsApp.jsx';
import MobileCTABar from '../components/MobileCTABar.jsx';
import CursorGlow from '../components/CursorGlow.jsx';
import { RevealItem } from '../components/Reveal.jsx';
import { getBlogPost, BLOG_POSTS } from '../data/blog.js';
import { useLeadModal } from '../context/LeadModalContext.jsx';

/* Minimal rich content per post — keyed by slug */
const POST_CONTENT = {
  'why-bahria-town-lahore-is-pakistans-top-investment-destination': [
    { type: 'p', text: 'Bahria Town Lahore stands apart in Pakistan\'s real estate landscape for one reason above all: it delivers. Since its inception, the development has offered something rare — a self-contained city with 24/7 utilities, maintained infrastructure, and security that simply doesn\'t exist elsewhere at this scale.' },
    { type: 'h2', text: 'Controlled infrastructure drives compounding value' },
    { type: 'p', text: 'Unlike standard housing schemes where common areas deteriorate post-handover, Bahria Town operates under a private management model. Roads are repaired, parks are maintained, and utilities are consistent. This baseline quality means property values do not erode — they compound.' },
    { type: 'h2', text: 'Returns that outperform other asset classes' },
    { type: 'p', text: 'Over the last decade, well-located BTL properties have appreciated at 12–18% annually on average, significantly outpacing bank deposit rates and comparable to equity markets — with far lower volatility. Commercial units near high-footfall corridors have returned even more.' },
    { type: 'h2', text: 'What to look for when buying' },
    { type: 'p', text: 'Location within BTL matters enormously. Main Boulevard-facing, theme park-facing, and Johar Block addresses command consistent premium resale values. Developer track record, payment flexibility, and handover timelines are the three pillars every buyer should evaluate.' },
  ],
  'off-plan-vs-ready-to-move-which-is-right-for-you': [
    { type: 'p', text: 'The off-plan vs ready-to-move debate is one of the most common questions serious property investors face. Both strategies work — but they serve different goals, risk appetites, and capital profiles.' },
    { type: 'h2', text: 'The case for off-plan' },
    { type: 'p', text: 'Off-plan properties offer the lowest entry price in a development\'s lifecycle. Buying early in construction means you secure the price before market appreciation occurs. By handover, many Landmark units have appreciated 15–25% — before a single rupee of rental income.' },
    { type: 'h2', text: 'The case for ready-to-move' },
    { type: 'p', text: 'Ready units generate rental income from day one. If your goal is cash flow rather than capital gain, a delivered unit with a tenant in place is immediately yield-positive. The downside: you pay a premium over the original off-plan price.' },
    { type: 'h2', text: 'Our recommendation' },
    { type: 'p', text: 'For investors with a 3–5 year horizon and available capital, off-plan with a trusted developer offers the best risk-adjusted return. For buyers seeking immediate rental income or personal use, ready units are the pragmatic choice. The key: never buy off-plan from an unverified developer.' },
  ],

  'grand-15-flagship-launch-everything-you-need-to-know': [
    { type: 'p', text: 'Grand 15 is not another apartment tower. It is Landmark Developers\' most architecturally complex and commercially diverse project to date — a mixed-use flagship spanning ground-floor branded retail, dedicated commercial floors, and fully serviced upper-level apartments, all within Bahria Town Lahore\'s most active commercial corridor.' },
    { type: 'h2', text: 'What Grand 15 actually contains' },
    { type: 'p', text: 'The ground and first floors house premium commercial outlets — the kind of high-footfall retail positions that generate immediate rental income from day one of handover. Above that, a dedicated office and co-working zone serves the growing professional population within BTL. The upper residential floors offer service apartments with hotel-grade finishing: semi-furnished layouts, dedicated building management, and optional short-term rental enrollment through Landmark\'s partner hospitality operators.' },
    { type: 'h2', text: 'Why the service apartment model changes the math' },
    { type: 'p', text: 'A standard BTL apartment yields 4–6% annually on long-term rental. A service apartment in the same location, managed and listed on short-stay platforms, yields 9–14% — sometimes higher during peak seasons. Grand 15\'s design is purpose-built for this model: each unit includes a kitchenette, high-speed internet infrastructure, and 24/7 concierge connectivity built into the building systems.' },
    { type: 'h2', text: 'Payment plan structure' },
    { type: 'p', text: 'Grand 15 launched with a phased payment plan structured around construction milestones. Buyers pay a booking amount to secure their unit, followed by quarterly installments tied to visible construction progress — a model Landmark has used across all 9 of its completed projects without a single default on delivery. No balloon payment at handover. No hidden administration charges.' },
    { type: 'h2', text: 'Who should invest in Grand 15' },
    { type: 'p', text: 'This project is best suited for investors who want asset diversification — commercial, residential, and service apartment exposure in a single transaction. It also suits overseas Pakistanis looking for a high-yield, professionally managed unit that requires no active landlord involvement. Families intending to use the apartment part-time while generating income during vacant periods will find the service apartment structure ideal.' },
    { type: 'h2', text: 'Availability' },
    { type: 'p', text: 'Grand 15 is now in active construction. A limited allocation of commercial and service apartment units remains available at launch pricing. Once construction passes the 50% milestone, prices will be revised upward in line with Landmark\'s standard escalation policy. Contact our sales team for a current floor plan and unit availability schedule.' },
  ],

  'overseas-pakistanis-guide-to-buying-property-in-bahria-town': [
    { type: 'p', text: 'For overseas Pakistanis, buying property back home carries real risks — but also real opportunity. Pakistan\'s real estate market, particularly in master-planned communities like Bahria Town Lahore, has delivered consistent dollar-equivalent appreciation over the past decade. The challenge is navigating the process safely from thousands of kilometres away.' },
    { type: 'h2', text: 'Step one: Establish your legal buying identity' },
    { type: 'p', text: 'Overseas Pakistanis can purchase property using either their Pakistani CNIC or a Pakistan Origin Card (POC). If your CNIC has expired, renew it through the nearest NADRA E-Sehulat centre in your country of residence — most major cities with Pakistani diaspora communities have one. Non-Resident Pakistani (NRP) accounts with Roshan Digital Account (RDA) holders have additional benefits: property transactions through RDA qualify for special FBR tax treatment and repatriation rights.' },
    { type: 'h2', text: 'What documentation you need' },
    { type: 'p', text: 'To purchase a Landmark unit from abroad, you need: a valid CNIC or POC, a copy of your foreign passport, two passport-size photographs, and a General Power of Attorney (GPA) if you are authorising a family member or agent in Pakistan to sign documents on your behalf. The GPA must be notarised in your country of residence and attested by the Pakistani High Commission. Landmark\'s legal team can provide you with a standard GPA template to minimise back-and-forth.' },
    { type: 'h2', text: 'How payment works from abroad' },
    { type: 'p', text: 'International wire transfers to a verified developer\'s designated bank account are the safest payment method. Landmark provides a dedicated account with confirmation receipts issued for every transaction. If you hold an RDA account, transfers from that account carry FBR-cleared status and simplify the eventual property transfer documentation. Avoid cash, hawala, or informal transfer methods — they create legal complications at the time of title transfer.' },
    { type: 'h2', text: 'Red flags to watch for' },
    { type: 'p', text: 'The Pakistani real estate market, unfortunately, has more than its share of fraudulent operators targeting overseas buyers. Watch for: developers who cannot provide a registered sale agreement, projects without visible physical construction progress, agents who pressure you to pay in cash, and "too good to be true" prices significantly below market rate. Always verify project registration with the relevant development authority (SBCA for BTL projects) and request an independent valuation before committing.' },
    { type: 'h2', text: 'Why Landmark is built for overseas buyers' },
    { type: 'p', text: 'Landmark Developers has a dedicated overseas client desk. We provide video walkthroughs of active construction sites, digital document signing for booking agreements, WhatsApp-based progress updates at every milestone, and a transparent payment ledger accessible on demand. Our 100% on-time delivery record means the project you invest in remotely will be handed over as promised — with full documentation, title transfer, and possession handing over ceremony.' },
    { type: 'h2', text: 'Getting started' },
    { type: 'p', text: 'The easiest first step is a WhatsApp consultation with our overseas desk. Bring your questions about any specific project, payment plan, or documentation requirement. We will walk you through the process, connect you with our legal team for GPA preparation, and ensure every step is documented and verified before any money moves.' },
  ],

  'commercial-real-estate-in-bahria-town-why-ground-floor-wins': [
    { type: 'p', text: 'Ask any experienced BTL investor which unit type has delivered the most consistent, highest-yield returns over five years and the answer is almost always the same: ground-floor commercial. Not because of glamour — because of simple, verifiable economics.' },
    { type: 'h2', text: 'Footfall is the only variable that matters' },
    { type: 'p', text: 'Commercial real estate returns are almost entirely a function of footfall. A ground-floor retail unit on a high-traffic corridor captures walk-in business, visibility from main roads, and the psychological anchoring that comes from being at street level. Upper-floor commercial units in the same building — despite identical specifications — can trade at a 30–40% discount to ground floor and command 20–30% lower rental yields.' },
    { type: 'h2', text: 'Grand 11 as a case study' },
    { type: 'p', text: 'Landmark\'s Grand 11, now fully completed and handed over, demonstrated this principle clearly. Ground-floor commercial units at Grand 11 — located on a primary access road within Bahria Town — were sold at launch for PKR 4.2–6.8M depending on unit size. Today, the same units are trading at PKR 9–14M in the secondary market. Rental yields on the occupied units are running at 7–9% annually on current market value — nearly twice what comparable residential units achieve.' },
    { type: 'h2', text: 'Grand X: the next opportunity' },
    { type: 'p', text: 'Grand X, Landmark\'s upcoming large-format mixed-use development, will house Pakistan\'s first Cinepax cinema within a private housing scheme, a food court, branded retail anchors, and a hotel component. Conservative footfall projections at full operational capacity exceed 5,000 visitors per day. Ground-floor commercial units in a development of this type do not typically remain available past 40% construction — historically, they are absorbed during the launch phase.' },
    { type: 'h2', text: 'What yields to expect' },
    { type: 'p', text: 'Based on comparable BTL commercial developments, ground-floor units in high-footfall locations yield 6–10% annually on current market value. Contrast this with residential apartments (3.5–5.5%), upper-floor commercial (4–6%), and bank deposits (currently in the 12–15% nominal range, but with currency devaluation risk that erodes real returns). Commercial real estate in BTL offers a PKR-denominated, inflation-hedged yield with capital appreciation upside.' },
    { type: 'h2', text: 'How to evaluate a commercial unit before buying' },
    { type: 'p', text: 'Three factors determine the long-term performance of any commercial unit: frontage (how many meters of visibility to passing traffic), anchor tenants in the same development (a cinema, supermarket, or food court drives consistent footfall to surrounding retail), and the residential catchment within walking distance. All three are verifiable before purchase. Landmark\'s sales team provides footfall projections, competitive rental data for comparable BTL developments, and independent valuation reports for any unit on request.' },
  ],

  'landmark-developers-track-record-500-units-delivered': [
    { type: 'p', text: 'In Pakistan\'s real estate market, delivery failure is so common it has become an expected risk. Buyers routinely bake in a one-to-three year delay buffer when evaluating off-plan investments. Landmark Developers was built on a different philosophy — and over nine years and 500+ delivered units, that philosophy has produced a track record with zero missed handover dates.' },
    { type: 'h2', text: 'Why most developers miss their deadlines' },
    { type: 'p', text: 'Construction delays in Pakistan typically stem from three causes: under-capitalised developers who depend on future bookings to fund current construction (creating a cash-flow spiral when sales slow), poor project management with no contingency planning, and material procurement done on a just-in-time basis that is vulnerable to supply chain disruption. Landmark addressed all three from the beginning.' },
    { type: 'h2', text: 'How Landmark delivers on time' },
    { type: 'p', text: 'Landmark Developers operates a milestone-based construction funding model. Each project is partially pre-funded before the first unit is sold, ensuring that construction does not stop if bookings slow. Material procurement is done in bulk at the project launch phase, locking in prices and eliminating supply delays. And every project is managed by a dedicated site team with clear milestone accountability — if a milestone slips, the recovery plan is activated the same week.' },
    { type: 'h2', text: 'The completed portfolio' },
    { type: 'p', text: 'Grand 11, Grand 12, Grand 14, and Grand X Phase 1 have all been handed over. In every case, possession ceremonies occurred on or before the committed date. Buyers who purchased off-plan received their units with full documentation, utility connections, and finishing complete — no exceptions, no excuses. More than 500 families and investors across Bahria Town Lahore and Islamabad now hold properties delivered by Landmark.' },
    { type: 'h2', text: 'What verification looks like' },
    { type: 'p', text: 'We encourage every prospective buyer to verify independently before investing. Visit any completed Landmark project in Bahria Town Lahore — speak to existing owners, inspect the finishing quality, and check the sale deeds for original booking dates against handover dates. Our sales team can connect you with past buyers willing to share their experience. We believe transparency is the strongest sales tool we have.' },
    { type: 'h2', text: 'Active projects under construction' },
    { type: 'p', text: 'Grand 15 and Grand X (Phase 2) are currently under construction and accepting bookings. Both projects are on schedule. Construction site visits are available by appointment — prospective buyers are welcome to visit and see progress firsthand. This is the Landmark standard: open doors, verified progress, and delivery that matches the promise made at booking.' },
  ],
};

/* Fallback content for posts without explicit content */
function getContent(slug) {
  return POST_CONTENT[slug] ?? [
    { type: 'p', text: 'This article is coming soon. Subscribe to our newsletter to be notified when it publishes.' },
  ];
}

export default function BlogPostPage() {
  useSmoothScroll();
  const { slug } = useParams();
  const post = getBlogPost(slug);
  const { openTour } = useLeadModal();

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Landmark Developers`;
    }
    return () => { document.title = 'Landmark Developers — Premium Living in Bahria Town Lahore'; };
  }, [slug, post]);

  if (!post) return <Navigate to="/blog" replace />;

  const content = getContent(slug);
  const related = BLOG_POSTS.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);

  return (
    <div id="app" className="app">
      <CursorGlow />
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="blog-post-hero">
          {post.coverImage && (
            <img src={post.coverImage} alt="" className="blog-post-hero-img" aria-hidden="true" />
          )}
          <div className="blog-post-hero-overlay" aria-hidden="true" />
          <div
            className="blog-post-hero-glow"
            style={{ background: `radial-gradient(ellipse at 50% 80%, ${post.coverAccent}33 0%, transparent 65%)` }}
            aria-hidden="true"
          />
          <div className="container">
            <RevealItem y={30}>
              <Link to="/blog" className="blog-back-link">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to Insights
              </Link>
              <div className="blog-post-meta">
                <span className="blog-post-category">{post.category}</span>
                <span className="blog-post-date">{post.date}</span>
                <span className="blog-card-dot" aria-hidden="true" />
                <span className="blog-post-date">{post.readTime}</span>
              </div>
              <h1 className="blog-post-title">{post.title}</h1>
              <p className="blog-post-excerpt">{post.excerpt}</p>
            </RevealItem>
          </div>
        </section>

        {/* ── Article body ── */}
        <section className="blog-post-body-section">
          <div className="container">
            <RevealItem y={20}>
              <div className="blog-post-divider" aria-hidden="true" />
              <article className="blog-post-content">
                {content.map((block, i) => {
                  if (block.type === 'h2') return <h2 key={i} className="blog-post-h2">{block.text}</h2>;
                  if (block.type === 'p')  return <p  key={i} className="blog-post-p">{block.text}</p>;
                  return null;
                })}
              </article>
            </RevealItem>

            {/* ── Share / CTA ── */}
            <RevealItem y={20} className="blog-post-cta-box">
              <div className="blog-post-cta-inner">
                <p className="blog-post-cta-label">Interested in investing with Landmark?</p>
                <button className="btn btn-primary btn-sm" onClick={() => openTour()}>Book a Free Consultation</button>
              </div>
            </RevealItem>
          </div>
        </section>

        {/* ── Related posts ── */}
        {related.length > 0 && (
          <section className="blog-related">
            <div className="container">
              <RevealItem y={20}>
                <h2 className="blog-related-title">More from {post.category}</h2>
              </RevealItem>
              <div className="blog-related-grid">
                {related.map((rp) => (
                  <RevealItem key={rp.slug} y={30} className="blog-related-card">
                    <Link to={`/blog/${rp.slug}`} className="blog-card-link">
                      <div className="blog-card-cover">
                        {rp.coverImage && <img src={rp.coverImage} alt="" className="blog-card-img" />}
                        <div className="blog-card-cover-overlay" />
                        <div className="blog-card-cover-glow" style={{ background: `radial-gradient(ellipse at 60% 60%, ${rp.coverAccent}33 0%, transparent 70%)` }} />
                        <span className="blog-card-category">{rp.category}</span>
                      </div>
                      <div className="blog-card-body">
                        <div className="blog-card-meta">
                          <span>{rp.date}</span>
                          <span className="blog-card-dot" />
                          <span>{rp.readTime}</span>
                        </div>
                        <h3 className="blog-card-title">{rp.title}</h3>
                        <span className="blog-card-cta">
                          Read article
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </RevealItem>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileCTABar />
    </div>
  );
}
