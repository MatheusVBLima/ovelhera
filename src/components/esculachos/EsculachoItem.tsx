'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { EsculachosType } from '@/data/esculachos'
import { cancel } from '@/utils/speech'
import { SquareArrowOutUpRight, Volume2, VolumeX } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function EsculachoItem({
  texto,
  selectedVoice,
  autor,
  contexto,
  was_live,
  momento_do_esculacho,
}: EsculachosType) {
  const [isSpeaking, setIsSpeaking] = useState(false)

  const toggleSpeak = () => {
    if (isSpeaking) {
      cancel()
      setIsSpeaking(false)
    } else {
      const utterance = new SpeechSynthesisUtterance(texto)
      if (selectedVoice) {
        utterance.voice = selectedVoice
      }

      utterance.onend = () => {
        setIsSpeaking(false)
      }

      window.speechSynthesis.speak(utterance)
      setIsSpeaking(true)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {autor}
          {was_live && (
            <Button variant="outline" size="sm">
              <Link
                href={momento_do_esculacho || ''}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <span>Ver na live</span>
                <SquareArrowOutUpRight size={14} />
              </Link>
            </Button>
          )}
        </CardTitle>
        <CardDescription>{contexto}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4 text-justify">{texto}</p>
        <Button onClick={toggleSpeak} className="w-full">
          {isSpeaking ? 'Parar Esculacho' : 'Esculachar'}
          {isSpeaking ? (
            <VolumeX className="ml-2 h-4 w-4" />
          ) : (
            <Volume2 className="ml-2 h-4 w-4" />
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
