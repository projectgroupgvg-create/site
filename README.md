# Gangan & Partners — сайт адвокатського об'єднання

Next.js 14 (App Router, TypeScript, Tailwind) сайт для Gangan & Partners
(Київ). Зібраний на основі дизайн-системи існуючого лендінгу: палітра
`--bg:#e2e2e2 / --ink:#181818 / --wh:#f5f5f5`, шрифти Playfair Display +
Inter, мінімалізм з 0.5px бордерами без тіней.

## Що є

- Головна сторінка (Hero, практики, AI-консультація, прев'ю блогу, контакти)
- `/practices/[slug]` — 6 окремих сторінок практик
- `/team` — команда
- `/about` — про фірму
- `/blog` — архів статей з фільтрами за категоріями
- `/blog/[slug]` — сторінка статті (Sanity або вбудовані плейсхолдер-статті)
- Мультимовність UA (за замовчуванням, без префіксу) / EN / DE / FR через
  `next-intl` — перемикач мов у шапці
- AI-консультант: безпечний серверний `/api/ai-consult` маршрут (раніше в
  лендінгу ключ Anthropic викликався прямо з браузера — це небезпечно і не
  працювало без ключа; тепер ключ зберігається лише на сервері)
- Схема Sanity.io (`sanity/schemaTypes`) готова до підключення Studio

## Контент — це плейсхолдери

Весь текст (описи практик, біографії юристів, статті блогу, текст "про
фірму") — реалістичні **плейсхолдери**, а не фінальний контент клієнта.
Замінюйте через `messages/uk.json` (і відповідні `en.json`/`de.json`/`fr.json`)
або, для блогу, через Sanity Studio.

## Запуск локально

```bash
npm install
cp .env.example .env.local   # заповніть ключі, які є
npm run dev
```

Сайт буде на http://localhost:3000 (українська — без префіксу,
`/en`, `/de`, `/fr` — інші мови).

## Підключення сервісів

### Anthropic (AI-консультант)
Додайте `ANTHROPIC_API_KEY` у `.env.local` (і в Vercel → Project Settings →
Environment Variables). Без ключа віджет показує заглушку замість відповіді.

### Sanity.io (блог)
Дивіться `sanity/README.md` — там покроково: створення проєкту, перенесення
схеми, підключення `NEXT_PUBLIC_SANITY_PROJECT_ID`. Без налаштування блог
показує вбудовані статті з `messages/*.json`.

### Форма контактів
Форма на головній (`#contacts`) надсилає POST на `NEXT_PUBLIC_FORM_ENDPOINT`.
Найпростіше — безкоштовний ендпоінт на [Formspree](https://formspree.io):
створіть форму під своїм акаунтом і вставте її URL у змінну середовища.

## Деплой на Vercel + GitHub

1. Створіть репозиторій на GitHub і запуште цей проєкт:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-org>/gangan-partners.git
   git push -u origin main
   ```
2. На [vercel.com](https://vercel.com) → Add New Project → імпортуйте
   репозиторій. Vercel автоматично визначить Next.js.
3. У Project Settings → Environment Variables додайте всі змінні з
   `.env.example`, які плануєте використовувати.
4. Deploy. Кожен push у `main` далі деплоїться автоматично.

## Структура

```
src/
  app/
    [locale]/        # усі сторінки, що локалізуються
      page.tsx        # головна
      practices/[slug]/
      team/
      about/
      blog/
      blog/[slug]/
    api/ai-consult/   # серверний маршрут для AI-чату (не локалізується)
  components/         # Nav, Footer, Hero, PracticesGrid, AIConsultation, ...
  data/               # практики-слаги
  i18n/               # routing/middleware/navigation для next-intl
  lib/
    sanity/           # клієнт, GROQ-запити, image builder
    blog.ts           # Sanity-фетч з фолбеком на плейсхолдер-статті
messages/             # uk.json, en.json, de.json, fr.json — увесь текст сайту
sanity/schemaTypes/   # схема контенту для Sanity Studio (post/author/category)
```
