import { useParams, Link, Navigate } from 'react-router-dom';
import { useSmoothScroll } from '../hooks/useSmoothScroll.js';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import FloatingWhatsApp from '../components/FloatingWhatsApp.jsx';
import MobileCTABar from '../components/MobileCTABar.jsx';
import CursorGlow from '../components/CursorGlow.jsx';
import { RevealItem } from '../components/Reveal.jsx';
import { getBlogPost, BLOG_POSTS } from '../data/blog.js';

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
                <a href="/#contact" className="btn btn-primary btn-sm">Book a Free Consultation</a>
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
