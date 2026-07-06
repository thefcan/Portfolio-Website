import React from 'react';

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  /** styles the inner fill (bg, padding, layout) — the demo chrome is gone */
  innerClassName?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties['animationDuration'];
  thickness?: number;
};

/**
 * Orbiting-spark border (React Bits StarBorder, adapted to the brutalist
 * frame): square corners, no demo gradient chrome — the caller styles the
 * outer frame via className (border, shadow) and the fill via innerClassName.
 * The two sparks sweep the top/bottom edges inside the `thickness` gap.
 * Keyframes live in globals.css; reduced motion parks them there too.
 */
const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  innerClassName = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'button';

  return (
    <Component
      className={`relative inline-block overflow-hidden ${className}`}
      {...(rest as any)}
      style={{
        padding: `${thickness}px`,
        ...(rest as any).style
      }}
    >
      <div
        className="absolute bottom-[-11px] right-[-250%] z-0 h-[50%] w-[300%] rounded-full opacity-70 animate-star-movement-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div
        className="absolute left-[-250%] top-[-10px] z-0 h-[50%] w-[300%] rounded-full opacity-70 animate-star-movement-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div className={`relative z-[1] ${innerClassName}`}>{children}</div>
    </Component>
  );
};

export default StarBorder;
