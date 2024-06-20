"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
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
import data from "@/data/data.json";
import { useState } from "react";
export default function Historias() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" ? true : item.tag.includes(selectedCategory);
    const matchesSearchTerm = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  return (
    <div className="container mt-8">
      <div className="flex flex-col items-end gap-4 md:flex-row text-center justify-between md:items-center">
        <div className="flex text-center items-center gap-2">
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
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
        {filteredData.map((item) => {
          const videoId = new URL(item.url).searchParams.get("v");
          const embedUrl = `https://www.youtube.com/embed/${videoId}`;
          return (
            <Card key={item.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 items-end flex ">
                <iframe
                  src={embedUrl}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="w-full h-[300px]"
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
