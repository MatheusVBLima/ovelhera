'use client'
import {
  Angry,
  DoorClosed,
  Gamepad,
  Music,
  Shield,
  Skull,
  Speech,
  Trophy,
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

import { admins } from '@/lib/admins'
import { ThemeSwitcher } from './ThemeSwitcher'
import { Button } from './ui/button'

export function WebNav() {
  async function handleSignOut() {
    await signOut({ callbackUrl: '/' })
  }

  const { data: session } = useSession()
  return (
    <nav className="hidden items-center gap-4 xl:flex">
      <Button
        className="border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
        asChild
        variant={'outline'}
        size={'sm'}
      >
        <Link href={'/historias'} className="flex items-center gap-2">
          <span>HISTÓRIAS</span>
          <Speech size={18} />
        </Link>
      </Button>

      <Button
        className="border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
        asChild
        variant={'outline'}
        size={'sm'}
      >
        <Link href={'/musicas'} className="flex items-center gap-2">
          <span>MÚSICAS</span>
          <Music size={18} />
        </Link>
      </Button>

      <Button
        className="border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
        asChild
        variant={'outline'}
        size={'sm'}
      >
        <Link href={'/esculachos'} className="flex items-center gap-2">
          <span>ESCULACHOS</span>
          <Angry size={18} />
        </Link>
      </Button>

      <Button
        className="border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
        asChild
        variant={'outline'}
        size={'sm'}
      >
        <Link href={'/inimigos'} className="flex items-center gap-2">
          <span>INIMIGOS</span>
          <Skull size={18} />
        </Link>
      </Button>

      <Button
        className="border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
        asChild
        variant={'outline'}
        size={'sm'}
      >
        <Link href={'/ovelhera-dle'} className="flex items-center gap-2">
          <span>OVELHERA DLE</span>
          <Gamepad size={18} />
        </Link>
      </Button>

      <Button
        asChild
        variant={'outline'}
        className="border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
        size={'sm'}
      >
        <Link href="/awards" className="flex items-center gap-2">
          <span>AWARDS</span>
          <Trophy size={18} />
        </Link>
      </Button>

      {!session && (
        <Button
          className="border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
          variant={'outline'}
          size={'sm'}
        >
          <Link href="/admin" className="flex items-center gap-2">
            <span>ADMIN</span>
            <Shield size={18} />
          </Link>
        </Button>
      )}
      {session && (
        <>
          {admins.some(
            (admin: { name: string }) => admin.name === session?.user?.name
          ) && (
            <Button
              className="border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
              variant={'outline'}
              size={'sm'}
            >
              <Link href="admin" className="flex items-center gap-2">
                <span>ADMIN</span>
                <Shield size={18} />
              </Link>
            </Button>
          )}
          <Button
            onClick={handleSignOut}
            variant={'outline'}
            className="flex items-center gap-2 border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
            size={'sm'}
          >
            <span>SIGN OUT</span>
            <DoorClosed size={18} />
          </Button>
        </>
      )}
      <ThemeSwitcher />
    </nav>
  )
}
