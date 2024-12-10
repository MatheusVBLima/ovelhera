'use client'
import { Menu } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import admins from '../../admins.json'
import { ThemeSwitcher } from './ThemeSwitcher'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function MobileNav() {
  async function handleSignOut() {
    await signOut({ callbackUrl: '/' })
  }
  const { data: session } = useSession()
  return (
    <nav className="xl:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
            variant={'outline'}
          >
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              className="border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500 w-full"
              asChild
              variant={'outline'}
            >
              <Link href={'/'} className="flex items-center gap-2">
                <span>HOME</span>
              </Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              className="border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500 w-full"
              asChild
              variant={'outline'}
            >
              <Link href={'/historias'} className="flex items-center gap-2">
                <span>HISTÓRIAS</span>
              </Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              className="border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500 w-full"
              asChild
              variant={'outline'}
            >
              <Link href={'/musicas'} className="flex items-center gap-2">
                <span>MÚSICAS</span>
              </Link>
            </Button>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Button
              className="border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500 w-full"
              asChild
              variant={'outline'}
            >
              <Link href={'/inimigos'} className="flex items-center gap-2">
                <span>INIMIGOS</span>
              </Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              className="border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500 w-full"
              asChild
              variant={'outline'}
            >
              <Link href={'/ovelhera-dle'} className="flex items-center gap-2">
                <span>OVELHERA DLE</span>
              </Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              className="w-full border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
              asChild
              variant={'outline'}
            >
              <Link href="/awards" className="flex items-center gap-2">
                <span>MELHORES DO ANO</span>
              </Link>
            </Button>
          </DropdownMenuItem>
          {!session && (
            <DropdownMenuItem>
              <Button
                className="border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500 w-full"
                variant={'outline'}
              >
                <Link href="login" className="flex items-center gap-2">
                  <span>ADMIN</span>
                </Link>
              </Button>
            </DropdownMenuItem>
          )}

          {session && (
            <>
              {admins.some(admin => admin.name === session?.user?.name) && (
                <DropdownMenuItem>
                  <Button
                    className="border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500 w-full"
                    variant={'outline'}
                  >
                    <Link href="admin" className="flex items-center gap-2">
                      <span>ADMIN</span>
                    </Link>
                  </Button>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <Button
                  onClick={handleSignOut}
                  variant={'outline'}
                  className="flex items-center gap-2 border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500 w-full"
                >
                  <span>SIGN OUT</span>
                </Button>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <ThemeSwitcher />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}
