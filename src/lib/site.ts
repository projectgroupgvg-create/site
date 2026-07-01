// Canonical site URL, used for sitemap.xml, robots.txt, canonical/hreflang
// tags, and JSON-LD structured data. Set NEXT_PUBLIC_SITE_URL once a custom
// domain is attached in Vercel; falls back to Vercel's auto-populated
// VERCEL_URL (available server-side on every Vercel deployment, no config
// needed), then to localhost for local dev.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const siteName = 'Gangan & Partners';

export const contact = {
  email: 'gangan.partners@gmail.com',
  phone: '+380500000000',
  addressLine: "Столичне шосе, 1, офіс П-4, м. Київ, 01013",
  city: 'Kyiv',
  postalCode: '01013',
  country: 'UA',
};
