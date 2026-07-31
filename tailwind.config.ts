import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        bg2: 'var(--bg2)',
        bg3: 'var(--bg3)',
        bgc: 'var(--bgc)',
        ink: 'var(--ink)',
        ink2: 'var(--ink2)',
        ink3: 'var(--ink3)',
        s1: 'var(--s1)',
        s2: 'var(--s2)',
        s3: 'var(--s3)',
        wh: 'var(--wh)',
      },
      borderColor: {
        DEFAULT: 'var(--b)',
        b: 'var(--b)',
        bs: 'var(--bs)',
      },
      fontFamily: {
        // Both serif and sans resolve to the same site-wide typeface
        // (Switzer, a free Suisse Int'l alternative) — kept as two Tailwind
        // families rather than merged so existing `font-serif`/`font-sans`
        // usage across the codebase doesn't need to change, only what each
        // one points to. `display` (Michroma) is untouched — it's used
        // solely for the homepage brand wordmark, which keeps its own look.
        serif: ['var(--font-switzer)', 'sans-serif'],
        sans: ['var(--font-switzer)', 'sans-serif'],
        display: ['var(--font-michroma)', 'sans-serif'],
      },
      borderWidth: {
        hair: '0.5px',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
    },
  },
  plugins: [],
};

export default config;
