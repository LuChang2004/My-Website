import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { projects } from '../data/projects';
import { pdfProjects } from '../data/pdfProjects';
import { solarSpecialMeta } from '../data/solarSpecialContent';
import { userResearchMeta } from '../data/userResearchContent';
import { stylingInspirationBookMeta } from '../data/stylingInspirationBookContent';
import {
  dispatchHubAboutProgress,
  HUB_ABOUT_SCROLL_RANGE,
  HUB_ABOUT_SCROLL_TO_EVENT,
  resolveInitialAboutProgress,
} from '../hub/aboutProgress';
import { useHubNavOpacity } from '../hub/hubNavContext';
import { FigmaCanvas, useFigmaScale, DESIGN_H } from '../hub/hubUi';

export function HubAboutPage() {
  const location = useLocation();

  useEffect(() => {
    document.title = 'luchang.fun — 陆畅';

    return () => {
      delete document.documentElement.dataset.hubAboutProgress;
    };
  }, []);

  return (
    <div className="h-full overflow-hidden">
      <IntroScrollFlow key={location.key} />
    </div>
  );
}

export function HubWorksPage() {
  useEffect(() => {
    document.title = 'Works — luchang.fun';
  }, []);

  return (
    <div className="h-full overflow-y-auto">
      <WorksContent />
    </div>
  );
}

export function HubContactPage() {
  useEffect(() => {
    document.title = 'Contact — luchang.fun';
  }, []);

  return (
    <div className="h-full overflow-hidden">
      <ContactContent />
    </div>
  );
}

function IntroScrollFlow() {
  const location = useLocation();
  const scale = useFigmaScale();
  const { setOpacity: setNavOpacity } = useHubNavOpacity();
  const initialProgress = resolveInitialAboutProgress(location.state);
  const [progress, setProgress] = useState(initialProgress);
  const progressRef = useRef(initialProgress);

  useEffect(() => {
    let touchY: number | null = null;

    const setProgressValue = (value: number) => {
      const next = clamp(value);
      progressRef.current = next;
      setProgress(next);
      dispatchHubAboutProgress(next);
    };

    const startProgress = resolveInitialAboutProgress(location.state);
    progressRef.current = startProgress;
    setProgress(startProgress);
    dispatchHubAboutProgress(startProgress);

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      setProgressValue(progressRef.current + event.deltaY / HUB_ABOUT_SCROLL_RANGE);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (touchY === null) return;
      event.preventDefault();
      const currentY = event.touches[0]?.clientY ?? touchY;
      const delta = (touchY - currentY) / (HUB_ABOUT_SCROLL_RANGE * 0.45);
      touchY = currentY;
      setProgressValue(progressRef.current + delta);
    };

    const onTouchEnd = () => {
      touchY = null;
    };

    const onScrollTo = (event: Event) => {
      const target = (event as CustomEvent<number>).detail;
      if (typeof target === 'number') {
        setProgressValue(target);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener(HUB_ABOUT_SCROLL_TO_EVENT, onScrollTo);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener(HUB_ABOUT_SCROLL_TO_EVENT, onScrollTo);
    };
  }, [location.key, location.state]);

  const firstExit = smoothRange(progress, 0.04, 0.24);
  const secondExit = smoothRange(progress, 0.5, 0.68);
  const p1Opacity = 1 - smoothRange(progress, 0.04, 0.2);
  const p21Opacity = fadeInOut(progress, 0.12, 0.26, 0.56, 0.7);
  const p22Opacity = smoothRange(progress, 0.64, 0.76);
  const navOpacity = smoothRange(progress, 0.08, 0.22);
  const scrollPromptOpacity = 1 - smoothRange(progress, 0.82, 0.92);

  useEffect(() => {
    setNavOpacity(navOpacity);
    return () => setNavOpacity(1);
  }, [navOpacity, setNavOpacity]);

  return (
    <section id="about" className="relative h-full overflow-hidden bg-white">
      <div className="absolute inset-0 overflow-hidden bg-white">
        <FigmaCanvas scale={scale}>
          <TextBlock
            nodeId="1:7"
            opacity={p1Opacity}
            x={333}
            y={481}
            translateY={mix(0, 120, firstExit)}
          >
            <h1 style={styles.heroTitle}>Hi, I&rsquo;m Lucas</h1>
            <p style={styles.heroChinese}>你好，我是陆畅</p>
          </TextBlock>

          <TextBlock
            nodeId="9:20"
            opacity={p21Opacity}
            x={310}
            y={365}
            translateY={progress < 0.56 ? mix(-120, 0, smoothRange(progress, 0.12, 0.26)) : mix(0, 120, secondExit)}
          >
            <p style={styles.commitmentIntro}>I&rsquo;m committed to</p>
            <p style={{ ...styles.commitmentWord, left: 10, top: 49 }}>UI/UX Design</p>
            <p style={{ ...styles.commitmentWord, left: 57, top: 114 }}>Visual Design</p>
            <p style={{ ...styles.commitmentWord, left: 103, top: 180 }}>Motion Design</p>
            <p style={styles.commitmentChinese}>我希望成为一个具有产品思维，集合视觉、体验、动效设计能力为一体的专业设计师</p>
          </TextBlock>

          <TextBlock
            nodeId="9:53"
            opacity={p22Opacity}
            x={335}
            y={281}
            translateY={mix(76, 0, smoothRange(progress, 0.58, 0.72))}
          >
            <div style={styles.infoChinese}>
              <p style={{ ...styles.infoLine, top: 0, fontWeight: 700 }}>教育经历</p>
              <div style={{ ...styles.infoLine, top: 49, width: 362 }}>
                <p style={styles.zeroMargin}>同济大学设计与创意学院</p>
                <p style={styles.zeroMargin}>视觉传达设计-人工智能双学位</p>
              </div>
              <p style={{ ...styles.infoLine, top: 186, fontWeight: 700 }}>语言能力</p>
              <p style={{ ...styles.infoLine, top: 227, width: 362 }}>CET-4：589；CET-6：638</p>
            </div>
          </TextBlock>

          <p style={{ ...styles.scrollPrompt, opacity: scrollPromptOpacity }}>Scroll to view</p>
        </FigmaCanvas>
        <PhotoLayer scale={scale}>
          <PhotoStack firstExit={firstExit} secondExit={secondExit} />
        </PhotoLayer>
      </div>
    </section>
  );
}

