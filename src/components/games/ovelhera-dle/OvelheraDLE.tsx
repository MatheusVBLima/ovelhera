'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { historias } from '@/data/stories'
import confetti from 'canvas-confetti'
import { useEffect, useRef, useState } from 'react'

type VerificarPalpiteType =
  | 'Verificar'
  | 'Jogar Novamente'
  | 'Fim das histórias'

export function OvelheraDLE() {
  const [historiaAtual, setHistoriaAtual] = useState(0)
  const [emojisVisiveis, setEmojisVisiveis] = useState(1)
  const [palpite, setPalpite] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [tentativas, setTentativas] = useState<string[]>([])
  const [acertou, setAcertou] = useState(false)
  const [tentativasCorretas, setTentativasCorretas] = useState<string[]>([])
  const [botaoVerificarPalpite, setBotaoVerificarPalpite] =
    useState<VerificarPalpiteType>('Verificar')
  const botaoRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (botaoVerificarPalpite === 'Jogar Novamente' && botaoRef.current) {
      botaoRef.current.focus()
    }
  }, [botaoVerificarPalpite])

  const resetarJogo = () => {
    const novoIndice = (historiaAtual + 1) % historias.length
    setHistoriaAtual(novoIndice)
    setEmojisVisiveis(1)
    setPalpite('')
    setMensagem('')
    setTentativas([])
    setAcertou(false)
    setBotaoVerificarPalpite('Verificar')
    setTentativasCorretas([])
  }

  const verificarPalpite = () => {
    if (botaoVerificarPalpite === 'Jogar Novamente') {
      resetarJogo()
      return
    }

    if (botaoVerificarPalpite === 'Fim das histórias') {
      return
    }

    const removerAcentuacao = (str: string) => {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }

    const palpiteSemAcentuacao = removerAcentuacao(palpite.toLowerCase())
    const palavrasPalpite = palpiteSemAcentuacao.split(/\s+/)

    const acertou = historias[historiaAtual].palavrasChave?.some(subarray =>
      subarray.every(palavra =>
        palavrasPalpite.includes(removerAcentuacao(palavra.toLowerCase()))
      )
    )

    if (acertou) {
      setMensagem('Parabéns! Você acertou!')
      setAcertou(true)
      setTentativasCorretas([...tentativasCorretas, palpite])
      setBotaoVerificarPalpite(
        historiaAtual === historias.length - 1
          ? 'Fim das histórias'
          : 'Jogar Novamente'
      )
      confetti()
    } else {
      setMensagem('Tente novamente!')
      setBotaoVerificarPalpite('Verificar')
      if (emojisVisiveis < 5) {
        setEmojisVisiveis(emojisVisiveis + 1)
      }

      setTentativas([...tentativas, palpite])
    }
    setPalpite('')
  }

  return (
    <div className="container flex flex-col items-center justify-center mt-8 p-4">
      <Card>
        <CardHeader className="flex flex-col gap-2 items-center">
          <CardTitle className="text-2xl font-bold text-center">
            Qual história é descrita por esses emojis?
          </CardTitle>
          <CardDescription className="text-center">
            Cada resposta contém pelo menos 2 palavras
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center">
          <div className="flex justify-center mb-4 text-4xl">
            {historias[historiaAtual].emojis
              .slice(0, emojisVisiveis)
              .map((emoji, index) => (
                <span key={index} className="mx-1">
                  {emoji}
                </span>
              ))}
          </div>
          <form
            onSubmit={e => {
              e.preventDefault()
              if (botaoVerificarPalpite === 'Verificar') {
                verificarPalpite()
              } else if (botaoVerificarPalpite === 'Jogar Novamente') {
                resetarJogo()
              }
            }}
            className="w-full flex flex-col gap-4"
          >
            <Input
              type="text"
              value={botaoVerificarPalpite === 'Verificar' ? palpite : ''}
              onChange={e => setPalpite(e.target.value)}
              placeholder="Digite o nome da história"
              disabled={botaoVerificarPalpite !== 'Verificar'}
            />
            <Button
              type="submit"
              className="w-full px-4 py-2 font-bold"
              ref={botaoRef}
            >
              {botaoVerificarPalpite}
            </Button>
          </form>
          {mensagem && (
            <p
              className={`mt-4 font-bold text-center ${acertou ? 'text-green-500' : ''}`}
            >
              {mensagem}
            </p>
          )}
          {acertou && (
            <iframe
              width="580"
              height="315"
              src={historias[historiaAtual].iframe}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-[300px] h-[225px] md:w-[580px] md:h-[315px]"
            />
          )}
        </CardContent>
      </Card>

      <div className="flex max-w-[39.375rem] w-full px-0">
        {(tentativas.length > 0 || tentativasCorretas.length > 0) && (
          <div className="grid grid-cols-1 gap-4 mt-8 w-full">
            {tentativasCorretas.map((tentativa, index) => (
              <Card key={`correct-${index}`} className="bg-green-700 ">
                <CardContent className="p-4">
                  <p className="text-white font-semibold">
                    Tentativa correta: {tentativa}
                  </p>
                </CardContent>
              </Card>
            ))}
            {tentativas
              .slice()
              .reverse()
              .map((tentativa, index) => (
                <Card key={`wrong-${index}`} className="bg-destructive">
                  <CardContent className="p-4 ">
                    <p className="text-white font-semibold">
                      Tentativa errada: {tentativa}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
