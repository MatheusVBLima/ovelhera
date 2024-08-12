"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export function MobileNav() {
  async function handleSignOut() {
    await signOut({ callbackUrl: "/" });
  }
  const { data: session } = useSession();
  return (
    <nav className="xl:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              className="border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
              asChild
              variant={"outline"}
            >
              <Link href={"/historias"} className="flex items-center gap-2">
                <span>HISTÓRIAS</span>
              </Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              className="border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
              asChild
              variant={"outline"}
            >
              <Link href={"/inimigos"} className="flex items-center gap-2">
                <span>INIMIGOS</span>
              </Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {session && (
              <>
                <Button
                  className="border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
                  variant={"outline"}
                >
                  <Link href="admin" className="flex items-center gap-2">
                    <span>ADMIN</span>
                  </Link>
                </Button>
                <Button
                  onClick={handleSignOut}
                  variant={"outline"}
                  className="flex items-center gap-2 border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
                >
                  <span>SIGN OUT</span>
                </Button>
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <ThemeSwitcher />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
