'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'

export default function RastaAwardsResults() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  function getTimeLeft() {
    const difference = +new Date('2024-12-22') - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-green-800">
            Rasta Awards 2024
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xl text-center font-semibold text-red-700">
            A votação foi encerrada!
          </p>
          <Separator className="bg-yellow-500" />
          <p className="text-lg text-center text-green-800">
            Os resultados serão liberados em:
          </p>
          <p className="text-4xl text-center font-bold text-red-700">
            22/12/2024
          </p>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {Object.keys(timeLeft).map(interval => (
              <div key={interval} className="flex flex-col items-center">
                <span className="text-3xl font-bold text-green-800">
                  {timeLeft[interval as keyof typeof timeLeft]}
                </span>
                <span className="text-sm text-red-700">{interval}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
