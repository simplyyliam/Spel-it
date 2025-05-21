"use client";

import gsap from "gsap";
import { SplitText } from "gsap/all";
import { HTMLAttributes, useEffect, useRef } from "react";

interface TitleProps extends HTMLAttributes<HTMLHeadElement> {
  motion?: boolean | "on" | "off";
}

export const Title: React.FC<TitleProps> = ({
  children,
  className,
  motion = true,
  ...props
}) => {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!motion || motion === "off") {
      if (ref.current) {
        gsap.set(ref.current, {
          opacity: 1,
        });
      }
      return;
    }

    if (ref.current) {
      gsap.to(ref.current, {
        opacity: 1,
        duration: 0.4,
        ease: "linear",
      });

      SplitText.create(ref.current, {
        type: "words",
        autoSplit: true,
        onSplit: (self) => {
          return gsap.from(self.words, {
            y: 100,
            opacity: 0,
            stagger: 0.05,
          });
        },
      });
    }
  }, [motion]);

  return (
    <h1
      ref={ref}
      className={`text-8xl opacity-0 font-medium text-black ${className ?? ""}`}
      {...props}
    >
      {children}
    </h1>
  );
};
