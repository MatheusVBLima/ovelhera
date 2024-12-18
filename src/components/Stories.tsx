'use client'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DownloadIcon, SearchIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import fallbackImage from '../../public/ovelha.png'
import { getVideos } from '../actions/videosActions'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

type Videos = {
  id: string
  title: string
  url: string
  tags: {
    name: string
  }[]
}

export function Stories() {
  const [videos, setVideos] = useState<Videos[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [failedThumbnails, setFailedThumbnails] = useState<Set<string>>(
    new Set()
  )

  useEffect(() => {
    async function fetchVideos() {
      const videos = await getVideos()
      setVideos(videos)
      setLoading(false)
    }

    fetchVideos()
  }, [])

  const filteredData = videos.filter(item => {
    const matchesCategory =
      selectedCategory === 'all'
        ? true
        : item.tags.some(tag => tag.name === selectedCategory)
    const matchesSearchTerm = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearchTerm
  })

  if (loading) {
    return (
      <div className="container mt-8 flex h-screen flex-col gap-8">
        <div className="flex justify-between">
          <Skeleton className="h-[25px] w-[400px]" />
          <Skeleton className="h-[25px] w-[400px]" />
        </div>
        <div className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="h-[200px] w-[400px] rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="container mt-8 flex h-screen flex-col gap-8">
        <h1 className="text-center text-2xl">
          Nenhuma história encontrada. Adicione histórias no painel de
          administração{' '}
          <Link href="/admin" className="underline">
            aqui
          </Link>
        </h1>
      </div>
    )
  }

  return (
    <div className="container mt-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full ">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Pesquise uma história..."
              className="pl-9 w-full sm:w-[300px]"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <Select onValueChange={value => setSelectedCategory(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categorias</SelectLabel>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="nojeira">Nojeira</SelectItem>
                <SelectItem value="tempero">Tempero</SelectItem>
                <SelectItem value="modoM">ModoM</SelectItem>
                <SelectItem value="historias">Histórias</SelectItem>
                <SelectItem value="fetiches">Fetiches</SelectItem>
                <SelectItem value="rastarado">Rastarado</SelectItem>
                <SelectItem value="rastabi">Rasta bi</SelectItem>
                <SelectItem value="esculacho">Esculacho</SelectItem>
                <SelectItem value="gank">Gank</SelectItem>
                <SelectItem value="motivacional">Motivacional</SelectItem>
                <SelectItem value="opinioes">Opiniões</SelectItem>
                <SelectItem value="machismo">Machismo</SelectItem>
                <SelectItem value="piras">Piras</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto gap-2">
              <span>Download Acervo</span>
              <DownloadIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <a href="/acervo-esgoto-pt1.torrent" download>
                Acervo - Parte 1
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/acervo-esgoto-pt2.torrent" download>
                Acervo - Parte 2
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {filteredData.length === 0 ? (
        <div className="flex items-center justify-center mt-14">
          <p className="text-center text-2xl text-muted-foreground font-bold ">
            Nenhuma história encontrada.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredData.map(item => {
            const videoId = new URL(item.url).searchParams.get('v')
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
            console.log(filteredData.length)

            return (
              <Card key={item.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>Vídeo de id {item.id}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 items-end">
                  <Link
                    href={item.url}
                    target="_blank"
                    className="relative h-[300px] w-full overflow-hidden rounded-md"
                  >
                    <Image
                      loading="lazy"
                      src={
                        failedThumbnails.has(item.id)
                          ? fallbackImage
                          : thumbnailUrl
                      }
                      alt={item.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={() => {
                        setFailedThumbnails(
                          prev => new Set(Array.from(prev).concat(item.id))
                        )
                      }}
                    />
                  </Link>
                </CardContent>
                <CardFooter className="flex gap-4">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="rasta">
                      {tag.name}
                    </Badge>
                  ))}
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
