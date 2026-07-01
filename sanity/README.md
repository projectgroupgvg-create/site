# Sanity Studio — Gangan & Partners blog

This folder contains **schema definitions only** (`schemaTypes/`). A full Sanity
Studio app was not installed in this scaffold (it's a separate, fairly heavy
package and needs your own Sanity project ID), but the schema is ready to drop
into one.

## Set up Studio (one-time, ~5 minutes)

1. Create a free project at [sanity.io](https://www.sanity.io/manage) or run:
   ```bash
   npm create sanity@latest -- --project-name "gangan-partners" --dataset production --template clean --typescript
   ```
2. Copy the contents of `sanity/schemaTypes/` from this repo into your new
   Studio project's `schemaTypes/` folder, replacing the generated
   `index.ts`.
3. In the Studio project's `sanity.config.ts`, make sure the schema is wired
   up:
   ```ts
   import { schemaTypes } from './schemaTypes';
   export default defineConfig({
     // ...
     schema: { types: schemaTypes },
   });
   ```
4. Run `npx sanity dev` to open Studio locally, or `npx sanity deploy` to host
   it at `https://<project>.sanity.studio`.

## Connect the Next.js site

In `gangan-partners/.env.local` (see `.env.example`), set:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

Once these are set, `/blog` and `/blog/[slug]` automatically switch from the
placeholder posts (defined in `messages/*.json` under `Blog.fallbackPosts`) to
live content fetched from Sanity. No code changes needed.

## Content model

- **post** — title, slug, excerpt, mainImage, category (ref), author (ref),
  publishedAt, body (Portable Text), and a `language` field (`uk`/`en`/`de`/`fr`)
  so each translation of an article is its own document sharing the same slug
  pattern.
- **category** — title + slug, used for the `/blog` filter pills.
- **author** — name, role, photo (for blog post bylines).

## Seeding initial content

The four placeholder posts already on the site (FATF/AML, DeFi fraud, Art. 209
KK, phishing) are good first posts to recreate in Studio — their full text is
in `messages/uk.json` (and translated in `en.json`/`de.json`/`fr.json`) under
`Blog.fallbackPosts[].body`.
