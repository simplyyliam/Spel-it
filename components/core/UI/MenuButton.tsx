import gsap from "gsap";
import {
  HTMLAttributes,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

const BUTTON_SFX = "/SFX/button.mp3";

export const MenuButton = forwardRef<
  HTMLButtonElement,
  HTMLAttributes<HTMLButtonElement>
>(({ children, className = "", ...props }, ref) => {
  const innerRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Expose innerRef to parent via forwardRef
  useImperativeHandle(ref, () => innerRef.current!, []);

  useEffect(() => {
    const button = innerRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.03,
        duration: 0.1,
        ease: "linear",
      });
    };
    const handleSFX = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (innerRef.current) {
        audio.currentTime = 0;
        audio.play();
      }
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        ease: "linear",
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseenter", handleSFX);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <button
        ref={innerRef}
        className={` bg-secondary border-border border-2 transition ease-linear cursor-pointer rounded-xl ${className}`}
        {...props}
      >
        {children}
      </button>
      <audio ref={audioRef} src={BUTTON_SFX} preload="auto" />
    </>
  );
});

// Optional: for easier debugging
MenuButton.displayName = "CustomButton";
