import { externalVideoUrls, pickVideoSrc } from './externalMediaUrls';
import { resolvePublicAssetSrc } from '../utils/resolvePublicAssetSrc';

export type StylingInspirationAsset = {
  id: string;
  file: string;
  title: string;
  caption: string;
};

export const stylingInspirationBookMeta = {
  id: 'styling-inspiration-book',
  title: 'Styling Inspiration Book',
  titleCn: '视觉形态创造',
  meta: '视觉设计 / 书籍设计',
  worksTitle: 'Styling Inspiration Book',
  worksMeta: '视觉设计 / 书籍设计',
  worksDescription:
    '以时尚穿搭与活页纸为灵感的拼贴式穿搭手册——帽子、配饰、上衣、裤子、鞋子五大板块，可翻动混搭并收纳时尚素材。',
  description:
    '以时尚穿搭与活页纸为灵感的拼贴式穿搭手册——帽子、配饰、上衣、裤子、鞋子五大板块，可翻动混搭并收纳时尚素材。',
  href: '/works/styling-inspiration-book',
};

export const stylingInspirationBookBrief = {
  heading: '设计说明',
  paragraphs: [
    'Styling Inspiration Book是我受到时尚穿搭与活页纸特性的双重启发下设计而成的作品，使用 Collage（拼贴）作为一种主要的视觉语言，不仅让作品富有趣味性与活力，也与穿搭的理念不谋而合：穿搭的本质即为将不同的元素拼贴到人物身上。',
    '页面主要分为帽子（Hats）、配饰（Accessories）、上衣（Clothes）、裤子（Pants）、鞋子（Shoes）这五个板块，通过对活页纸的二次裁剪，能够用翻动的方式实现不同衣物的混搭。在手册的最后页，增设了衣物收纳区。收纳区使用原纸张剪裁黏贴而成，能够容纳日常收集的时尚拼贴元素，且收纳量惊人。如果用户希望增添穿搭元素，只需将素材黏贴在裁切好的活页纸上，再纳入活页夹即可。',
  ],
};

export const stylingInspirationBookVideos = [
  {
    id: 'display',
    title: 'Video Display',
    src: pickVideoSrc(
      externalVideoUrls.stylingInspirationBook.display,
      'projects/styling-inspiration-book/video/display.mov',
    ),
  },
];

export const stylingInspirationBookCollageImages: StylingInspirationAsset[] = [
  { id: 'collage-01', file: 'collage-material/01.jpg', title: 'Collage Material 01', caption: '鞋子' },
  { id: 'collage-02', file: 'collage-material/02.jpg', title: 'Collage Material 02', caption: '裤子' },
  { id: 'collage-03', file: 'collage-material/03.jpg', title: 'Collage Material 03', caption: '裤子' },
  { id: 'collage-04', file: 'collage-material/04.jpg', title: 'Collage Material 04', caption: '上衣' },
  { id: 'collage-05', file: 'collage-material/05.jpg', title: 'Collage Material 05', caption: '外套' },
  { id: 'collage-06', file: 'collage-material/06.jpg', title: 'Collage Material 06', caption: '帽子 · 配饰' },
  { id: 'collage-07', file: 'collage-material/07.jpg', title: 'Collage Material 07', caption: '穿搭组合' },
];

export function getStylingInspirationAssetSrc(file: string) {
  return resolvePublicAssetSrc(`projects/styling-inspiration-book/${file}`);
}
