"use server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const logsVideoSchema = z.object({
  name: z.string(),
  action: z.string(),
  url: z.string().url(),
  date: z.string(),
});

const getLogsVideoSchema = z.object({
  id: z.string(),
  name: z.string(),
  action: z.string(),
  url: z.string().url().nullable(),
  date: z.string(),
});

const logsVengeanceSchema = z.object({
  name: z.string(),
  action: z.string(),
  enemy: z.string(),
  date: z.string(),
});

const logsSongSchema = z.object({
  name: z.string(),
  action: z.string(),
  url: z.string().url(),
  date: z.string(),
});




export async function getVengeanceLogs(): Promise<
  z.infer<typeof logsVengeanceSchema>[]
> {
  const logs = await prisma.logsVengeance.findMany({
    orderBy: {
      date: 'desc'
    }
  });
  return logs;
}

export async function addVengeanceLog(
  input: z.infer<typeof logsVengeanceSchema>,
) {
  const log = await prisma.logsVengeance.create({
    data: {
      name: input.name,
      action: input.action,
      enemy: input.enemy,
      date: input.date,
    },
  });
  return log;
}

export async function getVideoLogs(): Promise<
  z.infer<typeof getLogsVideoSchema>[]
> {
  const logs = await prisma.logsVideo.findMany({
    orderBy: {
      date: 'desc'
    }
  });
  return logs;
}

export async function addVideoLog(input: z.infer<typeof logsVideoSchema>) {
  const log = await prisma.logsVideo.create({
    data: {
      name: input.name,
      action: input.action,
      url: input.url,
      date: input.date,
    },
  });
  return log;
}

export async function addSongLog(input: z.infer<typeof logsSongSchema>) {
  const log = await prisma.logsSong.create({
    data: input,
  });
  return log;
}

export async function getSongLogs(): Promise<
  z.infer<typeof logsSongSchema>[]
> {
  const logs = await prisma.logsSong.findMany({
    orderBy: {
      date: 'desc'
    }
  });
  return logs;
}

