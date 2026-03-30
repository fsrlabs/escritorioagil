export default function LoginPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet" />
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --ink:#1a1a18;--ink-2:#3a3a36;--ink-4:#9a9a8e;
          --bg:#f5f3ee;--white:#ffffff;
          --green:#1D9E75;--green-dark:#0F6E56;
          --border-2:rgba(26,26,24,0.16);
          --serif:'Instrument Serif',Georgia,serif;
          --sans:'DM Sans',system-ui,sans-serif;
        }
        html,body{height:100%;font-family:var(--sans);background:var(--bg);color:var(--ink)}
        .topbar{height:52px;background:var(--ink);display:flex;align-items:center;padding:0 24px}
        .topbar-logo{font-family:var(--serif);font-size:18px;color:var(--bg);letter-spacing:-0.3px}
        .topbar-logo span{color:#7dbf9a;font-style:italic}
        .wrapper{display:flex;align-items:center;justify-content:center;min-height:calc(100vh - 52px);padding:32px 16px}
        .card{background:var(--white);border:1px solid var(--border-2);border-radius:12px;padding:40px;width:100%;max-width:380px;box-shadow:0 4px 24px rgba(26,26,24,0.06);animation:fadeUp 0.35s ease both}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .eyebrow{font-size:10px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:var(--green);margin-bottom:12px;display:flex;align-items:center;gap:8px}
        .eyebrow::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--green);animation:pulse 2s ease-in-out infinite}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        .title{font-family:var(--serif);font-size:26px;letter-spacing:-0.3px;color:var(--ink);margin-bottom:6px}
        .sub{font-size:13px;color:var(--ink-4);margin-bottom:28px;line-height:1.5}
        label{display:block;font-size:11px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:var(--ink-4);margin-bottom:8px}
        input[type="password"]{width:100%;border:1px solid var(--border-2);border-radius:7px;padding:11px 14px;font-family:var(--sans);font-size:14px;color:var(--ink);background:var(--bg);outline:none;transition:border-color 0.15s,background 0.15s}
        input[type="password"]:focus{border-color:var(--green);background:var(--white)}
        input[type="password"]::placeholder{color:var(--ink-4)}
        .btn{width:100%;margin-top:16px;padding:12px;background:var(--green);border:none;border-radius:7px;font-family:var(--sans);font-size:13px;font-weight:500;color:#fff;cursor:pointer;transition:background 0.15s}
        .btn:hover{background:var(--green-dark)}
        .btn:disabled{opacity:0.6;cursor:not-allowed}
        .error{margin-top:12px;padding:10px 14px;background:#FCEBEB;border:1px solid #f1c5c5;border-radius:7px;font-size:12px;color:#791F1F;display:none}
        .error.visible{display:block}
      `}</style>
      <div className="topbar">
        <div className="topbar-logo">escritório<span>ágil</span></div>
      </div>
      <div className="wrapper">
        <div className="card">
          <div className="eyebrow">Acesso restrito</div>
          <div className="title">Bem-vindo de volta.</div>
          <div className="sub">Digite a senha para acessar o dashboard.</div>
          <label htmlFor="pwd">Senha</label>
          <input type="password" id="pwd" placeholder="••••••••" autoFocus />
          <button className="btn" id="btn" onClick="login()">Entrar</button>
          <div className="error" id="error">Senha incorreta. Tente novamente.</div>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: `
        document.getElementById('btn').onclick = login;
        document.getElementById('pwd').addEventListener('keydown', e => { if (e.key === 'Enter') login(); });

        async function login() {
          const pwd = document.getElementById('pwd').value.trim();
          if (!pwd) return;
          const btn = document.getElementById('btn');
          const errEl = document.getElementById('error');
          btn.disabled = true;
          btn.textContent = 'Verificando...';
          errEl.classList.remove('visible');
          try {
            const res = await fetch('/api/auth', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ password: pwd }),
            });
            if (res.ok) {
              btn.textContent = '✓ Acesso liberado';
              setTimeout(() => { window.location.href = '/dashboard'; }, 400);
            } else {
              errEl.classList.add('visible');
              btn.disabled = false;
              btn.textContent = 'Entrar';
              document.getElementById('pwd').value = '';
              document.getElementById('pwd').focus();
            }
          } catch(e) {
            errEl.textContent = 'Erro de conexão.';
            errEl.classList.add('visible');
            btn.disabled = false;
            btn.textContent = 'Entrar';
          }
        }
      `}} />
    </>
  );
}
