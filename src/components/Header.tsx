import React from "react";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "./ui/separator";
import WebNav from "./WebNav";
import MobileNav from "./MobileNav";

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
        <WebNav />
        <MobileNav />
      </header>
      <Separator className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 " />
    </div>
  );
}
