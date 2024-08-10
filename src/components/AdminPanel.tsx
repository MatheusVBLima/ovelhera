"use client";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormAddNewVideo } from "./videos/FormAddNewVideo";
import { FormEditVideo } from "./videos/FormEditVideo";
import { FormDeleteVideo } from "./videos/FormDeleteVideo";
import { FormLogs } from "./logs/TableVideoLogs";
import { FormAvengeEnemy } from "./vengeance/FormAvengeEnemy";
import { FormAddNewNameToVengeance } from "./vengeance/FormAddNewNameToVengeance";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { EnemiesLogs } from "./logs/TableEnemiesLogs";

export function AdminPanel() {
  const { data: session } = useSession();
  const image = session?.user?.image || "";
  const [isAddNewVideo, setIsAddNewVideo] = useState(true);
  const [isDeleteVideo, setIsDeleteVideo] = useState(false);
  const [isLogs, setIsLogs] = useState(false);
  const [isVengeance, setIsVengeance] = useState(false);
  const [isAddVengeance, setIsAddVengeance] = useState(false);
  const [isVengeanceLogs, setIsVengeanceLogs] = useState(false);
  const [isEditVideo, setIsEditVideo] = useState(false);

  function handleDeleteVideo() {
    setIsAddNewVideo(false);
    setIsLogs(false);
    setIsDeleteVideo(true);
    setIsVengeance(false);
    setIsAddVengeance(false);
    setIsVengeanceLogs(false);
    setIsEditVideo(false);
  }

  function handleAddNewVideo() {
    setIsDeleteVideo(false);
    setIsLogs(false);
    setIsAddNewVideo(true);
    setIsVengeance(false);
    setIsAddVengeance(false);
    setIsVengeanceLogs(false);
    setIsEditVideo(false);
  }

  function handleEditVideo() {
    setIsAddNewVideo(false);
    setIsDeleteVideo(false);
    setIsLogs(false);
    setIsVengeance(false);
    setIsAddVengeance(false);
    setIsVengeanceLogs(false);
    setIsEditVideo(true);
  }

  function handleLogs() {
    setIsAddNewVideo(false);
    setIsDeleteVideo(false);
    setIsLogs(true);
    setIsVengeance(false);
    setIsAddVengeance(false);
    setIsVengeanceLogs(false);
    setIsEditVideo(false);
  }

  function handleVengeance() {
    setIsAddNewVideo(false);
    setIsDeleteVideo(false);
    setIsLogs(false);
    setIsVengeance(true);
    setIsAddVengeance(false);
    setIsVengeanceLogs(false);
    setIsEditVideo(false);
  }

  function handleAddVengeance() {
    setIsAddNewVideo(false);
    setIsDeleteVideo(false);
    setIsLogs(false);
    setIsVengeance(false);
    setIsAddVengeance(true);
    setIsVengeanceLogs(false);
    setIsEditVideo(false);
  }

  function handleIsVengeanceLogs() {
    setIsAddNewVideo(false);
    setIsDeleteVideo(false);
    setIsLogs(false);
    setIsVengeance(false);
    setIsAddVengeance(false);
    setIsVengeanceLogs(true);
    setIsEditVideo(false);
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
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Histórias</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] grid-cols-1 gap-3 p-4 md:w-[300px]">
                        <NavigationMenuLink>
                          <Button
                            onClick={handleAddNewVideo}
                            variant={"outline"}
                            className="w-full"
                          >
                            Nova História
                          </Button>
                        </NavigationMenuLink>
                        <NavigationMenuLink>
                          <Button
                            onClick={handleEditVideo}
                            variant={"outline"}
                            className="w-full"
                          >
                            Editar História
                          </Button>
                        </NavigationMenuLink>
                        <NavigationMenuLink>
                          <Button
                            onClick={handleDeleteVideo}
                            variant={"destructive"}
                            className="w-full"
                          >
                            Deletar História
                          </Button>
                        </NavigationMenuLink>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Logs</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] grid-cols-1 gap-3 p-4 md:w-[300px]">
                        <NavigationMenuLink>
                          <Button
                            onClick={handleLogs}
                            variant={"outline"}
                            className="w-full"
                          >
                            Ver Logs de Vídeos
                          </Button>
                        </NavigationMenuLink>
                        <NavigationMenuLink>
                          <Button
                            onClick={handleIsVengeanceLogs}
                            variant={"outline"}
                            className="w-full"
                          >
                            Ver Logs de Vingança
                          </Button>
                        </NavigationMenuLink>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Vingança</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] grid-cols-1 gap-3 p-4 md:w-[300px]">
                        <NavigationMenuLink>
                          <Button
                            onClick={handleAddVengeance}
                            variant={"outline"}
                            className="w-full"
                          >
                            Adicionar nome na lista
                          </Button>
                        </NavigationMenuLink>
                        <NavigationMenuLink>
                          <Button
                            onClick={handleVengeance}
                            variant={"outline"}
                            className="w-full"
                          >
                            Vingar
                          </Button>
                        </NavigationMenuLink>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          {isAddNewVideo && <FormAddNewVideo />}
          {isLogs && <FormLogs />}
          {isDeleteVideo && <FormDeleteVideo />}
          {isVengeance && <FormAvengeEnemy />}
          {isAddVengeance && <FormAddNewNameToVengeance />}
          {isVengeanceLogs && <EnemiesLogs />}
          {isEditVideo && <FormEditVideo />}
        </>
      )}
    </div>
  );
}
