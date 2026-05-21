export type Project = {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  tags: string[];
  /** 可点击进入的子站路径 */
  href?: string;
  comingSoon?: boolean;
};

/** 首页项目列表 — 在此追加新项目 */
export const projects: Project[] = [
  {
    id: 'final-limb-fantasy',
    title: '最终肢体幻想',
    titleEn: 'Final Limb Fantasy',
    description: '视觉设计 / 概念设计 / 系列插画。解构肢体，重构意义。',
    tags: ['插画', '视觉传达', '2026'],
    href: '/final-limb-fantasy',
  },
  {
    id: 'axiom-breach',
    title: 'AXIOM BREACH',
    titleEn: 'Web Game',
    description: '俯视弹幕射击小游戏 — vibe coding 实验，可直接在浏览器中游玩。',
    tags: ['游戏', 'Web', '实验'],
    href: '/axiom-breach',
  },
  {
    id: 'placeholder-1',
    title: '新项目',
    titleEn: 'Coming Soon',
    description: '更多作品与实验即将发布。',
    tags: ['筹备中'],
    comingSoon: true,
  },
];
