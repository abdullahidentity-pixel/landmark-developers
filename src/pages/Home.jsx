import { useSmoothScroll } from '../hooks/useSmoothScroll.js';
import CursorGlow from '../components/CursorGlow.jsx';
import Header from '../components/Header.jsx';
import Hero from '../components/Hero.jsx';
import Trust from '../components/Trust.jsx';
import Projects from '../components/Projects.jsx';
import WhyLandmark from '../components/WhyLandmark.jsx';
import Amenities from '../components/Amenities.jsx';
import ProjectShowcase from '../components/ProjectShowcase.jsx';
import LeadForm from '../components/LeadForm.jsx';
import Location from '../components/Location.jsx';
import Testimonials from '../components/Testimonials.jsx';
import FinalCTA from '../components/FinalCTA.jsx';
import Footer from '../components/Footer.jsx';
import MobileCTABar from '../components/MobileCTABar.jsx';
import FloatingWhatsApp from '../components/FloatingWhatsApp.jsx';

export default function Home() {
  useSmoothScroll();

  return (
    <div id="app" className="app">
      <CursorGlow />
      <Header />
      <main>
        <Hero />
        <Trust />
        <Projects />
        <WhyLandmark />
        <Amenities />
        <ProjectShowcase />
        <LeadForm />
        <Location />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileCTABar />
    </div>
  );
}
