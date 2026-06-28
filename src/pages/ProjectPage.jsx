import { useEffect } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll.js';
import ProjSEO from '../components/project/ProjSEO.jsx';
import ProjHeader from '../components/project/ProjHeader.jsx';
import ProjHero from '../components/project/ProjHero.jsx';
import ProjOverview from '../components/project/ProjOverview.jsx';
import ProjHighlights from '../components/project/ProjHighlights.jsx';
import ProjAmenities from '../components/project/ProjAmenities.jsx';
import ProjUnits from '../components/project/ProjUnits.jsx';
import ProjGallery from '../components/project/ProjGallery.jsx';
import ProjPaymentPlan from '../components/project/ProjPaymentPlan.jsx';
import ProjConstruction from '../components/project/ProjConstruction.jsx';
import ProjRelated from '../components/project/ProjRelated.jsx';
import ProjLeadForm from '../components/project/ProjLeadForm.jsx';
import Footer from '../components/Footer.jsx';
import FloatingWhatsApp from '../components/FloatingWhatsApp.jsx';
import MobileCTABar from '../components/MobileCTABar.jsx';
import CursorGlow from '../components/CursorGlow.jsx';
import '../styles/project.css';

export default function ProjectPage({ project }) {
  useSmoothScroll();

  // Scroll to top on project change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project.slug]);

  return (
    <div className="pj-page">
      <ProjSEO project={project} />
      <CursorGlow />
      <ProjHeader project={project} />
      <main>
        <ProjHero project={project} />
        <ProjOverview project={project} />
        <ProjHighlights project={project} />
        <ProjAmenities project={project} />
        <ProjUnits project={project} />
        <ProjGallery project={project} />
        <ProjPaymentPlan project={project} />
        <ProjConstruction project={project} />
        <ProjRelated project={project} />
        <ProjLeadForm project={project} />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileCTABar />
    </div>
  );
}
