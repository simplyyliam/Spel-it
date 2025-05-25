"use client";

import Link from "next/link";
import { TitleMotion } from "../../components/core/animimation/TitleMotion";
import { ZoomMotion } from "../../components/core/animimation/ZoomMotion";
import { ZoomMotionGroup } from "../../components/core/animimation/ZoomMotionGroup";
import PlayerProfile from "../../components/core/UI/PlayerProfile";
import { UIButton } from "../../components/core/UI/UI_Button";
import { SceneWrapper } from "../../components/modals/SceneWrapper";

function HomeScene() {
  return (
    <SceneWrapper className="flex justify-start items-end">
      <div className="flex flex-col flex-auto">
        <div className="relative top-5">
          <TitleMotion className="text-[200px] text-primary font-medium">
            Spel•It
          </TitleMotion>
          <TitleMotion className="text-3xl text-primary font-light relative left-45 bottom-20">
            Hear it, Spell it, Nail it
          </TitleMotion>
        </div>
        <ZoomMotionGroup className="flex flex-col gap-4 px-3 justify-center w-auto h-auto">
          <Link href="/game">
            <UIButton
              className={`button w-60 py-4   hover:bg-primary hover:text-BG hover:shadow-black/35 hover:shadow-2xl transition ease-linear`}
            >
              Play
            </UIButton>
          </Link>
          <UIButton
            className={`button w-60 py-4  hover:bg-primary hover:text-BG hover:shadow-black/35 hover:shadow-2xl transition ease-linear`}
          >
            About
          </UIButton>
          <UIButton
            className={`button w-60 py-4  hover:bg-primary hover:text-BG hover:shadow-black/35 hover:shadow-2xl transition ease-linear`}
          >
            Settings
          </UIButton>
        </ZoomMotionGroup>
      </div>
      <ZoomMotion>
        <PlayerProfile />
      </ZoomMotion>
    </SceneWrapper>
  );
}

export default HomeScene;
