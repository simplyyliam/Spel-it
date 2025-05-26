"use client";

import { useTimerStore } from "@/stores/TimerStore";
import { TimerIcon } from "lucide-react";
import { useEffect } from "react";

function NextWordTick() {
  const { nextWordTimer, NextWordTick } = useTimerStore();

  useEffect(() => {
    const Interval = setInterval(() => {
      NextWordTick();
    }, 1000);

    return () => {
      clearInterval(Interval);
    };
  }, [nextWordTimer, NextWordTick]);


  return (
    <div className="flex gap-3 items-center justify-center bg-secondary border-border border-[1.5px] rounded-xl p-3 px-4">
      <TimerIcon className="stroke-1" />
      <span className="text-xl">{nextWordTimer}</span>
    </div>
  );
}

export default NextWordTick;
