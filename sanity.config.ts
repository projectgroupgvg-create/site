'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';

// Falls back to the known project ID/dataset if the env var isn't inlined
// into this bundle for some reason (projectId is not secret — it's public
// info required for any client to talk to the Sanity API at all).
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tc8tdzyv';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  basePath: '/studio',
  name: 'gangan-partners',
  title: 'Gangan & Partners — Studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool()],
});
