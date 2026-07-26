'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

/**
 * Animated hero banner for the wallet-screening page: a rotating double
 * helix of blockchain blocks with travelling light pulses (transactions)
 * along the strands. Ported from a standalone Three.js prototype and
 * recolored to the site's gold + espresso palette instead of the original
 * blue/teal/violet scheme, so it reads as part of the site rather than a
 * disconnected tech demo. Pure canvas/WebGL — no external image/video
 * assets. Falls back to a static gradient if WebGL is unavailable, and
 * respects prefers-reduced-motion.
 */

const CONFIG = {
  colors: {
    background: 0x120e0c,
    metal: 0x2b2119,
    glass: 0x3d2c1a,
    glowGold: 0xc9a227,
    glowChampagne: 0xe8cf8f,
    glowBronze: 0x8a5a2f,
    pulse: 0xf7ecd0,
  },
  helix: {
    blocksPerStrand: 16,
    turns: 2.6,
    radius: 1.7,
    height: 8.2,
    blockSize: 0.62,
  },
  rotation: {
    cycleSeconds: 22,
    driftSpeed: 0.05,
  },
  pulses: {
    maxConcurrent: 3,
    minDuration: 1.6,
    maxDuration: 3.2,
    size: 0.09,
  },
  particles: {
    count: 220,
    spread: 6,
  },
  cursor: {
    maxTiltDeg: 5,
    ease: 0.06,
  },
  bloom: {
    strength: 1.0,
    radius: 0.5,
    threshold: 0.15,
  },
  quality: {
    desktop: { particles: 1.0, blocks: 1.0, bloom: true },
    tablet: { particles: 0.5, blocks: 0.75, bloom: true },
    mobile: { particles: 0.25, blocks: 0.55, bloom: false },
  },
};

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

function getDeviceTier(): 'mobile' | 'tablet' | 'desktop' {
  const w = window.innerWidth;
  if (w <= 600) return 'mobile';
  if (w <= 1024) return 'tablet';
  return 'desktop';
}

type Props = {
  eyebrow: string;
  headline: string;
  subtext: string;
  cta1Label: string;
  cta1Href: string;
  cta2Label: string;
  cta2Href: string;
};

