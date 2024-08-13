import React from "react";

export default function page() {
  return (
    <div className="flex h-[calc(100vh-7.75rem)] items-center justify-center">
      <iframe
        src="https://player.twitch.tv/?channel=ovelhera&parent=rastaflix.vercel.app"
        allowFullScreen
        scrolling="no"
        height="378"
        width="620"
      ></iframe>
    </div>
  );
}
