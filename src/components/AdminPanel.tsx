"use client";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormAddNewVideo } from "./FormAddNewVideo";
import { FormDeleteVideo } from "./FormDeleteVideo";
import { FormLogs } from "./FormLogs";
import { FormVengeance } from "./FormVengeance";
import { FormAddNewNameToVengeance } from "./FormAddNewNameToVengeance";

export function AdminPanel() {
  const { data: session } = useSession();
  const image = session?.user?.image || "";
  const [isAddNewVideo, setIsAddNewVideo] = useState(true);
  const [isDeleteVideo, setIsDeleteVideo] = useState(false);
  const [isLogs, setIsLogs] = useState(false);
  const [isVengeance, setIsVengeance] = useState(false);
  const [isAddVengeance, setIsAddVengeance] = useState(false);

  function handleDeleteVideo() {
    setIsAddNewVideo(false);
    setIsLogs(false);
    setIsDeleteVideo(true);
    setIsVengeance(false);
    setIsAddVengeance(false);
  }

  function handleAddNewVideo() {
    setIsDeleteVideo(false);
    setIsLogs(false);
    setIsAddNewVideo(true);
    setIsVengeance(false);
    setIsAddVengeance(false);
  }

  function handleLogs() {
    setIsAddNewVideo(false);
    setIsDeleteVideo(false);
    setIsLogs(true);
    setIsVengeance(false);
    setIsAddVengeance(false);
  }

  function handleVengeance() {
    setIsAddNewVideo(false);
    setIsDeleteVideo(false);
    setIsLogs(false);
    setIsVengeance(true);
    setIsAddVengeance(false);
  }

  function handleAddVengeance() {
    setIsAddNewVideo(false);
    setIsDeleteVideo(false);
    setIsLogs(false);
    setIsVengeance(false);
    setIsAddVengeance(true);
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
              <Button onClick={handleAddVengeance} variant={"outline"}>
                Adicionar nome na lista
              </Button>
              <Button onClick={handleVengeance} variant={"outline"}>
                Vingar
              </Button>
            </div>
          </div>
          {isAddNewVideo && <FormAddNewVideo />}
          {isLogs && <FormLogs />}
          {isDeleteVideo && <FormDeleteVideo />}
          {isVengeance && <FormVengeance />}
          {isAddVengeance && <FormAddNewNameToVengeance />}
        </>
      )}
    </div>
  );
}
