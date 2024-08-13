"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Manson() {
  const [isOvelha, setIsOvelha] = useState(true);
  const [isCiro, setIsCiro] = useState(false);

  function handleIsOvelha() {
    setIsOvelha(true);
    setIsCiro(false);
  }

  function handleIsCiro() {
    setIsOvelha(false);
    setIsCiro(true);
  }
  return (
    <div className="container flex h-[calc(100vh-7.75rem)] flex-col items-center gap-20">
      <div className="mt-8 flex w-full flex-col items-center justify-between gap-4 lg:flex-row">
        <p className="text-center text-lg font-semibold">
          Sala da revolta: assista sem dar dinheiro para esses vagabundos
        </p>
        <nav className="flex items-center gap-4">
          <Button onClick={handleIsOvelha} variant={"outline"}>
            Assistir Ovelha
          </Button>
          <Button onClick={handleIsCiro} variant={"outline"}>
            Assistir Ciro
          </Button>
        </nav>
      </div>
      {isOvelha && (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-3xl font-semibold">Ovelha</p>
          <div className="flex gap-1">
            <iframe
              src="https://player.twitch.tv/?channel=ovelhera&parent=rastaflix.vercel.app"
              allowFullScreen
              scrolling="no"
              className="h-[250px] w-[350px] lg:h-[450px] lg:w-[700px]"
            ></iframe>
            <iframe
              id="chat_embed"
              src="https://www.twitch.tv/embed/ovelhera/chat?parent=rastaflix.vercel.app"
              className="h-[250px] w-[150px] lg:h-[450px] lg:w-[400px]"
            ></iframe>
          </div>
        </div>
      )}
      {isCiro && (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-3xl font-semibold">Ciro</p>
          <div className="flex gap-1">
            <iframe
              src="https://player.twitch.tv/?channel=ciromtv&parent=rastaflix.vercel.app"
              allowFullScreen
              scrolling="no"
              className="h-[250px] w-[350px] lg:h-[450px] lg:w-[700px]"
            ></iframe>
            <iframe
              id="chat_embed"
              src="https://www.twitch.tv/embed/ciromtv/chat?parent=rastaflix.vercel.app"
              className="h-[250px] w-[150px] lg:h-[450px] lg:w-[400px]"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
