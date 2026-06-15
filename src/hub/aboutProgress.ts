export const HUB_ABOUT_SCROLL_RANGE = 2400;

export const HUB_ABOUT_LANDING_PROGRESS = 0;
/** About Me Tab 入口：设计方向（Commitment） */
export const HUB_ABOUT_TAB_ENTRY_PROGRESS = 0.35;

export type HubAboutEntry = 'landing' | 'about';

export const HUB_ABOUT_PROGRESS_EVENT = 'hub-about-progress';
export const HUB_ABOUT_SCROLL_TO_EVENT = 'hub-about-scroll-to';

export function isAboutMeProgress(progress: number) {
  return progress >= 0.2;
}

export function resolveInitialAboutProgress(state: unknown) {
  const entry = (state as { aboutEntry?: HubAboutEntry } | null)?.aboutEntry;
  return entry === 'about' ? HUB_ABOUT_TAB_ENTRY_PROGRESS : HUB_ABOUT_LANDING_PROGRESS;
}

export function dispatchHubAboutProgress(progress: number) {
  document.documentElement.dataset.hubAboutProgress = String(progress);
  window.dispatchEvent(new CustomEvent<number>(HUB_ABOUT_PROGRESS_EVENT, { detail: progress }));
}

export function dispatchHubAboutScrollTo(progress: number) {
  window.dispatchEvent(new CustomEvent<number>(HUB_ABOUT_SCROLL_TO_EVENT, { detail: progress }));
}

export function resetHubAboutProgress() {
  delete document.documentElement.dataset.hubAboutProgress;
  dispatchHubAboutProgress(0);
  dispatchHubAboutScrollTo(0);
}

export function readHubAboutProgress() {
  const value = document.documentElement.dataset.hubAboutProgress;
  return value ? Number(value) : 0;
}
