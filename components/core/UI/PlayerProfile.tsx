"use client";

import { CardWrapper } from "@/components/modals/CardWrapper";
import { UIButton } from "./ButtonModal";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePlayerStore } from "@/stores/PlayerStore";
import Image from "next/image";
import { PlayerIcons } from "./PlayerIcons";

function PlayerProfile() {
  const [showProfile, setShowProfile] = useState(false);
  const [moreOptions, setMoreOption] = useState(false);
  const { xp, points, rank, learntWords, mistakes, reset } = usePlayerStore();
  const Points = PlayerIcons["points"];
  const Xp = PlayerIcons["Xp"];

  const ref = useRef<HTMLDivElement>(null);

  const handleProfileMenu = () => {
    setShowProfile((prev) => !prev);
  };
  const handleMoreOptions = () => {
    setMoreOption((prev) => !prev);
  };

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "expo.out",
      });
    }
  }, [showProfile, moreOptions]);

  return (
    <>
      {showProfile && (
        <div ref={ref} className="opacity-0 scale-0">
          <CardWrapper className="h-90 flex flex-col gap-4 max-w-85 p-4">
            <div className="flex gap-4 items-center">
              <div className="w-[85px] h-[100px] bg-primary/25 flex items-center justify-center rounded-sm">
                DP
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-xl text-text font-medium">Miyuki</h1>
                <p className="text-text/50 font-light w-45 text-[14px]">
                  &quot;A plell everyday, will get you into hogworths&quot;
                </p>
              </div>
              <UIButton
                onClick={handleMoreOptions}
                className="absolute right-5 top-5 p-0.5 px-2 hover:bg-primary transition ease-linear hover:text-BG"
                style={{
                  borderRadius: "5px",
                }}
              >
                •••
              </UIButton>
              {moreOptions && (
                <div
                  ref={ref}
                  className="absolute right-5 top-15 bg-BG shadow-xl p-3 border-border border-[1.5px] rounded-lg mb-4 opacity-0 scale-0"
                >
                  <button
                    onClick={() => reset()}
                    className="flex items-center w-full p-3 cursor-pointer rounded-lg hover:bg-primary transition ease-linear text-text hover:text-BG text-[13px]"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>

            <h1 className="text-text text-lg font-medium">My Collection</h1>
            <div className="flex items-center">
              <h1 className="text-text/50 flex-auto">Words Learnt</h1>
              <span className="flex-auto">{learntWords}</span>
            </div>
            <div className="flex items-center">
              <h1 className="text-text/50 flex-auto">Mistakes</h1>
              <span className="flex-auto">{mistakes}</span>
            </div>
          </CardWrapper>
        </div>
      )}
      <UIButton
        onClick={handleProfileMenu}
        className="flex justify-between items-center w-85 p-2.5 pl-4"
      >
        <div className="flex flex-col flex-auto items-start gap-2">
          <div className="flex gap-2">
            <h1 className="text-xl text-text font-medium">Miyuki</h1>
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
          <h1 className="text-text/50 text-[14px] font-light">
            Rank: {rank}
          </h1>
        </div>
        <div className="w-[68px] h-[68px] bg-primary/25 flex items-center justify-center rounded-sm">
          DP
        </div>
      </UIButton>
    </>
  );
}

export default PlayerProfile;
