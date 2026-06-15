import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import {
  dispatchHubAboutScrollTo,
  HUB_ABOUT_PROGRESS_EVENT,
  HUB_ABOUT_SCROLL_RANGE,
  isAboutMeProgress,
  readHubAboutProgress,
} from '../hub/aboutProgress';

type NavSection = {
  id: string;
  label: string;
  sub?: string;
  targetId?: string;
};

type PageProfile = {
  code: string;
  name: string;
  sections: NavSection[];
};

const hubLandingSection: NavSection[] = [{ id: 'hub-landing-01', label: 'Landing', sub: 'Hi / Lucas' }];

const hubAboutStages: NavSection[] = [
  { id: 'hub-about-01', label: '问候', sub: 'Hero' },
  { id: 'hub-about-02', label: '设计方向', sub: 'Commitment' },
  { id: 'hub-about-03', label: '教育经历', sub: 'Education' },
];

const hubWorksSection: NavSection[] = [{ id: 'hub-works-01', label: '作品列表', sub: 'Works Grid' }];
const hubContactSection: NavSection[] = [{ id: 'hub-contact-01', label: '联系页', sub: 'Contact' }];

const flfSections: NavSection[] = [
  { id: 'flf-01', label: '首屏', sub: 'Hero', targetId: 'hero' },
  { id: 'flf-02', label: '理念', sub: 'Philosophy', targetId: 'philosophy' },
  { id: 'flf-03', label: '画廊', sub: 'Gallery', targetId: 'gallery' },
  { id: 'flf-04', label: '图鉴', sub: 'Encyclopedia', targetId: 'encyclopedia' },
  { id: 'flf-05', label: '页脚', sub: 'Footer', targetId: 'footer' },
];

const singlePageSections = (label: string, sub: string): NavSection[] => [
  { id: 'page-01', label, sub },
];

const pageProfiles: Record<string, PageProfile> = {
  '/': { code: 'P01', name: 'Hub / About', sections: hubAboutStages },
  '/landing': { code: 'P01-L', name: 'Hub / Landing', sections: hubLandingSection },
  '/works': { code: 'P01-W', name: 'Hub / Works', sections: hubWorksSection },
  '/contact': { code: 'P01-C', name: 'Hub / Contact', sections: hubContactSection },
  '/final-limb-fantasy': { code: 'P02', name: '最终肢体幻想', sections: flfSections },
  '/taylor-swift': { code: 'P03', name: 'Career in Data', sections: singlePageSections('数据叙事', 'Taylor Swift') },
  '/chord-diary': { code: 'P04', name: '和弦日记', sections: singlePageSections('交互原型', 'Chord Diary') },
  '/axiom-breach': { code: 'P05', name: 'AXIOM BREACH', sections: singlePageSections('网页游戏', 'Axiom Breach') },
  '/works/keiji-ai': { code: 'P06', name: 'Keiji AI', sections: singlePageSections('PDF 作品', 'Keiji AI') },
  '/works/music-robber': { code: 'P07', name: 'Music Robber', sections: singlePageSections('PDF 作品', 'Music Robber') },
  '/works/narrative-mutation-lab': {
    code: 'P08',
    name: 'Narrative Mutation Lab',
    sections: singlePageSections('PDF 作品', 'Narrative Mutation Lab'),
  },
  '/works/solar-special': {
    code: 'P09',
    name: 'Solar Special',
    sections: [
      { id: 'ss-cover', label: '封面', sub: 'Cover' },
      { id: 'core-concept', label: '核心概念', sub: 'Core Concept' },
      { id: 'game-background', label: '游戏背景', sub: 'Game Background' },
      { id: 'core-gameplay', label: '核心玩法', sub: 'Core Gameplay' },
      { id: 'game-aesthetic', label: '美术设计', sub: 'Game Aesthetic' },
      { id: 'media', label: '影像资料', sub: 'Media' },
    ],
  },
  '/works/user-research': {
    code: 'P10',
    name: '用户研究',
    sections: [
      { id: 'slide-01', label: '封面', sub: 'Cover', targetId: 'slide-01' },
      { id: 'slide-02', label: 'Meme大赏', sub: 'Meme', targetId: 'slide-02' },
      { id: 'slide-03', label: '调侃老板', sub: 'Case', targetId: 'slide-03' },
      { id: 'slide-04', label: '犯贱', sub: 'Case', targetId: 'slide-04' },
      { id: 'slide-05', label: '性相关词语', sub: 'Pattern', targetId: 'slide-05' },
      { id: 'slide-06', label: '疯感', sub: 'Pattern', targetId: 'slide-06' },
      { id: 'slide-07', label: '卖萌犯贱类', sub: 'Category', targetId: 'slide-07' },
      { id: 'slide-08', label: '向死而死类', sub: 'Category', targetId: 'slide-08' },
      { id: 'slide-09', label: 'XXX这一块', sub: 'Category', targetId: 'slide-09' },
      { id: 'slide-10', label: '清醒与理智', sub: 'Insight', targetId: 'slide-10' },
      { id: 'slide-11', label: '成功叙事反叛', sub: 'Insight', targetId: 'slide-11' },
      { id: 'slide-12', label: '延展', sub: 'Extension', targetId: 'slide-12' },
      { id: 'slide-13', label: '品牌战略', sub: 'Marketing', targetId: 'slide-13' },
    ],
  },
  '/works/styling-inspiration-book': {
    code: 'P11',
    name: 'Styling Inspiration Book',
    sections: [
      { id: 'sib-video', label: '视频', sub: 'Video', targetId: 'sib-video' },
      { id: 'sib-brief', label: '设计说明', sub: 'Brief', targetId: 'sib-brief' },
      { id: 'sib-collage', label: '拼贴素材', sub: 'Collage', targetId: 'sib-collage' },
    ],
  },
};

