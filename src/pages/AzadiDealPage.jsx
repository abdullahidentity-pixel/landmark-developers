import { useCallback } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll.js';
import { useLeadModal } from '../context/LeadModalContext.jsx';
import ProjHeader from '../components/project/ProjHeader.jsx';
import Footer from '../components/Footer.jsx';
import CursorGlow from '../components/CursorGlow.jsx';
import FloatingWhatsApp from '../components/FloatingWhatsApp.jsx';

import AzadiSEO from '../components/azadi/AzadiSEO.jsx';
import AzadiHero from '../components/azadi/AzadiHero.jsx';
import AzadiOverview from '../components/azadi/AzadiOverview.jsx';
import AzadiUnits from '../components/azadi/AzadiUnits.jsx';
import AzadiPaymentPlan from '../components/azadi/AzadiPaymentPlan.jsx';
import AzadiFloors from '../components/azadi/AzadiFloors.jsx';
import AzadiAmenities from '../components/azadi/AzadiAmenities.jsx';
import AzadiFurnished from '../components/azadi/AzadiFurnished.jsx';
import AzadiStory from '../components/azadi/AzadiStory.jsx';
import AzadiGallery from '../components/azadi/AzadiGallery.jsx';
import AzadiLeadForm from '../components/azadi/AzadiLeadForm.jsx';
import AzadiCTABar from '../components/azadi/AzadiCTABar.jsx';

import { PROJECTS_DATA } from '../data/projects.js';
import { DISCLAIMER, AZADI, WA_MESSAGES } from '../data/azadi.js';
import '../styles/azadi.css';

// The campaign reuses the Grand 15 project record purely to drive the shared
// project navbar (its "other projects" list and Register-Interest modal). All
// campaign content comes from data/azadi.js.
const GRAND_15 = PROJECTS_DATA.find((p) => p.slug === AZADI.projectSlug);

export default function AzadiDealPage() {
  useSmoothScroll();

  // Every "register" CTA on this page opens the site's own lead modal — the same
  // one behind "Book a Tour" in the header and every Register Interest button on
  // the project pages.
  //
  // It used to smooth-scroll down to the in-page form instead. That was a worse
  // CTA on both counts: a button that scrolls has not converted anyone, it has
  // only moved them, and the visitor had to re-find their place afterwards. It
  // also meant campaign leads arrived through a second code path from the rest
  // of the site. Now there is one modal, one delivery path, one success state.
  //
  // The project passed in is AZADI.projectShort ("Grand 15"), not AZADI.project
  // ("The Grand Lifestyle — Grand 15"). The modal prefills its project <select>
  // from this string, and only the short form is one of that select's options —
  // the long marketing name would match nothing and leave the field blank.
  const { openTour } = useLeadModal();
  const toForm = useCallback(() => openTour(AZADI.projectShort), [openTour]);

  return (
    <div className="az-page">
      <AzadiSEO />
      <CursorGlow />
      <ProjHeader project={GRAND_15} />

      <main>
        <AzadiHero onRegister={toForm} />
        <AzadiOverview onRegister={toForm} />
        <AzadiUnits />
        <AzadiPaymentPlan onRegister={toForm} />
        <AzadiFloors />
        <AzadiAmenities />
        <AzadiFurnished />
        <AzadiStory onClaim={toForm} />
        <AzadiGallery />
        <AzadiLeadForm />

        <section id="az-legal" className="az-legal" aria-label="Campaign disclaimer">
          <div className="container">
            <h2 className="az-legal-title">Important Information</h2>
            <p>{DISCLAIMER}</p>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp message={WA_MESSAGES.general} />
      <AzadiCTABar />
    </div>
  );
}
