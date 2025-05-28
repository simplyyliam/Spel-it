import { create } from "zustand";

type TimerStore = {
  timer: number;
  nextWordTimer: number;
  paused: boolean;
  TimerTick: () => void;
  NextWordTick: () => void;
  resetNextWord: () => void;
  resetTimer: () => void;
  pause: () => void;
  resume: () => void;
};

export const useTimerStore = create<TimerStore>((set, get) => ({
  timer: 5 * 60,
  nextWordTimer: 40,
  paused: false,

  TimerTick: () => {
    const { paused, timer } = get();
    if (!paused && timer > 0) {
      set({ timer: timer - 1 });
    }
  },

  NextWordTick: () => {
    const { paused, nextWordTimer } = get();
    if (!paused && nextWordTimer > 0) {
      set({ nextWordTimer: nextWordTimer - 1 });
    }
  },

  resetNextWord: () => set({ nextWordTimer: 40 }),
  resetTimer: () => set({ timer: 5 * 60 }),

  pause: () => set({ paused: true }),

  resume: () => set({ paused: false }),
}));
