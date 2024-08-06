"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Speech, Skull, DoorClosed, Shield, Lock } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export function WebNav() {
  const { data: session } = useSession();
  return (
    <nav className="hidden items-center gap-4 xl:flex">
      <Button
        className="border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
        asChild
        variant={"outline"}
      >
        <Link href={"/historias"} className="flex items-center gap-2">
          <span>HISTÓRIAS</span>
          <Speech size={18} />
        </Link>
      </Button>

      <Button
        className="border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
        asChild
        variant={"outline"}
      >
        <Link href={"/inimigos"} className="flex items-center gap-2">
          <span>INIMIGOS</span>
          <Skull size={18} />
        </Link>
      </Button>
      {session ? (
        <>
          <Button
            className="border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
            variant={"outline"}
          >
            <Link href="admin" className="flex items-center gap-2">
              <span>ADMIN</span>
              <Shield size={18} />
            </Link>
          </Button>
          <Button
            onClick={() => signOut()}
            variant={"outline"}
            className="flex items-center gap-2 border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
          >
            <span>SIGN OUT</span>
            <DoorClosed size={18} />
          </Button>
        </>
      ) : (
        <Button
          onClick={() => signIn("discord")}
          variant={"outline"}
          className="flex items-center gap-2 border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
        >
          <span>LOGIN</span>
          <Lock size={18} />
        </Button>
      )}
      <ThemeSwitcher />
    </nav>
  );
}
