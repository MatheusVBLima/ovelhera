"use client";

import { Button } from "@/components/ui/button";
import { DoorOpen } from "lucide-react";
import { signIn } from "next-auth/react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export function LoginForm() {
  
  async function handleSignIn() {
    await signIn("discord", { callbackUrl: "/historias" });
  }
  
  return (
    <div className="container flex flex-col items-center justify-center">
      <Card>
        <CardHeader>  
          <h1 className="text-3xl font-bold text-center">Login para admin</h1>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-center">
            <p className="text-balance text-muted-foreground">
              Logue apenas se for um dos admins. Caso queira ver as histórias,
              não precisa logar
            </p>
            <p className="text-balance text-muted-foreground">
              Atualmente só temos login pelo discord
            </p>
          
        </CardContent>
        <CardFooter className="flex justify-center">
        <Button
              onClick={handleSignIn}
              variant={"outline"}
              className="flex items-center gap-2 border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
            >
              <span>LOGIN DISCORD</span>
              <DoorOpen size={18} />
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
