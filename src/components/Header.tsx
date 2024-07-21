import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { WebNav } from "./WebNav";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <div className="sticky top-0 z-10 bg-background">
      <header className="container flex items-center justify-between py-6">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={75}
            height={75}
            className="rounded-full"
          />
        </Link>

        <WebNav />
        <MobileNav />
      </header>
      <Separator className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" />
    </div>
  );
}
