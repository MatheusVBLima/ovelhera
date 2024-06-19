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

export default function MobileNav() {
  return (
    <nav className="xl:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 ">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 "
              asChild
            >
              <Link href={"/historias"}>Histórias</Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500   "
              asChild
            >
              <Link href={"/inimigos"}>Inimigos</Link>
            </Button>
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
