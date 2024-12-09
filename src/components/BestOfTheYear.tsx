'use client'
import { addVote, getUserVotes } from '@/actions/votesActions'
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
  melhorHistoria: {
    title: 'Melhor História do Ano',
    description: 'Vote na melhor história contada pelo Ovelhera em 2024',
    options: [
      'História do Mendigo',
      'História do Banheiro',
      'História do Busão',
      'História do Bar',
    ],
  },
  melhorMusica: {
    title: 'Melhor Música do Ano',
    description: 'Vote na melhor música cantada pelo Ovelhera em 2024',
    options: [
      'Maconha Boa',
      'Rasta Feelings',
      'Ovelhera Style',
      'Reggae do Busão',
    ],
  },
  melhorMomento: {
    title: 'Melhor Momento do Ano',
    description: 'Vote no melhor momento do Ovelhera em 2024',
    options: [
      'Ovelhera dançando',
      'Ovelhera cantando',
      'Ovelhera jogando',
      'Ovelhera cozinhando',
    ],
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Melhores do Ano</h1>
        {isAdmin && (
          <Button onClick={() => setShowResults(!showResults)}>
            {showResults ? 'Voltar para Votação' : 'Ver Resultados'}
          </Button>
        )}
      </div>

      {showResults && isAdmin ? (
        <VoteResults />
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                  onValueChange={value => handleVote(categoryId, value)}
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
