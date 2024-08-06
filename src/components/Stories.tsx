"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { getVideos } from "../actions/videosActions";
import { Skeleton } from "./ui/skeleton";

type Videos = {
  id: string;
  title: string;
  url: string;
  tags: {
    name: string;
  }[];
};

export function Stories() {
  const [videos, setVideos] = useState<Videos[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchVideos() {
      const videos = await getVideos();
      setVideos(videos);
      setLoading(false);
    }

    fetchVideos();
  }, []);

  const filteredData = videos.filter((item) => {
    const matchesCategory =
      selectedCategory === "all"
        ? true
        : item.tags.some((tag) => tag.name === selectedCategory);
    const matchesSearchTerm = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  if (loading) {
    return (
      <div className="container mt-8 flex h-screen flex-col gap-8">
        <div className="flex justify-between">
          <Skeleton className="h-[25px] w-[300px]" />
          <Skeleton className="h-[25px] w-[300px]" />
        </div>
        <div className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="h-[175px] w-[350px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-8">
      <div className="flex flex-col items-end justify-between gap-4 text-center md:flex-row md:items-center">
        <div className="flex items-center gap-2 text-center">
          <Label htmlFor="input">Pesquise uma história pelo nome</Label>
          <Input
            placeholder="Ex: ovelha leva gank ... "
            id="input"
            className="w-[200px] md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select onValueChange={(value) => setSelectedCategory(value)}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Filtre por categoria de vídeo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categorias</SelectLabel>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="nojeira">Nojeira</SelectItem>
              <SelectItem value="tempero">Tempero</SelectItem>
              <SelectItem value="modoM">ModoM</SelectItem>
              <SelectItem value="historias">Histórias</SelectItem>
              <SelectItem value="fetiches">Fetiches</SelectItem>
              <SelectItem value="rastarado">Rastarado</SelectItem>
              <SelectItem value="rastabi">Rasta bi</SelectItem>
              <SelectItem value="esculacho">Esculacho</SelectItem>
              <SelectItem value="gank">Gank</SelectItem>
              <SelectItem value="motivacional">Motivacional</SelectItem>
              <SelectItem value="opinioes">Opiniões</SelectItem>
              <SelectItem value="machismo">Machismo</SelectItem>
              <SelectItem value="piras">Piras</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredData.map((item) => {
          const videoId = new URL(item.url).searchParams.get("v");
          const embedUrl = `https://www.youtube.com/embed/${videoId}`;
          return (
            <Card key={item.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>Vídeo de id {item.id}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 items-end">
                <iframe
                  src={embedUrl}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="h-[300px] w-full"
                  allowFullScreen
                ></iframe>
              </CardContent>
              <CardFooter className="flex gap-4">
                {item.tags.map((tag, index) => (
                  <Badge key={index}>{tag.name}</Badge>
                ))}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
