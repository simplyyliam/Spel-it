"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTimerStore } from "@/stores/TimerStore";
import { useNonPlayerPersist, usePlayerStore } from "@/stores/PlayerStore";
import PlayerCard from "@/components/core/UI/PlayerCard";
import NextWordTick from "@/components/core/UI/NextWordTimer";
import TimerUI from "@/components/core/UI/TimerUI";
import { Pause } from "lucide-react";
import { MenuButton } from "@/components/core/UI/MenuButton";
import PauseMenu from "@/components/core/UI/PauseMenu";

type DatamuseWord = {
  word: string;
  score?: number;
  tags?: string[];
};

function Page() {
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentWord, setCurrentWord] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const { timer, resetNextWord, resetTimer, nextWordTimer, pause, resume } = useTimerStore();
  const { setPoints, setXP, setLearntWords, setMistakes } = usePlayerStore();
  const { setResultsMistakes, setResultsWords } = useNonPlayerPersist();
  const router = useRouter();

  const Sfx = {
    wrong: "/SFX/Wrong.mp3",
    correct: "/SFX/Reward_1.mp3",
  };

  const getWordFromDatamuse = async (): Promise<string> => {
    const res = await fetch(
      "https://api.datamuse.com/words?ml=common&max=1000"
    );
    const data: DatamuseWord[] = await res.json();

    const words = data.map((item) => item.word).filter((w) => w.length <= 10);

    return words[Math.floor(Math.random() * words.length)];
  };

  async function newWord() {
    const newWord = await getWordFromDatamuse();
    setCurrentWord(newWord);
    speakWord(newWord);
    resetNextWord();
    if (inputRef.current) inputRef.current.value = "";
  }

  const speakWord = (word: string) => {
    const msg = new SpeechSynthesisUtterance(`Can you spell ${word}`);

    const speak = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        msg.voice =
          voices.find((voice) => voice.lang.startsWith("en")) || voices[0];
        speechSynthesis.speak(msg);
      } else {
        console.warn("No speech synthesis voices found.");
      }
    };
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.onvoiceschanged = speak;
    } else {
      speak();
    }
  };

  //This gets the word and stores it inside of the states
  const setupWord = async () => {
    const word = await getWordFromDatamuse();
    setCurrentWord(word);
    speakWord(word);
  };

  // Call setupWord when the component mounts
  useEffect(() => {
    setupWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check if user reached 5 correct answers
  useEffect(() => {
    if (timer === 0) {
      router.push("/gameOver");
    }
  }, [timer, router]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userValue = inputRef.current?.value.trim().toLowerCase();
    const audio = audioRef.current;
    if (!audio || !userValue) return;

    if (userValue === currentWord) {
      audio.src = Sfx.correct;
      setPoints(5);
      setXP(10);
      setLearntWords(1);
      setResultsWords(1);
      try {
        await audio.play();
      } catch (err) {
        console.error("Audio play failed:", err);
      }
      newWord();
    } else {
      newWord();
      audio.src = Sfx.wrong;
      setMistakes(1);
      setResultsMistakes(1);
      try {
        await audio.play();
      } catch (err) {
        console.error("Audio play failed:", err);
      }
    }
  };

  useEffect(() => {
    const handleNextWord = async () => {
      if (nextWordTimer === 0) {
        const newWord = await getWordFromDatamuse();
        setCurrentWord(newWord);
        speakWord(newWord);
        resetNextWord();
      }
    };

    handleNextWord();
  }, [nextWordTimer, resetNextWord]);

  useEffect(() => {
    if (!isPaused) {
      resume();
    } else {
      pause();
    }
  }, [isPaused, pause, resume]);

  const RepeatWord = () => {
    if (!currentWord) return;

    const msg = new SpeechSynthesisUtterance(currentWord);
    const voices = speechSynthesis.getVoices();
    msg.voice =
      voices.find((voice) => voice.lang.startsWith("en")) || voices[0];

    if (voices.length === 0) {
      speechSynthesis.onvoiceschanged = () => {
        msg.voice =
          speechSynthesis.getVoices().find((v) => v.lang.startsWith("en")) ||
          speechSynthesis.getVoices()[0];
        speechSynthesis.speak(msg);
      };
    } else {
      speechSynthesis.speak(msg);
    }
  };

  const handleGameOver = () => {
    router.push("/gameOver")
    resetTimer()
  }

  return (
    <div className="flex flex-col lg:gap-4 gap-10 items-center justify-center min-h-screen">
      <>
        <div className="flex gap-4 items-center justify-between w-full absolute top-5 px-4">
          <PlayerCard />
          <div className="flex gap-4 absolute left-[42%]">
            <TimerUI />
            <NextWordTick />
          </div>
          <MenuButton
            onClick={() => setIsPaused(true)}
            className="p-3 text-secondary border-border border-2"
            style={{
              backgroundColor: "#AF7F66",
            }}
          >
            <Pause className="stroke-1" />
          </MenuButton>
        </div>

        <form onSubmit={onSubmit} className="w-screen lg:p-20">
          <input
            ref={inputRef}
            type="text"
            placeholder="Spell The Word"
            className="w-full lg:p-20 lg:text-6xl text-4xl text-center focus:outline-none"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
        <div className="flex gap-4 items-center justify-center absolute bottom-10">
          <MenuButton
            className="p-4 text-secondary border-border border-2"
            onClick={RepeatWord}
            style={{
              backgroundColor: "#AF7F66",
            }}
          >
            Repeat
          </MenuButton>
          <MenuButton
            className="p-4 text-secondary border-border border-2"
            onClick={handleGameOver}
            style={{
              backgroundColor: "#AF7F66",
            }}
          >
            over
          </MenuButton>
        </div>
      </>
      <audio ref={audioRef} preload="auto" />

      {/* Pause Menu Overlay */}
      {isPaused && <PauseMenu resumeGame={() => setIsPaused(false)} />}
    </div>
  );
}

export default Page;
