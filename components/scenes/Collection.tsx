import { create } from "zustand";
import { persist } from "zustand/middleware";

type CollectionStore = {
  learntWords: number;
  mistakes: number;
  setLearntWords: (value: number) => void;
  setMistakes: (value: number) => void;
  reset: () => void
};

export const useCollectionStore = create(
  persist<CollectionStore>(
    (set) => ({
      learntWords: 0,
      mistakes: 0,
      setLearntWords: (value) =>
        set((state) => ({ learntWords: state.learntWords + value })),
      setMistakes: (value) =>
        set((state) => ({ mistakes: state.mistakes + value })),
      reset: () => set({learntWords: 0, mistakes: 0})
    }),
    {
      name: "collection-storage", // 🔒 key in localStorage
    }
  )
);
