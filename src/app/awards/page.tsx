'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function RastaAwardsResults() {
  return (
    <div className="h-[calc(100vh-7.75rem)] flex items-center justify-center">
      <Card className="w-full max-w-md bg-secondary/20 backdrop-blur-sm">
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
        </CardContent>
      </Card>
    </div>
  )
}
