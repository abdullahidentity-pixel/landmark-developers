import { useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import ProjectsIndex from './pages/ProjectsIndex.jsx';
import AboutPage from './pages/AboutPage.jsx';
import TeamPage from './pages/TeamPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import CareerPage from './pages/CareerPage.jsx';
import BlogsPage from './pages/BlogsPage.jsx';
import BlogPostPage from './pages/BlogPostPage.jsx';
import { PROJECTS_DATA } from './data/projects.js';
import { LeadModalProvider } from './context/LeadModalContext.jsx';
import LeadModal from './components/LeadModal.jsx';
import './styles/app.css';

/* ── Single source of truth for scroll position on every route change ──────────
   This is the ONE global utility that governs where each navigation lands, so no
   page needs its own scroll-reset code. Behaviour:

     • Navigating with NO hash  (e.g. "/", "/projects", "/grand-15")
         → the destination ALWAYS opens at the very top / hero section.
     • Navigating WITH a hash   (e.g. "/projects#brochures", "#contact")
         → after the destination content mounts, the matching section is scrolled
           into view, sitting just below the fixed navbar.

   It also resets Lenis (the smooth-scroll library keeps its own internal scroll
   position, so window.scrollTo alone would leave the page landing mid-way) and
   clears any left-over mobile-menu overflow lock. */

// Height of the fixed navbar, so a hash target isn't hidden underneath it when
// we drive the scroll through Lenis (Lenis bypasses CSS scroll-padding-top).
function headerOffset() {
  const el = document.querySelector('.site-header');
  return el ? el.offsetHeight : 84;
}

// The mobile menu locks scrolling by pinning <body> to `position: fixed` with a
// negative `top` offset. If a navigation happens while that lock is applied,
// clearing only `overflow` leaves the body pinned — and the browser then lands
// the new page at the old offset. Release every property the lock sets.
function releaseBodyScrollLock() {
  const s = document.body.style;
  s.position = '';
  s.top = '';
  s.left = '';
  s.right = '';
  s.width = '';
  s.overflow = '';
}

// Force the viewport to the very top through every channel that can hold a
// scroll position: the window, both scrolling elements (Safari vs. everyone
// else), and Lenis's internal target (desktop smooth scrolling).
function scrollToTopNow() {
  window.scrollTo(0, 0);
  if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  if (typeof window.__lenis?.scrollTo === 'function') {
    window.__lenis.scrollTo(0, { immediate: true, force: true });
  }
}

// Deliberate user input that should end an automated scroll early.
const USER_SCROLL_EVENTS = ['wheel', 'touchstart', 'pointerdown', 'keydown'];

// Breathing room between the navbar and an anchored section's top edge.
const ANCHOR_GAP = 12;

/**
 * Pin the page at the top until its layout stops moving.
 *
 * A single scroll-to-top isn't enough on content-heavy pages (project pages
 * especially). After we reset, several things still fire asynchronously and can
 * yank the viewport back down:
 *   • the hero <img> finishing decode triggers `ScrollTrigger.refresh()`, which
 *     recalculates pinned sections and restores its own recorded scroll offset;
 *   • lazy images, web fonts and the 3D scene change document height;
 *   • the browser's own scroll-anchoring nudges position as content grows.
 *
 * So instead of resetting once, we re-assert the top on every frame for a short
 * settle window — and bail out the instant the user genuinely tries to scroll,
 * so we never fight a real gesture. Returns a cleanup function.
 */
function holdAtTop(durationMs = 1000) {
  let raf = 0;
  let cancelled = false;
  const start = performance.now();

  const release = () => {
    if (cancelled) return;
    cancelled = true;
    cancelAnimationFrame(raf);
    for (const evt of USER_SCROLL_EVENTS) {
      window.removeEventListener(evt, release);
    }
  };

  // Any deliberate user input ends the hold immediately.
  for (const evt of USER_SCROLL_EVENTS) {
    window.addEventListener(evt, release, { passive: true, once: true });
  }

  const tick = (now) => {
    if (cancelled) return;
    if (window.scrollY !== 0) scrollToTopNow();
    if (now - start < durationMs) raf = requestAnimationFrame(tick);
    else release();
  };

  scrollToTopNow();
  raf = requestAnimationFrame(tick);
  return release;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  // Before paint: for a normal (hash-less) navigation, snap to the top so the new
  // page never flashes mid-scroll. Hash navigations are handled in the effect
  // below, after the target section has had a chance to mount.
  // Stop the browser from restoring a remembered scroll offset on top of ours.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    releaseBodyScrollLock();             // clear any mobile-menu scroll lock
    if (!hash) scrollToTopNow();
  }, [pathname, hash]);

  useEffect(() => {
    if (hash) {
      // Anchor navigation. Pages carry lazy content + entrance animations, so the
      // target may not exist on the first frame — poll a few frames until it does.
      const id = decodeURIComponent(hash.slice(1));
      let raf = 0;
      let timer = 0;
      let tries = 0;
      let cancelled = false;

      const cancel = () => {
        if (cancelled) return;
        cancelled = true;
        cancelAnimationFrame(raf);
        clearTimeout(timer);
        for (const evt of USER_SCROLL_EVENTS) window.removeEventListener(evt, cancel);
      };
      for (const evt of USER_SCROLL_EVENTS) {
        window.addEventListener(evt, cancel, { passive: true, once: true });
      }

      // Where the section's top edge should sit: clear of the fixed navbar.
      const targetTop = () => headerOffset() + ANCHOR_GAP;

      const goTo = (el, smooth) => {
        const y = Math.max(0, window.scrollY + el.getBoundingClientRect().top - targetTop());
        if (typeof window.__lenis?.scrollTo === 'function') {
          window.__lenis.scrollTo(y, smooth ? {} : { immediate: true, force: true });
        } else {
          window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'auto' });
        }
      };

      const seek = () => {
        if (cancelled) return;
        const el = document.getElementById(id);
        if (!el) {
          if (tries++ < 60) raf = requestAnimationFrame(seek);
          return;
        }
        goTo(el, true);

        // Media and animated sections above the target keep resolving after the
        // scroll starts, which shifts the target out from under us — leaving the
        // section buried behind the navbar or scrolled past. Re-measure a few
        // times and correct any drift.
        let passes = 0;
        const correct = () => {
          if (cancelled) return;
          const node = document.getElementById(id);
          if (node && Math.abs(node.getBoundingClientRect().top - targetTop()) > 24) {
            goTo(node, false);
          }
          if (passes++ < 4) timer = setTimeout(correct, 260);
        };
        timer = setTimeout(correct, 700);
      };

      raf = requestAnimationFrame(seek);
      return cancel;
    }

    // No hash: keep the page pinned to the top while it settles, so async work
    // (hero image decode → ScrollTrigger.refresh, lazy media, fonts, the 3D
    // scene) can't drag the viewport down after we've landed.
    return holdAtTop();
  }, [pathname, hash]);

  return null;
}

