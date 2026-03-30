import { NextResponse } from 'next/server'

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/login).*)'],
}

export default function middleware(request) {
  const cookie = request.cookies.get('ea_auth')
  const token = process.env.AUTH_TOKEN

  if (cookie && cookie.value === token) {
    return NextResponse.next()
  }

  const loginUrl = new URL('/login', request.url)
  return NextResponse.redirect(loginUrl)
}
