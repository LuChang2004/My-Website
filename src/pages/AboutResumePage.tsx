import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { Play } from 'lucide-react';
import { FigmaCanvas, useFigmaScale } from '../hub/hubUi';
import { useIsMobile } from '../hooks/use-mobile';
import { internshipProjects } from '../data/internshipProjects';
import './AboutResumePage.css';

const DESIGNER_RESUME_HEIGHT = 2350;
const PRODUCT_RESUME_HEIGHT = 2300;
type ResumeVersion = 'designer' | 'product';

const designerResumeNavItems = [
  { id: 'resume-education', label: '教育经历' },
  { id: 'resume-experience', label: '实习经历' },
  { id: 'resume-language', label: '语言成绩' },
  { id: 'resume-skills', label: '专业技能' },
  { id: 'resume-projects', label: '项目经历' },
] as const;

const productResumeNavItems = [
  { id: 'resume-education', label: '教育经历' },
  { id: 'resume-language', label: '语言成绩' },
  { id: 'resume-experience', label: '实习经历' },
  { id: 'resume-skills', label: '专业技能' },
  { id: 'resume-projects', label: '项目经历' },
] as const;

type ResumeNavItem = {
  id: string;
  label: string;
};

const designerProjectExperiences = [
  {
    heading: internshipProjects[0].label,
    meta: '产品设计 / 核心设计者 / 团队协作 / 2026',
    description:
      '负责对话成片 MVP 的 0→1 体验设计，通过竞品走查和商家实地访谈，提出界面框架、创作链路、编辑交互和 AI 过程反馈四类设计策略，并推动方案落地',
    href: internshipProjects[0].href,
    external: true,
    images: [
      '/images/resume/dialogue-01.png',
      '/images/resume/dialogue-02.png',
      '/images/resume/dialogue-03.png',
    ],
  },
  {
    heading: internshipProjects[1].label,
    meta: '设计工程 / Skill 结构设计 / 团队协作 / 2026',
    description:
      '深度参与极光Skill建设，围绕Skill质量提升开展一系列工作，最终产出深刻影响B端工作流的设计Skill',
    href: internshipProjects[1].href,
    external: true,
    images: [
      '/images/resume/skill-01.png',
      '/images/resume/skill-02.png',
      '/images/resume/skill-03.png',
    ],
  },
  {
    heading: '3/「Music Robber」声域博弈实验性 APP 设计',
    description:
      '探索了非传统音乐 APP 的叙事方式与用户激励机制，产出完整的设计系统与交互规范。',
    href: '/works/music-robber',
  },
  {
    heading: '4/ Keji AI 海外医疗科研平台UX诊断',
    description:
      '系统性诊断了 Keiji AI 工具的交互痛点，输出成熟的交互设计方案以提升产品易用性，同时优化了产品视觉。',
    href: '/works/keiji-ai',
  },
] as const;

