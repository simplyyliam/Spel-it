import { create } from "zustand";

type TimerStore = {
    timer: number
    nextWordTimer: number
    TimerTick: () => void
    NextWordTick: () => void
    reset: () => void
}

export const useTimerStore = create<TimerStore>((set) => ({
    timer: 5 * 60,
    nextWordTimer: 40,
    TimerTick: () =>
    set((s) => {
      if (s.timer <= 0) return s; 
      return { timer: s.timer - 1 };
    }),
    NextWordTick: () => set((s) => {
        if(s.nextWordTimer <= 0) return s
        return {nextWordTimer: s.nextWordTimer -1}
    }),
    reset: () => set({nextWordTimer: 40}),
}))