import { type NextRequest, NextResponse } from 'next/server'
import { getUrl } from '../src/lib/get-url'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('__Secure-next-auth.session-token')
  const pathname = request.nextUrl.pathname

  if (pathname.includes('/admin') && !token) {
    return NextResponse.redirect(new URL(getUrl('/')))
  }

  if (pathname.includes('/melhores-do-ano') && !token) {
    return NextResponse.redirect(new URL(getUrl('/login')))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_n ext/image|favicon.ico).*)'],
}
