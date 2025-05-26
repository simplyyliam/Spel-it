"use client";

import { useTimerStore } from "@/stores/TimerStore";
import { TimerIcon } from "lucide-react";
import { useEffect } from "react";

function TimerUI() {
  const { timer, TimerTick } = useTimerStore();

  useEffect(() => {
    const Interval = setInterval(() => {
      TimerTick();
    }, 1000);

    return () => {
      clearInterval(Interval);
    };
  }, [timer, TimerTick]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex gap-3 items-center justify-center bg-secondary border-border border-[1.5px] rounded-xl p-3 px-4">
      <TimerIcon className="stroke-1" />
      <span className="text-xl">{formatTime(timer)}</span>
    </div>
  );
}

export default TimerUI;
