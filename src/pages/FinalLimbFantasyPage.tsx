import { useEffect } from 'react';
import { gsap } from 'gsap';
import ProjectBackButton from '../components/ProjectBackButton';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../App.css';

import BloodCursor from '../sections/BloodCursor';
import HeroSection from '../sections/HeroSection';
import PhilosophySection from '../sections/PhilosophySection';
import ArtworkScroll from '../sections/ArtworkScroll';
import EncyclopediaSection from '../sections/EncyclopediaSection';
import FooterSection from '../sections/FooterSection';
gsap.registerPlugin(ScrollTrigger);

export default function FinalLimbFantasyPage() {
  useEffect(() => {
    document.title = '最终肢体幻想 — Final Limb Fantasy';

    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'video';
    preload.href = `${import.meta.env.BASE_URL}images/dance.mp4`;
    preload.type = 'video/mp4';
    document.head.appendChild(preload);

    ScrollTrigger.refresh();

    return () => {
      preload.remove();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="flf-site relative min-h-[100dvh]">
      <ProjectBackButton hideSystemCursor />

      <BloodCursor />

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