const hubAboutScrollAnchors = [0, 0.35, 0.72];


function getHubAboutActiveId(progress: number) {
  if (progress < 0.2) return hubAboutStages[0].id;
  if (progress < 0.58) return hubAboutStages[1].id;
  return hubAboutStages[2].id;
}

function resolveProfile(pathname: string, aboutProgress: number): PageProfile {
  if (pathname === '/' && !isAboutMeProgress(aboutProgress)) {
    return pageProfiles['/landing'];
  }

  return (
    pageProfiles[pathname] ?? {
      code: 'P??',
      name: pathname,
      sections: singlePageSections('未知页面', pathname),
    }
  );
}

export default function SitePositionNav() {
  const location = useLocation();
  const [aboutProgress, setAboutProgress] = useState(() =>
    location.pathname === '/' ? readHubAboutProgress() : 0,
  );
  const profile = useMemo(
    () => resolveProfile(location.pathname, aboutProgress),
    [location.pathname, aboutProgress],
  );

  const [scrollY, setScrollY] = useState(0);
  const [activeId, setActiveId] = useState(profile.sections[0]?.id ?? '');

  useEffect(() => {
    setActiveId(profile.sections[0]?.id ?? '');
  }, [profile]);

  useEffect(() => {
    if (location.pathname !== '/') {
      const onScroll = () => setScrollY(Math.round(window.scrollY));
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }

    const syncAbout = (progress = readHubAboutProgress()) => {
      setAboutProgress(progress);
      setScrollY(Math.round(progress * HUB_ABOUT_SCROLL_RANGE));
      setActiveId(
        isAboutMeProgress(progress) ? getHubAboutActiveId(progress) : 'hub-landing-01',
      );
    };

    const onAboutProgress = (event: Event) => {
      const progress = (event as CustomEvent<number>).detail;
      syncAbout(typeof progress === 'number' ? progress : readHubAboutProgress());
    };

    syncAbout();
    window.addEventListener(HUB_ABOUT_PROGRESS_EVENT, onAboutProgress);
    return () => window.removeEventListener(HUB_ABOUT_PROGRESS_EVENT, onAboutProgress);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/') return;
    if (location.pathname === '/works' || location.pathname === '/contact') {
      setActiveId(profile.sections[0]?.id ?? '');
      setScrollY(0);
      return;
    }

    const observers: IntersectionObserver[] = [];
    profile.sections.forEach((section) => {
      if (!section.targetId) return;
      const el = document.getElementById(section.targetId);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveId(section.id);
          });
        },
        { threshold: 0.2, rootMargin: '-10% 0px -60% 0px' },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [location.pathname, profile]);

  const activeIndex = Math.max(
    0,
    profile.sections.findIndex((section) => section.id === activeId),
  );
  const activeSection = profile.sections[activeIndex] ?? profile.sections[0];
  const routeLabel = `${location.pathname || '/'}${location.hash || ''}`;

  const scrollToSection = (section: NavSection, index: number) => {
    if (location.pathname === '/') {
      if (!isAboutMeProgress(aboutProgress) && index === 0) {
        dispatchHubAboutScrollTo(0);
        return;
      }
      const anchor = hubAboutScrollAnchors[index] ?? 0;
      dispatchHubAboutScrollTo(anchor);
      return;
    }

    if (section.targetId) {
      document.getElementById(section.targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside
      aria-label="页面位置导航"
      className="fixed left-4 top-1/2 z-[60] hidden -translate-y-1/2 md:block"
    >
      <div className="w-[88px] border border-[rgba(26,26,26,0.08)] bg-white/95 px-3 py-4 shadow-sm backdrop-blur-sm">
        <div className="mb-3 border-b border-[rgba(26,26,26,0.06)] pb-2">
          <span className="font-space mb-0.5 block text-[8px] tracking-wider text-[#BBBBBB]">PAGE</span>
          <span className="font-space block text-[11px] font-semibold text-[#c8102e]">{profile.code}</span>
          <span className="font-sans-sc mt-0.5 block text-[10px] font-medium leading-tight text-[#1A1A1A]">
            {profile.name}
          </span>
        </div>

        <div className="mb-3 border-b border-[rgba(26,26,26,0.06)] pb-2">
          <span className="font-space mb-0.5 block text-[8px] tracking-wider text-[#BBBBBB]">ROUTE</span>
          <span className="font-space block break-all text-[9px] leading-tight text-[#666666]">{routeLabel}</span>
        </div>

        <div className="mb-3 border-b border-[rgba(26,26,26,0.06)] pb-2">
          <span className="font-space mb-0.5 block text-[8px] tracking-wider text-[#BBBBBB]">POSITION</span>
          <span className="font-space block text-[11px] font-medium text-[#1A1A1A]">
            {String(activeIndex + 1).padStart(2, '0')} / {String(profile.sections.length).padStart(2, '0')}
          </span>
          <span className="font-sans-sc mt-0.5 block text-[10px] font-medium leading-tight text-[#1A1A1A]">
            {activeSection?.label}
          </span>
          {activeSection?.sub && (
            <span className="font-space mt-0.5 block text-[8px] text-[#888888]">{activeSection.sub}</span>
          )}
        </div>

        <div className="mb-3 border-b border-[rgba(26,26,26,0.06)] pb-2">
          <span className="font-space mb-0.5 block text-[8px] tracking-wider text-[#BBBBBB]">SCROLL Y</span>
          <span className="font-space block text-[10px] font-medium text-[#c8102e]">{scrollY}px</span>
        </div>

        <div className="space-y-1.5">
          {profile.sections.map((section, index) => {
            const isActive = section.id === activeId;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section, index)}
                className={`flex w-full items-center gap-1.5 px-1 py-0.5 text-left transition-colors duration-200 ${
                  isActive ? 'bg-[rgba(200,16,46,0.06)]' : 'hover:bg-[rgba(26,26,26,0.02)]'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 flex-shrink-0 rounded-full transition-colors duration-200 ${
                    isActive ? 'bg-[#c8102e]' : 'bg-[#DDDDDD]'
                  }`}
                />
                <div className="min-w-0">
                  <span
                    className={`font-space block text-[9px] leading-tight ${
                      isActive ? 'font-medium text-[#c8102e]' : 'text-[#999999]'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-sans-sc block truncate text-[9px] leading-tight ${
                      isActive ? 'font-medium text-[#1A1A1A]' : 'text-[#BBBBBB]'
                    }`}
                  >
                    {section.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
