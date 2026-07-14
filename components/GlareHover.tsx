'use client';

import React, { useRef } from 'react';
import { usePrefersReducedMotion } from '@/components/use-prefers-reduced-motion';

interface GlareHoverProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  playOnce?: boolean;
}

// Chrome-free variant of the React Bits component: the caller keeps its own
// card styling and this just layers the sweep overlay on top. The animation
// is two style writes on enter/leave (a background-position transition) —
// no per-frame JS, nothing runs while the pointer is elsewhere.
const GlareHover: React.FC<GlareHoverProps> = ({
  children,
  glareColor = '#ffffff',
  glareOpacity = 0.5,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  playOnce = false,
  className = '',
  style = {},
  ...props
}) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();

  // hex colors get a literal rgba; anything else (palette vars like
  // var(--acid)) folds the opacity in via color-mix at paint time
  const hex = glareColor.replace('#', '');
  let rgba = glareColor;
  if (/^[\dA-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else if (/^[\dA-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else {
    rgba = `color-mix(in srgb, ${glareColor} ${Math.round(glareOpacity * 100)}%, transparent)`;
  }

  const animateIn = () => {
    const el = overlayRef.current;
    if (!el || reduced) return;

    el.style.transition = 'none';
    el.style.backgroundPosition = '-100% -100%, 0 0';
    el.style.transition = `${transitionDuration}ms ease`;
    el.style.backgroundPosition = '100% 100%, 0 0';
  };

  const animateOut = () => {
    const el = overlayRef.current;
    if (!el || reduced) return;

    if (playOnce) {
      el.style.transition = 'none';
      el.style.backgroundPosition = '-100% -100%, 0 0';
    } else {
      el.style.transition = `${transitionDuration}ms ease`;
      el.style.backgroundPosition = '-100% -100%, 0 0';
    }
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(${glareAngle}deg,
        hsla(0,0%,0%,0) 60%,
        ${rgba} 70%,
        hsla(0,0%,0%,0) 100%)`,
    backgroundSize: `${glareSize}% ${glareSize}%, 100% 100%`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '-100% -100%, 0 0',
    pointerEvents: 'none'
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={style}
      {...props}
      onMouseEnter={animateIn}
      onMouseLeave={animateOut}
    >
      <div ref={overlayRef} style={overlayStyle} aria-hidden="true" />
      {children}
    </div>
  );
};

export default GlareHover;
