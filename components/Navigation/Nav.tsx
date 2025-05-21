"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import ThemeToggle from "../UI/ThemeToggle";

function Nav() {
  return (
    <div className="flex items-center gap-4 bg-stone-200 text-lg p-[12px] px-[35px] w-screen">
      <Link
        href="/"
        className={`flex-auto hover:text-black transition ease-linear duration-500 `}
      >
        Spel•it
      </Link>
      <Link
        href="/About"
        className={` hover:text-black transition ease-linear duration-500 `}
      >
        About
      </Link>
      <ThemeToggle />
    </div>
  );
}

export default Nav;