function WorksContent() {
  const scale = useFigmaScale();
  const cards = workProjects.map((project, index) => {
    const { left, top } = getWorkCardPosition(index);

    return {
      ...project,
      left,
      top,
    };
  });
  const canvasHeight = getWorksCanvasHeight(workProjects.length);
  const scaledCanvasHeight = canvasHeight * scale;

  return (
    <section id="works" className="relative bg-white" data-node-id="42:2">
      <div style={{ height: scaledCanvasHeight, position: 'relative' }}>
        <FigmaCanvas scale={scale} height={canvasHeight} verticalAlign="top">
        {cards.map((card, index) => (
          <Link key={card.id} to={card.href} className="work-card" style={{ ...styles.workCard, left: card.left, top: card.top }}>
            <ProjectThumb />
            <div className="work-card-text" style={styles.workTextStack}>
              <div style={styles.workHeadingGroup}>
                <h2 style={styles.workTitle}>
                  {index + 1} {card.title}
                </h2>
                <p style={styles.workSubtitle}>{card.meta}</p>
              </div>
              <p style={styles.workDescription}>{card.description}</p>
            </div>
          </Link>
        ))}
        </FigmaCanvas>
      </div>
    </section>
  );
}

function ContactContent() {
  const scale = useFigmaScale();

  return (
    <section id="contact" className="relative h-full overflow-hidden bg-white">
      <FigmaCanvas scale={scale}>
        <div style={styles.contactBlock}>
          <p style={styles.contactLabel}>Contact</p>
          <div style={styles.contactList}>
            <p style={styles.contactRow}>
              <span style={styles.contactKey}>Tel</span>
              <a href="tel:+8613615694585" style={styles.contactLink}>
                (+86) 136 1569 4585
              </a>
            </p>
            <p style={styles.contactRow}>
              <span style={styles.contactKey}>WeChat</span>
              <span style={styles.contactValue}>lucas20041220</span>
            </p>
            <p style={styles.contactRow}>
              <span style={styles.contactKey}>Email</span>
              <span style={styles.contactEmailGroup}>
                <a href="mailto:lulululuu2004@outlook.com" style={styles.contactLink}>
                  lulululuu2004@outlook.com
                </a>
                <span style={styles.contactDivider}>/</span>
                <a href="mailto:2352463@tongji.edu.cn" style={styles.contactLink}>
                  2352463@tongji.edu.cn
                </a>
              </span>
            </p>
          </div>
        </div>
      </FigmaCanvas>
    </section>
  );
}

