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
│   │   └── chord-diary/    # статический билд Chord Diary (Next export)
│   ├── games/axiom-breach/
├── src/
│   ├── main.tsx            # точка входа React
│   ├── App.tsx             # сборка секций, gsap ScrollTrigger
│   ├── App.css             # стили лендинга
│   ├── index.css           # глобальные / Tailwind
│   ├── components/
│   │   ├── ProjectBackButton.tsx  # круглая кнопка «назад» на подстраницах проектов
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
│   │   ├── SectionNav.tsx
│   │   ├── BloodCursor.tsx
│   ├── pages/
│   │   ├── HubPage.tsx
│   │   ├── FinalLimbFantasyPage.tsx
│   │   ├── TaylorSwiftPage.tsx
│   │   ├── AxiomBreachPage.tsx
│   │   ├── ChordDiaryPage.tsx
│   ├── data/projects.ts    # список проектов на хабе
│   ├── hooks/use-mobile.ts
│   └── lib/utils.ts
├── vite.config.ts          # port 3000, alias @ → src
├── tailwind.config.js
└── package.json
```

## Поток страницы (App.tsx)

1. **BloodCursor** — кастомный курсор «кровь», системный курсор скрыт (`cursor: none`).
2. **SectionNav** — якорная навигация по секциям.
3. **HeroSection** — видео + анимированный заголовок 最終肢體幻想.
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

## Заметки

- `base: './'` в Vite — относительные пути для деплоя.
- Не все секции из `src/sections/` подключены в `App.tsx` (например QuotesSection, GallerySection — могут быть заготовками).
