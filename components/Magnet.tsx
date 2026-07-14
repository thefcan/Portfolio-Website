'use client';

import React, { useEffect, useRef, ReactNode, HTMLAttributes } from 'react';
import { usePrefersReducedMotion } from '@/components/use-prefers-reduced-motion';

interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
}

const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  wrapperClassName = '',
  innerClassName = '',
  ...props
}) => {
  const magnetRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const off = disabled || reduced;

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    if (off) {
      inner.style.transform = 'translate3d(0, 0, 0)';
      return;
    }

    // The pull is written straight to the inner node: this listener fires for
    // every pointer move anywhere on the page, so routing it through setState
    // would re-render the subtree constantly. Outside the attraction zone the
    // handler is read-only — one reset write on exit, then idle moves cost
    // nothing but a rect read.
    let active = false;

    const handleMouseMove = (e: MouseEvent) => {
      const el = magnetRef.current;
      const node = innerRef.current;
      if (!el || !node) return;

      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distX = Math.abs(centerX - e.clientX);
      const distY = Math.abs(centerY - e.clientY);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        active = true;
        node.style.transition = activeTransition;
        node.style.transform = `translate3d(${(e.clientX - centerX) / magnetStrength}px, ${(e.clientY - centerY) / magnetStrength}px, 0)`;
      } else if (active) {
        active = false;
        node.style.transition = inactiveTransition;
        node.style.transform = 'translate3d(0, 0, 0)';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [padding, off, magnetStrength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: 'relative', display: 'inline-block' }}
      {...props}
    >
      <div
        ref={innerRef}
        className={innerClassName}
        style={{ transform: 'translate3d(0, 0, 0)', willChange: 'transform' }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;
