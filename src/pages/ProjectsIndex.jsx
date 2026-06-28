import { useEffect } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll.js';
import CursorGlow from '../components/CursorGlow.jsx';
import ProjsHero from '../components/projects-index/ProjsHero.jsx';
import ProjsGrid from '../components/projects-index/ProjsGrid.jsx';
import ProjsComparison from '../components/projects-index/ProjsComparison.jsx';
import ProjectDocuments from '../components/projects-index/ProjectDocuments.jsx';
import ProjsLeadForm from '../components/projects-index/ProjsLeadForm.jsx';
import ProjsFinalCTA from '../components/projects-index/ProjsFinalCTA.jsx';
import Footer from '../components/Footer.jsx';
import FloatingWhatsApp from '../components/FloatingWhatsApp.jsx';
import MobileCTABar from '../components/MobileCTABar.jsx';
import ProjectsHeader from '../components/projects-index/ProjectsHeader.jsx';
import '../styles/projects-index.css';

export default function ProjectsIndex() {
  useSmoothScroll();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'All Projects | Landmark Developers — Bahria Town Lahore & Islamabad';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content',
      'Explore all Landmark Developers projects — Grand X, Grand 11, The View Grand 12, Oasis Grand 14 and Grand 15. Luxury residences and commercial spaces in Bahria Town Lahore and Islamabad.'
    );
    return () => {
      document.title = 'Landmark Developers — Premium Living in Bahria Town Lahore';
    };
  }, []);

  return (
    <div className="pj-page pjidx-page">
      <CursorGlow />
      <ProjectsHeader />
      <main>
        <ProjsHero />
        <ProjsGrid />
        <ProjsComparison />
        <ProjectDocuments />
        <ProjsLeadForm />
        <ProjsFinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileCTABar />
    </div>
  );
}