export default function BlockchainDnaBanner({
  eyebrow,
  headline,
  subtext,
  cta1Label,
  cta1Href,
  cta2Label,
  cta2Href,
}: Props) {
  const bannerRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [webglOk, setWebglOk] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const revealTimer = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(revealTimer);
  }, []);

  useEffect(() => {
    const banner = bannerRef.current;
    const wrap = wrapRef.current;
    if (!banner || !wrap) return;

    if (!hasWebGL()) {
      setWebglOk(false);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let tier = getDeviceTier();
    let quality = CONFIG.quality[tier];

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(CONFIG.colors.background);
    scene.fog = new THREE.FogExp2(CONFIG.colors.background, 0.045);

    const camera = new THREE.PerspectiveCamera(45, wrap.clientWidth / wrap.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 9.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);
    wrap.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x40342a, 0.6);
    scene.add(ambient);
    const keyLight = new THREE.PointLight(CONFIG.colors.glowGold, 6, 20);
    keyLight.position.set(4, 3, 5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(CONFIG.colors.glowBronze, 5, 20);
    rimLight.position.set(-4, -3, -4);
    scene.add(rimLight);

    const helixGroup = new THREE.Group();
    scene.add(helixGroup);

    const H = CONFIG.helix;
    const blockCount = Math.max(6, Math.round(H.blocksPerStrand * quality.blocks));

    function helixPoint(t: number, phase: number) {
      const angle = t * H.turns * Math.PI * 2 + phase;
      const y = (t - 0.5) * H.height;
      const x = H.radius * Math.cos(angle);
      const z = H.radius * Math.sin(angle);
      return new THREE.Vector3(x, y, z);
    }

    const blockGeo = new RoundedBoxGeometry(H.blockSize, H.blockSize, H.blockSize, 2, 0.08);
    const metalMat = new THREE.MeshStandardMaterial({
      color: CONFIG.colors.metal,
      metalness: 0.85,
      roughness: 0.35,
      emissive: new THREE.Color(CONFIG.colors.glowGold),
      emissiveIntensity: 0.14,
    });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: CONFIG.colors.glass,
      metalness: 0.1,
      roughness: 0.15,
      transmission: 0.65,
      thickness: 0.6,
      emissive: new THREE.Color(CONFIG.colors.glowBronze),
      emissiveIntensity: 0.22,
      transparent: true,
      opacity: 0.9,
    });

    const strandA: THREE.Vector3[] = [];
    const strandB: THREE.Vector3[] = [];

    for (let i = 0; i < blockCount; i++) {
      const t = i / (blockCount - 1);
      const pA = helixPoint(t, 0);
      const blockA = new THREE.Mesh(blockGeo, i % 3 === 0 ? glassMat : metalMat);
      blockA.position.copy(pA);
      helixGroup.add(blockA);
      strandA.push(blockA.position);

      const pB = helixPoint(t, Math.PI);
      const blockB = new THREE.Mesh(blockGeo, i % 3 === 1 ? glassMat : metalMat);
      blockB.position.copy(pB);
      helixGroup.add(blockB);
      strandB.push(blockB.position);
    }

    const rungMat = new THREE.LineBasicMaterial({
      color: CONFIG.colors.glowChampagne,
      transparent: true,
      opacity: 0.4,
    });
    const rungs: { a: THREE.Vector3; b: THREE.Vector3 }[] = [];
    for (let i = 0; i < blockCount; i += 2) {
      const geo = new THREE.BufferGeometry().setFromPoints([strandA[i], strandB[i]]);
      const line = new THREE.Line(geo, rungMat);
      helixGroup.add(line);
      rungs.push({ a: strandA[i], b: strandB[i] });
    }

    const pulseGeo = new THREE.SphereGeometry(CONFIG.pulses.size, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({ color: CONFIG.colors.pulse });

    const segments: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < blockCount - 1; i++) {
      segments.push([strandA[i], strandA[i + 1]]);
      segments.push([strandB[i], strandB[i + 1]]);
    }
    rungs.forEach((r) => segments.push([r.a, r.b]));

    function randomSegment() {
      return segments[Math.floor(Math.random() * segments.length)];
    }

    type Pulse = { mesh: THREE.Mesh; segment: [THREE.Vector3, THREE.Vector3]; start: number; duration: number };
    const pulses: Pulse[] = [];
    const maxPulses = prefersReducedMotion ? 0 : CONFIG.pulses.maxConcurrent;
    for (let i = 0; i < maxPulses; i++) {
      const mesh = new THREE.Mesh(pulseGeo, (pulseMat as THREE.MeshBasicMaterial).clone());
      helixGroup.add(mesh);
      pulses.push({
        mesh,
        segment: randomSegment(),
        start: performance.now() / 1000 + Math.random() * 2,
        duration: CONFIG.pulses.minDuration + Math.random() * (CONFIG.pulses.maxDuration - CONFIG.pulses.minDuration),
      });
    }

    const particleCount = Math.round(CONFIG.particles.count * quality.particles);
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * CONFIG.particles.spread * 3;
      positions[i * 3 + 1] = (Math.random() - 0.5) * CONFIG.particles.spread * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * CONFIG.particles.spread * 3 - 2;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: CONFIG.colors.glowGold,
      size: 0.02,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let composer: EffectComposer | null = null;
    if (quality.bloom) {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(
        new THREE.Vector2(wrap.clientWidth, wrap.clientHeight),
        CONFIG.bloom.strength,
        CONFIG.bloom.radius,
        CONFIG.bloom.threshold,
      );
      composer.addPass(bloom);
    }

    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    const maxTilt = THREE.MathUtils.degToRad(CONFIG.cursor.maxTiltDeg);

    function handleMouseMove(e: MouseEvent) {
      const rect = banner!.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltY = nx * maxTilt;
      targetTiltX = -ny * maxTilt;
    }
    function handleMouseLeave() {
      targetTiltX = 0;
      targetTiltY = 0;
    }
    if (tier === 'desktop' && !prefersReducedMotion) {
      banner.addEventListener('mousemove', handleMouseMove);
      banner.addEventListener('mouseleave', handleMouseLeave);
    }

    let isVisible = true;
    function handleVisibilityChange() {
      isVisible = document.visibilityState === 'visible';
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let io: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting && document.visibilityState === 'visible';
          });
        },
        { threshold: 0.05 },
      );
      io.observe(banner);
    }

    function onResize() {
      const w = wrap!.clientWidth;
      const h = wrap!.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (composer) composer.setSize(w, h);
      const newTier = getDeviceTier();
      if (newTier !== tier) {
        tier = newTier;
        quality = CONFIG.quality[tier];
      }
    }
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    const rotSpeed = (Math.PI * 2) / CONFIG.rotation.cycleSeconds;
    let animationId = 0;
    let running = true;

    function animate() {
      animationId = requestAnimationFrame(animate);
      if (!isVisible || !running) return;

      const dt = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        helixGroup.rotation.y += rotSpeed * dt;
        helixGroup.position.x = Math.sin(elapsed * CONFIG.rotation.driftSpeed) * 0.15;
        helixGroup.position.y = Math.cos(elapsed * CONFIG.rotation.driftSpeed * 0.8) * 0.1;
      }

      currentTiltX += (targetTiltX - currentTiltX) * CONFIG.cursor.ease;
      currentTiltY += (targetTiltY - currentTiltY) * CONFIG.cursor.ease;
      helixGroup.rotation.x = currentTiltX;
      helixGroup.rotation.z = currentTiltY * 0.3;

      const now = performance.now() / 1000;
      pulses.forEach((p) => {
        let progress = (now - p.start) / p.duration;
        if (progress >= 1) {
          p.segment = randomSegment();
          p.start = now + Math.random() * 1.5;
          p.duration = CONFIG.pulses.minDuration + Math.random() * (CONFIG.pulses.maxDuration - CONFIG.pulses.minDuration);
          progress = 0;
        }
        if (progress < 0) {
          p.mesh.visible = false;
          return;
        }
        p.mesh.visible = true;
        p.mesh.position.lerpVectors(p.segment[0], p.segment[1], progress);
        const fade = Math.sin(Math.PI * progress);
        const mat = p.mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = fade;
        mat.transparent = true;
        p.mesh.scale.setScalar(0.6 + fade * 0.6);
      });

      particles.rotation.y += 0.0006;

      if (composer) composer.render();
      else renderer.render(scene, camera);
    }
    animate();

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      banner.removeEventListener('mousemove', handleMouseMove);
      banner.removeEventListener('mouseleave', handleMouseLeave);
      if (io) io.disconnect();
      renderer.dispose();
      blockGeo.dispose();
      metalMat.dispose();
      glassMat.dispose();
      pulseGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (wrap.contains(renderer.domElement)) wrap.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section
      ref={bannerRef}
      className="relative w-full overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #1a130e 0%, #120e0c 70%)',
        height: '72vh',
        minHeight: '520px',
        maxHeight: '760px',
      }}
      aria-label="Blockchain DNA"
    >
      <p className="sr-only">
        Анімована 3D-сцена: подвійна спіраль із блоків блокчейну, що обертається та демонструє рух
        транзакцій у вигляді світлових імпульсів між блоками.
      </p>

      {webglOk ? (
        <div ref={wrapRef} className="absolute inset-0 h-full w-full [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full" />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 30% 20%, rgba(201,162,39,0.22), transparent 55%), radial-gradient(circle at 70% 80%, rgba(138,90,47,0.22), transparent 55%), #120e0c',
          }}
        />
      )}

      <div className="relative z-[5] flex h-full max-w-[720px] flex-col items-start justify-center px-6 py-[6vh] sm:px-[8vw]">
        <p
          className={`mb-3.5 text-[clamp(11px,1.1vw,14px)] font-semibold uppercase tracking-[0.25em] text-[#e8cf8f] transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-3.5 opacity-0'}`}
        >
          {eyebrow}
        </p>
        <h2
          className={`mb-4.5 text-[clamp(28px,4.6vw,52px)] font-bold leading-[1.1] text-[#f7f2e6] transition-all delay-100 duration-700 [text-shadow:0_0_30px_rgba(201,162,39,0.25)]`}
          style={{ transform: visible ? 'translateY(0)' : 'translateY(18px)', opacity: visible ? 1 : 0 }}
        >
          {headline}
        </h2>
        <p
          className="mb-7 max-w-[520px] text-[clamp(14px,1.4vw,18px)] leading-[1.55] text-[#cabfae] transition-all delay-200 duration-700"
          style={{ transform: visible ? 'translateY(0)' : 'translateY(16px)', opacity: visible ? 1 : 0 }}
        >
          {subtext}
        </p>
        <div
          className="flex flex-wrap gap-4 transition-all delay-300 duration-700"
          style={{ transform: visible ? 'translateY(0)' : 'translateY(14px)', opacity: visible ? 1 : 0 }}
        >
          <a
            href={cta1Href}
            className="inline-flex items-center rounded-full bg-[#c9a227] px-7 py-3.5 text-[13.5px] font-semibold text-[#120e0c] shadow-[0_0_24px_rgba(201,162,39,0.4)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(201,162,39,0.6)]"
          >
            {cta1Label}
          </a>
          <a
            href={cta2Href}
            className="inline-flex items-center rounded-full border border-[rgba(247,242,230,0.35)] px-7 py-3.5 text-[13.5px] font-semibold text-[#f7f2e6] transition-all hover:-translate-y-0.5 hover:border-[#f7f2e6]"
          >
            {cta2Label}
          </a>
        </div>
      </div>
    </section>
  );
}
