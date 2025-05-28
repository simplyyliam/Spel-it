"use client";

import Link from "next/link";
import { TitleMotion } from "../core/animimation/TitleMotion";
import { ZoomMotion } from "../core/animimation/ZoomMotion";
import { ZoomMotionGroup } from "../core/animimation/ZoomMotionGroup";
import { MenuButton } from "../core/UI/MenuButton";
import { SignBoard } from "../core/UI/SignBoardModal";
import { SceneWrapper } from "../modals/SceneWrapper";
import PlayerProfile from "../core/UI/PlayerProfile";
import { Info, InfoIcon, Settings } from "lucide-react";

function HomeScene() {
  return (
    <SceneWrapper className="flex flex-col justify-center items-center bg-[url('/Images/BunBun.png')] bg-cover bg-center">
      <ZoomMotion>
        <div className="flex flex-col gap-2 items-center h-150">
          <h1 className="text-primary text-[150px] font-bold relative bottom-8 z-1">
            Spel•It
          </h1>
          <div className="absolute top-44">
            <div className="flex justify-between items-center w-46 relative left-23 bottom-12">
              <span className="w-1 h-15 bg-border " />
              <span className="w-1 h-15 bg-border " />
            </div>
            <SignBoard className=" h-12 w-55 relative left-19 bottom-22 flex items-center justify-center">
              <TitleMotion>
                <h1>Hear it, Spell it, Nail it</h1>
              </TitleMotion>
              <div className="w-full bg-primary h-2 absolute bottom-0 bg-gradient-to-t from-[#574338] to-primary"></div>
            </SignBoard>
          </div>
        </div>
      </ZoomMotion>
      <div className="flex gap-2 items-center justify-center w-screen h-full">
        <div className="flex flex-col items-center justify-center gap-4">
          <ZoomMotionGroup className="flex flex-col gap-4 px-3 justify-center w-auto h-auto">
            <Link href="/game">
              <MenuButton
                className={`button w-60 py-4 text-xl hover:bg-primary hover:text-BG hover:shadow-black/35 hover:shadow-2xl transition ease-linear`}
              >
                Play
              </MenuButton>
            </Link>
            <MenuButton
              className={`button w-60 py-4 text-xl hover:bg-primary hover:text-BG hover:shadow-black/35 hover:shadow-2xl transition ease-linear`}
            >
              Store
            </MenuButton>
            <MenuButton
              className={`button w-60 py-4 text-xl hover:bg-primary hover:text-BG hover:shadow-black/35 hover:shadow-2xl transition ease-linear`}
            >
              Settings
            </MenuButton>

            <div className="flex flex-col gap-4 items-center justify-center absolute left-5 bottom-5 ">
            <MenuButton className="p-3 cursor-pointer" 
            style={{
              backgroundColor: "#AF7F66",
              color: "#FDF6EE"
            }}>
              <Info/>
            </MenuButton>
            <MenuButton className="p-3 cursor-pointer" 
            style={{
              backgroundColor: "#AF7F66",
              color: "#FDF6EE"
            }}>
              <Info/>
            </MenuButton>
            <MenuButton className="p-3 cursor-pointer" 
            style={{
              backgroundColor: "#AF7F66",
              color: "#FDF6EE"
            }}>
              <Settings/>
            </MenuButton>
            </div>
          </ZoomMotionGroup>
        </div>
        <ZoomMotion className="absolute right-5 bottom-5">
          <PlayerProfile />
        </ZoomMotion>
      </div>
    </SceneWrapper>
  );
}

export default HomeScene;
