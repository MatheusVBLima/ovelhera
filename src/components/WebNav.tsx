"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Speech, Skull, DoorClosed, Shield, Home } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export function WebNav() {
  async function handleSignOut() {
    await signOut({ callbackUrl: "/" });
  }
  const { data: session } = useSession();
  return (
    <nav className="hidden items-center gap-4 xl:flex">
      {!session && (
        <Button
          className="border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
          asChild
          variant={"outline"}
        >
          <Link href={"/"} className="flex items-center gap-2">
            <span>HOME</span>
            <Home size={18} />
          </Link>
        </Button>
      )}
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
      {session && (
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
            onClick={handleSignOut}
            variant={"outline"}
            className="flex items-center gap-2 border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
          >
            <span>SIGN OUT</span>
            <DoorClosed size={18} />
          </Button>
        </>
      )}
      <ThemeSwitcher />
    </nav>
  );
}
