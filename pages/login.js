export default function Login({ error }) {
  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'DM Sans',system-ui,sans-serif;background:#f5f3ee;display:flex;align-items:center;justify-content:center;min-height:100vh;color:#1a1a18}
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        .card{background:#fff;border:1px solid rgba(26,26,24,0.1);border-radius:12px;padding:40px 36px;width:100%;max-width:360px}
        .logo{font-family:'Instrument Serif',Georgia,serif;font-size:22px;color:#1a1a18;margin-bottom:32px;letter-spacing:-0.3px}
        .logo span{color:#0F6E56;font-style:italic}
        label{display:block;font-size:11px;font-weight:500;letter-spacing:0.07em;text-transform:uppercase;color:#9a9a8e;margin-bottom:6px}
        input{width:100%;border:1px solid rgba(26,26,24,0.16);border-radius:6px;padding:10px 14px;font-size:14px;color:#1a1a18;background:#f5f3ee;outline:none;margin-bottom:16px;transition:border-color 0.15s;font-family:inherit}
        input:focus{border-color:#1D9E75;background:#fff}
        input::placeholder{color:#9a9a8e}
        button{width:100%;padding:11px;background:#1a1a18;border:none;border-radius:6px;font-size:14px;font-weight:500;color:#f5f3ee;cursor:pointer;transition:background 0.15s;margin-top:4px;font-family:inherit}
        button:hover{background:#0F6E56}
        .error{font-size:12px;color:#A32D2D;margin-top:12px;text-align:center}
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet" />
      <div className="card">
        <div className="logo">escritório<span>ágil</span></div>
        <form method="POST" action="/api/login">
          <label>Usuário</label>
          <input type="text" name="username" placeholder="seu usuário" autoComplete="username" required />
          <label>Senha</label>
          <input type="password" name="password" placeholder="••••••••" autoComplete="current-password" required />
          <button type="submit">Entrar</button>
        </form>
        {error && <p className="error">Usuário ou senha incorretos.</p>}
      </div>
    </>
  )
}

export function getServerSideProps({ query }) {
  return { props: { error: query.err === '1' } }
}
