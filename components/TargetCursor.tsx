'use client';

import React, { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/components/use-prefers-reduced-motion';

interface TargetCursorProps {
  /** elements the reticle locks onto */
  targetSelector?: string;
}

const CORNER = 12; // bracket arm square (matches h-3 w-3)
const RETICLE = 17; // half-size of the free-floating box
const LOCK_PAD = 8; // frame breathing room around a locked target

// order matters: setCorners() writes offsets by this index
const CORNERS = [
  { key: 'tl', edges: 'border-l-[3px] border-t-[3px]', dx: -RETICLE, dy: -RETICLE },
  { key: 'tr', edges: 'border-r-[3px] border-t-[3px]', dx: RETICLE - CORNER, dy: -RETICLE },
  { key: 'bl', edges: 'border-l-[3px] border-b-[3px]', dx: -RETICLE, dy: RETICLE - CORNER },
  { key: 'br', edges: 'border-r-[3px] border-b-[3px]', dx: RETICLE - CORNER, dy: RETICLE - CORNER },
];

/**
 * Arcade target reticle (React Bits TargetCursor, rewritten without gsap):
 * four corner brackets trail the pointer with a slow spin and, over anything
 * interactive, expand to frame it like an arcade menu selection. The native
 * cursor stays visible — this is decoration around it, not a replacement, so
 * every OS pointer affordance (I-beam, resize, …) keeps working.
 *
 * All motion is transform/opacity writes straight to refs plus CSS
 * transitions — no per-frame JS loop, no React state, nothing at idle.
 * Touch devices (no fine pointer) and reduced-motion users never see it.
 */
const TargetCursor: React.FC<TargetCursorProps> = ({
  targetSelector = 'a, button, [role="button"]',
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const pressRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLDivElement>(null);
  const cornerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const press = pressRef.current;
    const spin = spinRef.current;
    const corners = cornerRefs.current;
    if (!root || !press || !spin || corners.length < 4) return;
    if (reduced) return;
    // mouse-only decoration — never attach on touch screens
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let x = -100;
    let y = -100;
    let shown = false;
    let locked: Element | null = null;

    const setCorners = (hx: number, hy: number, color: string) => {
      const pos = [
        [-hx, -hy],
        [hx - CORNER, -hy],
        [-hx, hy - CORNER],
        [hx - CORNER, hy - CORNER],
      ];
      corners.forEach((c, i) => {
        if (!c) return;
        c.style.transform = `translate3d(${pos[i][0]}px, ${pos[i][1]}px, 0)`;
        c.style.borderColor = color;
      });
    };

    const follow = () => {
      root.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const unlock = () => {
      if (!locked) return;
      locked = null;
      spin.style.animation = ''; // resume the class-driven spin
      setCorners(RETICLE, RETICLE, 'var(--acid)');
      follow();
    };

    const lock = (el: Element) => {
      locked = el;
      const r = el.getBoundingClientRect();
      spin.style.animation = 'none'; // the frame must stay axis-aligned
      root.style.transform = `translate3d(${r.left + r.width / 2}px, ${r.top + r.height / 2}px, 0)`;
      setCorners(r.width / 2 + LOCK_PAD, r.height / 2 + LOCK_PAD, 'var(--hot)');
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        follow(); // land before fading in, not glide from the last spot
        root.style.opacity = '1';
        return;
      }
      if (!locked) follow();
    };

    // one delegated listener covers lock AND unlock: boundary crossings into
    // a target lock it, into anything else release it
    const onOver = (e: MouseEvent) => {
      const t = e.target instanceof Element ? e.target.closest(targetSelector) : null;
      if (t === locked) return;
      if (t) lock(t);
      else unlock();
    };

    // a locked frame is in viewport coords — scrolling would leave it stale
    const onScroll = () => unlock();
    const onLeave = () => {
      shown = false;
      root.style.opacity = '0';
      unlock();
    };
    const onDown = () => {
      press.style.transform = 'scale(0.78)';
    };
    const onUp = () => {
      press.style.transform = 'scale(1)';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup', onUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      root.style.opacity = '0';
    };
  }, [reduced, targetSelector]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[130] opacity-0"
      style={{
        transform: 'translate3d(-100px, -100px, 0)',
        transition: 'transform 120ms ease-out, opacity 200ms ease',
      }}
    >
      <div ref={pressRef} className="transition-transform duration-150">
        <div ref={spinRef} className="animate-target-spin">
          {CORNERS.map((c, i) => (
            <span
              key={c.key}
              ref={(el) => {
                cornerRefs.current[i] = el;
              }}
              className={`absolute block h-3 w-3 transition-[transform,border-color] duration-200 ease-out ${c.edges}`}
              style={{
                transform: `translate3d(${c.dx}px, ${c.dy}px, 0)`,
                borderColor: 'var(--acid)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TargetCursor;
