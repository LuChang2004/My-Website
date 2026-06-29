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
    id: 'solar-special',
    title: 'Solar Special',
    titleEn: 'Solar Special',
    description: '太阳系主题饮品店模拟经营游戏——City Pop 视觉、行星物质调配与外星顾客叙事。',
    tags: ['游戏美术', '模拟经营', '2025 Fall'],
    href: '/works/solar-special',
  },
  {
    id: 'music-robber',
    title: 'Music Robber',
    titleEn: 'Music Robber',
    description: '以「音乐窃贼」为母题的视听叙事方案，用角色与世界观重构听歌、采样与创作之间的关系。',
    tags: ['概念设计', '音乐', '叙事'],
    href: '/works/music-robber',
  },
  {
    id: 'taylor-swift-data',
    title: 'Taylor Swift with Her Music',
    titleEn: 'Taylor Swift with Her Music',
    description: '数据可视化课程项目 — 用交互图表讲述 Taylor Swift 音乐生涯与专辑数据故事。',
    tags: ['数据可视化', '叙事', '同济'],
    href: '/taylor-swift',
  },
  {
    id: 'axiom-breach',
    title: 'Axiom Breach',
    titleEn: 'Axiom Breach',
    description: '俯视弹幕射击小游戏 — vibe coding 实验，可直接在浏览器中游玩。',
    tags: ['游戏', 'Web', '实验'],
    href: '/axiom-breach',
  },
  {
    id: 'floor-tile-mosaic-line-generator',
    title: 'Floor Tile Mosaic Line Generator',
    titleEn: 'Floor Tile Mosaic Line Generator',
    description:
      '基于表面逻辑的平面地砖生成器，用模拟环境数据驱动黑白马赛克地面图案的密度、偏移、方向与线条节奏。',
    tags: ['生成艺术', 'Web', '交互实验'],
    href: '/works/floor-tile-mosaic-line-generator',
  },
  {
    id: 'styling-inspiration-book',
    title: 'Styling Inspiration Book',
    titleEn: 'Visual Form Creation',
    description:
      '以时尚穿搭与活页纸为灵感的拼贴式穿搭手册——五大服饰板块可翻动混搭，并设有素材收纳区。',
    tags: ['视觉设计', '书籍设计', '拼贴'],
    href: '/works/styling-inspiration-book',
  },
  {
    id: 'chord-diary',
    title: '和弦日记',
    titleEn: 'Chord Diary',
    description: '听见自己的日记 — 记录选和弦，一周成曲，可分享。情绪音乐日记交互原型。',
    tags: ['交互原型', 'UI/UX', '音乐'],
    href: '/chord-diary',
  },
  {
    id: 'keiji-ai',
    title: 'Keiji AI',
    titleEn: 'Keiji AI',
    description: '围绕 AI 伙伴 Keiji 的对话界面与产品概念，探索情绪化、陪伴式的人机协作体验。',
    tags: ['AI', '交互设计', '产品'],
    href: '/works/keiji-ai',
  },
  {
    id: 'narrative-mutation-lab',
    title: 'Narrative Mutation Lab',
    titleEn: 'Narrative Mutation Lab',
    description: '叙事突变实验室——在故事结构、视觉语言与媒介形式之间试探变形、杂交与重组的设计提案。',
    tags: ['叙事', '视觉研究', '实验'],
    href: '/works/narrative-mutation-lab',
  },
  {
    id: 'user-research',
    title: '用户研究',
    titleEn: 'User Research',
    description:
      'Meme 图中折射的当代青年人生观与价值观——2025 Fall 用户调研课题展示。',
    tags: ['用户研究', '叙事', '2025 Fall'],
    href: '/works/user-research',
  },
];
