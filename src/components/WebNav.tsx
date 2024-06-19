import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function WebNav() {
  return (
    <nav className="hidden xl:flex items-center gap-4">
      <Button
        className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 hover:animate-bounce"
        asChild
      >
        <Link href={"/historias"}>Histórias</Link>
      </Button>
      <Button
        className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500   hover:animate-bounce"
        asChild
      >
        <Link href={"/inimigos"}>Inimigos</Link>
      </Button>
      <ThemeSwitcher />
    </nav>
  );
}
