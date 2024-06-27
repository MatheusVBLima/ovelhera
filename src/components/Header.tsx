import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "./ui/separator";
import WebNav from "./WebNav";
import MobileNav from "./MobileNav";

export function Header() {
  return (
    <div className="z-100 sticky top-0 bg-background">
      <header className="container flex items-center justify-between py-6">
        <span>
          <Link href={"/"}>
            <Image
              src={"/ovelha.png"}
              alt="Logo"
              width={100}
              height={100}
              className="rounded-full"
            />
          </Link>
        </span>
        <WebNav />
        <MobileNav />
      </header>
      <Separator className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" />
    </div>
  );
}