const productProjectExperiences = [
  {
    heading: '2/ 抖店对话成片产品 MVP',
    meta: '团队项目 / 用户研究与体验方案 / 开发中',
    description:
      '面向抖店商家的 AI 短视频创作产品，参与用户研究、MVP 创作流程与交互方案设计，项目目前处于开发阶段。',
    highlights: [
      '项目需求：通过竞品研究与商家实地访谈，识别需求难表达、生成等待缺少反馈、结果难修改的问题，明确 MVP 的体验优化重点。',
      '产品方案：定义“需求澄清—脚本确认—视频生成—剪辑发布”主流程，将脚本设为生成前的关键决策点，降低一次性生成的不确定性。',
      '交互策略：以 GUI 承载高频、确定性操作，以对话处理复杂语义与批量修改，并补充生成进度、分镜数量和剩余时间反馈，提升用户可控感。',
    ],
    href: internshipProjects[0].href,
    external: true,
    images: [
      '/images/resume/dialogue-01.png',
      '/images/resume/dialogue-02.png',
      '/images/resume/dialogue-03.png',
    ],
  },
  {
    heading: '1/ 极光工作台与 Aurora Skill 建设',
    meta: '团队项目 / 已进入生产环境，试点推广中',
    description:
      '面向设计师的 AI 提效工作台，连接代码仓与 Aurora Skill，支持工程级页面生成与交付，已进入生产环境并试点推广。',
    highlights: [
      '项目需求：支持设计师从页面设计走向工程级交付，使 AI 生成页面符合真实代码仓、组件规范与多平台差异，减少反复调优。',
      '产品方案：参与极光工作台搭建，接入代码仓与 Aurora Skill；参与 Skill 结构设计，将任务上下文、设计规范和组件调用规则纳入生成流程。',
      '规则沉淀：独立建设 Aurora Review Skill，区分单页修复与通用规则，按条收集经验，经团队审核后以 MR 合入主仓。',
      '评测迭代：按页面类型开展分类评测，定位生成链路根因，系统性修正原有 Skill 问题，去除一刀切约束，重构规则层级与知识结构。',
      '平台协同：协同橙蕉、罗盘、抖店、联盟四个 B 端平台的 Skill 集成，分离通用规则与平台差异，通过同类用例回归与跨平台对照验证修复。',
    ],
    href: internshipProjects[1].href,
    external: true,
    images: [
      '/images/resume/skill-01.png',
      '/images/resume/skill-02.png',
      '/images/resume/skill-03.png',
    ],
  },
  {
    heading: '4/「Music Robber」空间音乐发现产品设计',
    meta: '个人概念项目 / 已完成交互原型',
    description:
      '基于地理位置的音乐发现与分享产品，独立完成产品概念、用户流程及交互原型，将音乐分享融入城市探索。',
    highlights: [
      '项目需求：面向音乐发现与分享场景，探索将附近人的音乐偏好与城市地点关联，为用户提供可参与、可收集的发现体验。',
      '产品方案：独立设计基于地理位置的音乐发现机制，串联分享者、接收者与探索者的附近广播、试听反馈、地图收集和专辑补全流程。',
      '原型产出：完成用户流程、低保真与高保真原型，覆盖音乐分享、地图探索和个人音乐库，明确试听、收藏与退出路径。',
    ],
    href: '/works/music-robber',
  },
  {
    heading: '3/「Lumi」长期陪伴型 AI Agent 产品构想',
    meta: '毕业设计 / 概念与 MVP 规划阶段',
    description:
      '以 AI 猫咪为载体的长期陪伴型 Agent 毕业设计，围绕角色生活、状态联动与记忆积累开展产品构想和 MVP 规划。',
    highlights: [
      '项目需求：面向持续陪伴场景，探索如何让 AI 角色在对话之外拥有可感知的生活状态与连续记忆，为用户提供持续互动的理由。',
      '产品方案：构想拥有日常生活的 AI 猫咪，串联状态查看、事件发现、互动与记忆积累；定义地点、行为、情绪、事件状态，供场景与对话共享。',
      'MVP 范围：规划两个核心空间、5–8 种行为、状态联动对话与简单长期记忆；计划验证事件与记忆能否带来持续互动。',
    ],
  },
] as const;

