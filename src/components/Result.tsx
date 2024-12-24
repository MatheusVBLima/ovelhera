'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart'
import type { CategoryResult } from '@/data/results'
import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'

interface ResultProps {
  data: CategoryResult
}

export function Result({ data }: ResultProps) {
  const sortedResults = [...data.results].sort((a, b) => b.votes - a.votes)
  const chartData = sortedResults.map(result => ({
    option: result.option,
    votes: result.votes,
  }))

  const chartConfig = {
    votes: {
      label: 'Votos',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig

  const totalVotes = sortedResults.reduce((sum, item) => sum + item.votes, 0)
  const winnerPercentage = ((sortedResults[0]?.votes || 0) / totalVotes) * 100

  const hasDrawn = sortedResults[1]?.votes === sortedResults[0]?.votes
  const drawnOptions = sortedResults
    .filter(result => result.votes === sortedResults[0]?.votes)
    .map(result => result.option)
    .join(' e ')

  return (
    <Card
      className={`bg-background/50 ${
        data.title === 'Viewer do ano'
          ? 'bg-[url(/temperox.jpg)] bg-cover bg-center text-white font-bold'
          : ''
      }`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">{data.title}</CardTitle>
        <CardDescription
          className={`${
            data.title === 'Viewer do ano'
              ? 'text-white'
              : 'text-muted-foreground'
          }`}
        >
          {data.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        {data.title !== 'Viewer do ano' ? (
          <ChartContainer config={chartConfig}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{}}
              height={200}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="option"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                fontSize={12}
                width={120}
                tick={{
                  fill: data.title === 'Viewer do ano' ? 'white' : 'white',
                  fontSize: 14,
                }}
              />
              <ChartTooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Votos
                        </span>
                        <span className="font-bold">{payload[0].value}</span>
                      </div>
                    </div>
                  )
                }}
              />
              <Bar
                dataKey="votes"
                fill={
                  data.title === 'Viewer do ano'
                    ? 'hsl(240 5.9% 10%)'
                    : 'hsl(156.2 71.6% 66.9%)'
                }
                radius={5}
                barSize={30}
              />
            </BarChart>
          </ChartContainer>
        ) : null}
      </CardContent>

      <CardFooter
        className={`flex-col items-start gap-2 pt-2 text-xs ${
          data.title === 'Viewer do ano' ? 'text-white' : ''
        }`}
      >
        <div className="flex items-center gap-2 font-medium">
          {hasDrawn ? (
            <>
              Empate entre {drawnOptions} com {winnerPercentage.toFixed(1)}%{' '}
              <TrendingUp className="h-3 w-3" />
            </>
          ) : (
            <>
              {sortedResults[0]?.option} venceu com{' '}
              {winnerPercentage.toFixed(1)}% <TrendingUp className="h-3 w-3" />
            </>
          )}
        </div>
        <div
          className={`flex-col items-start gap-2 pt-2 text-xs ${
            data.title === 'Viewer do ano'
              ? 'text-white'
              : 'text-muted-foreground'
          }`}
        >
          Total de {totalVotes} votos nesta categoria
        </div>
      </CardFooter>
    </Card>
  )
}
