"use client";

import { CardWrapper } from "@/components/modals/CardWrapper";
import { UIButton } from "./UI_Button";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useCollectionStore } from "@/components/scenes/Collection";

function PlayerProfile() {
  const [showProfile, setShowProfile] = useState(false);
  const {learntWords, mistakes} = useCollectionStore()

  const profileRef = useRef<HTMLDivElement>(null);

  const handleProfileMenu = () => {
    setShowProfile((prev) => !prev);
  };

  useEffect(() => {
    if (profileRef.current) {
      gsap.to(profileRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "expo.out",
      });
    }
  }, [showProfile]);

  return (
    <>
      {showProfile && (
        <div ref={profileRef} className="opacity-0 scale-0">
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
            {/* The point store goes here */}
          </div>
          <h1 className="text-text/50 text-[14px] font-light">
            Rank: Vocabrawller
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
