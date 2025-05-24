"use client";

import gsap from "gsap";
import React, { HTMLAttributes, useEffect, useRef } from "react";

export const ZoomMotion: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "expo.out", 
      });
    }
  }, []); 

  return (
    <div
      ref={ref}
      className={`opacity-0 scale-0 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
