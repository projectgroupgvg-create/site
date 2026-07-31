import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async headers() {
    // Mirrors src/lib/site.ts's siteUrl fallback chain — next.config.mjs
    // can't import TS app code, so the same env-var logic is repeated here.
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    return [
      {
        // The PDF substantially duplicates the HTML report at
        // /reports/digital-assets-cross-border-2026/ — point search engines
        // at the HTML version as canonical per the SEO brief (section 8.1).
        source: '/reports/digital-assets-cross-border-2026.pdf',
        headers: [
          {
            key: 'Link',
            value: `<${siteUrl}/reports/digital-assets-cross-border-2026/>; rel="canonical"`,
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