export default function AboutResumePage() {
  const isMobile = useIsMobile();
  const scale = useFigmaScale();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [resumeVersion, setResumeVersion] = useState<ResumeVersion>('designer');
  const [activeSection, setActiveSection] = useState<string>(designerResumeNavItems[0].id);
  const resumeNavItems: readonly ResumeNavItem[] = resumeVersion === 'product'
    ? productResumeNavItems
    : designerResumeNavItems;
  const resumeHeight = resumeVersion === 'product'
    ? PRODUCT_RESUME_HEIGHT
    : DESIGNER_RESUME_HEIGHT;

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const syncScrollState = () => {
      const scrollTop = scrollElement.getBoundingClientRect().top;
      const activationLine = scrollTop + Math.max(132, window.innerHeight * 0.24);
      let nextSection = resumeNavItems[0].id;

      for (const item of resumeNavItems) {
        const section = scrollElement.querySelector<HTMLElement>(`#${item.id}`);
        if (section && section.getBoundingClientRect().top <= activationLine) {
          nextSection = item.id;
        }
      }

      setActiveSection(nextSection);
    };

    syncScrollState();
    scrollElement.addEventListener('scroll', syncScrollState, { passive: true });

    return () => {
      scrollElement.removeEventListener('scroll', syncScrollState);
    };
  }, [isMobile, resumeNavItems, resumeVersion, scale]);

  const changeResumeVersion = (version: ResumeVersion) => {
    const nextNavItems = version === 'product'
      ? productResumeNavItems
      : designerResumeNavItems;
    setResumeVersion(version);
    setActiveSection(nextNavItems[0].id);
  };

  const scrollToSection = (id: string) => {
    const scrollElement = scrollRef.current;
    const section = scrollElement?.querySelector<HTMLElement>(`#${id}`);
    if (!scrollElement || !section) return;

    const containerTop = scrollElement.getBoundingClientRect().top;
    const sectionTop = section.getBoundingClientRect().top;
    const navOffset = isMobile ? 104 : 136;
    scrollElement.scrollTo({
      top: scrollElement.scrollTop + sectionTop - containerTop - navOffset,
      behavior: 'smooth',
    });
  };

  if (isMobile) {
    return (
      <div ref={scrollRef} className="resume-scroll">
        <div className="resume-mobile-version-bar">
          <ResumeVersionToggle value={resumeVersion} onChange={changeResumeVersion} />
        </div>
        <ResumeContent mobile version={resumeVersion} />
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="resume-scroll">
      <ResumeDesktopChrome
        scale={scale}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        resumeVersion={resumeVersion}
        onVersionChange={changeResumeVersion}
        navItems={resumeNavItems}
      />
      <div className="resume-scaled-page" style={{ height: resumeHeight * scale }}>
        <FigmaCanvas scale={scale} height={resumeHeight} verticalAlign="top">
          <ResumeContent version={resumeVersion} />
        </FigmaCanvas>
      </div>
    </div>
  );
}

