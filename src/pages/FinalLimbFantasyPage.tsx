import { useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
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
        aria-label="返回项目列表"
        className="fixed top-4 left-4 z-[60] w-11 h-11 rounded-full border border-[rgba(26,26,26,0.15)] bg-white/90 flex items-center justify-center text-[#1A1A1A] hover:border-[#c8102e] hover:text-[#c8102e] transition-colors duration-200 shadow-sm"
        style={{ cursor: 'none' }}
      >
        <ArrowLeft className="w-[18px] h-[18px]" strokeWidth={1.5} />
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
