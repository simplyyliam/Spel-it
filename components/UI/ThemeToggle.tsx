import gsap from "gsap";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themeRef = useRef(null);
  const isDark = theme === "dark" ? "light" : "dark";

  const handleTheme = () => {
    setTheme(isDark);
  };

  useEffect(() => {
    if (isDark) {
      gsap.to(themeRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "linear",
      });
    }
  }, [theme, isDark]);

  return (
    <div className="flex w-auto h-auto p-1.5 gap-4  rounded-full">
      <button
        onClick={handleTheme}
        className={`cursor-pointer flex items-center justify-center w-[30px] h-[30px] ${
          theme === "dark"
            ? "hover:bg-neutral-100/50 transition ease-linear duration"
            : "hover:bg-neutral-500/50 transition ease-linear duration-75"
        } rounded-full transition ease-linear duration-75`}
      >
        {/* {theme === "dark" ?  /> : <MoonIcon width={15} />} */}

        {theme === "dark" && (
          <div ref={themeRef} className="opacity-0 scale-0">
            <SunIcon width={15} />
          </div>
        )}
        {theme === "light" && (
          <div ref={themeRef} className="opacity-0 scale-0">
            <MoonIcon width={15} />
          </div>
        )}
      </button>
    </div>
  );
}

export default ThemeToggle;
