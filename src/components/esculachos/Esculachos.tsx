'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { esculachos } from '@/data/esculachos'
import { useEffect, useState } from 'react'
import { EsculachoItem } from './EsculachoItem'

export function Esculachos() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null)

  useEffect(() => {
    const updateVoices = () => {
      setVoices(window.speechSynthesis.getVoices())
    }

    window.speechSynthesis.onvoiceschanged = updateVoices
    updateVoices()

    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [])

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Mural de Esculachos</h1>
      <div className="mb-6">
        <Select
          onValueChange={value =>
            setSelectedVoice(voices.find(v => v.name === value) || null)
          }
        >
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Selecione uma voz" />
          </SelectTrigger>
          <SelectContent>
            {voices.map(voice => (
              <SelectItem key={voice.name} value={voice.name}>
                {voice.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {esculachos.map(esculacho => (
          <EsculachoItem
            key={esculacho.id}
            {...esculacho}
            selectedVoice={selectedVoice || undefined}
          />
        ))}
      </div>
    </div>
  )
}
