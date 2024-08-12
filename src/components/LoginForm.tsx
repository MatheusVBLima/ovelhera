"use client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DoorOpen } from "lucide-react";
import { signIn } from "next-auth/react";
export function LoginForm() {
  return (
    <div className="lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login para admin</h1>
            <p className="text-balance text-muted-foreground">
              Logue apenas se for um dos admins. Caso queira ver as histórias,
              não precisa logar
            </p>
            <p className="text-balance text-muted-foreground">
              Atualmente só temos login pelo discord
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                disabled
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" disabled />
            </div>
            <Button
              onClick={() => signIn("discord")}
              variant={"outline"}
              className="flex items-center gap-2 border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
            >
              <span>LOGIN DISCORD</span>
              <DoorOpen size={18} />
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:flex">
        <Image
          src="/hero.png"
          alt="Givaldo"
          width="1080"
          height="850"
          className="h-[calc(100vh-7.75rem)] w-[900px] object-cover dark:brightness-[0.4] dark:grayscale"
        />
      </div>
    </div>
  );
}