function ProjectThumb() {
  return <div className="work-cover work-cover-placeholder" style={styles.workImage} aria-hidden="true" />;
}

function PhotoLayer({ scale, children }: { scale: number; children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: 1728,
        height: 1117,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: 'center center',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      {children}
    </div>
  );
}

function TextBlock({
  x,
  y,
  opacity,
  translateY,
  nodeId,
  children,
}: {
  x: number;
  y: number;
  opacity: number;
  translateY: number;
  nodeId: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-node-id={nodeId}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
      }}
    >
      {children}
    </div>
  );
}

function PhotoStack({ firstExit, secondExit }: { firstExit: number; secondExit: number }) {
  return (
    <>
      <PhotoBox
        nodeId="9:47"
        src="/images/figma-home/p3.jpg"
        left={1004}
        top={260.57}
        width={411}
        height={548}
        rotate={0}
        shadow="none"
      />
      <PhotoBox
        nodeId="9:15"
        src="/images/figma-home/p2.jpg"
        left={1013.45}
        top={260.13}
        width={411.24}
        height={548.32}
        rotate={mix(-13.8, 16, secondExit)}
        translateX={mix(0, 870, secondExit)}
        translateY={0}
        opacity={1 - smoothRange(secondExit, 0.72, 1)}
        shadow="0px 4px 16px rgba(0,0,0,0.3)"
      />
      <PhotoBox
        nodeId="9:17"
        src="/images/figma-home/p1.jpg"
        left={1000.84}
        top={268.41}
        width={411.01}
        height={548.01}
        rotate={mix(10.59, 26, firstExit)}
        translateX={mix(0, 900, firstExit)}
        translateY={0}
        opacity={1 - smoothRange(firstExit, 0.72, 1)}
        shadow="0px 4px 32px rgba(0,0,0,0.3)"
      />
    </>
  );
}

