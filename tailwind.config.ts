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
        accent: 'var(--accent)',
        'accent-ink': 'var(--accent-ink)',
      },
      borderColor: {
        DEFAULT: 'var(--b)',
        b: 'var(--b)',
        bs: 'var(--bs)',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      borderWidth: {
        hair: '0.5px',
      },
    },
  },
  plugins: [],
};

export default config;
