"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Speech, Skull } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function WebNav() {
  /*  const router = useRouter();

  async function handleLogin() {
    const result = await signIn("discord");
    router.push("/admin");
  } */

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
        <>
          <Button className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-600 font-semibold">
            <Link href="admin">ADMIN</Link>
          </Button>
          <Button
            onClick={() => signOut()}
            className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-600 font-semibold"
          >
            SIGN OUT
          </Button>
        </>
      ) : (
        <Button
          onClick={() => signIn("discord")}
          className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-600 font-semibold"
        >
          LOGIN
        </Button>
      )}
      <ThemeSwitcher />
    </nav>
  );
}
