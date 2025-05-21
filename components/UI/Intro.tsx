'use client'

import React, { useEffect, useRef } from "react";
import { Title } from "../modals/Title";
import { CustomButton } from "./CustomButton";
import gsap from "gsap";

interface props {
  onclick: () => void
}

function Intro({onclick}:props) {

  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current, {
        opacity: 1,
        duration: 0.4,
        ease: "linear"
      })
    }
  })

  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <Title>Hear It. Spell It. Nail It</Title>
      <CustomButton ref={ref}  onClick={onclick} className=" opacity-0">Legs Go!</CustomButton>
    </div>
  );
}

export default Intro;
