'use client';

import { useEffect, useRef } from 'react';

type Particle = { x: number; y: number; vx: number; vy: number };

/**
 * A very quiet, coded background animation for the hero — slow drifting
 * nodes with thin connecting lines when they pass near each other. No
 * video file, no external assets: pure canvas, monochrome, low-opacity.
 * Respects prefers-reduced-motion and pauses when the tab isn't visible.
 */
export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let animationId = 0;
    let running = false;
    let resizeTimeout: ReturnType<typeof setTimeout>;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((width * height) / 30000);
      particles = Array.from({ length: Math.max(16, Math.min(count, 42)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      const maxDist = 190;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < maxDist) {
            ctx!.strokeStyle = `rgba(24,24,24,${(1 - dist / maxDist) * 0.28})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      ctx!.fillStyle = 'rgba(24,24,24,0.45)';
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function loop() {
      if (!running) return;
      draw();
      animationId = requestAnimationFrame(loop);
    }

    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 150);
    }

    function handleVisibility() {
      if (prefersReducedMotion) return;
      if (document.visibilityState === 'visible') {
        if (!running) {
          running = true;
          loop();
        }
      } else {
        running = false;
        cancelAnimationFrame(animationId);
      }
    }

    resize();
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);

    if (prefersReducedMotion) {
      draw(); // one static frame, no motion for users who asked for less of it
    } else {
      running = true;
      loop();
    }

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
