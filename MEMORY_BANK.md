# Memory Bank — Portfolio App

## Назначение

Одностраничный **портфолио-сайт иллюстраций** «最终肢体幻想 / Final Limb Fantasy» (автор: 陆畅). Тема: деконструкция тела, философия «тело как машина», палитра чёрный / белый / красный (#c8102e).

## Стек

| Слой | Технологии |
|------|------------|
| Сборка | Vite 7, TypeScript |
| UI | React 19, Tailwind CSS 3, shadcn/ui (Radix) |
| Анимация | GSAP + ScrollTrigger, Framer Motion |
| Камера / лицо | face-api.js (модели в `public/models/`) |
| Скролл | @studio-freight/lenis (в зависимостях) |

## Структура каталогов

```
app/
├── index.html              # meta, шрифты Noto SC / Roboto
├── public/
│   ├── images/             # hero, работы work_01–11, мозг, маски, видео dance.mp4
│   └── models/             # face-api: tiny_face_detector, face_landmark_68
├── src/
│   ├── main.tsx            # точка входа React
│   ├── App.tsx             # сборка секций, gsap ScrollTrigger
│   ├── App.css             # стили лендинга
│   ├── index.css           # глобальные / Tailwind
│   ├── components/
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
│   │   ├── FaceCapture.tsx
│   │   ├── CameraIntro.tsx
│   │   └── FaceCapture.tsx
│   ├── pages/Home.tsx      # (если используется роутинг)
│   ├── hooks/use-mobile.ts
│   └── lib/utils.ts
├── vite.config.ts          # port 3000, alias @ → src
├── tailwind.config.js
└── package.json
```

## Поток страницы (App.tsx)

1. **FaceCapture** — по бокам экрана «осколки» глаз/рта с веб-камеры (face-api).
2. **BloodCursor** — кастомный курсор «кровь», системный курсор скрыт (`cursor: none`).
3. **SectionNav** — якорная навигация по секциям.
4. **HeroSection** — видео + анимированный заголовок 最終肢體幻想.
5. **PhilosophySection** — философский текст / визуал.
6. **ArtworkScroll** — галерея работ с lightbox, ScrollingBanner.
7. **EncyclopediaSection** — энциклопедический блок.
8. **FooterSection** — подвал.

## Команды

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run preview
```

## Заметки

- `base: './'` в Vite — относительные пути для деплоя.
- Не все секции из `src/sections/` подключены в `App.tsx` (например QuotesSection, GallerySection, CameraIntro — могут быть заготовками).
