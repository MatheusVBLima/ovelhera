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
import data from "@/../data.json";
import { useState } from "react";

export default function Historias() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.videos.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" ? true : item.tag.includes(selectedCategory);
    const matchesSearchTerm = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

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
                {item.tag.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
