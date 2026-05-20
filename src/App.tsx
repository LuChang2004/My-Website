import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

import BloodCursor from './sections/BloodCursor';
import HeroSection from './sections/HeroSection';
import PhilosophySection from './sections/PhilosophySection';
import ArtworkScroll from './sections/ArtworkScroll';
import EncyclopediaSection from './sections/EncyclopediaSection';
import FooterSection from './sections/FooterSection';
import SectionNav from './sections/SectionNav';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="relative min-h-[100dvh]" style={{ cursor: 'none' }}>
      {/* Blood cursor effect - z-9999, on top of everything */}
      <BloodCursor />

      {/* Section navigation - z-50 */}
      <SectionNav />

      {/* Page content */}
      <div className="relative z-10">
        <HeroSection />
        <PhilosophySection />
        <ArtworkScroll />
        <EncyclopediaSection />
        <FooterSection />
      </div>
    </div>
  );
}

export default App;
