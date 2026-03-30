'use client';

import { useState } from 'react';
import styles from './login.module.css';

export default function LoginPage() {
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin() {
    if (!pwd.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd }),
      });
      if (res.ok) {
        window.location.href = '/dashboard';
      } else {
        setError('Senha incorreta. Tente novamente.');
        setPwd('');
        setLoading(false);
      }
    } catch {
      setError('Erro de conexão. Tente novamente.');
      setLoading(false);
    }
  }

  return (
    <>
      <div className={styles.topbar}>
        <div className={styles.logo}>
          escritório<span>ágil</span>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.eyebrow}>Acesso restrito</div>
          <h1 className={styles.title}>Bem-vindo de volta.</h1>
          <p className={styles.sub}>Digite a senha para acessar o dashboard.</p>
          <label className={styles.label} htmlFor="pwd">Senha</label>
          <input
            className={styles.input}
            type="password"
            id="pwd"
            placeholder="••••••••"
            autoFocus
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button
            className={styles.btn}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Verificando...' : 'Entrar'}
          </button>
          {error && <div className={styles.error}>{error}</div>}
        </div>
      </div>
    </>
  );
}
