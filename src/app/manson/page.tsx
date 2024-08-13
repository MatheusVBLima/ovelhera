import React from "react";

export default function page() {
  return (
    <div className="flex h-[calc(100vh-7.75rem)] items-center justify-center gap-6">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-3xl font-semibold">Ovelha</p>
        <iframe
          src="https://player.twitch.tv/?channel=ovelhera&parent=rastaflix.vercel.app"
          allowFullScreen
          scrolling="no"
          height="378"
          width="620"
        ></iframe>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-3xl font-semibold">Ciro</p>
        <iframe
          src="https://player.twitch.tv/?channel=ciromtv&parent=rastaflix.vercel.app"
          allowFullScreen
          scrolling="no"
          height="378"
          width="620"
        ></iframe>
      </div>
    </div>
  );
}
