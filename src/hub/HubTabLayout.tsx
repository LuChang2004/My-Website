import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router';
import {
  HUB_ABOUT_PROGRESS_EVENT,
  isAboutMeProgress,
  readHubAboutProgress,
} from './aboutProgress';
import { HubNavOpacityProvider, useHubNavOpacity } from './hubNavContext';
import { HubPageMotionShell } from './HubPageMotion';
import {
  getHubSlideDirection,
  hubTabPathToPageKey,
  isHubTabPath,
  type NavItem,
} from './hubTabs';
import { FigmaCanvas, HubTopNav, useFigmaScale, useHubNavigate } from './hubUi';
import { HubAboutPage, HubContactPage, HubWorksPage } from '../pages/HubPage';

function resolveHubTopNavActive(pathname: string, aboutProgress: number): NavItem | null {
  if (pathname === '/works') return 'Works';
  if (pathname === '/contact') return 'Contact';
  if (pathname === '/' && isAboutMeProgress(aboutProgress)) return 'About Me';
  return null;
}

function HubTabLayoutInner() {
  const location = useLocation();
  const onNavigate = useHubNavigate();
  const scale = useFigmaScale();
  const { opacity: aboutNavOpacity } = useHubNavOpacity();

  const pathname = isHubTabPath(location.pathname) ? location.pathname : '/';
  const prevPathRef = useRef(pathname);
  const [aboutProgress, setAboutProgress] = useState(() => readHubAboutProgress());

  const direction = useMemo(
    () => getHubSlideDirection(prevPathRef.current, pathname),
    [pathname],
  );

  const activeNav = resolveHubTopNavActive(pathname, aboutProgress);
  const navOpacity = pathname === '/' ? aboutNavOpacity : 1;
  const pageKey = hubTabPathToPageKey(pathname);

  useLayoutEffect(() => {
    prevPathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/') {
      setAboutProgress(0);
      return;
    }

    const sync = (progress = readHubAboutProgress()) => setAboutProgress(progress);
    const onProgress = (event: Event) => {
      const progress = (event as CustomEvent<number>).detail;
      sync(typeof progress === 'number' ? progress : readHubAboutProgress());
    };

    sync();
    window.addEventListener(HUB_ABOUT_PROGRESS_EVENT, onProgress);
    return () => window.removeEventListener(HUB_ABOUT_PROGRESS_EVENT, onProgress);
  }, [pathname, location.key]);

  useEffect(() => {
    document.documentElement.style.overflowY = 'hidden';
    document.body.style.overflowY = 'hidden';
    window.scrollTo(0, 0);

    return () => {
      document.documentElement.style.overflowY = '';
      document.body.style.overflowY = '';
    };
  }, []);

  return (
    <div className="relative h-[100dvh] overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 z-30">
        <FigmaCanvas scale={scale}>
          <HubTopNav active={activeNav} opacity={navOpacity} onNavigate={onNavigate} />
        </FigmaCanvas>
      </div>

      <div className="absolute inset-0 z-10 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <HubPageMotionShell key={pageKey} pageKey={pageKey} direction={direction}>
            {pathname === '/' && <HubAboutPage key={location.key} />}
            {pathname === '/works' && <HubWorksPage />}
            {pathname === '/contact' && <HubContactPage />}
          </HubPageMotionShell>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function HubTabLayout() {
  return (
    <HubNavOpacityProvider>
      <HubTabLayoutInner />
    </HubNavOpacityProvider>
  );
}
