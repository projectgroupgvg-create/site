# Sanity Studio — Gangan & Partners blog

Studio is embedded directly in the Next.js app at **`/studio`** (see
`sanity.config.ts` at the project root and `src/app/studio/[[...tool]]/page.tsx`)
— no separate app or deploy needed. It ships with every `next build` and is
excluded from search indexing (`robots: noindex` + `robots.ts` disallow) and
from the i18n middleware.

## Using it

1. Deploy or run the site locally (`npm run dev`).
2. Open `/studio` (e.g. `http://localhost:3000/studio` or
   `https://your-site.vercel.app/studio`).
3. Log in with your Sanity account (the one that owns project
   `NEXT_PUBLIC_SANITY_PROJECT_ID`). You'll see three document types:
   **post**, **author**, **category** (defined in `sanity/schemaTypes/`).

Content edits are live immediately — the Next.js site reads published
documents straight from Sanity's API on every request/build (see
`src/lib/blog.ts`).

## Seeding example content

`scripts/seed-sanity.mjs` pushes the 4 example blog posts (already written in
UA/EN/DE/FR under `messages/*.json` → `Blog.fallbackPosts`) into Sanity as
real, editable documents — so Studio isn't empty on day one.

```bash
# 1. Create a write-scoped token:
#    manage.sanity.io → your project → API → Tokens → Add API token → Editor
# 2. Run (from the project root, with dependencies installed):
SANITY_API_WRITE_TOKEN=sk... npm run seed
```

Safe to re-run — it upserts the same fixed set of documents rather than
duplicating them. The token is only needed for this one-time seed; day-to-day
editing happens through the `/studio` UI, which uses your logged-in Sanity
session instead.

## Content model

- **post** — title, slug, excerpt, mainImage, category (ref), author (ref),
  publishedAt, body (Portable Text), and a `language` field (`uk`/`en`/`de`/`fr`)
  so each translation of an article is its own document sharing the same slug.
- **category** — title + slug, used for the `/blog` filter pills. Not
  per-locale in this schema (kept simple) — category *labels* shown on the
  site still come from `messages/*.json` → `Blog.categories`, matched by
  slug, so a Sanity post's `category` reference only needs to resolve to the
  right slug.
- **author** — name, role, photo (for blog post bylines).

## Fallback behavior

If `NEXT_PUBLIC_SANITY_PROJECT_ID` isn't set, or a Sanity query fails/returns
no results, `/blog` and `/blog/[slug]` transparently fall back to the seed
posts baked into `messages/*.json`. This is why the site works out of the box
even before Studio has any content.
