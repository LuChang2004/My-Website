import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Search } from 'lucide-react';
import AboutResumePage from './AboutResumePage';
import { projects } from '../data/projects';
import { pdfProjects } from '../data/pdfProjects';
import { solarSpecialMeta } from '../data/solarSpecialContent';
import { userResearchMeta } from '../data/userResearchContent';
import { stylingInspirationBookMeta } from '../data/stylingInspirationBookContent';
import { internshipProjects } from '../data/internshipProjects';
import { FigmaCanvas, useFigmaScale, DESIGN_H } from '../hub/hubUi';
import { useIsMobile } from '../hooks/use-mobile';

export function HubAboutPage() {
  useEffect(() => {
    document.title = 'luchang.fun — 陆畅';
  }, []);

  return <AboutResumePage />;
}

export function HubWorksPage() {
  const isMobile = useIsMobile();
  const scale = useFigmaScale();
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [activeCategories, setActiveCategories] = useState<WorkCategory[]>([]);

  useEffect(() => {
    document.title = 'Works — luchang.fun';
  }, []);

  useEffect(() => {
    const targetId = decodeURIComponent(location.hash.slice(1));
    const scrollElement = scrollRef.current;
    if (!targetId || !scrollElement) return;

    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(targetId);
      if (!target) return;

      const offset = isMobile ? 220 : 248 * scale;
      const targetTop = target.getBoundingClientRect().top;
      const containerTop = scrollElement.getBoundingClientRect().top;
      scrollElement.scrollTo({
        top: scrollElement.scrollTop + targetTop - containerTop - offset,
        behavior: 'smooth',
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isMobile, location.hash, scale]);

  const visibleProjects = filterWorkProjects(workProjects, query, activeCategories);
  const toggleCategory = (category: WorkCategory) => {
    setActiveCategories((current) => (
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category]
    ));
  };

  return (
    <div ref={scrollRef} className="hub-works-scrollbar h-full overflow-y-auto">
      {!isMobile && (
        <div className="pointer-events-none sticky top-0 z-20 h-0">
          <FigmaCanvas scale={scale} height={DESIGN_H} verticalAlign="top">
            <WorksToolbar
              query={query}
              activeCategories={activeCategories}
              onQueryChange={setQuery}
              onCategoryToggle={toggleCategory}
            />
          </FigmaCanvas>
        </div>
      )}
      {isMobile ? (
        <MobileWorksContent
          projects={visibleProjects}
          query={query}
          activeCategories={activeCategories}
          onQueryChange={setQuery}
          onCategoryToggle={toggleCategory}
        />
      ) : (
        <WorksContent
          projects={visibleProjects}
          query={query}
          activeCategories={activeCategories}
          onQueryChange={setQuery}
          onCategoryToggle={toggleCategory}
        />
      )}
    </div>
  );
}

export function HubContactPage() {
  const isMobile = useIsMobile();

  useEffect(() => {
    document.title = 'Contact — luchang.fun';
  }, []);

  return isMobile ? (
    <MobileContactContent />
  ) : (
    <div className="h-full overflow-hidden">
      <ContactContent />
    </div>
  );
}

function MobileWorksContent({
  projects,
  query,
  activeCategories,
  onQueryChange,
  onCategoryToggle,
}: WorksContentProps) {
  return (
    <section className="min-h-full bg-white px-5 pb-12 pt-[108px]">
      <div className="sticky top-[88px] z-20 -mx-5 bg-white/90 px-5 py-3 backdrop-blur-md">
        <div className="mx-auto w-full max-w-[460px]">
          <WorksToolbar
            query={query}
            activeCategories={activeCategories}
            onQueryChange={onQueryChange}
            onCategoryToggle={onCategoryToggle}
            mobile
          />
        </div>
      </div>

      <div className="mx-auto mt-8 w-full max-w-[460px]">
        {internshipProjects.map((project) => (
          <a
            key={project.id}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="flex h-12 items-center border-b border-[#d9d9d9] font-['Noto_Sans_SC',sans-serif] text-[14px] font-bold leading-6 text-black no-underline"
          >
            {project.label}
          </a>
        ))}
      </div>

      <div className="mx-auto mt-8 grid w-full max-w-[460px] grid-cols-2 gap-x-4 gap-y-9">
        {projects.map((project) => (
          <MobileWorkCard key={project.id} project={project} />
        ))}
      </div>
      {projects.length === 0 && <WorksEmptyState />}
    </section>
  );
}

function MobileWorkCard({ project }: { project: WorkProject }) {
  const content = (
    <>
      {project.image ? (
        <img
          src={project.image}
          alt=""
          className="aspect-square w-full bg-white object-cover"
          style={project.imageBorder ? {
            border: `1px solid ${project.imageBorder}`,
            boxSizing: 'border-box',
          } : undefined}
        />
      ) : (
        <div
          className="aspect-square w-full border border-[#e8e8e8] bg-white"
          aria-hidden="true"
        />
      )}
      <div className="mt-3">
        <h2 className="m-0 font-['Noto_Sans_SC',sans-serif] text-[17px] font-bold leading-6">
          {project.title}
        </h2>
        <p className="m-0 mt-2 font-['Noto_Sans_SC',sans-serif] text-[12px] leading-5 text-black">
          {project.meta}
        </p>
        <p className="m-0 mt-2 truncate font-['Noto_Sans_SC',sans-serif] text-[12px] leading-5 text-[#808080]">
          {project.description}
        </p>
      </div>
    </>
  );

  return project.href ? (
    <Link
      id={`work-${project.id}`}
      to={project.href}
      className="block text-black no-underline"
    >
      {content}
    </Link>
  ) : (
    <article
      id={`work-${project.id}`}
      aria-label={`${project.title}，即将上线`}
      className="block text-black"
    >
      {content}
    </article>
  );
}

function MobileContactContent() {
  return (
    <section className="flex h-full items-center bg-white px-6 pt-16">
      <div className="w-full">
        <p className="m-0 font-['Roboto',sans-serif] text-[42px] font-bold leading-none text-black">
          Contact
        </p>
        <div className="mt-8 space-y-5">
          <p className="m-0">
            <span className="block font-['Roboto',sans-serif] text-xs font-bold uppercase tracking-[0.08em] text-[#969696]">
              Tel
            </span>
            <a href="tel:+8613615694585" className="font-['Roboto',sans-serif] text-xl leading-9 text-black no-underline">
              (+86) 136 1569 4585
            </a>
          </p>
          <p className="m-0">
            <span className="block font-['Roboto',sans-serif] text-xs font-bold uppercase tracking-[0.08em] text-[#969696]">
              WeChat
            </span>
            <span className="font-['Roboto',sans-serif] text-xl leading-9 text-black">lucas20041220</span>
          </p>
          <p className="m-0">
            <span className="block font-['Roboto',sans-serif] text-xs font-bold uppercase tracking-[0.08em] text-[#969696]">
              Email
            </span>
            <a href="mailto:lulululuu2004@outlook.com" className="block break-all font-['Roboto',sans-serif] text-xl leading-8 text-black no-underline">
              lulululuu2004@outlook.com
            </a>
            <a href="mailto:2352463@tongji.edu.cn" className="block break-all font-['Roboto',sans-serif] text-xl leading-8 text-black no-underline">
              2352463@tongji.edu.cn
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function WorksContent({ projects }: WorksContentProps) {
  const scale = useFigmaScale();
  const cards = projects.map((project, index) => {
    const { left, top } = getWorkCardPosition(index);

    return {
      ...project,
      left,
      top,
    };
  });
  const canvasHeight = getWorksCanvasHeight(projects.length);
  const scaledCanvasHeight = canvasHeight * scale;

  return (
    <section id="works" className="relative bg-white" data-node-id="1:126">
      <div style={{ height: scaledCanvasHeight, position: 'relative' }}>
        <FigmaCanvas scale={scale} height={canvasHeight} verticalAlign="top">
          <WorksExperienceIndex />
          {cards.map((card) => (
            card.href ? (
              <Link
                id={`work-${card.id}`}
                key={card.id}
                to={card.href}
                className="work-card"
                style={{ ...styles.workCard, left: card.left, top: card.top }}
              >
                <ProjectThumb src={card.image} border={card.imageBorder} />
                <div className="work-card-text" style={styles.workTextStack}>
                  <div style={styles.workHeadingGroup}>
                    <h2 style={styles.workTitle}>{card.title}</h2>
                    <p style={styles.workSubtitle}>{card.meta}</p>
                  </div>
                  <p style={styles.workDescription}>{card.description}</p>
                </div>
              </Link>
            ) : (
              <article
                id={`work-${card.id}`}
                key={card.id}
                aria-label={`${card.title}，即将上线`}
                style={{ ...styles.workCard, left: card.left, top: card.top }}
              >
                <ProjectThumb src={card.image} border={card.imageBorder} />
                <div className="work-card-text" style={styles.workTextStack}>
                  <div style={styles.workHeadingGroup}>
                    <h2 style={styles.workTitle}>{card.title}</h2>
                    <p style={styles.workSubtitle}>{card.meta}</p>
                  </div>
                  <p style={styles.workDescription}>{card.description}</p>
                </div>
              </article>
            )
          ))}
          {cards.length === 0 && (
            <div style={styles.workEmpty}>
              <WorksEmptyState />
            </div>
          )}
        </FigmaCanvas>
      </div>
    </section>
  );
}

function WorksExperienceIndex() {
  return (
    <div style={styles.workExperienceIndex}>
      {internshipProjects.map((project) => (
        <a
          key={project.id}
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="work-experience-link"
          style={styles.workExperienceRow}
        >
          {project.label}
        </a>
      ))}
    </div>
  );
}

function WorksToolbar({
  query,
  activeCategories,
  onQueryChange,
  onCategoryToggle,
  mobile = false,
}: Omit<WorksContentProps, 'projects'> & { mobile?: boolean }) {
  return (
    <div
      style={mobile ? undefined : styles.workToolbar}
      className={mobile ? 'flex flex-col gap-4' : undefined}
    >
      <div
        aria-label="作品分类"
        className={mobile ? 'flex items-center gap-4' : undefined}
        style={mobile ? undefined : styles.workFilters}
      >
        {WORK_CATEGORIES.map((category) => {
          const isActive = activeCategories.includes(category);

          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => onCategoryToggle(category)}
              className="works-filter-button"
              style={{
                ...styles.workFilter,
                ...(mobile ? {} : {
                  position: 'absolute',
                  left: [0, 78, 152][WORK_CATEGORIES.indexOf(category)],
                  top: 0,
                }),
                ...(isActive ? styles.workFilterActive : {}),
              }}
            >
              {category}
            </button>
          );
        })}
      </div>

      <label
        className={mobile ? 'relative block w-full' : undefined}
        style={mobile ? undefined : styles.workSearch}
      >
        <span className="sr-only">搜索作品</span>
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          className="works-search-input"
          style={styles.workSearchInput}
        />
        <Search
          aria-hidden="true"
          size={24}
          strokeWidth={1.8}
          style={styles.workSearchIcon}
        />
      </label>
    </div>
  );
}

function WorksEmptyState() {
  return (
    <p className="m-0 text-center font-['Noto_Sans_SC',sans-serif] text-sm leading-6 text-[#969696]">
      没有匹配的作品
    </p>
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

function ProjectThumb({ src, border }: { src?: string; border?: string }) {
  if (!src) {
    return (
      <div
        className="work-cover work-cover-placeholder"
        style={{ ...styles.workImage, border: '1px solid #e8e8e8' }}
        aria-hidden="true"
      />
    );
  }

  return (
    <img
      src={src}
      alt=""
      className="work-cover"
      style={{
        ...styles.workImage,
        ...(border ? { border: `1px solid ${border}` } : {}),
      }}
    />
  );
}

const fontSpace = '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif';
const fontChinese = '"Noto Sans SC", "Source Han Sans CN", "Source Han Sans SC", "PingFang SC", sans-serif';

const WORK_CATEGORIES = ['产品', '设计', '工程'] as const;
type WorkCategory = (typeof WORK_CATEGORIES)[number];

type WorkProject = {
  id: string;
  title: string;
  meta: string;
  description: string;
  image?: string;
  imageBorder?: string;
  href?: string;
  categories: WorkCategory[];
};

type WorksContentProps = {
  projects: WorkProject[];
  query: string;
  activeCategories: WorkCategory[];
  onQueryChange: (value: string) => void;
  onCategoryToggle: (category: WorkCategory) => void;
};

const projectById = Object.fromEntries(projects.map((project) => [project.id, project]));
const pdfById = Object.fromEntries(pdfProjects.map((project) => [project.id, project]));

const workProjects: WorkProject[] = [
  {
    id: 'final-limb-fantasy',
    title: projectById['final-limb-fantasy'].title,
    meta: '视觉设计 / 游戏设计',
    description: '围绕身体、感官与荒诞叙事展开的概念视觉系统。',
    image: '/images/works/final-limb-fantasy.png',
    href: projectById['final-limb-fantasy'].href || '/works',
    categories: ['设计'],
  },
  {
    id: 'taylor-swift-data',
    title: 'Taylor Swift',
    meta: '数据可视化 / 交互叙事',
    description: '以专辑、音乐特征与时间线组织 Taylor Swift 的职业数据故事。',
    image: '/images/works/taylor-swift.png',
    imageBorder: '#2300ae',
    href: projectById['taylor-swift-data'].href || '/works',
    categories: ['设计', '工程'],
  },
  {
    id: 'solar-special',
    title: solarSpecialMeta.worksTitle,
    meta: solarSpecialMeta.worksMeta,
    description: solarSpecialMeta.worksDescription,
    image: '/images/works/solar-special.png',
    href: '/works/solar-special',
    categories: ['设计', '工程'],
  },
  {
    id: 'axiom-breach',
    title: 'AXIOM BREACH',
    meta: 'Web Game / 实验',
    description: '浏览器中的俯视弹幕射击实验，聚焦节奏、反馈与生存压力。',
    image: '/images/works/axiom-breach.png',
    imageBorder: '#00dede',
    href: projectById['axiom-breach'].href || '/works',
    categories: ['设计', '工程'],
  },
  {
    id: 'tennis-training-visualization',
    title: projectById['tennis-training-visualization'].title,
    meta: '数据可视化 / 产品设计',
    description: projectById['tennis-training-visualization'].description,
    image: '/images/works/tennis-training.png',
    categories: ['产品', '设计'],
  },
  {
    id: 'music-robber',
    title: pdfById['music-robber'].title,
    meta: pdfById['music-robber'].meta,
    description: pdfById['music-robber'].description,
    image: '/images/works/music-robber.png',
    href: pdfById['music-robber'].href,
    categories: ['产品', '设计'],
  },
  {
    id: 'floor-tile-mosaic-line-generator',
    title: '巨富长品牌实验',
    meta: '视觉设计 / 生成艺术',
    description: '用模拟环境数据驱动黑白马赛克地砖图案的密度、偏移、方向与线条节奏。',
    image: '/images/works/giant-brand.png',
    imageBorder: '#000000',
    href: projectById['floor-tile-mosaic-line-generator'].href || '/works',
    categories: ['设计', '工程'],
  },
  {
    id: 'keiji-ai',
    title: 'Keiji AI 体验设计',
    meta: pdfById['keiji-ai'].meta,
    description: pdfById['keiji-ai'].description,
    image: '/images/works/keiji-ai.png',
    href: pdfById['keiji-ai'].href,
    categories: ['产品', '设计'],
  },
  {
    id: stylingInspirationBookMeta.id,
    title: stylingInspirationBookMeta.worksTitle,
    meta: stylingInspirationBookMeta.worksMeta,
    description: stylingInspirationBookMeta.worksDescription,
    image: '/images/works/styling-inspiration-book.png',
    href: stylingInspirationBookMeta.href,
    categories: ['设计', '工程'],
  },
  {
    id: userResearchMeta.id,
    title: userResearchMeta.title,
    meta: userResearchMeta.meta,
    description: userResearchMeta.description,
    image: '/images/works/user-research.png',
    href: userResearchMeta.href,
    categories: ['产品'],
  },
  {
    id: 'chord-diary',
    title: projectById['chord-diary'].title,
    meta: 'UI/UX / 交互原型',
    description: '把日记、情绪与和弦生成串成一条可体验的音乐记录流程。',
    href: projectById['chord-diary'].href || '/works',
    categories: ['产品', '设计', '工程'],
  },
  {
    id: 'narrative-mutation-lab',
    title: pdfById['narrative-mutation-lab'].title,
    meta: pdfById['narrative-mutation-lab'].meta,
    description: pdfById['narrative-mutation-lab'].description,
    href: pdfById['narrative-mutation-lab'].href,
    categories: ['设计'],
  },
];

function filterWorkProjects(
  allProjects: WorkProject[],
  query: string,
  activeCategories: WorkCategory[],
) {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  return allProjects.filter((project) => {
    const matchesCategory = activeCategories.length === 0
      || activeCategories.some((category) => project.categories.includes(category));
    const searchableText = `${project.title} ${project.meta} ${project.description}`.toLocaleLowerCase();
    const matchesQuery = normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });
}

/** Works 卡片间距：8px 基准 */
const WORK_LAYOUT = {
  coverToText: 12,
  titleToMeta: 8,
  metaToDesc: 8,
} as const;

/** Works 网格布局 */
const WORK_GRID = {
  cols: 3,
  cardWidth: 196,
  columnLefts: [500, 782, 1053],
  startTop: 437,
  rowStride: 348,
} as const;

const WORK_CARD_HEIGHT =
  WORK_GRID.cardWidth +
  WORK_LAYOUT.coverToText +
  24 +
  WORK_LAYOUT.titleToMeta +
  24 +
  WORK_LAYOUT.metaToDesc +
  48;

function getWorkCardPosition(index: number) {
  const { cols, columnLefts, startTop, rowStride } = WORK_GRID;
  const row = Math.floor(index / cols);
  const col = index % cols;

  return {
    left: index === 9 ? 491 : columnLefts[col],
    top: startTop + row * rowStride,
  };
}

function getWorksCanvasHeight(cardCount: number) {
  const lastIndex = Math.max(0, cardCount - 1);
  const lastPos = getWorkCardPosition(lastIndex);
  return Math.max(DESIGN_H, lastPos.top + WORK_CARD_HEIGHT + 96);
}

const styles = {
  workCard: {
    position: 'absolute' as const,
    width: WORK_GRID.cardWidth,
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
    display: 'block',
    width: WORK_GRID.cardWidth,
    height: WORK_GRID.cardWidth,
    background: '#ffffff',
    border: 0,
    boxSizing: 'border-box' as const,
    overflow: 'hidden',
    objectFit: 'cover' as const,
  },
  workTitle: {
    margin: 0,
    fontFamily: fontChinese,
    fontSize: 20,
    fontWeight: 700,
    lineHeight: '24px',
    letterSpacing: 0,
  },
  workSubtitle: {
    margin: 0,
    fontFamily: fontChinese,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '24px',
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
    color: '#808080',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  workToolbar: {
    position: 'absolute' as const,
    left: 500,
    top: 169,
    width: 749,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    pointerEvents: 'auto' as const,
  },
  workFilters: {
    position: 'relative' as const,
    width: 216,
    height: 48,
  },
  workFilter: {
    height: 48,
    padding: '0 16px',
    border: 0,
    borderRadius: 24,
    background: '#f4f4f4',
    color: '#444444',
    fontFamily: fontChinese,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '48px',
    letterSpacing: 0,
    cursor: 'pointer',
    transition: 'background-color 160ms ease, color 160ms ease, transform 160ms ease',
  },
  workFilterActive: {
    background: '#111111',
    color: '#ffffff',
  },
  workSearch: {
    position: 'relative' as const,
    display: 'block',
    width: 177,
    height: 48,
  },
  workSearchInput: {
    width: '100%',
    height: 48,
    boxSizing: 'border-box' as const,
    border: 0,
    borderRadius: 24,
    outline: 'none',
    background: '#f4f4f4',
    color: '#111111',
    padding: '0 48px 0 16px',
    fontFamily: fontChinese,
    fontSize: 16,
    lineHeight: '48px',
    letterSpacing: 0,
  },
  workSearchIcon: {
    position: 'absolute' as const,
    right: 16,
    top: '50%',
    color: '#444444',
    pointerEvents: 'none' as const,
    transform: 'translateY(-50%)',
  },
  workEmpty: {
    position: 'absolute' as const,
    left: 500,
    top: WORK_GRID.startTop,
    width: 749,
  },
  workExperienceIndex: {
    position: 'absolute' as const,
    left: 506,
    top: 249,
    width: 742,
    fontFamily: fontChinese,
  },
  workExperienceRow: {
    display: 'flex',
    height: 48,
    alignItems: 'center',
    boxSizing: 'border-box' as const,
    margin: 0,
    borderBottom: '1px solid #d9d9d9',
    color: '#000000',
    fontFamily: fontChinese,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '24px',
    letterSpacing: 0,
    textDecoration: 'none',
    cursor: 'pointer',
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
