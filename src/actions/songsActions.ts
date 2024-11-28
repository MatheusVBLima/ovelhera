"use server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";


const songSchema = z.object({
  title: z.string(),
  url: z.string(),
  
});

export async function addSong(input: z.infer<typeof songSchema>) {
  const song = await prisma.song.create({
    data: {
      title: input.title,   
      url: input.url,
    },
  });
  return song;
}

export async function getSongs() {
  const songs = await prisma.song.findMany();
  return songs;
}

export async function getSongById(id: string) {
  const song = await prisma.song.findUnique({
    where: {
      id,
    },
  });
  return song;
}

export async function deleteSong(id: string) {
  const song = await prisma.song.delete({
    where: {
      id,
    },
  });
  return song;
}

export async function updateVideo(
  id: string,
  input: z.infer<typeof songSchema>,
) {
  await prisma.song.update({
    where: {
      id: id,
    },
    data: {
      title: input.title,
      url: input.url,
    },
  });

  const song = await prisma.song.update({
    where: {
      id: id,
    },
    data: {
      title: input.title,
      url: input.url,
    },
  });

  return song;
}
