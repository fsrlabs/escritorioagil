import { NextResponse } from 'next/server';

export function middleware(request) {
  if (request.nextUrl.pathname === '/dashboard.html') {
    const cookie = request.headers.get('cookie') || '';
    const authed = cookie.split(';').some(c => c.trim() === 'auth=ok');
    if (!authed) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard.html',
};
