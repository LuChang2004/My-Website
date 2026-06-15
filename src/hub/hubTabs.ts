export type NavItem = 'About Me' | 'Works' | 'Contact';
export type HubSlideDirection = 1 | -1;

export const HUB_TAB_PATHS = ['/', '/works', '/contact'] as const;
export type HubTabPath = (typeof HUB_TAB_PATHS)[number];

export const navItems: NavItem[] = ['About Me', 'Works', 'Contact'];

export function isHubTabPath(pathname: string): pathname is HubTabPath {
  return (HUB_TAB_PATHS as readonly string[]).includes(pathname);
}

export function getHubTabIndex(pathname: string): number {
  const index = HUB_TAB_PATHS.indexOf(pathname as HubTabPath);
  return index >= 0 ? index : 0;
}

/**
 * Tab 空间顺序：About Me（左）→ Works（中）→ Contact（右）
 * direction = 1：切到更右侧的 Tab，当前页向左滑出、新页从右侧进入
 * direction = -1：切到更左侧的 Tab，当前页向右滑出、新页从左侧进入
 */
export function getHubSlideDirection(fromPath: string, toPath: string): HubSlideDirection {
  const fromIndex = getHubTabIndex(fromPath);
  const toIndex = getHubTabIndex(toPath);
  if (fromIndex === toIndex) return 1;
  return toIndex > fromIndex ? 1 : -1;
}

export function pathnameToNavItem(pathname: string): NavItem {
  if (pathname === '/works') return 'Works';
  if (pathname === '/contact') return 'Contact';
  return 'About Me';
}

export function navItemToPath(item: NavItem): HubTabPath {
  if (item === 'Works') return '/works';
  if (item === 'Contact') return '/contact';
  return '/';
}

export function hubTabPathToPageKey(pathname: string): 'hub-about' | 'hub-works' | 'hub-contact' {
  if (pathname === '/works') return 'hub-works';
  if (pathname === '/contact') return 'hub-contact';
  return 'hub-about';
}
