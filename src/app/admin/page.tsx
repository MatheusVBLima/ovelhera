"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Admin() {
  const { data: session } = useSession();
  const image = session?.user?.image || "";
  return (
    <>
      {session && (
        <>
          <h1>Welcome</h1>
          <Button onClick={() => signOut()}>Sign Out</Button>
          <p>{session.user?.name}</p>
          <p>{session.user?.email}</p>
          <p>{session.user?.image}</p>
          <Image src={image} alt="imagem" width={100} height={100} />
          <p>{JSON.stringify(session)}</p>
        </>
      )}
    </>
  );
}
