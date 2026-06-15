export type PdfProject = {
  id: string;
  title: string;
  meta: string;
  description: string;
  file: string;
  href: string;
};

export const pdfProjects: PdfProject[] = [
  {
    id: 'keiji-ai',
    title: 'Keiji AI',
    meta: '交互设计 / AI 产品',
    description: '围绕 AI 伙伴 Keiji 的对话界面与产品概念，探索情绪化、陪伴式的人机协作体验。',
    file: 'keiji-ai.pdf',
    href: '/works/keiji-ai',
  },
  {
    id: 'music-robber',
    title: 'Music Robber',
    meta: '概念设计 / 音乐叙事',
    description: '以「音乐窃贼」为母题的视听叙事方案，用角色与世界观重构听歌、采样与创作之间的关系。',
    file: 'music-robber.pdf',
    href: '/works/music-robber',
  },
  {
    id: 'narrative-mutation-lab',
    title: 'Narrative Mutation Lab',
    meta: '叙事实验 / 视觉研究',
    description: '叙事突变实验室——在故事结构、视觉语言与媒介形式之间试探变形、杂交与重组的设计提案。',
    file: 'narrative-mutation-lab.pdf',
    href: '/works/narrative-mutation-lab',
  },
];

const pdfProjectById = Object.fromEntries(pdfProjects.map((project) => [project.id, project]));

export function getPdfProject(id: string) {
  return pdfProjectById[id];
}
