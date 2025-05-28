import { PauseArea } from "@/components/modals/PauseArea";
import { PasueWrapper } from "@/components/modals/PauseWrapper";
import { useRouter } from "next/navigation";
import { MenuButton } from "./MenuButton";
import { SignBoard } from "./SignBoardModal";

interface props {
  resumeGame: () => void;
}

function PauseMenu({ resumeGame }: props) {
  const router = useRouter();
  return (
    <PasueWrapper>
      <PauseArea>
        <div className="flex flex-col items-center justify-center">
          <SignBoard
            className="flex items-center relative justify-center h-[8em] w-[20em]"
            style={{
              borderRadius: "15px",
            }}
          >
            <h1 className="text-8xl font-bold">Pause</h1>
            <div className="w-full bg-primary h-2 absolute rounded-b-[15px] bottom-0 bg-gradient-to-t from-[#574338] to-primary"></div>
          </SignBoard>
          <div className="flex justify-between items-center w-46 ">
            <span className="w-1 h-10 bg-border " />
            <span className="w-1 h-10 bg-border " />
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center bg-secondary p-10 px-15 border-border border-2 rounded-xl">
          <MenuButton
            onClick={resumeGame}
            className="p-4 w-60 text-xl border-2 border-transparent hover:border-border hover:bg-primary hover:text-BG hover:shadow-lg shadow-black/25 transition ease-linear"
          >
            Resume
          </MenuButton>

          <MenuButton
            onClick={() => {}}
            className="p-4 w-60 text-xl border-2 border-transparent hover:border-border hover:bg-primary hover:text-BG hover:shadow-lg shadow-black/25 transition ease-linear"
          >
            Settings
          </MenuButton>
          <MenuButton
            onClick={() => router.push("/")}
            className="p-4 w-60 text-xl border-2 border-transparent hover:border-border hover:bg-primary hover:text-BG hover:shadow-lg shadow-black/25 transition ease-linear"
          >
            Leave
          </MenuButton>
        </div>
      </PauseArea>
    </PasueWrapper>
  );
}

export default PauseMenu;
