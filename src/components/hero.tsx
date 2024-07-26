"use client";
import React from "react";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";

export default function Heor() {
  return (
    <div className="flex flex-col items-center justify-center bg-background container mx-auto">
      <TextRevealCard text="Hey, I got a secret" revealText="You're amazing!">
        <TextRevealCardTitle>Chill and chat</TextRevealCardTitle>
        <TextRevealCardDescription>
          I wonder what's underneath all the secrecy 😜
        </TextRevealCardDescription>
      </TextRevealCard>
      {/* <button className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">
        Keep holding
      </button> */}
    </div>
  );
}
