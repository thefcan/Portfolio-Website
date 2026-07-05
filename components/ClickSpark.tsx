'use client';

import React, { useEffect, useRef } from 'react';

interface ClickSparkProps {
  /** palette to cycle through per click; var(--x) references resolve at mount */
  sparkColors?: string[];
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  extraScale?: number;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
  color: string;
}

/**
 * Arcade click feedback (React Bits ClickSpark, adapted): a viewport-fixed
 * canvas overlay draws a spark burst at every pointerdown. Reworked from the
 * stock wrap-your-children version so it can run site-wide without breaking
 * the perf budget:
 * - fixed viewport-sized canvas (stock sizes to its parent — wrapping the app
 *   would allocate a document-height buffer)
 * - rAF loop only runs while sparks are alive; idle cost is zero
 * - listens on window pointerdown, so taps spark too
 * - prefers-reduced-motion spawns nothing (checked live, like ScrambleText)
 */
const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColors = ['var(--acid)', 'var(--hot)', 'var(--cyan)', 'var(--amber)'],
  sparkSize = 10,
  sparkRadius = 18,
  sparkCount = 8,
  duration = 450,
  easing = 'ease-out',
  extraScale = 1.0
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // resolve var(--x) tokens once so canvas strokeStyle gets real colors
    const rootStyle = getComputedStyle(document.documentElement);
    const colors = sparkColors.map(c => {
      const m = c.match(/^var\((--[^)]+)\)$/);
      return m ? rootStyle.getPropertyValue(m[1]).trim() || '#fff' : c;
    });

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const easeFunc = (t: number) => {
      switch (easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    };

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      sparksRef.current = sparksRef.current.filter(spark => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = spark.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      if (sparksRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        // last burst finished — wipe and park the loop until the next click
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        rafRef.current = null;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const color = colors[(Math.random() * colors.length) | 0];
      const now = performance.now();
      for (let i = 0; i < sparkCount; i++) {
        sparksRef.current.push({
          x: e.clientX,
          y: e.clientY,
          angle: (2 * Math.PI * i) / sparkCount,
          startTime: now,
          color
        });
      }
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };
    window.addEventListener('pointerdown', onPointerDown);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', onPointerDown);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sparkSize, sparkRadius, sparkCount, duration, easing, extraScale, ...sparkColors]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[130] h-full w-full"
    />
  );
};

export default ClickSpark;
