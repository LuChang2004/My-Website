import { externalVideoUrls, pickVideoSrc } from './externalMediaUrls';

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
  | { kind: 'centerImage'; src: string; alt: string; imageId?: string; size?: 'quarter' | 'sixteenth'; caption?: string }
  | {
      kind: 'horizontalScrollImage';
      src: string;
      alt: string;
      matchHeightTo: string;
      caption?: string;
      heightScale?: number;
    }
  | {
      kind: 'centerImageRow';
      columns: 2 | 3;
      items: { src: string; alt: string; caption?: string }[];
    }
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
        kind: 'centerImage',
        src: 'projects/solar-special/core-concept.png',
        alt: '核心概念 Core Concept',
      },
    ],
  },
  {
    id: 'game-background',
    titleCn: '游戏背景',
    titleEn: 'Game Background',
    blocks: [
      {
        kind: 'centerImage',
        src: 'projects/solar-special/game-background.png',
        alt: '游戏背景 Game Background',
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
      {
        kind: 'centerImage',
        src: 'projects/solar-special/core-gameplay-detail.png',
        alt: '核心玩法详情 Core Gameplay Detail',
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
            kind: 'centerImage',
            src: 'projects/solar-special/scene-design/03-game-start.png',
            alt: 'Opening 开场',
            imageId: 'scene-hero',
            caption: 'Opening 开场',
          },
          {
            kind: 'horizontalScrollImage',
            src: 'projects/solar-special/facility-design/01-making-scene-whole.png',
            alt: 'Making scene 制作场景',
            matchHeightTo: 'scene-hero',
            caption: 'Making scene 制作场景',
            heightScale: 0.36,
          },
          {
            kind: 'centerImageRow',
            columns: 2,
            items: [
              {
                src: 'projects/solar-special/scene-design/01-exploring-scene.png',
                alt: 'Planet exploration 星球探索',
                caption: 'Planet exploration 星球探索',
              },
              {
                src: 'projects/solar-special/scene-design/02-shopping-scene.png',
                alt: 'Substance exploration 物质勘探',
                caption: 'Substance exploration 物质勘探',
              },
            ],
          },
          { kind: 'pillSubheading', cn: '星球与物质设计' },
          {
            kind: 'paragraphs',
            items: [
              '以太阳系各行星为灵感，为固体、液体、气体三类物质设计差异化视觉形象，并以卡片形式呈现其来源与基本属性。',
            ],
          },
          {
            kind: 'centerImage',
            src: 'projects/solar-special/planet-substance-design.png',
            alt: '星球与物质设计 Planet and Substance Design',
          },
          { kind: 'pillSubheading', cn: '经营设施设计' },
          {
            kind: 'centerImageRow',
            columns: 3,
            items: [
              {
                src: 'projects/solar-special/facility-design/02-present-03.png',
                alt: '经营设施 Facility Design 03',
              },
              {
                src: 'projects/solar-special/facility-design/03-present-04.png',
                alt: '经营设施 Facility Design 04',
              },
              {
                src: 'projects/solar-special/facility-design/04-present-05.png',
                alt: '经营设施 Facility Design 05',
              },
            ],
          },
          {
            kind: 'centerImage',
            src: 'projects/solar-special/facility-design/05-present-06.png',
            alt: '经营设施 Facility Design 06',
            size: 'sixteenth',
          },
          {
            kind: 'centerImage',
            src: 'projects/solar-special/facility-design/06-present-07.png',
            alt: '经营设施 Facility Design 07',
            size: 'sixteenth',
          },
        ],
      },
      {
        kind: 'subsection',
        cn: 'UI设计',
        blocks: [],
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
                  {
                    title: 'Start',
                    src: pickVideoSrc(
                      externalVideoUrls.solarSpecial.start,
                      'projects/solar-special/videos/start-deluxe.mp4',
                    ),
                  },
                  {
                    title: 'Day Off',
                    src: pickVideoSrc(
                      externalVideoUrls.solarSpecial.dayOff,
                      'projects/solar-special/videos/day-off-deluxe.mp4',
                    ),
                  },
                ],
              },
              {
                columns: 1,
                width: 'half',
                items: [
                  {
                    title: 'Envelop',
                    src: pickVideoSrc(
                      externalVideoUrls.solarSpecial.envelop,
                      'projects/solar-special/videos/envelop-deluxe.mp4',
                    ),
                  },
                ],
              },
              {
                columns: 3,
                items: [
                  {
                    title: 'Solid Station',
                    description: '固体研磨与加入杯中的操作反馈',
                    src: pickVideoSrc(
                      externalVideoUrls.solarSpecial.solidStation,
                      'projects/solar-special/videos/solid-station-deluxe.mp4',
                    ),
                  },
                  {
                    title: 'Liquid Station',
                    description: '液体充能与加注的时机动效',
                    src: pickVideoSrc(
                      externalVideoUrls.solarSpecial.liquidArea,
                      'projects/solar-special/videos/liquid-area-deluxe.mp4',
                    ),
                  },
                  {
                    title: 'Gas Station',
                    description: '气瓶夸张的胀瓶与排气效果',
                    src: pickVideoSrc(
                      externalVideoUrls.solarSpecial.gasStation,
                      'projects/solar-special/videos/gas-station-deluxe.mp4',
                    ),
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
