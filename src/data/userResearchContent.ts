export type UserResearchSlidePresentation = 'cover' | 'gallery' | 'standard';

export type UserResearchSlide = {
  id: string;
  file: string;
  title: string;
  presentation: UserResearchSlidePresentation;
  galleryGrid?: {
    cols: number;
    rows: number;
  };
};

export const userResearchMeta = {
  id: 'user-research',
  title: '用户研究',
  titleEn: 'User Research',
  meta: '用户调研 / 2025 Fall',
  description:
    'Meme 图中折射的当代青年人生观与价值观——陆畅、廖子欣、陈韵欣的用户调研课题展示。',
  href: '/works/user-research',
  authors: '陆畅、廖子欣、陈韵欣',
  term: '2025 Fall 用户调研',
};

export const userResearchSlides: UserResearchSlide[] = [
  { id: 'slide-01', file: '01.pdf', title: '为什么我们疯了？', presentation: 'cover' },
  {
    id: 'slide-02',
    file: '02.pdf',
    title: 'Meme大赏',
    presentation: 'gallery',
    galleryGrid: { cols: 8, rows: 5 },
  },
  {
    id: 'slide-03',
    file: '03.pdf',
    title: '调侃老板',
    presentation: 'gallery',
    galleryGrid: { cols: 6, rows: 4 },
  },
  {
    id: 'slide-04',
    file: '04.pdf',
    title: '犯贱',
    presentation: 'gallery',
    galleryGrid: { cols: 6, rows: 4 },
  },
  {
    id: 'slide-05',
    file: '05.pdf',
    title: '带有一些与“性”有关的词语，但是没有性的目的（存疑）',
    presentation: 'gallery',
    galleryGrid: { cols: 7, rows: 4 },
  },
  {
    id: 'slide-06',
    file: '06.pdf',
    title: '带有淡淡或浓浓的疯感，展现出非凡的精神状态。具体表现在犯贱、猎奇、嘲讽等方面。',
    presentation: 'gallery',
    galleryGrid: { cols: 7, rows: 5 },
  },
  {
    id: 'slide-07',
    file: '07.pdf',
    title: '卖萌犯贱类',
    presentation: 'gallery',
    galleryGrid: { cols: 8, rows: 5 },
  },
  {
    id: 'slide-08',
    file: '08.pdf',
    title: '向死而死类',
    presentation: 'gallery',
    galleryGrid: { cols: 8, rows: 5 },
  },
  {
    id: 'slide-09',
    file: '09.pdf',
    title: 'XXX这一块',
    presentation: 'gallery',
    galleryGrid: { cols: 8, rows: 5 },
  },
  {
    id: 'slide-10',
    file: '10.pdf',
    title: '发“疯”的人，其实比大多数人都更加清醒，更加理智。',
    presentation: 'standard',
  },
  {
    id: 'slide-11',
    file: '11.pdf',
    title: '对“成功叙事”的反叛',
    presentation: 'standard',
  },
  {
    id: 'slide-12',
    file: '12.pdf',
    title: '延展',
    presentation: 'gallery',
    galleryGrid: { cols: 6, rows: 4 },
  },
  {
    id: 'slide-13',
    file: '13.pdf',
    title: '品牌战略与营销：理解青年的消费取向',
    presentation: 'standard',
  },
];

export function getUserResearchSlideSrc(file: string) {
  return `${import.meta.env.BASE_URL}projects/user-research/slides/${file}`;
}
