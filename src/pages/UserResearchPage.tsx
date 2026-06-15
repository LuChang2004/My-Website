import { useEffect, useMemo, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import UserResearchScrollViewer from '../components/UserResearchScrollViewer';
import ProjectBackButton from '../components/ProjectBackButton';
import {
  getUserResearchSlideSrc,
  userResearchMeta,
  userResearchSlides,
} from '../data/userResearchContent';
import './UserResearchPage.css';

function AnimatedHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const opacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.55, 0]);
  const metaLines = [userResearchMeta.meta, `${userResearchMeta.authors} · ${userResearchMeta.term}`];

  return (
    <motion.header
      ref={headerRef}
      className="ur-header relative mb-10 px-4 md:px-6"
      style={reduceMotion ? undefined : { y, opacity }}
    >
      <motion.p
        className="m-0 font-['Roboto',sans-serif] text-sm text-[#969696]"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {userResearchMeta.meta}
      </motion.p>

      <motion.h1
        className="m-0 mt-2 font-['Noto_Sans_SC',sans-serif] text-[32px] font-bold leading-tight text-white md:text-[40px]"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        {userResearchMeta.title}
      </motion.h1>

      {metaLines.slice(1).map((line) => (
        <motion.p
          key={line}
          className="m-0 mt-2 font-['Noto_Sans_SC',sans-serif] text-sm text-[#b0b0b0]"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          {line}
        </motion.p>
      ))}

      <motion.p
        className="m-0 mt-3 max-w-[720px] font-['Noto_Sans_SC',sans-serif] text-base leading-7 text-[#888888]"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        {userResearchMeta.description}
      </motion.p>

      <motion.div
        className="ur-header-glow pointer-events-none absolute -left-8 top-0 h-40 w-40 rounded-full"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.header>
  );
}

export default function UserResearchPage() {
  const slides = useMemo(
    () =>
      userResearchSlides.map((slide) => ({
        ...slide,
        src: getUserResearchSlideSrc(slide.file),
      })),
    [],
  );

  useEffect(() => {
    document.title = `${userResearchMeta.title} — Works`;
  }, []);

  return (
    <div className="ur-page min-h-screen bg-black">
      <ProjectBackButton />
      <main className="ur-main mx-auto w-full max-w-[1080px] px-0 pb-20 pt-20">
        <AnimatedHeader />
        <UserResearchScrollViewer slides={slides} />
      </main>
    </div>
  );
}
