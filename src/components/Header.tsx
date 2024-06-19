import React from "react";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "./ui/separator";

export function Header() {
  return (
    <div className="sticky top-0 bg-background z-100">
      <header className="container py-6 flex items-center justify-between">
        <span>
          <Link href={"/"}>
            <Image
              src={"/ovelha.png"}
              alt="Logo"
              width={100}
              height={100}
              className="rounded-full "
            />
          </Link>
        </span>
        <nav className="flex items-center gap-4">
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
      </header>
      <Separator className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 " />
    </div>
  );
}
