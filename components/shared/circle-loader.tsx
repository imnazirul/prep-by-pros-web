'use client';

import React, { useEffect, useMemo, useRef } from 'react';

type Circle3DLoaderProps = {
  count?: number;
  size?: number; // px
  color?: string;
  radius?: number; // px (how wide the ring looks)
  depth?: number; // px (how much "into screen" it goes)
  speed?: number; // radians/sec
  axis?: 'y' | 'x'; // y = left↔right 3D carousel (like your image). x = up↕down ring
  maxBlur?: number; // px blur for far dots
  bg?: string;
};

export default function Circle3DLoader({
  count = 14,
  size = 22,
  color = '#2F5F5A',
  radius = 120,
  depth = 55,
  speed = 2.2,
  axis = 'y',
  maxBlur = 6,
  bg = '#fff',
}: Circle3DLoaderProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const dots = useMemo(() => Array.from({ length: count }), [count]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // reduced motion support
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    let raf = 0;
    let last = performance.now();
    let phase = 0;

    const cx = radius; // center x in our local coords
    const cy = Math.max(size * 1.2, depth + size); // center y

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      phase += speed * dt;

      for (let i = 0; i < count; i++) {
        const el = dotRefs.current[i];
        if (!el) continue;

        const a = (i / count) * Math.PI * 2 + phase;

        // depth goes -depth..+depth
        const z = Math.sin(a) * depth;

        // map z to 0..1 (0 = back, 1 = front)
        const t = (z + depth) / (2 * depth);

        // perspective-ish scale/opacity/blur
        const scale = 0.55 + t * 0.65; // ~0.55..1.2
        const opacity = 0.15 + t * 0.85; // ~0.15..1
        const blur = (1 - t) * maxBlur; // far = more blur

        // position on a "ring"
        let x = 0;
        let y = 0;

        if (axis === 'y') {
          // Looks like your image: dots move left↔right and go in/out (3D carousel)
          x = Math.cos(a) * radius;
          y = 0;
        } else {
          // True "around X axis": dots go up↕down (still 3D)
          x = 0;
          y = Math.cos(a) * (radius * 0.45);
        }

        el.style.transform = `translate(-50%, -50%) translate(${cx + x}px, ${cy + y}px) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.filter = `blur(${blur}px)`;
        el.style.zIndex = `${Math.round(t * 1000)}`; // front on top
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count, depth, radius, size, speed, axis, maxBlur]);

  // wrapper size (enough room for scaling + blur)
  const width = radius * 2 + size * 3;
  const height = Math.max(size * 3, depth * 2 + size * 3);

  return (
    <div
      ref={wrapRef}
      style={{
        width,
        height,
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="mx-auto"
      role="status"
      aria-label="Loading"
    >
      {dots.map((_, i) => (
        <span
          key={i}
          ref={(n) => {
            dotRefs.current[i] = n;
          }}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: size,
            height: size,
            borderRadius: 9999,
            background: color,
            willChange: 'transform, opacity, filter',
          }}
        />
      ))}
    </div>
  );
}
