import Image from "next/image";
import { PlayerIcons } from "./PlayerIcons";
import { usePlayerStore } from "@/stores/PlayerStore";

function PlayerCard() {
  const Points = PlayerIcons["points"];
  const Xp = PlayerIcons["Xp"];
  const { points, xp } = usePlayerStore();
  return (
    <div className="flex gap-4 items-center w-auto p-2 pr-10 bg-BG rounded-[13px] border-border border-[1.5px]">
      <div className="w-[55px] h-[55px] border-border border-[1.5px] rounded-[6.5px] flex items-center justify-center bg-primary/25">
        dp
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl text-text font-medium">Miyuki</h1>
        <div className="flex gap-2">
            <span className="flex gap-2 items-center justify-center w-auto h-auto">
              <Image
                src={Points}
                width={20}
                height={20}
                quality={100}
                alt="Player points icon"
              />
              {points}
            </span>
            <span className="flex gap-2 items-center justify-center w-auto h-auto">
              <Image
                src={Xp}
                width={20}
                height={20}
                quality={100}
                alt="Player points icon"
              />
              {xp}
            </span>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
