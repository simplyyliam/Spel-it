
type PlayerStat = "points" | "Xp"

export const PlayerIcons: Record<PlayerStat, string> = {
    points: "/Icons/points.png",
    Xp: "/Icons/xp.png",
} as const 