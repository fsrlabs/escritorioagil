# Dashboard escritórioágil — Deploy no Vercel

## Estrutura do projeto

```
├── api/
│   ├── auth.js         → POST /api/auth  (valida senha, seta cookie)
│   └── dashboard.js    → GET  /dashboard (protegido por cookie)
├── public/
│   └── index.html      → Tela de login (pública)
├── vercel.json         → Roteamento
└── package.json
```

## Como fazer deploy

### 1. Instale o Vercel CLI (se não tiver)
```bash
npm i -g vercel
```

### 2. Na pasta do projeto, faça login e deploy
```bash
cd dashboard-escritorioagil
vercel
```
Siga as instruções: novo projeto, sem framework (Other), diretório raiz = `.`

### 3. Configure a variável de ambiente

No painel do Vercel (vercel.com/seu-usuario/seu-projeto/settings/environment-variables), adicione:

| Nome               | Valor         | Ambiente       |
|--------------------|---------------|----------------|
| DASHBOARD_PASSWORD | sua-senha-aqui | Production, Preview |

Ou via CLI:
```bash
vercel env add DASHBOARD_PASSWORD
```
(ele vai pedir o valor — não aparece na tela)

### 4. Redeploy para aplicar a env var
```bash
vercel --prod
```

## Como funciona

1. Quem acessa a URL raiz vê a tela de login
2. Ao digitar a senha certa, o `/api/auth` valida contra `process.env.DASHBOARD_PASSWORD` e seta um cookie `auth=ok` (HttpOnly, dura 8h)
3. O `/dashboard` só serve o HTML se o cookie estiver presente — sem ele, redireciona pra `/`
4. O arquivo `dashboard.html` **não existe como arquivo estático** — só é servido pela serverless function autenticada

## Para mudar a senha

Basta atualizar a env var no painel do Vercel e fazer redeploy. Sem alterar código.
