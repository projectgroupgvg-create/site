# Gangan & Partners — сайт адвокатського об'єднання

Next.js 14 (App Router, TypeScript, Tailwind) сайт для Gangan & Partners
(Київ). Зібраний на основі дизайн-системи існуючого лендінгу: палітра
`--bg:#e2e2e2 / --ink:#181818 / --wh:#f5f5f5`, шрифти Playfair Display +
Inter, мінімалізм з 0.5px бордерами без тіней.

**Живий сайт:** https://sss-gan2.vercel.app
**Репозиторій:** https://github.com/projectgroupgvg-create/site
**Sanity Studio:** `/studio` на живому сайті (project ID `tc8tdzyv`)

## Що є

- Головна сторінка (Hero, практики, AI-консультація, прев'ю блогу, контакти)
- `/practices/[slug]` — 6 окремих сторінок практик
- `/team` — команда
- `/about` — про фірму
- `/blog` — архів статей з фільтрами за категоріями
- `/blog/[slug]` — сторінка статті (Sanity або вбудовані плейсхолдер-статті)
- Мультимовність UA (за замовчуванням, без префіксу) / EN / DE / FR через
  `next-intl` — перемикач мов у шапці
- AI-консультант: безпечний серверний `/api/ai-consult` маршрут з
  rate-limiting (20 запитів/год на IP, best-effort) та лімітами на розмір
  повідомлень — захист від зловживань і зайвих витрат на Anthropic API
- **Sanity Studio вбудований у сайт** на `/studio` — реальна CMS для блогу,
  без окремого деплою. Скрипт `npm run seed` наповнює її прикладовими
  статтями (у всіх 4 мовах)
- SEO: динамічний `sitemap.xml` і `robots.txt`, canonical + hreflang-теги для
  всіх мов, OpenGraph/Twitter-картки, JSON-LD (LegalService на головній,
  Article на статтях блогу, Service + breadcrumbs на сторінках практик)

## Контент — це плейсхолдери

Весь текст (описи практик, біографії юристів, статті блогу, текст "про
фірму") — реалістичні **плейсхолдери**, а не фінальний контент клієнта.
Замінюйте через `messages/uk.json` (і відповідні `en.json`/`de.json`/`fr.json`)
або, для блогу, через Sanity Studio на `/studio`.

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

### Sanity.io (блог + Studio)
Вже підключено (project ID `tc8tdzyv`). Studio доступний на `/studio` —
увійдіть під акаунтом, що має доступ до проєкту. Деталі схеми та наповнення
контентом — у `sanity/README.md`.

### Форма контактів
Форма на головній (`#contacts`) надсилає POST на `NEXT_PUBLIC_FORM_ENDPOINT`.
Найпростіше — безкоштовний ендпоінт на [Formspree](https://formspree.io):
створіть форму під своїм акаунтом і вставте її URL у змінну середовища.

## Деплой на Vercel + GitHub

Вже налаштовано: push у `main` автоматично деплоїться на Vercel.

```bash
git add .
git commit -m "..."
git push
```

Якщо потрібно відтворити з нуля на іншому акаунті — імпортуйте репозиторій на
[vercel.com/new](https://vercel.com/new) і додайте змінні з `.env.example` у
Project Settings → Environment Variables (крім `SANITY_API_WRITE_TOKEN` —
він потрібен лише локально для `npm run seed`).

Рекомендується додати `NEXT_PUBLIC_SITE_URL` (наприклад,
`https://sss-gan2.vercel.app`, або власний домен пізніше) — використовується
для sitemap/canonical/OpenGraph-посилань.

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
    studio/[[...tool]]/  # вбудований Sanity Studio (не локалізується)
    sitemap.ts, robots.ts
  components/         # Nav, Footer, Hero, PracticesGrid, AIConsultation, JsonLd, ...
  data/               # практики-слаги, слаги плейсхолдер-статей блогу
  i18n/               # routing/middleware/navigation для next-intl
  lib/
    sanity/           # клієнт, GROQ-запити, image builder
    blog.ts           # Sanity-фетч з фолбеком на плейсхолдер-статті
    metadata.ts        # canonical/hreflang/OpenGraph helpers
    jsonld.ts           # структуровані дані (LegalService/Article/Service/Breadcrumb)
    rateLimit.ts         # best-effort rate limiter для AI-чату
    site.ts               # canonical URL, назва сайту, контакти
messages/             # uk.json, en.json, de.json, fr.json — увесь текст сайту
sanity/schemaTypes/    # схема контенту Sanity (post/author/category)
sanity.config.ts        # конфіг вбудованого Studio
scripts/seed-sanity.mjs # наповнення Sanity прикладовими статтями
```
