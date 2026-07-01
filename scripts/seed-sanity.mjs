#!/usr/bin/env node
// One-time seed script: pushes the 4 example blog posts (already written in
// UA/EN/DE/FR in messages/*.json) into Sanity as real documents, so Studio
// isn't empty and you have working examples to edit/duplicate.
//
// Usage:
//   1. In Sanity → manage.sanity.io → your project → API → Tokens,
//      create a token with "Editor" permissions.
//   2. Run:
//        SANITY_API_WRITE_TOKEN=sk... node scripts/seed-sanity.mjs
//      (reads NEXT_PUBLIC_SANITY_PROJECT_ID / DATASET from .env.local if
//      present, otherwise from the environment.)
//
// Safe to re-run: documents use deterministic IDs, so re-running updates
// the same set of documents instead of duplicating them.

import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function loadEnvLocal() {
  const envPath = path.join(root, '.env.local');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}
loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID (set it in .env.local or the environment).');
  process.exit(1);
}
if (!token) {
  console.error('Missing SANITY_API_WRITE_TOKEN. Create an Editor token at manage.sanity.io and pass it as an env var.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

const locales = ['uk', 'en', 'de', 'fr'];

function readMessages(locale) {
  return JSON.parse(readFileSync(path.join(root, 'messages', `${locale}.json`), 'utf8'));
}

function toPortableText(paragraphs) {
  return paragraphs.map((text) => ({
    _type: 'block',
    _key: cryptoRandomKey(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: cryptoRandomKey(), text, marks: [] }],
  }));
}

function cryptoRandomKey() {
  return Math.random().toString(36).slice(2, 10);
}

async function run() {
  const uk = readMessages('uk');
  const categories = uk.Blog.categories; // [{slug, label}] — titles seeded from UA, translate later in Studio if desired
  const authorName = uk.Team.members[0]?.name ?? 'Gangan & Partners';

  console.log(`Seeding into project ${projectId}/${dataset}...`);

  const tx = client.transaction();

  // Author
  const authorId = 'author.default';
  tx.createOrReplace({
    _id: authorId,
    _type: 'author',
    name: authorName,
    slug: { _type: 'slug', current: 'default-author' },
    role: uk.Team.members[0]?.role ?? '',
  });

  // Categories (single set, not per-locale — see schemaTypes/category.ts)
  const categoryIds = {};
  for (const cat of categories) {
    const id = `category.${cat.slug}`;
    categoryIds[cat.slug] = id;
    tx.createOrReplace({
      _id: id,
      _type: 'category',
      title: cat.label,
      slug: { _type: 'slug', current: cat.slug },
    });
  }

  // Posts, per locale
  for (const locale of locales) {
    const messages = locale === 'uk' ? uk : readMessages(locale);
    const posts = messages.Blog.fallbackPosts;
    for (const post of posts) {
      const id = `post.${post.slug}.${locale}`;
      tx.createOrReplace({
        _id: id,
        _type: 'post',
        language: locale,
        title: post.title,
        slug: { _type: 'slug', current: post.slug },
        excerpt: post.excerpt,
        category: { _type: 'reference', _ref: categoryIds[post.category] },
        author: { _type: 'reference', _ref: authorId },
        publishedAt: new Date().toISOString(),
        body: toPortableText(post.body),
      });
    }
  }

  await tx.commit();
  console.log(`Done — seeded 1 author, ${categories.length} categories, ${locales.length * uk.Blog.fallbackPosts.length} posts.`);
  console.log('Open /studio on your site to view and edit them.');
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
