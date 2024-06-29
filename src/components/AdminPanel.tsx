"use client";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import FormAddNewVideo from "./FormAddNewVideo";
import FormDeleteVideo from "./FormDeleteVideo";
import FormLogs from "./FormLogs";

export default function AdminPanel() {
  const { data: session } = useSession();
  const image = session?.user?.image || "";
  const [isAddNewVideo, setIsAddNewVideo] = useState(true);
  const [isDeleteVideo, setIsDeleteVideo] = useState(false);
  const [isLogs, setIsLogs] = useState(false);

  function handleDeleteVideo() {
    setIsAddNewVideo(false);

    setIsLogs(false);
    setIsDeleteVideo(true);
  }

  function handleAddNewVideo() {
    setIsDeleteVideo(false);
    setIsLogs(false);
    setIsAddNewVideo(true);
  }

  function handleLogs() {
    setIsAddNewVideo(false);
    setIsDeleteVideo(false);
    setIsLogs(true);
  }

  return (
    <div className="container mt-8">
      {session && (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={image} alt="Avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-xl">Olá, {session.user?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={handleAddNewVideo} variant={"outline"}>
                Novo Vídeo
              </Button>
              <Button onClick={handleLogs} variant={"outline"}>
                Logs
              </Button>
              <Button onClick={handleDeleteVideo} variant={"destructive"}>
                Deletar Vídeo
              </Button>
            </div>
          </div>
          {isAddNewVideo && <FormAddNewVideo />}
          {isLogs && <FormLogs />}
          {isDeleteVideo && <FormDeleteVideo />}
        </>
      )}
    </div>
  );
}
