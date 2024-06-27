"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Speech, Skull } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

export default function WebNav() {
  const { data: session } = useSession();
  return (
    <nav className="hidden items-center gap-4 xl:flex">
      <Button
        className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
        asChild
      >
        <Link href={"/historias"} className="flex items-center gap-2">
          <span className="font-semibold">HISTÓRIAS</span>
          <Speech className="animate-bounce" />
        </Link>
      </Button>

      <Button
        className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-600"
        asChild
      >
        <Link href={"/inimigos"} className="flex items-center gap-2">
          <span className="font-semibold">INIMIGOS</span>
          <Skull className="animate-bounce" />
        </Link>
      </Button>
      {session ? (
        <Button variant={"outline"}>
          <Link href="admin"> Admin</Link>
        </Button>
      ) : (
        <Button onClick={() => signIn("discord")} variant={"outline"}>
          Login
        </Button>
      )}
      <ThemeSwitcher />
    </nav>
  );
}
