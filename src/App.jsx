import { useEffect } from 'react';
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

/* Scroll every route change back to top and clear any overflow lock */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.body.style.overflow = '';   // clear mobile-menu overflow lock on navigation
  }, [pathname]);
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

export default function App() {
  return (
    <LeadModalProvider>
      <BrowserRouter>
        <ScrollToTop />
        <KeyboardAwareChrome />
        <LeadModal />
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/projects"    element={<ProjectsIndex />} />
          <Route path="/about"       element={<AboutPage />} />
          <Route path="/team"        element={<TeamPage />} />
          <Route path="/contact"     element={<ContactPage />} />
          <Route path="/career"      element={<CareerPage />} />
          <Route path="/blog"        element={<BlogsPage />} />
          <Route path="/blog/:slug"  element={<BlogPostPage />} />
          {PROJECTS_DATA.map((project) => (
            <Route
              key={project.slug}
              path={`/${project.slug}`}
              element={<ProjectPage project={project} />}
            />
          ))}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </LeadModalProvider>
  );
}
