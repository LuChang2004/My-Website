import { useEffect } from 'react';
import { Link } from 'react-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../App.css';

import BloodCursor from '../sections/BloodCursor';
import HeroSection from '../sections/HeroSection';
import PhilosophySection from '../sections/PhilosophySection';
import ArtworkScroll from '../sections/ArtworkScroll';
import EncyclopediaSection from '../sections/EncyclopediaSection';
import FooterSection from '../sections/FooterSection';
import SectionNav from '../sections/SectionNav';

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
      <Link
        to="/"
        className="fixed top-4 right-4 z-[60] font-space text-[10px] tracking-widest text-[#888888] hover:text-[#c8102e] transition-colors bg-white/90 border border-[rgba(26,26,26,0.08)] px-3 py-1.5"
      >
        ← 返回
      </Link>

      <BloodCursor />
      <SectionNav />

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
