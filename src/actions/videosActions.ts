"use server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const tagSchema = z.object({
  name: z.string(),
});

const videoSchema = z.object({
  title: z.string(),
  url: z.string(),
  tags: z.array(tagSchema),
});

export async function addVideo(input: z.infer<typeof videoSchema>) {
  const video = await prisma.video.create({
    data: {
      title: input.title,
      url: input.url,
      tags: {
        create: input.tags.map((tag) => ({
          name: tag.name,
        })),
      },
    },
  });
  return video;
}

export async function getVideos() {
  const videos = await prisma.video.findMany({
    include: {
      tags: true,
    },
  });
  return videos;
}

export async function getVideoById(id: string) {
  const video = await prisma.video.findUnique({
    where: {
      id,
    },
  });
  return video;
}

export async function deleteVideo(id: string) {
  const video = await prisma.video.delete({
    where: {
      id,
    },
  });
  return video;
}

export async function updateVideo(
  id: string,
  input: z.infer<typeof videoSchema>,
) {
  const video = await prisma.video.update({
    where: {
      id: id,
    },
    data: {
      title: input.title,
      url: input.url,
      tags: {
        create: input.tags.map((tag) => ({
          name: tag.name,
        })),
      },
    },
  });
  return video;
}
