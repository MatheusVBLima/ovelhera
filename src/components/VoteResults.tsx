'use client'
import { results } from '@/data/results'
import { Result } from './Result'

export function VoteResults() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {Object.values(results).map(categoryResult => (
        <Result key={categoryResult.title} data={categoryResult} />
      ))}
    </div>
  )
}
