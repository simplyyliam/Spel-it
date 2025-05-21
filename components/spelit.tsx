"use client";

import { FormEvent, useRef, useState } from "react";
import { SectionWrapper } from "./modals/SectionWrapper";
import { CustomCard } from "./UI/CustomCard";
import { Score } from "./UI/points";
import { CustomButton } from "./UI/CustomButton";
import Intro from "./UI/Intro";

type DatamuseWord = {
  word: string;
  score?: number;
  tags?: string[];
};  

function Spelit() {
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentWord, setCurrentWord] = useState("");
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);

  const Sfx = {
    wrong: "/SFX/Wrong.mp3",
    correct: "/SFX/Reward_1.mp3",
  };

const getWordFromDatamuse = async (): Promise<string> => {
  const res = await fetch("https://api.datamuse.com/words?ml=common&max=1000");
  const data: DatamuseWord[] = await res.json();

  const words = data
    .map((item) => item.word)
    .filter((w) => w.length <= 10);

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

  const onStart = async () => {
    setStarted(true);
    await setupWord();
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userValue = inputRef.current?.value.trim().toLowerCase();
    const audio = audioRef.current;
    if (!audio || !userValue) return;

    if (userValue === currentWord) {
      audio.src = Sfx.correct;
      setScore(score + 1);
      try {
        await audio.play();
      } catch (err) {
        console.error("Audio play failed:", err);
      }
      const newWord = await getWordFromDatamuse();
      setCurrentWord(newWord);
      speakWord(newWord);
      if (inputRef.current) inputRef.current.value = "";
    } else {
      audio.src = Sfx.wrong;
      try {
        await audio.play();
      } catch (err) {
        console.error("Audio play failed:", err);
      }
    }
  };

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
    <SectionWrapper className="flex flex-col lg:gap-4 gap-10 items-center justify-center min-h-screen">
      {!started ? (
        <Intro onclick={onStart}/>
      ) : (
        <>
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
          <CustomCard>
            <Score>{score}</Score>
          </CustomCard>
          <CustomButton onClick={RepeatWord}>Repeat</CustomButton>
        </>
      )}
      <audio ref={audioRef} preload="auto" />

    </SectionWrapper>
  );
}

export default Spelit;
