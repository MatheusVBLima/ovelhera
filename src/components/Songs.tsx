"use client";

import {
  Card,
  CardContent,
  CardDescription, CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import fallbackImage from "../../public/ovelha.png";
import { getSongs } from "../actions/songsActions";
import { Skeleton } from "./ui/skeleton";

type Songs = {
  id: string;
  title: string;
  url: string;
};

export function Songs() {
  const [songs, setSongs] = useState<Songs[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [failedThumbnails, setFailedThumbnails] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchVideos() {
      const songs = await getSongs();
      setSongs(songs);
      setLoading(false);
    }

    fetchVideos();
  }, []);

  const filteredData = songs.filter((item) => {
    const matchesCategory =
      selectedCategory === "all"
        ? true
        : item.title === selectedCategory;
    const matchesSearchTerm = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  if (loading) {
    return (
      <div className="container mt-8 flex h-screen flex-col gap-8">
        <div className="flex justify-between">
          <Skeleton className="h-[25px] w-[400px]" />
          <Skeleton className="h-[25px] w-[400px]" />
        </div>
        <div className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="h-[200px] w-[400px] rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="container mt-8 flex h-screen flex-col gap-8">
        <h1 className="text-center text-2xl">
          Nenhuma música encontrada. Adicione músicas no painel de
          administração{" "}
          <Link href="/admin" className="underline">
            aqui
          </Link>
        </h1>
      </div>
    );
  }


  return (
    <div className="container mt-8">
      <div className="flex flex-col items-end justify-between gap-4 text-center md:flex-row md:items-center">
        <div className="w-full flex flex-col md:flex-row items-center gap-4 text-center">
          <Label htmlFor="input">Pesquise uma música pelo nome</Label>
          <Input
            placeholder="Ex: Manson Manson"
            id="input"
            className="md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

        {filteredData.length === 0 ? (
          <div className="flex items-center justify-center mt-14">
            <p className="text-center text-2xl text-muted-foreground font-bold ">
              Nenhuma música encontrada com essa tag.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredData.map((item) => {
                 const videoId = new URL(item.url).searchParams.get("v");
                 const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            return (
              <Card key={item.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>Música de id {item.id}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 items-end">
                  <Link 
                    href={item.url} 
                    target="_blank"
                    className="relative h-[300px] w-full overflow-hidden rounded-md"
                  >
                    <Image
                      loading="lazy"
                      src={failedThumbnails.has(item.id) ? fallbackImage : thumbnailUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={() => {
                        setFailedThumbnails(prev => new Set(Array.from(prev).concat(item.id)));
                      }}
                    />
                  </Link>
                </CardContent>
              </Card>
              );
            })}
          </div>
        )}
      </div>
   
  );
}
