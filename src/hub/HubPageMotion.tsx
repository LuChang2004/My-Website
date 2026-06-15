import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { HubSlideDirection } from './hubTabs';

const HUB_SLIDE_EASE = [0.32, 0.72, 0, 1] as const;

const hubSlideVariants = {
  enter: (direction: HubSlideDirection) => ({
    x: direction > 0 ? '100%' : '-100%',
    zIndex: 2,
  }),
  center: {
    x: 0,
    zIndex: 2,
  },
  exit: (direction: HubSlideDirection) => ({
    x: direction > 0 ? '-100%' : '100%',
    zIndex: 1,
  }),
};

export function HubPageMotionShell({
  direction,
  children,
}: {
  pageKey: 'hub-about' | 'hub-works' | 'hub-contact';
  direction: HubSlideDirection;
  children: ReactNode;
}) {
  return (
    <motion.div
      custom={direction}
      variants={hubSlideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.5, ease: HUB_SLIDE_EASE }}
      className="absolute inset-0 overflow-hidden bg-white text-black will-change-transform"
    >
      {children}
    </motion.div>
  );
}
