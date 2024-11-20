"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "./MobileNav";
import { Separator } from "./ui/separator";
import { WebNav } from "./WebNav";

export function Header() {
  const { data } = useSession();
  const user = data?.user?.name;
  
  return (
    <div className="sticky top-0 z-10 bg-background">
      <header className="container flex items-center justify-between py-6">
        <div className="flex items-center gap-6">
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              alt="Logo"
              width={75}
              height={75}
              className="rounded-full"
            />
          </Link>
          {user && (
            <p className="text-lg text-white">
              Olá, {user}
            </p>
          )}
        </div>
        <WebNav />
        <MobileNav />
      </header>
      <Separator className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" />
    </div>
  );
}
