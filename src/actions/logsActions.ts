"use server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const logsVideoSchema = z.object({
  id: z.string(),
  name: z.string(),
  action: z.string(),
  url: z.string().url(),
  date: z.coerce.date(),
});

const logsVengeanceSchema = z.object({
  name: z.string(),
  action: z.string(),
  enemy: z.string(),
  date: z.string(),
});
export async function getLogs(): Promise<
  z.infer<typeof logsVengeanceSchema>[]
> {
  const logs = await prisma.logsVengeance.findMany();
  return logs;
}

export async function addLogVengeance(
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
