import { NextResponse } from 'next/server';

export async function POST(request) {
  const { password } = await request.json();
  const correct = process.env.DASHBOARD_PASSWORD;

  if (!correct) {
    return NextResponse.json({ error: 'Senha não configurada.' }, { status: 500 });
  }

  if (password === correct) {
    const response = NextResponse.json({ ok: true });
    response.cookies.set('auth', 'ok', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 8 * 60 * 60,
    });
    return response;
  }

  return NextResponse.json({ error: 'Senha incorreta.' }, { status: 401 });
}
