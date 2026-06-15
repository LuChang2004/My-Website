export type SolarSection = {
  id: string;
  titleCn: string;
  titleEn?: string;
  blocks: SolarBlock[];
};

export type SolarBlock =
  | { kind: 'subsection'; cn: string; en?: string; blocks: SolarBlock[] }
  | { kind: 'pillSubheading'; cn: string; en?: string }
  | { kind: 'keywordPills'; items: string[] }
  | { kind: 'keywords'; items: string[] }
  | { kind: 'paragraphs'; items: string[] }
  | { kind: 'bulletGroup'; items: string[] }
  | { kind: 'flow'; steps: string[] }
  | { kind: 'artFeatures'; items: { title: string; description: string }[] }
  | { kind: 'centerImage'; src: string; alt: string }
  | {
      kind: 'motionVideos';
      rows: {
        columns: 1 | 2 | 3;
        width?: 'half';
        items: { title: string; description?: string; src: string }[];
      }[];
    }
  | { kind: 'placeholder'; label: string };

export const solarSpecialMeta = {
  titleEn: 'Solar Special',
  titleCn: '太阳系特调',
  term: '2025 Fall',
  course: '数字游戏设计与开发',
  worksTitle: 'Solar Special',
  worksMeta: '游戏美术 / 模拟经营',
  worksDescription: '太阳系主题饮品店模拟经营游戏——City Pop 视觉、行星物质调配与外星顾客叙事。',
};

