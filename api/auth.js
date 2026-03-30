export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  const correctPassword = process.env.DASHBOARD_PASSWORD;

  if (!correctPassword) {
    return res.status(500).json({ error: 'Senha não configurada no servidor.' });
  }

  if (password === correctPassword) {
    // Cookie de sessão válido por 8 horas
    res.setHeader(
      'Set-Cookie',
      `auth=ok; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${8 * 60 * 60}`
    );
    return res.status(200).json({ ok: true });
  }

  return res.status(401).json({ error: 'Senha incorreta.' });
}
