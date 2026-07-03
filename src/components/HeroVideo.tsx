'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Background video for the hero. Progressive enhancement on top of
 * HeroCanvas: renders invisible until the file actually loads and starts
 * playing, then fades in. If the file is missing (not added yet) or fails
 * to load, this renders nothing and the canvas animation underneath stays
 * as the background — the page never breaks waiting on an asset.
 *
 * Expects, in /public/videos/:
 *   hero.mp4        — required, H.264, ~15-25s, muted-safe (no audio needed)
 *   hero.webm       — optional, better compression, used first if present
 *   hero-poster.jpg — optional, first-frame fallback while loading
 */
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      videoRef.current?.pause();
    }
  }, []);

  if (failed) return null;

  return (
    <>
      <video
        ref={videoRef}
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/videos/hero-poster.jpg"
        onCanPlay={() => setReady(true)}
        onError={() => setFailed(true)}
        aria-hidden="true"
      >
        <source src="/videos/hero.webm" type="video/webm" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      {/* light scrim so dark serif text stays readable over footage */}
      {ready && <div className="pointer-events-none absolute inset-0 bg-[var(--bg3)] opacity-55" />}
    </>
  );
}
