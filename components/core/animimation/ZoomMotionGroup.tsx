"use client";

import gsap from "gsap";
import React, { ReactNode, useEffect, useRef } from "react";

interface ZoomMotionGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

export const ZoomMotionGroup: React.FC<ZoomMotionGroupProps> = ({
  children,
  className,
  stagger = 0.035,
}) => {
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.children, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "expo.out",
        stagger,
      });
    }
  }, [stagger]);

  return (
    <div ref={groupRef} className={className}>
      {React.Children.map(children, (child) =>
        React.isValidElement<{ className?: string }>(child)
          ? React.cloneElement(child, {
              className: `opacity-0 scale-0 ${child.props.className || ""}`,
            })
          : child
      )}
    </div>
  );
};
