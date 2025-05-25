"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export const PivotSnapMotion: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tl = gsap.timeline();
    tl.to(el, { rotate: -15, duration: 0.3, ease: "power2.out" })
      .to(el, { rotate: 25, duration: 0.2, ease: "power4.inOut" })
      .to(el, { rotate: 0, duration: 0.4, ease: "power3.out" })

    return () => {
      tl.kill();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
};
