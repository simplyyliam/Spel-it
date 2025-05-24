import gsap from "gsap";
import { SplitText } from "gsap/all";
import React, { HTMLAttributes, useEffect, useRef } from "react";

export const TitleMotion: React.FC<HTMLAttributes<HTMLHeadElement>> = ({
  children,
  className,
  ...props
}) => {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
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
  }, []);
  return (
    <h1 ref={ref} className={`opacity-0 ${className}`} {...props}>
      {children}
    </h1>
  );
};
