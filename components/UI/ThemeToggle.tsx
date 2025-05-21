import { SunIcon, MoonIcon } from "lucide-react";

function ThemeToggle() {
  return (
    <div className="flex w-auto h-auto p-1.5 gap-4 bg-neutral-300  rounded-full">
      <button className="cursor-pointer flex items-center justify-center w-[30px] h-[30px] hover:bg-stone-200 rounded-full transition ease-linear duration-75 ">
        <SunIcon width={15} />
      </button>
      <button className="cursor-pointer flex items-center justify-center w-[30px] h-[30px] hover:bg-stone-200 rounded-full transition ease-linear duration-75 ">
        <MoonIcon width={15} />
      </button>
    </div>
  );
}

export default ThemeToggle;
