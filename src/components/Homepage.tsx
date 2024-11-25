"use client";
import Image from "next/image";
import { Badge } from "./ui/badge";


export function Homepage() {
  return (
    <div className="lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <h1 className="text-center text-3xl font-bold">Rastaflix</h1>
          <p className="text-center text-lg">
            Acompanhe as histórias do nosso querido Gabriel Scutasu
          </p>
          <p className="text-center text-lg">
            Também conhecido como
          </p>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Badge variant="rasta">PK</Badge>
            <Badge variant="rasta">Charles Manson</Badge>
            <Badge variant="rasta">Givaldo</Badge>
            <Badge variant="rasta">Rasta</Badge>
            <Badge variant="rasta">Ovelha</Badge>
            <Badge variant="rasta">Tempero</Badge>
            <Badge variant="rasta">Truman</Badge>
            <Badge variant="rasta">Barão Vermelho</Badge>
            <Badge variant="rasta">Rainhu</Badge>
            <Badge variant="rasta">Arame liso</Badge>
            <Badge variant="rasta">Professor maconha</Badge>
            <Badge variant="rasta">Sazon</Badge>
            <Badge variant="rasta">MVP</Badge>
            <Badge variant="rasta">Lázaro</Badge>
            <Badge variant="rasta">Geladeira de pobre</Badge>
            <Badge variant="rasta">Chapeiro</Badge>
            <Badge variant="rasta">Gonorasta</Badge>
            <Badge variant="rasta">Voyeur</Badge>
            <Badge variant="rasta">Tio Paulo</Badge>
            <Badge variant="rasta">Tributera</Badge>
            <Badge variant="rasta">Kiko</Badge>
            <Badge variant="rasta">Múmia triste</Badge>
            <Badge variant="rasta">Dono da bola</Badge>
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
