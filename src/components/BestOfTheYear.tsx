'use client'
import { addVote, getUserVotes } from '@/actions/votesActions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from '@/components/ui/use-toast'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import admins from '../../admins.json'
import { VoteResults } from './VoteResults'

const categories = {
  melhorTempero: {
    title: 'Temperada do Ano',
    description: 'Qual mina o Ovelha temperou melhor?',
    options: ['hdceli', 'Bruxinha', 'Melhoragoraa', 'Aline fox'],
  },
  melhorPestinha: {
    title: 'Pestinha do Ano',
    description: 'Quem foi o melhor pestinha da live?',
    options: ['Folopa', 'Carros Rebaixados', 'FSoent', 'Paraiba'],
  },
  melhorNojo: {
    title: 'Nojeira do Ano',
    description: 'Qual foi a coisa mais nojenta que aconteceu na live em 2024?',
    options: [
      'Vomito no Bong',
      'Escarrada na Parede',
      'Açaí com Maionese',
      'Rasta cozinhando',
    ],
  },
  melhorHistoria: {
    title: 'Historia do Ano',
    description: 'Qual melhor historia?',
    options: [
      'A da Boneca',
      'a da CCTV',
      'A da Buceta Lanterna',
      'Punheta diarreia',
    ],
  },
  melhorSonho: {
    title: 'Sonho Vendido do Ano',
    description: 'Qual sonho vendido do ano?',
    options: [
      'Cestari largar tudo pra Live',
      'Vitão Voli lives eternas',
      'CiroTV banido por todos',
    ],
  },
  melhorApelido: {
    title: 'Apelido do Ano',
    description: 'Qual apelido do rasta para 2024?',
    options: ['Diddy Mineiro', 'Paga Lanches', 'MVP', 'Arame liso'],
  },
  melhorRage: {
    title: 'Rage do Ano',
    description: 'Qual melhor Rage do ano?',
    options: ['Rage com os pais', 'Futebol no calado', 'Copo quebrado'],
  },
  melhorPapagaio: {
    title: 'Papagaio do ano',
    description: 'Qual melhor papagaio do ano?',
    options: ['Paraiba', 'Bardo', 'Madru', 'EvosTT'],
  },
  melhorInimigo: {
    title: 'Inimigo do ano',
    description: 'Qual melhor inimigo do ano?',
    options: ['Gabriel Scutasu', 'Shady', 'Surskity', 'GD-Paulinhax'],
  },
  melhorLive: {
    title: 'Live do ano',
    description: 'Qual melhor live do ano?',
    options: [
      'Retorno de veggano',
      'Live do rainhu',
      'MVP',
      'Todas foram ruins',
    ],
  },
  melhorSheik: {
    title: 'Sheik do ano',
    description: 'Qual melhor sheik do ano?',
    options: ['Vass', 'Picanha na chapa', 'LokoGamer', 'Xaim_'],
  },
  pioresPapagaio: {
    title: 'Piores papagaio',
    description: 'Qual pior papagaio do ano?',
    options: ['Danielfodase', 'MiguelGoblin', '710 deals', 'Paraiba'],
  },
  melhorMulher: {
    title: 'Mulher do ano',
    description: 'Qual foi a mulher do ano?',
    options: ['Jessika', 'Kikira02', 'Carol', 'Não voto em mulher'],
  },
  melhorMod: {
    title: 'Mod do ano',
    description: 'Qual foi o melhor mod do ano?',
    options: ['Madru', 'Calumbr', 'Vinykrugger'],
  },
  melhorViewer: {
    title: 'Viewer do ano',
    description: 'Qual foi o melhor viewer do ano?',
    options: ['Temperox', 'Tempe rox', 'tem perox', 'TEMPEROX'],
  },
  melhorPegadinha: {
    title: 'Pegadinha do ano',
    description: 'Qual foi a melhor pegadinha do ano?',
    options: [
      'Cestari build da fé',
      'Cestari larga emprego para fazer live',
      'Cestari tenta logar na conta "cestaricomecoco"',
      'Vaza ovelha batendo uma',
    ],
  },
  melhorOperacao: {
    title: 'Operação do ano',
    description: 'Qual foi a melhor operação do ano?',
    options: ['OBM', 'Porco no espeto', 'Show de truman'],
  },
  melhorAcontecimento: {
    title: 'Acontecimento em live do ano',
    description: 'Qual foi o melhor acontecimento em live do ano?',
    options: [
      'Descoberta do twitter do raiunhu',
      'Ovelha falando mal de judeus e afins',
      'Call vazada do ovelha',
      'Racing campeão em cima das marias',
    ],
  },
  melhorArtista: {
    title: 'Artista do ano',
    description: 'Qual foi o melhor artista do ano?',
    options: ['Calumbr', 'BabyKenan', 'Charlieofofo', 'Rasta Records'],
  },
}

type Vote = {
  id: string
  userId: string
  category: string
  option: string
}

export function BestOfTheYear() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [userVotes, setUserVotes] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const isAdmin =
    session?.user?.name &&
    admins.some(admin => admin.name === session.user?.name)

  const user = session?.user?.name
  const image = session?.user?.image || ''

  useEffect(() => {
    async function loadUserVotes() {
      if (session?.user?.email) {
        const votes = await getUserVotes(session.user.email)
        const votesMap = votes.reduce(
          (acc: Record<string, string>, vote: Vote) => {
            acc[vote.category] = vote.option
            return acc
          },
          {} as Record<string, string>
        )
        setUserVotes(votesMap)
      }
    }

    if (session?.user?.email) {
      loadUserVotes()
    }
  }, [session])

  async function handleVote(category: string, option: string) {
    if (!session) {
      signIn('discord')
      return
    }

    if (userVotes[category]) {
      toast({
        title: 'Erro',
        description: 'Você já votou nesta categoria',
        variant: 'destructive',
      })
      return
    }

    try {
      await addVote({
        userId: session.user?.email || '',
        category,
        option,
      })

      setUserVotes(prev => ({
        ...prev,
        [category]: option,
      }))

      toast({
        title: 'Sucesso!',
        description: 'Seu voto foi registrado',
      })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao registrar seu voto',
        variant: 'destructive',
      })
    }
  }

  if (!session) {
    return (
      <div className="container mt-8 flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Melhores do Ano</h1>
        <p>Faça login para votar</p>
        <Button onClick={() => signIn('discord')}>Login com Discord</Button>
      </div>
    )
  }

  return (
    <div className="container mt-8 space-y-8">
      <div className="flex flex-col gap-4">
        {user && (
          <div className="flex items-center gap-2">
            <Avatar className="h-12 w-12">
              <AvatarImage src={image} alt="Avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-lg text-white">Olá, {user}</p>
          </div>
        )}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Melhores do Ano</h1>
          {isAdmin && (
            <Button onClick={() => setShowResults(!showResults)}>
              {showResults ? 'Voltar para Votação' : 'Ver Resultados'}
            </Button>
          )}
        </div>
      </div>

      {showResults && isAdmin ? (
        <VoteResults />
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 py-4">
          {Object.entries(categories).map(([categoryId, category]) => (
            <Card key={categoryId}>
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  disabled={!!userVotes[categoryId]}
                  value={userVotes[categoryId]}
                  /* onValueChange={value => handleVote(categoryId, value)} */
                >
                  {category.options.map(option => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={option} />
                      <label htmlFor={option}>{option}</label>
                    </div>
                  ))}
                </RadioGroup>
                {userVotes[categoryId] && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Você votou em: {userVotes[categoryId]}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
