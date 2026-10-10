import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router';
import { HubPageMotionShell } from './HubPageMotion';
import {
  getHubSlideDirection,
  hubTabPathToPageKey,
  isHubTabPath,
  type NavItem,
} from './hubTabs';
import { FigmaCanvas, HubTopNav, useFigmaScale, useHubNavigate } from './hubUi';
import { HubAboutPage, HubContactPage, HubWorksPage } from '../pages/HubPage';
import { useIsMobile } from '../hooks/use-mobile';

function MobileHubTopNav({
  active,
  opacity,
  blurred,
  onNavigate,
}: {
  active: NavItem | null;
  opacity: number;
  blurred: boolean;
  onNavigate: (item: NavItem) => void;
}) {
  return (
    <nav
      aria-label="Primary"
      className="pointer-events-auto fixed left-0 top-0 z-30 flex h-[88px] w-full items-end justify-center gap-10 pb-5 transition-[background-color,backdrop-filter] duration-300"
      style={{
        opacity,
        background: blurred ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0)',
        backdropFilter: blurred ? 'blur(20px)' : 'blur(0px)',
        WebkitBackdropFilter: blurred ? 'blur(20px)' : 'blur(0px)',
      }}
    >
      {(['About Me', 'Works', 'Contact'] as NavItem[]).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onNavigate(item)}
          className={`m-0 border-0 bg-transparent p-0 font-['Roboto',sans-serif] text-[16px] font-bold leading-none transition-colors ${
            item === active ? 'text-black' : 'text-[#969696]'
          }`}
        >
          {item}
        </button>
      ))}
    </nav>
  );
}

function resolveHubTopNavActive(pathname: string): NavItem {
  if (pathname === '/works') return 'Works';
  if (pathname === '/contact') return 'Contact';
  return 'About Me';
}

function HubTabLayoutInner() {
  const location = useLocation();
  const onNavigate = useHubNavigate();
  const scale = useFigmaScale();
  const isMobile = useIsMobile();
  const [navScrollState, setNavScrollState] = useState({ locationKey: '', blurred: false });

  const pathname = isHubTabPath(location.pathname) ? location.pathname : '/';
  const prevPathRef = useRef(pathname);

  const direction = useMemo(
    () => getHubSlideDirection(prevPathRef.current, pathname),
    [pathname],
  );

  const activeNav = resolveHubTopNavActive(pathname);
  const pageKey = hubTabPathToPageKey(pathname);
  const isNavBlurred = navScrollState.locationKey === location.key
    && navScrollState.blurred;

  useLayoutEffect(() => {
    prevPathRef.current = pathname;
  }, [pathname]);

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
        {isMobile ? (
          <MobileHubTopNav
            active={activeNav}
            opacity={1}
            blurred={isNavBlurred}
            onNavigate={onNavigate}
          />
        ) : (
          <>
            <div
              className="absolute left-1/2 top-0 transition-[opacity,backdrop-filter] duration-300"
              style={{
                width: 1146 * scale,
                height: 154 * scale,
                opacity: isNavBlurred ? 1 : 0,
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%)',
                borderRadius: `0 0 ${24 * scale}px ${24 * scale}px`,
                backdropFilter: isNavBlurred ? 'blur(4px)' : 'blur(0px)',
                WebkitBackdropFilter: isNavBlurred ? 'blur(4px)' : 'blur(0px)',
                transform: 'translateX(-50%)',
              }}
            />
            <FigmaCanvas scale={scale}>
              <HubTopNav
                active={activeNav}
                opacity={1}
                onNavigate={onNavigate}
              />
            </FigmaCanvas>
          </>
        )}
      </div>

      <div
        className="absolute inset-0 z-10 overflow-hidden"
        onScrollCapture={(event) => {
          if (event.target === event.currentTarget) return;
          const target = event.target as HTMLElement;
          const blurred = target.scrollTop > 12;
          setNavScrollState((current) => (
            current.locationKey === location.key && current.blurred === blurred
              ? current
              : { locationKey: location.key, blurred }
          ));
        }}
      >
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
  return <HubTabLayoutInner />;
}
