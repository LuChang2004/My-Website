import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SectionInfo {
  id: string;
  label: string;
  sub?: string;
}

const sections: SectionInfo[] = [
  { id: 'hero', label: '首屏', sub: 'Hero' },
  { id: 'philosophy', label: '理念', sub: 'Philosophy' },
  { id: 'gallery', label: '画廊', sub: 'Gallery' },
  { id: 'encyclopedia', label: '图鉴', sub: 'Encyclopedia' },
  { id: 'quotes', label: '语录', sub: 'Quotes' },
  { id: 'footer', label: '页脚', sub: 'Footer' },
];

export default function SectionNav() {
  const [activeId, setActiveId] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(id);
            }
          });
        },
        { threshold: 0.2, rootMargin: '-10% 0px -60% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    // Track scroll position
    const onScroll = () => {
      setScrollY(Math.round(window.scrollY));
      // Hide nav when near top
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const activeIndex = sections.findIndex((s) => s.id === activeId);
  const currentSection = sections[activeIndex];

  return (
    <motion.div
      className="fixed left-4 top-1/2 -translate-y-1/2 z-[50] hidden md:block"
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : -20,
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-[#FFFFFF] border border-[rgba(26,26,26,0.08)] shadow-sm px-3 py-4 w-[72px]">
        {/* Scroll Y */}
        <div className="mb-3 pb-2 border-b border-[rgba(26,26,26,0.06)]">
          <span className="font-space text-[8px] text-[#BBBBBB] tracking-wider block mb-0.5">
            SCROLL Y
          </span>
          <span className="font-space text-[10px] text-[#c8102e] font-medium">
            {scrollY}px
          </span>
        </div>

        {/* Current section */}
        <div className="mb-3 pb-2 border-b border-[rgba(26,26,26,0.06)]">
          <span className="font-space text-[8px] text-[#BBBBBB] tracking-wider block mb-0.5">
            CURRENT
          </span>
          <span className="text-[10px] text-[#1A1A1A] font-sans-sc font-medium block leading-tight">
            {currentSection?.label}
          </span>
          <span className="font-space text-[8px] text-[#888888] block">
            {currentSection?.sub}
          </span>
        </div>

        {/* Section list */}
        <div className="space-y-1.5">
          {sections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`w-full text-left flex items-center gap-1.5 py-0.5 px-1 transition-all duration-200 ${
                s.id === activeId
                  ? 'bg-[rgba(200,16,46,0.06)]'
                  : 'hover:bg-[rgba(26,26,26,0.02)]'
              }`}
            >
              {/* Active indicator dot */}
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-200 ${
                  s.id === activeId ? 'bg-[#c8102e]' : 'bg-[#DDDDDD]'
                }`}
              />
              <div className="min-w-0">
                <span
                  className={`text-[9px] font-sans-sc block leading-tight truncate ${
                    s.id === activeId
                      ? 'text-[#c8102e] font-medium'
                      : 'text-[#999999]'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`text-[9px] font-sans-sc block leading-tight truncate ${
                    s.id === activeId
                      ? 'text-[#1A1A1A] font-medium'
                      : 'text-[#BBBBBB]'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
