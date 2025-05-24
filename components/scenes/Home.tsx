"use client";

import { TitleMotion } from "@/animimation/TitleMotion";
import { UIButton } from "../core/UI/UI_Button";
import { SceneWrapper } from "../modals/SceneWrapper";
import { ZoomMotionGroup } from "@/animimation/ZoomMotionGroup";

function HomeScene() {
  return (
    <SceneWrapper className="flex justify-start items-end">
      <div className="flex flex-col">
        <div className="relative top-5">
          <TitleMotion className="text-[200px] text-primary font-medium">Spel•It</TitleMotion>
          <TitleMotion className="text-3xl text-primary font-light relative left-45 bottom-20">Hear it, Spell it, Nail it</TitleMotion>
        </div>
        <ZoomMotionGroup className="flex flex-col gap-4 px-3 justify-center w-auto h-auto">
          <UIButton
            className={`w-60  hover:bg-primary hover:text-BG hover:shadow-black/35 hover:shadow-2xl transition ease-linear`}
          >
            Play
          </UIButton>
          <UIButton
            className={`w-60 hover:bg-primary hover:text-BG hover:shadow-black/35 hover:shadow-2xl transition ease-linear`}
          >
            About
          </UIButton>
          <UIButton
            className={`w-60 hover:bg-primary hover:text-BG hover:shadow-black/35 hover:shadow-2xl transition ease-linear`}
          >
            Settings
          </UIButton>
        </ZoomMotionGroup>
      </div>
    </SceneWrapper>
  );
}

export default HomeScene;
