"use client";

import { MenuButton } from "@/components/core/UI/MenuButton";
import { ResultCard, ResultTitle } from "@/components/core/UI/ResultCardModal";
import { SignBoard } from "@/components/core/UI/SignBoardModal";
import { useNonPlayerPersist } from "@/stores/PlayerStore";

import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const { learntWords, mistakes, reset } = useNonPlayerPersist();

function GetAccuracy() {
    if (mistakes === 0) return "0%";
    if (learntWords === 0) return "0%";
    const accuracy = Math.floor((learntWords / (learntWords + mistakes)) * 100);
    return `${accuracy}%`;
}

const handlePlay = () => {
    router.push("/game")
    reset()
}

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center justify-center">
        <SignBoard
          className="flex items-center relative justify-center h-[8em] w-[30em]"
          style={{
            borderRadius: "15px",
          }}
        >
          <h1 className="text-8xl font-bold text-nowrap">Game Over</h1>
          <div className="w-full bg-primary h-2 absolute rounded-b-[15px] bottom-0 bg-gradient-to-t from-[#574338] to-primary"></div>
        </SignBoard>
        <div className="flex justify-between items-center w-46 ">
          <span className="w-1 h-10 bg-border " />
          <span className="w-1 h-10 bg-border " />
        </div>
      </div>
      <div className="flex gap-10 items-center justify-center bg-secondary p-10 border-border border-2 rounded-xl">
        <ResultCard>
          {learntWords}
          <ResultTitle>Words Nailed</ResultTitle>
        </ResultCard>
        <ResultCard className="flex flex-col">
          {GetAccuracy()}
          <h1 className="text-[16px]">{learntWords}:{mistakes}</h1>
          <ResultTitle>Accuracy</ResultTitle>
        </ResultCard>
        <ResultCard>
          200
          <ResultTitle>Rank</ResultTitle>
        </ResultCard>
      </div>
      <div className="absolute bottom-10 flex gap-8">
          <MenuButton
            className="p-4 text-secondary border-border border-2 "
            onClick={handlePlay}
            style={{
              backgroundColor: "#AF7F66",
            }}
          >
            Play Again
          </MenuButton>
          <MenuButton
            className="p-4 text-secondary border-border border-2 "
            onClick={() => router.push("/")}
            style={{
              backgroundColor: "#AF7F66",
            }}
          >
            Leave
          </MenuButton>
      </div>
    </div>
  );
}

export default Page;
