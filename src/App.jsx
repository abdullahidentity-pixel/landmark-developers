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

function scrollToTopNow() {
  window.scrollTo(0, 0);
  if (typeof window.__lenis?.scrollTo === 'function') {
    window.__lenis.scrollTo(0, { immediate: true, force: true });
  }
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  // Before paint: for a normal (hash-less) navigation, snap to the top so the new
  // page never flashes mid-scroll. Hash navigations are handled in the effect
  // below, after the target section has had a chance to mount.
  useLayoutEffect(() => {
    document.body.style.overflow = '';   // clear any mobile-menu overflow lock
    if (!hash) scrollToTopNow();
  }, [pathname, hash]);

  useEffect(() => {
    if (hash) {
      // Anchor navigation. Pages carry lazy content + entrance animations, so the
      // target may not exist on the first frame — poll a few frames until it does.
      const id = decodeURIComponent(hash.slice(1));
      let raf;
      let tries = 0;
      const seek = () => {
        const el = document.getElementById(id);
        if (el) {
          if (typeof window.__lenis?.scrollTo === 'function') {
            window.__lenis.scrollTo(el, { offset: -headerOffset() });
          } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else if (tries++ < 30) {
          raf = requestAnimationFrame(seek);
        }
      };
      raf = requestAnimationFrame(seek);
      return () => cancelAnimationFrame(raf);
    }

    // No hash: the freshly-mounted page creates its Lenis instance in a passive
    // effect, so reset once more on the next frame to catch that instance too.
    scrollToTopNow();
    const raf = requestAnimationFrame(scrollToTopNow);
    return () => cancelAnimationFrame(raf);
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
