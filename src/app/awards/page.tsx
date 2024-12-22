'use client'

import { VoteResults } from '@/components/VoteResults'

export default function RastaAwardsResults() {
  return (
    <main className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Resultados da Votação</h1>
      <VoteResults />
    </main>
  )
}
