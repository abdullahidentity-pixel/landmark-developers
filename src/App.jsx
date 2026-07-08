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

/* Scroll every route change back to top instantly */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <LeadModalProvider>
      <BrowserRouter>
        <ScrollToTop />
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
