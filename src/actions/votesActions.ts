'use server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const voteSchema = z.object({
  userId: z.string(),
  category: z.string(),
  option: z.string(),
})

export async function addVote(input: z.infer<typeof voteSchema>) {
  const existingVote = await prisma.vote.findFirst({
    where: {
      userId: input.userId,
      category: input.category,
    },
  })

  if (existingVote) {
    throw new Error('Você já votou nesta categoria')
  }

  const vote = await prisma.vote.create({
    data: {
      userId: input.userId,
      category: input.category,
      option: input.option,
    },
  })

  return vote
}

export async function getVotesByCategory(category: string) {
  const votes = await prisma.vote.findMany({
    where: {
      category,
    },
  })

  return votes
}

export async function getUserVotes(userId: string) {
  const votes = await prisma.vote.findMany({
    where: {
      userId,
    },
  })

  return votes
}
