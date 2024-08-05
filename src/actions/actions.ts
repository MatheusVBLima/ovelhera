"use server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const getEnemySchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
});

const addEnemySchema = z.object({
  name: z.string(),
  status: z.string(),
});

const updateEnemyStatusSchema = z.object({
  id: z.number(),
});

export async function getEnemyList(): Promise<
  z.infer<typeof getEnemySchema>[]
> {
  const enemies = await prisma.enemy.findMany();
  return enemies;
}

export async function addEnemy(input: z.infer<typeof addEnemySchema>) {
  const enemy = await prisma.enemy.create({
    data: {
      name: input.name,
      status: input.status,
    },
  });
  return enemy;
}

export async function getEnemyById(id: number) {
  const enemy = await prisma.enemy.findUnique({
    where: { id },
  });
  return enemy;
}

export async function updateEnemyStatus(
  input: z.infer<typeof updateEnemyStatusSchema>,
) {
  const enemy = await prisma.enemy.findUnique({
    where: { id: input.id },
  });

  if (!enemy) {
    throw new Error("Enemy not found");
  }

  if (enemy.status === "vingado") {
    throw new Error("Enemy is already marked as vingado");
  }

  const updatedEnemy = await prisma.enemy.update({
    where: { id: input.id },
    data: { status: "vingado" },
  });

  return updatedEnemy;
}
