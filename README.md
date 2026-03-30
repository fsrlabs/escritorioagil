# escritórioágil — protótipo

Protótipo do dashboard com autenticação via Edge Middleware no Vercel.

## Estrutura

```
/vercel.json          configuração do Vercel
/middleware.js        autenticação via Edge (protege todas as rotas)
/pages/api/login.js   endpoint que valida login e seta cookie
/public/index.html    o dashboard
/package.json         dependências
```

## Deploy no Vercel

### 1. Sobe o projeto

Opção A — via CLI:
```bash
npm i -g vercel
vercel
```

Opção B — via GitHub:
- Sobe essa pasta num repositório GitHub
- Importa no vercel.com

### 2. Configura as variáveis de ambiente

No painel do Vercel → Settings → Environment Variables, adiciona:

| Variável     | Valor (você define)         |
|--------------|-----------------------------|
| AUTH_USER    | ex: kaio                    |
| AUTH_PASS    | ex: syhus2025               |
| AUTH_TOKEN   | qualquer string longa aleatória, ex: ea_xK9mP2qL7nR4 |

AUTH_TOKEN é só um token interno de sessão — pode ser qualquer string aleatória.

### 3. Redeploy

Depois de salvar as variáveis, clica em Redeploy no painel do Vercel.

### 4. Manda o link pro Kaio

```
URL:   https://seu-projeto.vercel.app
User:  kaio
Senha: syhus2025
```

## Segurança

- A senha nunca vai pro navegador — fica só nas variáveis de ambiente do Vercel
- O cookie é HttpOnly (JavaScript do browser não consegue ler)
- Secure + SameSite=Strict (proteção contra CSRF)
- Sessão expira em 24 horas