function PhotoBox({
  src,
  left,
  top,
  width,
  height,
  rotate,
  translateX = 0,
  translateY = 0,
  opacity = 1,
  shadow,
  nodeId,
}: {
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  rotate: number;
  translateX?: number;
  translateY?: number;
  opacity?: number;
  shadow: string;
  nodeId: string;
}) {
  return (
    <div
      data-node-id={nodeId}
      style={{
        position: 'absolute',
        left,
        top,
        width,
        height,
        opacity,
        borderRadius: 32,
        overflow: 'hidden',
        boxShadow: shadow,
        transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`,
        transformOrigin: '50% 50%',
        willChange: 'transform, opacity',
      }}
    >
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  );
}

const fontSpace = '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif';
const fontChinese = '"Noto Sans SC", "Source Han Sans CN", "Source Han Sans SC", "PingFang SC", sans-serif';

type WorkProject = {
  id: string;
  title: string;
  meta: string;
  description: string;
  href: string;
};

const projectById = Object.fromEntries(projects.map((project) => [project.id, project]));

const workProjects: WorkProject[] = [
  {
    id: 'chord-diary',
    title: projectById['chord-diary'].title,
    meta: 'UI/UX / 交互原型',
    description: '把日记、情绪与和弦生成串成一条可体验的音乐记录流程。',
    href: projectById['chord-diary'].href || '/works',
  },
  {
    id: 'taylor-swift-data',
    title: 'Taylor Swift with her music',
    meta: '数据可视化 / 叙事',
    description: '以专辑、音乐特征与时间线组织 Taylor Swift 的职业数据故事。',
    href: projectById['taylor-swift-data'].href || '/works',
  },
  {
    id: 'axiom-breach',
    title: projectById['axiom-breach'].title,
    meta: 'Web Game / 实验',
    description: '浏览器中的俯视弹幕射击实验，聚焦节奏、反馈与生存压力。',
    href: projectById['axiom-breach'].href || '/works',
  },
  {
    id: 'final-limb-fantasy',
    title: projectById['final-limb-fantasy'].title,
    meta: '视觉设计 / 系列插画',
    description: '围绕身体、感官与荒诞叙事展开的概念视觉系统。',
    href: projectById['final-limb-fantasy'].href || '/works',
  },
  ...pdfProjects.map((project) => ({
    id: project.id,
    title: project.title,
    meta: project.meta,
    description: project.description,
    href: project.href,
  })),
  {
    id: 'solar-special',
    title: solarSpecialMeta.worksTitle,
    meta: solarSpecialMeta.worksMeta,
    description: solarSpecialMeta.worksDescription,
    href: '/works/solar-special',
  },
  {
    id: userResearchMeta.id,
    title: userResearchMeta.title,
    meta: userResearchMeta.meta,
    description: userResearchMeta.description,
    href: userResearchMeta.href,
  },
  {
    id: stylingInspirationBookMeta.id,
    title: stylingInspirationBookMeta.worksTitle,
    meta: stylingInspirationBookMeta.worksMeta,
    description: stylingInspirationBookMeta.worksDescription,
    href: stylingInspirationBookMeta.href,
  },
];

/** Works 卡片间距：8px 基准 */
const WORK_LAYOUT = {
  coverToText: 16,
  titleToMeta: 8,
  metaToDesc: 12,
} as const;

/** Works 网格布局 */
const WORK_GRID = {
  cols: 4,
  cardWidth: 233,
  colGap: 61,
  startLeft: 300,
  startTop: 180,
  rowGap: 32,
} as const;

const WORK_CARD_HEIGHT =
  233 +
  WORK_LAYOUT.coverToText +
  32 * 2 +
  WORK_LAYOUT.titleToMeta +
  22 +
  WORK_LAYOUT.metaToDesc +
  24 * 2;

function getWorkCardPosition(index: number) {
  const { cols, cardWidth, colGap, startLeft, startTop, rowGap } = WORK_GRID;
  const row = Math.floor(index / cols);
  const col = index % cols;
  const rowStride = WORK_CARD_HEIGHT + rowGap;

  return {
    left: startLeft + col * (cardWidth + colGap),
    top: startTop + row * rowStride,
  };
}

function getWorksCanvasHeight(cardCount: number) {
  const lastIndex = Math.max(0, cardCount - 1);
  const lastPos = getWorkCardPosition(lastIndex);
  return Math.max(DESIGN_H, lastPos.top + WORK_CARD_HEIGHT + 80);
}

const styles = {
  heroTitle: {
    fontFamily: fontSpace,
    fontSize: 64,
    fontWeight: 700,
    lineHeight: '64px',
    letterSpacing: 0,
    margin: 0,
    color: '#000000',
  },
  heroChinese: {
    fontFamily: fontChinese,
    fontSize: 32,
    fontWeight: 400,
    lineHeight: '32px',
    letterSpacing: 0,
    margin: '10px 0 0',
    color: '#767676',
  },
  commitmentIntro: {
    position: 'absolute' as const,
    left: 10,
    top: 0,
    width: 211,
    fontFamily: fontSpace,
    fontSize: 24,
    fontWeight: 400,
    lineHeight: '24px',
    margin: 0,
    color: '#969696',
  },
  commitmentWord: {
    position: 'absolute' as const,
    fontFamily: fontSpace,
    fontSize: 48,
    fontWeight: 700,
    lineHeight: '48px',
    letterSpacing: 0,
    margin: 0,
    color: '#000000',
    whiteSpace: 'nowrap' as const,
  },
  commitmentChinese: {
    position: 'absolute' as const,
    left: 0,
    top: 352,
    width: 573,
    fontFamily: fontChinese,
    fontSize: 24,
    fontWeight: 400,
    lineHeight: '34px',
    letterSpacing: 0,
    margin: 0,
    color: '#767676',
  },
  infoChinese: {
    position: 'relative' as const,
    width: 410,
    height: 280,
    fontFamily: fontChinese,
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 'normal',
    letterSpacing: 0,
    color: '#000000',
  },
  infoLine: {
    position: 'absolute' as const,
    left: 0,
    margin: 0,
    fontFamily: fontChinese,
    fontSize: 24,
    lineHeight: 'normal',
    letterSpacing: 0,
    color: '#000000',
  },
  zeroMargin: {
    margin: 0,
  },
  scrollPrompt: {
    position: 'absolute' as const,
    left: 803,
    top: 965,
    width: 122,
    fontFamily: fontSpace,
    fontSize: 20,
    fontWeight: 400,
    lineHeight: '20px',
    margin: 0,
    color: '#767676',
    whiteSpace: 'nowrap' as const,
  },
  workCard: {
    position: 'absolute' as const,
    width: 233,
    fontFamily: fontChinese,
    color: '#000000',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: WORK_LAYOUT.coverToText,
  },
  workTextStack: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: WORK_LAYOUT.metaToDesc,
  },
  workHeadingGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: WORK_LAYOUT.titleToMeta,
  },
  workImage: {
    width: 233,
    height: 233,
    background: '#ffffff',
    border: '1px solid #e8e8e8',
    boxSizing: 'border-box' as const,
    overflow: 'hidden',
  },
  workTitle: {
    margin: 0,
    fontFamily: fontChinese,
    fontSize: 24,
    fontWeight: 700,
    lineHeight: '32px',
    letterSpacing: 0,
  },
  workSubtitle: {
    margin: 0,
    fontFamily: fontChinese,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '22px',
    letterSpacing: 0,
    color: '#000000',
  },
  workDescription: {
    margin: 0,
    fontFamily: fontChinese,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: 0,
    color: '#767676',
  },
  contactBlock: {
    position: 'absolute' as const,
    left: 335,
    top: 360,
    width: 720,
    fontFamily: fontChinese,
    color: '#000000',
  },
  contactLabel: {
    margin: 0,
    fontFamily: fontSpace,
    fontSize: 48,
    fontWeight: 700,
    lineHeight: '48px',
    letterSpacing: 0,
  },
  contactList: {
    marginTop: 28,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 18,
  },
  contactRow: {
    margin: 0,
    display: 'flex',
    alignItems: 'flex-start',
    gap: 20,
    fontSize: 22,
    lineHeight: '32px',
    color: '#1A1A1A',
  },
  contactKey: {
    flexShrink: 0,
    width: 72,
    fontFamily: fontSpace,
    fontSize: 18,
    fontWeight: 700,
    lineHeight: '32px',
    letterSpacing: '0.04em',
    color: '#969696',
    textTransform: 'uppercase' as const,
  },
  contactValue: {
    fontFamily: fontSpace,
    fontSize: 22,
    lineHeight: '32px',
    color: '#1A1A1A',
  },
  contactEmailGroup: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    gap: 8,
    rowGap: 4,
  },
  contactLink: {
    fontFamily: fontSpace,
    fontSize: 22,
    lineHeight: '32px',
    color: '#1A1A1A',
    textDecoration: 'none',
    transition: 'color 180ms ease',
  },
  contactDivider: {
    fontFamily: fontSpace,
    fontSize: 22,
    lineHeight: '32px',
    color: '#BBBBBB',
  },
};

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothRange(value: number, start: number, end: number) {
  const progress = clamp((value - start) / (end - start));
  return progress * progress * (3 - 2 * progress);
}

function mix(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

function fadeInOut(value: number, inStart: number, inEnd: number, outStart: number, outEnd: number) {
  if (value < inEnd) return smoothRange(value, inStart, inEnd);
  if (value > outStart) return 1 - smoothRange(value, outStart, outEnd);
  return 1;
}
