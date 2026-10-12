import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { Play } from 'lucide-react';
import { FigmaCanvas, useFigmaScale } from '../hub/hubUi';
import { useIsMobile } from '../hooks/use-mobile';
import { internshipProjects } from '../data/internshipProjects';
import './AboutResumePage.css';

const RESUME_HEIGHT = 2580;

const resumeNavItems = [
  { id: 'resume-education', label: '教育经历' },
  { id: 'resume-experience', label: '实习经历' },
  { id: 'resume-language', label: '语言成绩' },
  { id: 'resume-skills', label: '专业技能' },
  { id: 'resume-projects', label: '项目经历' },
] as const;
type ResumeSectionId = (typeof resumeNavItems)[number]['id'];

const projectExperiences = [
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
    heading: internshipProjects[2].label,
    meta: '设计标准化 / 设计系统 / 团队协作 / 2026',
    description:
      '制定营销弹窗与开通页设计规范，定义两类开通场景结构，统一信息层级、操作位置与插图风格，并将插图生成流程沉淀为可复用 Skill',
    href: internshipProjects[2].href,
    external: true,
  },
  {
    heading: '4/「Music Robber」声域博弈实验性 APP 设计',
    description:
      '探索了非传统音乐 APP 的叙事方式与用户激励机制，产出完整的设计系统与交互规范。',
    href: '/works/music-robber',
  },
  {
    heading: '5/ Keji AI 海外医疗科研平台UX诊断',
    description:
      '系统性诊断了 Keiji AI 工具的交互痛点，输出成熟的交互设计方案以提升产品易用性，同时优化了产品视觉。',
    href: '/works/keiji-ai',
  },
  {
    heading: '6/ Solar Special 科普向游戏设计',
    description:
      '负责项目构思、推进，部分程序及全部的美术设计工作，使用 City Pop 风格产出了一系列游戏视觉资产。',
    href: '/works/solar-special',
  },
] as const;

export default function AboutResumePage() {
  const isMobile = useIsMobile();
  const scale = useFigmaScale();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<ResumeSectionId>(resumeNavItems[0].id);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const syncScrollState = () => {
      const scrollTop = scrollElement.getBoundingClientRect().top;
      const activationLine = scrollTop + Math.max(132, window.innerHeight * 0.24);
      let nextSection: ResumeSectionId = resumeNavItems[0].id;

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
  }, [isMobile, scale]);

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
        <ResumeContent mobile />
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="resume-scroll">
      <ResumeDesktopChrome
        scale={scale}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
      <div className="resume-scaled-page" style={{ height: RESUME_HEIGHT * scale }}>
        <FigmaCanvas scale={scale} height={RESUME_HEIGHT} verticalAlign="top">
          <ResumeContent />
        </FigmaCanvas>
      </div>
    </div>
  );
}

function ResumeContent({ mobile = false }: { mobile?: boolean }) {
  return (
    <main
      className={mobile ? 'resume-mobile' : 'resume-canvas'}
      data-node-id="6:2"
    >
      {mobile && <ProfileColumn />}

      <div className="resume-main">
        <ResumeSection id="resume-education" title="教育经历" tone="green">
          <div className="resume-subsection">
            <p className="resume-kicker">本科</p>
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

        <ResumeSection id="resume-experience" title="实习经历" tone="green">
          <div className="resume-job-title">
            <span>字节跳动</span>
            <span>中国电商设计 - 交易与商家体验</span>
            <span>产品设计实习生</span>
          </div>
          <ol className="resume-list">
            <li>聚焦电商流量与营销场景体验设计：参与对话成片产品从 0–1 搭建，产出成熟设计方案</li>
            <li>参与营销设计规范建设：沉淀标准化能力，提升抖店设计品质和设计效率</li>
            <li>
              参与 Aurora Skill 建设与生成式 UI 探索：依托 AI 背景与 Coding 相关能力，
              持续探索AI时代设计与产品、开发之间合作新模式的边界
            </li>
          </ol>
        </ResumeSection>

        <ResumeSection id="resume-language" title="语言成绩" tone="red">
          <div className="resume-language-row">
            <span className="resume-score"><span>CET-6</span><span>589</span></span>
            <span className="resume-score"><span>CET-4</span><span>638</span></span>
            <span>可使用英文完成工作沟通与技术文档阅读</span>
          </div>
        </ResumeSection>

        <ResumeSection id="resume-skills" title="专业技能" tone="red">
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
        </ResumeSection>

        <ResumeSection id="resume-projects" title="项目经历" tone="blue">
          <div className="resume-project-list">
            {projectExperiences.map((project) => (
              <article className="resume-project" key={project.heading}>
                <h3>
                  <span>{project.heading}</span>
                  {'meta' in project && (
                    <span className="resume-project-meta">{project.meta}</span>
                  )}
                </h3>
                <p>{project.description}</p>
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
                ) : (
                  <span className="resume-detail-link">查看详情</span>
                )}
                {'images' in project && (
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
}: {
  scale: number;
  activeSection: string;
  onNavigate: (id: string) => void;
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
        <ProfileColumn />
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
        {resumeNavItems.map((item) => (
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
      </nav>
    </div>
  );
}

function ProfileColumn() {
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
        <p>
          <strong>体验与视觉设计师</strong>
          <span>UI/UX Designer &amp; Visual Design</span>
        </p>
        <p>
          <strong>AI 产品经理</strong>
          <span>AI Product Manager</span>
        </p>
        <p>
          <strong>设计工程师</strong>
          <span>Design Engineering</span>
        </p>
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

function SkillRow({ label, text }: { label: string; text: string }) {
  return (
    <p className="resume-skill-row">
      <strong>{label}</strong>
      <span>{text}</span>
    </p>
  );
}
