import React from "react";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Link from "next/link";

export function Header() {
  return (
    <div className="sticky top-0 bg-background">
      <header className="container py-6 flex items-center justify-between">
        <span>
          <Link href={"/"}>Logo</Link>
        </span>
        <nav className="flex items-center gap-4">
          <Button variant="default" asChild>
            <Link href={"/historias"}>Histórias</Link>
          </Button>
          <Button variant="default" asChild>
            <Link href={"/inimigos"}>Inimigos</Link>
          </Button>
          <ThemeSwitcher />
        </nav>
      </header>
    </div>
  );
}
