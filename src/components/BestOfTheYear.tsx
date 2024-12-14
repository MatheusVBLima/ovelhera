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
import { categories } from '@/data/categories'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { admins } from '../../admins'
import { VoteResults } from './VoteResults'

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
    admins.some((admin: { name: string }) => admin.name === session.user?.name)

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

  return (
    <div className="container mt-8 space-y-8">
      <div className="flex flex-col gap-4">
        {user && (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={image} alt="Avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-lg">Olá, {user}</p>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-2xl font-bold">Melhores do Ano</h1>
            <p className="text-lg text-primary">
              A votação será aberta no dia 14/12/2024
            </p>
          </div>

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
