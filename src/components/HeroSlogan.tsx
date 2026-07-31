'use client';

import { useEffect, useState } from 'react';

/**
 * The slogan fades in once on load, then fades back out as the page is
 * scrolled past the hero — a quiet entrance/exit rather than a static
 * block of text. No canvas, no video: just an opacity transition driven
 * by mount state and scroll position.
 */
export default function HeroSlogan({
  pre,
  em,
  post,
}: {
  pre: string;
  em: string;
  post: string;
}) {
  const [visible, setVisible] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const revealTimer = setTimeout(() => setVisible(true), 80);

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const fadeDistance = 1100;
        setScrollOpacity(Math.max(0, 1 - window.scrollY / fadeDistance));
        ticking = false;
      });
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(revealTimer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <h1
      className="mx-auto mb-14 max-w-[720px] font-serif text-[clamp(24px,3.8vw,50px)] font-bold leading-[1.14] tracking-[-0.01em] text-[var(--ink)] transition-opacity duration-[3000ms] ease-in-out"
      style={{ opacity: visible ? scrollOpacity : 0 }}
    >
      {pre} <em className="italic font-normal text-[color:var(--s3)]">{em}</em> {post}
    </h1>
  );
}
