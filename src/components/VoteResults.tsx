'use client'
import { getVotesByCategory } from '@/actions/votesActions'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { categories } from '@/data/categories'
import { useEffect, useState } from 'react'

type VoteCount = {
  option: string
  count: number
}

type CategoryResults = {
  [key: string]: VoteCount[]
}

export function VoteResults() {
  const [results, setResults] = useState<CategoryResults>({})

  useEffect(() => {
    async function loadResults() {
      const categoryIds = Object.keys(categories)
      const allResults: CategoryResults = {}

      for (const category of categoryIds) {
        const votes = await getVotesByCategory(category)
        const voteCounts: { [key: string]: number } = {}

        for (const vote of votes) {
          voteCounts[vote.option] = (voteCounts[vote.option] || 0) + 1
        }

        allResults[category] = Object.entries(voteCounts).map(
          ([option, count]) => ({
            option,
            count,
          })
        )
      }

      setResults(allResults)
    }

    loadResults()
  }, [])

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(results).map(([category, votes]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle>{categories[category]?.title || category}</CardTitle>
            <CardDescription>Resultados parciais</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {votes
                .sort((a, b) => b.count - a.count)
                .map(vote => (
                  <div key={vote.option} className="flex justify-between">
                    <span>{vote.option}</span>
                    <span className="font-bold">{vote.count} votos</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
