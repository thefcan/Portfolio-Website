'use client';

import React, { useRef } from 'react';

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  /** any CSS color — color-mix(...) with a palette var works well here */
  spotlightColor?: string;
}

/**
 * Cursor spotlight overlay (React Bits SpotlightCard, adapted): the caller
 * brings the card chrome (borders / bg / padding), this only layers the glow.
 * Rewritten to drive the gradient position via CSS vars on the overlay ref
 * instead of setState, so mousemove never re-renders the card subtree. The
 * glow itself is a calm opacity fade, so it stays on under reduced motion.
 */
const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.2)'
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const rect = e.currentTarget.getBoundingClientRect();
    overlay.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    overlay.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div onMouseMove={handleMouseMove} className={`group/spot relative overflow-hidden ${className}`}>
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(circle at var(--spot-x, 50%) var(--spot-y, 50%), ${spotlightColor}, transparent 80%)`
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
