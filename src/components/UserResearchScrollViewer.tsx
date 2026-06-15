import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import PdfCanvasPage from './PdfCanvasPage';
import type { UserResearchSlide } from '../data/userResearchContent';

type ViewerSlide = UserResearchSlide & {
  src: string;
};

type UserResearchScrollViewerProps = {
  slides: ViewerSlide[];
  className?: string;
};

type GalleryRevealGridProps = {
  cols: number;
  rows: number;
  active: boolean;
};

function GalleryRevealGrid({ cols, rows, active }: GalleryRevealGridProps) {
  const reduceMotion = useReducedMotion();
  const cells = Array.from({ length: cols * rows }, (_, index) => index);

  if (reduceMotion) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
      aria-hidden="true"
    >
      {cells.map((index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const delay = col * 0.035 + row * 0.055;

        return (
          <motion.div
            key={index}
            className="bg-[#050505]"
            initial={{ opacity: 1, scale: 1.02 }}
            animate={active ? { opacity: 0, scale: 1 } : { opacity: 1, scale: 1.02 }}
            transition={{
              duration: 0.42,
              delay: active ? delay : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        );
      })}
    </div>
  );
}

function SlideParallax({
  children,
  y,
  disabled,
}: {
  children: React.ReactNode;
  y: MotionValue<number>;
  disabled: boolean;
}) {
  if (disabled) {
    return <>{children}</>;
  }

  return <motion.div style={{ y }}>{children}</motion.div>;
}

function AnimatedResearchSlide({
  slide,
  index,
  pageWidth,
  isLast,
}: {
  slide: ViewerSlide;
  index: number;
  pageWidth: number;
  isLast: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });
  const [canvasReady, setCanvasReady] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [slide.presentation === 'cover' ? 56 : 36, slide.presentation === 'cover' ? -40 : -28],
  );

  const presentation = slide.presentation;
  const isGallery = presentation === 'gallery';
  const galleryCols = slide.galleryGrid?.cols ?? 8;
  const galleryRows = slide.galleryGrid?.rows ?? 5;

  useEffect(() => {
    setCanvasReady(false);
  }, [slide.src, pageWidth]);

  return (
    <section
      ref={sectionRef}
      id={slide.id}
      className="relative scroll-mt-24"
      aria-label={`第 ${index + 1} 页：${slide.title}`}
    >
      <SlideParallax y={parallaxY} disabled={!!reduceMotion}>
        <motion.div
          className="relative"
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: presentation === 'cover' ? 52 : isGallery ? 36 : 24,
                  scale: presentation === 'cover' ? 0.93 : 0.97,
                  filter: 'blur(8px)',
                }
          }
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                }
              : undefined
          }
          transition={{
            duration: presentation === 'cover' ? 0.95 : isGallery ? 0.72 : 0.6,
            delay: reduceMotion ? 0 : index === 0 ? 0.08 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="relative overflow-hidden">
            <PdfCanvasPage
              src={slide.src}
              width={pageWidth}
              onRenderComplete={() => setCanvasReady(true)}
            />
            {isGallery && (
              <GalleryRevealGrid
                cols={galleryCols}
                rows={galleryRows}
                active={isInView && canvasReady}
              />
            )}
          </div>

          {!reduceMotion && (
            <motion.p
              className="pointer-events-none absolute bottom-4 right-4 z-20 m-0 font-['Roboto',sans-serif] text-[11px] tracking-[0.2em] text-white/25"
              initial={{ opacity: 0, x: 12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.p>
          )}
        </motion.div>
      </SlideParallax>

      {!isLast && (
        <motion.div
          className="mx-auto my-3 h-px max-w-[72%] bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={reduceMotion ? false : { opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </section>
  );
}

export default function UserResearchScrollViewer({ slides, className = '' }: UserResearchScrollViewerProps) {
  const [pageWidth, setPageWidth] = useState(1080);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () => {
      const nextWidth = Math.min(1080, Math.max(320, container.clientWidth));
      setPageWidth(nextWidth);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {slides.map((slide, index) => (
        <AnimatedResearchSlide
          key={slide.id}
          slide={slide}
          index={index}
          pageWidth={pageWidth}
          isLast={index === slides.length - 1}
        />
      ))}
    </div>
  );
}