/* While a form control is focused (soft keyboard open on mobile), flag the body
   so the fixed bottom CTA bar can slide out of the way — otherwise it covers the
   inputs and the submit button. Pure focus tracking: no body scroll lock, no
   manual scroll repositioning, so opening/closing the keyboard doesn't jump the
   page to another section. */
function KeyboardAwareChrome() {
  useEffect(() => {
    const isField = (el) =>
      el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT');
    const onFocusIn = (e) => {
      if (isField(e.target)) document.body.classList.add('kb-open');
    };
    const onFocusOut = (e) => {
      if (isField(e.target)) document.body.classList.remove('kb-open');
    };
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
      document.body.classList.remove('kb-open');
    };
  }, []);
  return null;
}

function AppRoutes() {
  const { pathname } = useLocation();
  return (
    <Routes>
      <Route path="/"            element={<Home />} />
      <Route path="/projects"    element={<ProjectsIndex />} />
      <Route path="/about"       element={<AboutPage />} />
      <Route path="/team"        element={<TeamPage />} />
      <Route path="/contact"     element={<ContactPage />} />
      <Route path="/career"      element={<CareerPage />} />
      <Route path="/blog"        element={<BlogsPage />} />
      <Route path="/blog/:slug"  element={<BlogPostPage key={pathname} />} />
      {PROJECTS_DATA.map((project) => (
        <Route
          key={project.slug}
          path={`/${project.slug}`}
          // `key` forces a fresh mount when navigating between two project
          // pages. Without it React reuses the single ProjectPage instance
          // (same component type, same tree slot), so framer-motion's
          // once:true scroll-reveal observers never re-initialise for the new
          // project and its below-the-fold sections stay stuck at opacity:0
          // until a hard refresh. Remounting per slug = same as a refresh.
          element={<ProjectPage key={project.slug} project={project} />}
        />
      ))}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default function App() {
  return (
    <LeadModalProvider>
      <BrowserRouter>
        <ScrollToTop />
        <KeyboardAwareChrome />
        <LeadModal />
        <AppRoutes />
      </BrowserRouter>
    </LeadModalProvider>
  );
}
