import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import ProjectsIndex from './pages/ProjectsIndex.jsx';
import AboutPage from './pages/AboutPage.jsx';
import TeamPage from './pages/TeamPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import BlogsPage from './pages/BlogsPage.jsx';
import BlogPostPage from './pages/BlogPostPage.jsx';
import { PROJECTS_DATA } from './data/projects.js';
import './styles/app.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsIndex />} />
        <Route path="/about"   element={<AboutPage />} />
        <Route path="/team"    element={<TeamPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog"    element={<BlogsPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
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
  );
}
