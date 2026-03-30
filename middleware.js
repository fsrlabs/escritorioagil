import { NextResponse } from 'next/server';

export function middleware(request) {
  const cookie = request.cookies.get('auth');
  if (!cookie || cookie.value !== 'ok') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard',
};
