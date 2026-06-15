import { useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import {
  dispatchHubAboutScrollTo,
  HUB_ABOUT_TAB_ENTRY_PROGRESS,
} from './aboutProgress';
import { navItems, navItemToPath, type NavItem } from './hubTabs';

export const DESIGN_W = 1728;
export const DESIGN_H = 1117;

export function useHubNavigate() {
  const navigate = useNavigate();

  return (item: NavItem) => {
    if (item === 'About Me') {
      navigate('/', { replace: true, state: { aboutEntry: 'about' } });
      dispatchHubAboutScrollTo(HUB_ABOUT_TAB_ENTRY_PROGRESS);
      return;
    }
    navigate(navItemToPath(item));
  };
}

export function useFigmaScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      setScale(Math.min(window.innerWidth / DESIGN_W, window.innerHeight / DESIGN_H));
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return scale;
}

export function FigmaCanvas({
  scale,
  children,
  height = DESIGN_H,
  verticalAlign = 'center',
}: {
  scale: number;
  children: ReactNode;
  height?: number;
  verticalAlign?: 'center' | 'top';
}) {
  const verticalTransform = verticalAlign === 'top' ? 'translateX(-50%)' : 'translate(-50%, -50%)';

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: verticalAlign === 'top' ? 0 : '50%',
        width: DESIGN_W,
        height,
        transform: `${verticalTransform} scale(${scale})`,
        transformOrigin: verticalAlign === 'top' ? 'top center' : 'center center',
      }}
    >
      {children}
    </div>
  );
}

const fontSpace = '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif';

const styles = {
  nav: {
    position: 'absolute' as const,
    left: 0,
    top: 0,
    width: DESIGN_W,
    height: 120,
    zIndex: 20,
    pointerEvents: 'auto' as const,
  },
  navLink: {
    position: 'absolute' as const,
    top: 80,
    fontFamily: fontSpace,
    fontSize: 24,
    fontWeight: 700,
    lineHeight: '24px',
    textDecoration: 'none',
    letterSpacing: 0,
    transition: 'color 180ms ease, opacity 180ms ease',
  },
};

export function HubTopNav({
  active,
  opacity,
  onNavigate,
}: {
  active: NavItem | null;
  opacity: number;
  onNavigate: (item: NavItem) => void;
}) {
  const positions: Record<NavItem, number> = {
    'About Me': 527,
    Works: 791,
    Contact: 1018,
  };

  return (
    <nav aria-label="Primary" style={{ ...styles.nav, opacity }}>
      {navItems.map((item) => (
        <a
          key={item}
          href={navItemToPath(item)}
          onClick={(event) => {
            event.preventDefault();
            onNavigate(item);
          }}
          style={{
            ...styles.navLink,
            left: positions[item],
            color: item === active ? '#000000' : '#969696',
          }}
        >
          {item}
        </a>
      ))}
    </nav>
  );
}