export const solarSpecialSections: SolarSection[] = [
  {
    id: 'core-concept',
    titleCn: '核心概念',
    titleEn: 'Core Concept',
    blocks: [
      {
        kind: 'subsection',
        cn: '游戏类型',
        blocks: [
          {
            kind: 'keywordPills',
            items: ['模拟经营类', '解密类', '探索', '体验', '感受'],
          },
        ],
      },
      {
        kind: 'subsection',
        cn: '游戏介绍',
        blocks: [
          { kind: 'keywordPills', items: ['2D平面游戏', '揭秘'] },
          {
            kind: 'paragraphs',
            items: [
              '本游戏是一款以太阳系为叙事背景的模拟经营类游戏。',
              '玩家通过经营一家行星主题饮品店获取资源与奖励，并在经营与探索的过程中逐步解锁隐藏剧情，揭示店铺背后不为人知的宇宙秘密。',
              '游戏将经营系统与叙事推进相结合，使玩法本身成为故事展开的重要载体。',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'game-background',
    titleCn: '游戏背景',
    titleEn: 'Game Background',
    blocks: [
      {
        kind: 'subsection',
        cn: 'Demo 游戏剧情',
        blocks: [
          {
            kind: 'paragraphs',
            items: [
              '遥远的未来，太阳系里住着各种各样的外星生物，而他们都有一个共同点——爱喝饮料。更麻烦的是，他们对口味极其执着：一旦喝不到喜欢的饮料就会情绪失控，甚至引发骚乱和暴乱。',
              '因此，太阳系里有一家看似温馨可爱的饮品店，实际上却是维系秩序的关键岗位。你每天要面对挑剔又危险的顾客，用不同星球的特产物质调出他们"必须喝到"的味道，稍有差池就可能出事。',
              '你因为犯了错被派遣到这里，从上一任店长手里接过工作。他一边教你上手，一边留下若有若无的警告：这份差事到底是惩罚，还是你真正会热爱的生活？一切从你开店的第一天开始。',
            ],
          },
        ],
      },
      {
        kind: 'subsection',
        cn: 'Demo 日程',
        blocks: [
          {
            kind: 'bulletGroup',
            items: [
              '第一天 — 接受新手引导，但被老店长整蛊获得低分。',
              '第二天 — 收到银河政府压力信函，开始勘探星球和营业。',
              '第三天 — 逐渐熟练后自由经营。',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'popular-science',
    titleCn: '科普性',
    titleEn: 'Popular Science',
    blocks: [
      {
        kind: 'paragraphs',
        items: [
          '从太阳系各行星中选取具有代表性的真实物质，以可视化卡片呈现其来源与基本信息，并基于科学依据为其赋予粘稠度、硬度、酸度、臭度、辣度等可感知属性（对应温度、压力、大气成分、地质活动等环境因素）。',
          '玩家在收集与调配的过程中，会更直观地理解不同天体的物质差异与环境特点，从而加深对太阳系行星环境的认识。',
        ],
      },
    ],
  },
  {
    id: 'core-gameplay',
    titleCn: '核心玩法',
    titleEn: 'Core Gameplay',
    blocks: [
      {
        kind: 'centerImage',
        src: 'projects/solar-special/core-gameplay.png',
        alt: '核心玩法 Core Gameplay',
      },
    ],
  },
  {
    id: 'game-aesthetic',
    titleCn: '美术设计',
    titleEn: 'Game Aesthetic',
    blocks: [
      {
        kind: 'centerImage',
        src: 'projects/solar-special/visual-style-reference.png',
        alt: '视觉风格参考 Visual Style Reference',
      },
      {
        kind: 'subsection',
        cn: '插画设计',
        blocks: [
          { kind: 'pillSubheading', cn: '场景设计' },
          {
            kind: 'paragraphs',
            items: [
              '饮品店内外景、星球环境与外星顾客等场景插画，为叙事推进提供具象化的世界观与氛围支撑。',
            ],
          },
          { kind: 'keywords', items: ['场景氛围', '外星角色', '饮品店', '行星环境'] },
          { kind: 'placeholder', label: '场景插画（图片待补充）' },
          { kind: 'pillSubheading', cn: '星球与物质设计' },
          {
            kind: 'paragraphs',
            items: [
              '以太阳系各行星为灵感，为固体、液体、气体三类物质设计差异化视觉形象，并以卡片形式呈现其来源与基本属性。',
            ],
          },
          { kind: 'keywords', items: ['Solar System', '行星物质', 'Solid', 'Liquid', 'Gas'] },
          { kind: 'placeholder', label: '行星与物质插画（图片待补充）' },
          { kind: 'pillSubheading', cn: '经营设施设计' },
          {
            kind: 'paragraphs',
            items: [
              '围绕饮品店日常经营，设计加工站点、操作设备与引导角色等设施相关视觉元素，强化玩法与场景的关联。',
            ],
          },
          {
            kind: 'artFeatures',
            items: [
              { title: 'Teacher()', description: '三重人格的新手引导员角色设计' },
              { title: 'Alien Intelligences', description: '固体加工区的外星智能体角色插画' },
              { title: 'Liquid Creatures', description: '为液体充能的小怪兽角色设计' },
            ],
          },
          { kind: 'placeholder', label: '经营设施插画（图片待补充）' },
        ],
      },
      {
        kind: 'subsection',
        cn: 'UI设计',
        blocks: [
          {
            kind: 'paragraphs',
            items: [
              '界面围绕订单接收、物质调配与信息反馈三条主线展开，确保高频操作下层级清晰、反馈即时。',
              '物质卡片、站点面板与政府来函等模块沿用统一的图形语言，与整体视觉风格保持连贯。',
            ],
          },
          {
            kind: 'artFeatures',
            items: [
              { title: 'Substance Cards', description: '行星物质信息卡，展示来源、属性与收集进度' },
              { title: 'Station Panels', description: '固体 / 液体 / 气体三站的操作界面与订单指示' },
              { title: 'Letters', description: '来自银河政府的压力信函界面' },
              { title: 'Daily News', description: '每日新闻播报的信息展示布局' },
            ],
          },
          { kind: 'placeholder', label: 'UI 界面展示（图片待补充）' },
        ],
      },
      {
        kind: 'subsection',
        cn: '动效设计',
        blocks: [
          {
            kind: 'paragraphs',
            items: [
              '动效贯穿开机、场景转场与订单交付全流程，用于衔接玩法节奏与情绪转折。',
              '各站点动效强调物质状态的物理反馈——研磨、充能、胀瓶与排气——让操作过程更具沉浸感。',
            ],
          },
          {
            kind: 'motionVideos',
            rows: [
              {
                columns: 2,
                items: [
                  { title: 'Start', src: 'projects/solar-special/videos/start-deluxe.mp4' },
                  { title: 'Day Off', src: 'projects/solar-special/videos/day-off-deluxe.mp4' },
                ],
              },
              {
                columns: 1,
                width: 'half',
                items: [{ title: 'Envelop', src: 'projects/solar-special/videos/envelop-deluxe.mp4' }],
              },
              {
                columns: 3,
                items: [
                  {
                    title: 'Solid Station',
                    description: '固体研磨与加入杯中的操作反馈',
                    src: 'projects/solar-special/videos/solid-station-deluxe.mp4',
                  },
                  {
                    title: 'Liquid Station',
                    description: '液体充能与加注的时机动效',
                    src: 'projects/solar-special/videos/liquid-area-deluxe.mp4',
                  },
                  {
                    title: 'Gas Station',
                    description: '气瓶夸张的胀瓶与排气效果',
                    src: 'projects/solar-special/videos/gas-station-deluxe.mp4',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'media',
    titleCn: '影像资料',
    titleEn: 'Media',
    blocks: [
      {
        kind: 'subsection',
        cn: '宣传影片',
        blocks: [{ kind: 'placeholder', label: '宣传影片（视频待补充）' }],
      },
      {
        kind: 'subsection',
        cn: '实机演示',
        blocks: [{ kind: 'placeholder', label: '实机演示（视频待补充）' }],
      },
    ],
  },
];