function ResumeContent({
  mobile = false,
  version,
}: {
  mobile?: boolean;
  version: ResumeVersion;
}) {
  const isProductResume = version === 'product';
  const projectExperiences = isProductResume
    ? [productProjectExperiences[1], productProjectExperiences[0], productProjectExperiences[3], productProjectExperiences[2]]
    : designerProjectExperiences;

  return (
    <main
      className={`${mobile ? 'resume-mobile' : 'resume-canvas'} resume-version-${version}`}
      data-node-id="6:2"
    >
      {mobile && <ProfileColumn version={version} />}

      <div className="resume-main">
        <ResumeSection id="resume-education" title="教育经历" tone="green">
          <div className="resume-subsection">
            <p className="resume-kicker">{isProductResume ? '本科 / 2023.09—2027.06（预计毕业）' : '本科'}</p>
            <p className="resume-education-row">
              <span>同济大学</span>
              <span>设计与创意学院</span>
              <span>视觉传达设计-人工智能双学位</span>
            </p>
          </div>
          <div className="resume-subsection">
            <p className="resume-kicker">主修课程</p>
            <p className="resume-course-row">
              <strong>设计方向</strong>
              <span>设计技术、Processing创意编程、信息可视化、AIGC相关课程、游戏设计等</span>
            </p>
            <p className="resume-course-row">
              <strong>AI 方向</strong>
              <span>
                人工智能基础、深度学习、Python语言程序设计、高级语言程序设计（C++）、
                离散数学、概率论与数理统计、高等代数
              </span>
            </p>
          </div>
        </ResumeSection>

        {isProductResume && <LanguageSection />}

        <ResumeSection id="resume-experience" title="实习经历" tone="green">
          <div className="resume-job-title">
            <span>字节跳动</span>
            <span>中国电商设计 - 交易与商家体验</span>
            <span>产品设计实习生</span>
            {isProductResume && <span>2026.06—至今</span>}
          </div>
          {isProductResume ? (
            <ol className="resume-list">
              <li><strong>对话成片产品：</strong>参与竞品研究与商家访谈，制定 MVP 创作流程、脚本确认与生成反馈方案，协同研发推进落地</li>
              <li><strong>Aurora Skill 建设与调优：</strong>参与结构设计与分类评测，优化规则层级，协同多平台集成，独立建设 Review Skill</li>
              <li><strong>极光工作台建设：</strong>参与设计师提效工作台搭建，接入代码仓与 Aurora Skill，支持工程级交付，已进入生产环境并试点推广</li>
            </ol>
          ) : (
            <ol className="resume-list">
              <li>聚焦电商流量与营销场景体验设计：参与对话成片产品从 0–1 搭建，产出成熟设计方案</li>
              <li>参与营销设计规范建设：沉淀标准化能力，提升抖店设计品质和设计效率</li>
              <li>
                参与 Aurora Skill 建设与生成式 UI 探索：依托 AI 背景与 Coding 相关能力，
                持续探索AI时代设计与产品、开发之间合作新模式的边界
              </li>
            </ol>
          )}
        </ResumeSection>

        {!isProductResume && <LanguageSection />}

        {!isProductResume && <ResumeSection
          id="resume-skills"
          title="专业技能"
          tone="red"
        >
            <>
              <SkillRow
                label="产品与体验设计"
                text="具备需求拆解、用户研究、信息架构、交互流程与高保真原型设计能力，能够结合业务目标与用户痛点输出可落地方案"
              />
              <SkillRow
                label="视觉与动效设计"
                text="具备界面视觉、设计系统、组件规范及动效表达能力，可独立完成从设计概念、视觉方案到开发交付的完整流程"
              />
              <SkillRow
                label="前端原型与设计工程"
                text="能使用 React、TypeScript、HTML/CSS 实现高保真交互原型，具备组件化思维、Git 协作及设计落地能力"
              />
            </>
        </ResumeSection>}

        {isProductResume && (
          <ResumeSection id="resume-skills" title="专业技能" tone="red">
            <SkillRow label="模型与应用基础" text="具备机器学习、深度学习与概率统计基础；理解上下文窗口、幻觉与推理局限，了解模型选型、RAG 与微调的适用边界" />
            <SkillRow label="Agent 与 Skill" text="理解任务规划、工具调用、上下文、记忆与工作流编排；具备 Skill 指令、资源、执行约束及验证机制的结构设计经验" />
            <SkillRow label="编程与技术协作" text="具备 Python、C++ 基础，能用 React、TypeScript 构建交互原型；理解 API、数据结构与 Git 协作，了解模型 API 接入流程" />
            <SkillRow label="AI 评测与迭代" text="具备分类评测、错误归因与回归验证经验；理解任务成功率、生成质量、时延、Token 成本与安全性的评估维度" />
            <SkillRow label="AI 产品定义" text="具备竞品分析、用户访谈、需求拆解与 MVP 规划能力；理解 AI 适用性判断及能力、成本、风险权衡，设计人机协作流程" />
            <SkillRow label="数据分析与实验" text="了解 SQL、Python 用户行为分析方法，以及指标体系、漏斗分析与 A/B 实验的基本方法和适用场景" />
          </ResumeSection>
        )}

        <ResumeSection id="resume-projects" title="项目经历" tone="blue">
          <div className="resume-project-list">
            {projectExperiences.map((project) => (
              <article className="resume-project" key={project.heading}>
                <div className="resume-project-copy">
                  <div className="resume-project-summary">
                    <h3>
                      <span>{project.heading}</span>
                      {'meta' in project && (
                        <span className="resume-project-meta">{project.meta}</span>
                      )}
                    </h3>
                    <p>{project.description}</p>
                  </div>
                  {'highlights' in project && (
                    <ul className="resume-project-highlights">
                      {project.highlights.map((highlight) => {
                        const separatorIndex = highlight.indexOf('：');
                        const label = separatorIndex >= 0
                          ? highlight.slice(0, separatorIndex + 1)
                          : '';
                        const detail = separatorIndex >= 0
                          ? highlight.slice(separatorIndex + 1)
                          : highlight;

                        return (
                          <li key={highlight}>
                            {label && <span>{label}</span>}
                            {detail}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {'external' in project ? (
                    <a
                      className="resume-detail-link"
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      查看详情
                    </a>
                  ) : 'href' in project ? (
                    <Link className="resume-detail-link" to={project.href}>
                      查看详情
                    </Link>
                  ) : null}
                </div>
                {!isProductResume && 'images' in project && (
                  <div className="resume-project-images">
                    {project.images.map((src) => (
                      <img key={src} src={src} alt="" />
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </ResumeSection>
      </div>

    </main>
  );
}

function ResumeDesktopChrome({
  scale,
  activeSection,
  onNavigate,
  resumeVersion,
  onVersionChange,
  navItems,
}: {
  scale: number;
  activeSection: string;
  onNavigate: (id: string) => void;
  resumeVersion: ResumeVersion;
  onVersionChange: (version: ResumeVersion) => void;
  navItems: readonly ResumeNavItem[];
}) {
  const canvasLeft = `calc(50% - ${864 * scale}px)`;

  return (
    <div className="resume-sticky-layer" aria-hidden="false">
      <div
        className="resume-desktop-profile"
        style={{
          left: `calc(${canvasLeft} + ${86 * scale}px)`,
          top: 217 * scale,
          transform: `scale(${scale})`,
        }}
      >
        <ProfileColumn version={resumeVersion} />
      </div>
      <nav
        className="resume-toc"
        aria-label="简历目录"
        style={{
          left: `calc(${canvasLeft} + ${1508 * scale}px)`,
          top: 197 * scale,
          transform: `scale(${scale})`,
        }}
      >
        <ResumeVersionToggle value={resumeVersion} onChange={onVersionChange} />
        <div className="resume-toc-divider" aria-hidden="true" />
        <div className="resume-toc-sections">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === activeSection ? 'is-active' : undefined}
              aria-current={item.id === activeSection ? 'location' : undefined}
              onClick={() => onNavigate(item.id)}
            >
              <Play className="resume-toc-marker" aria-hidden="true" />
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

function ResumeVersionToggle({
  value,
  onChange,
}: {
  value: ResumeVersion;
  onChange: (version: ResumeVersion) => void;
}) {
  return (
    <div className="resume-version-toggle" role="group" aria-label="切换简历版本">
      <button
        type="button"
        className={value === 'designer' ? 'is-active' : undefined}
        aria-pressed={value === 'designer'}
        onClick={() => onChange('designer')}
      >
        设计师版
      </button>
      <button
        type="button"
        className={value === 'product' ? 'is-active' : undefined}
        aria-pressed={value === 'product'}
        onClick={() => onChange('product')}
      >
        产品经理版
      </button>
    </div>
  );
}

function ProfileColumn({ version }: { version: ResumeVersion }) {
  const isProductResume = version === 'product';

  return (
    <aside className="resume-profile">
      <img
        className="resume-profile-photo"
        src="/images/resume/profile.jpg"
        alt="陆畅"
      />
      <div className="resume-identity">
        <p className="resume-name">
          <strong>陆畅</strong>
          <span>Lu Chang</span>
        </p>
        {isProductResume ? (
          <>
            <p>
              <strong>求职方向</strong>
              <span>AI 产品经理</span>
            </p>
            <div className="resume-contact-details">
              <p><strong>电话</strong><a href="tel:+8613615694585">(+86) 136 1569 4585</a></p>
              <p><strong>微信</strong><span>lucas20041220</span></p>
              <p>
                <strong>邮箱</strong>
                <span className="resume-contact-emails">
                  <a href="mailto:lulululuu2004@outlook.com">lulululuu2004@outlook.com</a>
                  <a href="mailto:2352463@tongji.edu.cn">2352463@tongji.edu.cn</a>
                </span>
              </p>
            </div>
          </>
        ) : (
          <>
            <p>
              <strong>体验与视觉设计师</strong>
              <span>UI/UX Designer &amp; Visual Design</span>
            </p>
            <p>
              <strong>AI 产品经理</strong>
              <span>AI Product Manager</span>
            </p>
          </>
        )}
        {!isProductResume && <p>
          <strong>设计工程师</strong>
          <span>Design Engineering</span>
        </p>}
      </div>
    </aside>
  );
}

function ResumeSection({
  id,
  title,
  tone,
  children,
}: {
  id: string;
  title: string;
  tone: 'green' | 'red' | 'blue';
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`resume-section resume-section-${tone}`}>
      <h2>
        <span aria-hidden="true" />
        {title}
      </h2>
      <div className="resume-section-content">{children}</div>
    </section>
  );
}

function LanguageSection() {
  return (
    <ResumeSection id="resume-language" title="语言成绩" tone="red">
      <div className="resume-language-row">
        <span className="resume-score"><span>CET-6</span><span>589</span></span>
        <span className="resume-score"><span>CET-4</span><span>638</span></span>
        <span>可使用英文完成工作沟通与技术文档阅读</span>
      </div>
    </ResumeSection>
  );
}

function SkillRow({ label, text }: { label: string; text: string }) {
  return (
    <p className="resume-skill-row">
      <strong>{label}</strong>
      <span>{text}</span>
    </p>
  );
}
