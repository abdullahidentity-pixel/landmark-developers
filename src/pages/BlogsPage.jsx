import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSmoothScroll } from '../hooks/useSmoothScroll.js';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import FloatingWhatsApp from '../components/FloatingWhatsApp.jsx';
import MobileCTABar from '../components/MobileCTABar.jsx';
import CursorGlow from '../components/CursorGlow.jsx';
import { RevealGroup, RevealItem } from '../components/Reveal.jsx';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../data/blog.js';

function BlogCard({ post, featured }) {
  return (
    <RevealItem className={`blog-card ${featured ? 'blog-card--featured' : ''}`} y={40}>
      <Link to={`/blog/${post.slug}`} className="blog-card-link" aria-label={post.title}>
        <div className="blog-card-cover" aria-hidden="true">
          {post.coverImage && (
            <img src={post.coverImage} alt="" className="blog-card-img" />
          )}
          <div className="blog-card-cover-overlay" />
          <div
            className="blog-card-cover-glow"
            style={{ background: `radial-gradient(ellipse at 60% 60%, ${post.coverAccent}33 0%, transparent 70%)` }}
          />
          <span className="blog-card-category">{post.category}</span>
        </div>
        <div className="blog-card-body">
          <div className="blog-card-meta">
            <span>{post.date}</span>
            <span className="blog-card-dot" aria-hidden="true" />
            <span>{post.readTime}</span>
          </div>
          <h3 className="blog-card-title">{post.title}</h3>
          <p className="blog-card-excerpt">{post.excerpt}</p>
          <span className="blog-card-cta">
            Read article
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>
    </RevealItem>
  );
}

export default function BlogsPage() {
  useSmoothScroll();
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    document.title = 'Landmark Insights — Real Estate Blog | Landmark Developers';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content',
      'Investment guides, project news and market analysis for Pakistan real estate investors. Written by the Landmark Developers team.'
    );
    return () => { document.title = 'Landmark Developers — Premium Living in Bahria Town Lahore'; };
  }, []);

  const filtered = activeCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.category === activeCategory);

  const featured = filtered.find((p) => p.featured) ?? filtered[0];
  const rest = filtered.filter((p) => p !== featured);

  return (
    <div id="app" className="app">
      <CursorGlow />
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="blog-hero">
          <div className="container">
            <RevealItem y={30}>
              <p className="eyebrow">Landmark Insights</p>
              <h1 className="blog-hero-title">Real estate knowledge,<br />straight from the source</h1>
              <p className="blog-hero-sub">
                Investment guides, project news, and market analysis — written for buyers and
                investors navigating Pakistan's premium property market.
              </p>
            </RevealItem>
          </div>
          <div className="blog-hero-line" aria-hidden="true" />
        </section>

        {/* ── Filter tabs ── */}
        <section className="blog-filter-bar">
          <div className="container">
            <div className="blog-tabs" role="tablist" aria-label="Filter by category">
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`blog-tab ${activeCategory === cat ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured post ── */}
        {featured && (
          <section className="blog-featured-section">
            <div className="container">
              <RevealItem y={30}>
                <Link to={`/blog/${featured.slug}`} className="blog-featured-card">
                  <div className="blog-featured-cover" aria-hidden="true">
                    {featured.coverImage && (
                      <img src={featured.coverImage} alt="" className="blog-card-img" />
                    )}
                    <div className="blog-card-cover-overlay" />
                    <div
                      className="blog-card-cover-glow"
                      style={{ background: `radial-gradient(ellipse at 60% 50%, ${featured.coverAccent}33 0%, transparent 65%)` }}
                    />
                    <span className="blog-card-category">{featured.category}</span>
                    <span className="blog-featured-label">Featured</span>
                  </div>
                  <div className="blog-featured-body">
                    <div className="blog-card-meta">
                      <span>{featured.date}</span>
                      <span className="blog-card-dot" aria-hidden="true" />
                      <span>{featured.readTime}</span>
                    </div>
                    <h2 className="blog-featured-title">{featured.title}</h2>
                    <p className="blog-card-excerpt">{featured.excerpt}</p>
                    <span className="blog-card-cta">
                      Read article
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </RevealItem>
            </div>
          </section>
        )}

        {/* ── Post grid ── */}
        <section className="blog-grid-section">
          <div className="container">
            <RevealGroup className="blog-grid" stagger={0.08}>
              {rest.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ── Newsletter CTA ── */}
        <section className="blog-newsletter">
          <div className="container">
            <RevealItem className="blog-newsletter-inner" y={30}>
              <p className="eyebrow">Stay Informed</p>
              <h2 className="blog-newsletter-title">Get market insights delivered</h2>
              <p className="blog-newsletter-sub">
                Join 2,000+ investors receiving our monthly Pakistan real estate briefing.
              </p>
              <form
                className="blog-newsletter-form"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Newsletter signup"
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  className="blog-newsletter-input"
                  aria-label="Email address"
                  required
                />
                <button type="submit" className="btn btn-primary btn-sm">
                  Subscribe
                </button>
              </form>
            </RevealItem>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileCTABar />
    </div>
  );
}
