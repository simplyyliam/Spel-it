import { create } from "zustand";
import { persist } from "zustand/middleware";

type Rank =
    | "unranked"
    | "Noobling"
    | "Typo Tamer"
    | "Spella"
    | "Word Weilder"
    | "Syllabreaker"
    | "Lexi Knight"
    | "Vocabrawler"
    | "Phoneme Phantom"
    | "WorldLord";

type PlayerStore = {
    xp: number;
    rank: Rank;
    points: number;
    learntWords: number;
    mistakes: number;

    setLearntWords: (value: number) => void;
    setMistakes: (value: number) => void;
    reset: () => void
    setPoints: (val: number) => void;
    setXP: (val: number) => void;
    updateRank: () => void;
};

const rankThresholds: { rank: Rank; xp: number }[] = [
  { rank: "Unranked", xp: 0 },
  { rank: "Noobling", xp: 500 },
  { rank: "Typo Tamer", xp: 1500 },
  { rank: "Spella", xp: 2500 },
  { rank: "Word Weilder", xp: 5000 },
  { rank: "Syllabreaker", xp: 7500 },
  { rank: "Lexi Knight", xp: 10000 },
  { rank: "Vocabrawler", xp: 12500},
  { rank: "Phoneme Phantom", xp: 15000 },
  { rank: "WorldLord", xp: 17500 }
];

const getRankFromXP = (xp: number): Rank => {
  for (let i = rankThresholds.length - 1; i >= 0; i--) {
    if (xp >= rankThresholds[i].xp) return rankThresholds[i].rank;
  }
  return "unranked"
};

export const usePlayerStore = create(
    persist<PlayerStore>((set, get) => ({
        xp: 0,
        points: 0,
        rank: "Noobling",

        setPoints: (val) => set((s) => ({ points: s.points + val })),
        setXP: (val) => {
            const newXP = get().xp + val;
            const newRank = getRankFromXP(newXP);
            set({ xp: newXP, rank: newRank });
        },
        updateRank: () => {
            const xp = get().xp;
            const newRank = getRankFromXP(xp);
            set({ rank: newRank });
        },
        learntWords: 0,
        mistakes: 0,
        setLearntWords: (value) =>
            set((state) => ({ learntWords: state.learntWords + value })),
        setMistakes: (value) =>
            set((state) => ({ mistakes: state.mistakes + value })),
        reset: () => set({ learntWords: 0, mistakes: 0, points: 0, xp: 0, rank: "unranked" })
    }),
        {
            name: "Player-storage", // 🔒 key in localStorage
        }
    )

)

