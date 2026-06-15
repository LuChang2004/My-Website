import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollingBannerProps {
  src: string;
  alt?: string;
  rows?: number;
  speed?: number;
  direction?: 'left' | 'right';
  opacity?: number;
}

export default function ScrollingBanner({
  src,
  alt = '',
  rows = 3,
  speed = 20,
  direction = 'left',
  opacity = 0.7,
}: ScrollingBannerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0, margin: '200px 0px' });
  const resolvedSrc = src.startsWith('http')
    ? src
    : `${import.meta.env.BASE_URL || '/'}${src.startsWith('/') ? src.slice(1) : src}`;

  // Alternate direction per row
  const getRowDirection = (rowIndex: number) => {
    if (direction === 'left') {
      return rowIndex % 2 === 0 ? 'left' : 'right';
    }
    return rowIndex % 2 === 0 ? 'right' : 'left';
  };

  const getRowSpeed = (rowIndex: number) => {
    // Slightly different speed per row for visual interest
    return speed + rowIndex * 4;
  };

  return (
    <motion.div
      ref={ref}
      className="w-full overflow-hidden py-3"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col gap-2">
        {Array.from({ length: rows }).map((_, rowIndex) => {
          const rowDir = getRowDirection(rowIndex);
          const rowSpeed = getRowSpeed(rowIndex);
          const animClass = rowDir === 'left' ? 'scroll-left' : 'scroll-right';

          return (
            <div
              key={rowIndex}
              className={`flex whitespace-nowrap ${animClass}`}
              style={
                {
                  '--scroll-speed': `${rowSpeed}s`,
                } as React.CSSProperties
              }
            >
              {/* 4 份副本即可无缝循环，进入视口后再加载 */}
              {isInView &&
                Array.from({ length: 4 }).map((_, i) => (
                  <img
                    key={i}
                    src={resolvedSrc}
                    alt={alt}
                    className="h-[50px] md:h-[65px] w-auto flex-shrink-0 mx-1"
                    style={{ opacity }}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    draggable={false}
                  />
                ))}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .scroll-left {
          animation: scroll-left var(--scroll-speed, 20s) linear infinite;
        }

        .scroll-right {
          animation: scroll-right var(--scroll-speed, 20s) linear infinite;
        }
      `}</style>
    </motion.div>
  );
}
