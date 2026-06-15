# Memory Bank — Portfolio App

## Назначение

Одностраничный **портфолио-сайт иллюстраций** «最终肢体幻想 / Final Limb Fantasy» (автор: 陆畅). Тема: деконструкция тела, философия «тело как машина», палитра чёрный / белый / красный (#c8102e).

## Стек

| Слой | Технологии |
|------|------------|
| Сборка | Vite 7, TypeScript |
| UI | React 19, Tailwind CSS 3, shadcn/ui (Radix) |
| Анимация | GSAP + ScrollTrigger, Framer Motion |
| Скролл | @studio-freight/lenis (в зависимостях) |

## Структура каталогов

```
app/
├── index.html              # meta, шрифты Noto SC / Roboto
├── public/
│   ├── images/             # hero, работы work_01–11, мозг, маски, видео dance.mp4
│   ├── projects/
│   │   ├── taylor-swift/   # статический билд подпроекта
│   │   ├── chord-diary/    # статический билд Chord Diary (Next export)
│   │   ├── pdfs/           # PDF 作品 (keiji-ai, music-robber, …)
│   │   ├── solar-special/  # Solar Special 图片与视频
│   │   └── user-research/  # 用户研究 Keynote 导出 PDF 幻灯片 (01–13.pdf)
│   │   └── styling-inspiration-book/  # 视频、设计图与实物摄影
│   ├── games/axiom-breach/
├── src/
│   ├── main.tsx            # точка входа React
│   ├── App.tsx             # сборка секций, gsap ScrollTrigger
│   ├── App.css             # стили лендинга
│   ├── index.css           # глобальные / Tailwind
│   ├── components/
│   │   ├── ProjectBackButton.tsx  # круглая кнопка «назад» на подстраницах проектов
│   │   ├── SitePositionNav.tsx    # глобальная левая панель PAGE / POSITION / SCROLL
│   │   ├── ScrollingBanner.tsx
│   │   └── ui/             # shadcn (40+ компонентов)
│   ├── sections/           # основной контент страницы
│   │   ├── HeroSection.tsx
│   │   ├── HeroVisual.tsx
│   │   ├── PhilosophySection.tsx
│   │   ├── ArtworkScroll.tsx
│   │   ├── EncyclopediaSection.tsx
│   │   ├── QuotesSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── FooterSection.tsx
│   │   ├── BloodCursor.tsx
│   ├── pages/
│   │   ├── HubPage.tsx
│   │   ├── FinalLimbFantasyPage.tsx
│   │   ├── TaylorSwiftPage.tsx
│   │   ├── AxiomBreachPage.tsx
│   │   ├── ChordDiaryPage.tsx
│   │   ├── PdfProjectPage.tsx
│   │   ├── SolarSpecialPage.tsx
│   │   ├── UserResearchPage.tsx
│   ├── data/
│   │   ├── projects.ts
│   │   ├── pdfProjects.ts
│   │   ├── solarSpecialContent.ts
│   │   └── userResearchContent.ts
│   ├── hooks/use-mobile.ts
│   └── lib/utils.ts
├── vite.config.ts          # port 3000, alias @ → src
├── tailwind.config.js
└── package.json
```

## Поток страницы (App.tsx)

**SitePositionNav** — глобальная левая панель: код страницы (P01–P05), маршрут, позиция внутри страницы, scroll Y.

### Final Limb Fantasy

1. **BloodCursor** — кастомный курсор «кровь», системный курсор скрыт (`cursor: none`).
2. **HeroSection** — видео + анимированный заголовок 最終肢體幻想.
4. **PhilosophySection** — философский текст / визуал.
5. **ArtworkScroll** — галерея работ с lightbox, ScrollingBanner.
6. **EncyclopediaSection** — энциклопедический блок.
7. **FooterSection** — подвал.

## Команды

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run preview
```

## Chord Diary（соседний репозиторий）

```
Chord Diary/
├── docs/PRODUCT_AND_UX.md   # 产品定位、商业价值、竞品、人群、UX（中文）
├── lib/portfolio-design-doc.ts
├── components/shell/          # PortfolioLanding, DesignBrief, PrototypeWorkspace
└── PROJECT.md                 #  полный план / AI / MVP
```

- Портфолио: `npm run build:chord-diary` → `app/public/projects/chord-diary/`
- Страница: `/chord-diary` (`ChordDiaryPage.tsx`)

## Solar Special（/works/solar-special）

- `SolarSpecialPage.tsx` + `solarSpecialContent.ts` + `solarSpecialTypography.ts`
- 纯黑背景 + 固定星空层（等大小白点，缓慢旋转，不随滚动）
- 字体：中文思源黑体（Source Han Sans SC / Noto Sans SC），英文 Futura PT；主标题 Futura Bold，章节英文副标题 Futura Condensed Medium
- 核心概念关键词：`#525FDA` 矩形色块
- 内容层单独滚动，星空 `position: fixed`


- `HubPage.tsx` → `WorksContent`：作品卡片网格（含 user-research 等）。
- PDF 项目：`keiji-ai`、`music-robber`、`narrative-mutation-lab` → `/works/:id`，`PdfProjectPage` 纵向滚动 PDF。
- PDF 文件：`public/projects/pdfs/*.pdf`

## 用户研究（/works/user-research）

- 来源：Keynote HTML 导出（`/Users/bytedance/My Design/用户研究`），13 页幻灯片 PDF。
- 交互：由原始点击切换改为纵向滚动（`MultiPdfScrollViewer` + pdf.js 懒加载渲染）。
- 数据：`userResearchContent.ts`；资源：`public/projects/user-research/slides/01–13.pdf`
- 页面：`UserResearchPage.tsx`；左侧导航 13 个 slide 锚点（`SitePositionNav`）

## Styling Inspiration Book（/works/styling-inspiration-book）

- 来源：`Styling Inspiration Book:视觉形态创造` 文件夹
- 结构：视频 → 设计说明（docx 文本）→ 34 张图片（含 HEIC 转 JPG）
- 页面：白底 `StylingInspirationBookPage.tsx` + `stylingInspirationBookContent.ts`
- 资源：`public/projects/styling-inspiration-book/`

## Заметки

- `base: './'` в Vite — относительные пути для деплоя.
- Не все секции из `src/sections/` подключены в `App.tsx` (например QuotesSection, GallerySection — могут быть заготовками).
