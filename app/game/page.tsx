"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UIButton } from "@/components/core/UI/UI_Button";
import TimerUI from "@/components/core/UI/TimerUI";
import { useTimerStore } from "@/stores/TimerStore";
import NextWordTick from "@/components/core/UI/NextWordTimer";
import { usePlayerStore } from "@/stores/PlayerStore";

type DatamuseWord = {
  word: string;
  score?: number;
  tags?: string[];
};

function Page() {
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentWord, setCurrentWord] = useState("");
  const { timer, nextWordTimer, reset } = useTimerStore();
  const {setPoints, setXP, points, setLearntWords, setMistakes} = usePlayerStore()
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
      router.push("/");
    }
  }, [timer, router]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userValue = inputRef.current?.value.trim().toLowerCase();
    const audio = audioRef.current;
    if (!audio || !userValue) return;

    if (userValue === currentWord) {
      audio.src = Sfx.correct;
      setPoints(5)
      setXP(10)
      setLearntWords(1);
      try {
        await audio.play();
      } catch (err) {
        console.error("Audio play failed:", err);
      }
      const newWord = await getWordFromDatamuse();
      setCurrentWord(newWord);
      speakWord(newWord);
      reset();
      if (inputRef.current) inputRef.current.value = "";
    } else {
      const newWord = await getWordFromDatamuse();
      setCurrentWord(newWord);
      speakWord(newWord);
      reset();
      audio.src = Sfx.wrong;
      setMistakes(1);
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
        reset();
      }
    };

    handleNextWord();
  }, [nextWordTimer, reset]);

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

  return (
    <div className="flex flex-col lg:gap-4 gap-10 items-center justify-center min-h-screen">
      <>
        <div className="flex gap-4 items-center justify-center absolute top-10">
          <TimerUI />
          <NextWordTick />
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
        <div>
          <div>{points}</div>
        </div>
        <div className="flex gap-4 items-center justify-center absolute bottom-10">
          <UIButton className="p-4" onClick={RepeatWord}>
            Repeat
          </UIButton>
          <UIButton className="p-4">
            <Link href="/">Leave Game</Link>
          </UIButton>
        </div>
      </>
      <audio ref={audioRef} preload="auto" />
    </div>
  );
}

export default Page;
