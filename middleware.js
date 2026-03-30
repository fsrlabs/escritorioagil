import { NextResponse } from 'next/server'

const LOGIN_HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>escritórioágil — acesso</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans',system-ui,sans-serif;background:#f5f3ee;display:flex;align-items:center;justify-content:center;min-height:100vh;color:#1a1a18}
.card{background:#fff;border:1px solid rgba(26,26,24,0.1);border-radius:12px;padding:40px 36px;width:100%;max-width:360px}
.logo{font-family:'Instrument Serif',Georgia,serif;font-size:22px;color:#1a1a18;margin-bottom:32px;letter-spacing:-0.3px}
.logo span{color:#0F6E56;font-style:italic}
label{display:block;font-size:11px;font-weight:500;letter-spacing:0.07em;text-transform:uppercase;color:#9a9a8e;margin-bottom:6px}
input{width:100%;border:1px solid rgba(26,26,24,0.16);border-radius:6px;padding:10px 14px;font-family:'DM Sans',system-ui,sans-serif;font-size:14px;color:#1a1a18;background:#f5f3ee;outline:none;margin-bottom:16px;transition:border-color 0.15s}
input:focus{border-color:#1D9E75;background:#fff}
input::placeholder{color:#9a9a8e}
button{width:100%;padding:11px;background:#1a1a18;border:none;border-radius:6px;font-family:'DM Sans',system-ui,sans-serif;font-size:14px;font-weight:500;color:#f5f3ee;cursor:pointer;transition:background 0.15s;margin-top:4px}
button:hover{background:#0F6E56}
.error{font-size:12px;color:#A32D2D;margin-top:12px;display:none}
.error.visible{display:block}
</style>
</head>
<body>
<div class="card">
  <div class="logo">escritório<span>ágil</span></div>
  <form method="POST" action="/api/login">
    <label>Usuário</label>
    <input type="text" name="username" placeholder="seu usuário" autocomplete="username" required />
    <label>Senha</label>
    <input type="password" name="password" placeholder="••••••••" autocomplete="current-password" required />
    <button type="submit">Entrar</button>
  </form>
  <div class="error" id="err">Usuário ou senha incorretos.</div>
</div>
<script>
const u=new URLSearchParams(location.search);
if(u.get('err')){document.getElementById('err').classList.add('visible')}
</script>
</body>
</html>`

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

export default function middleware(request) {
  const { pathname } = request.nextUrl

  if (pathname === '/api/login') {
    return NextResponse.next()
  }

  const cookie = request.cookies.get('ea_auth')
  if (cookie && cookie.value === process.env.AUTH_TOKEN) {
    return NextResponse.next()
  }

  return new NextResponse(LOGIN_HTML, {
    status: 401,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
