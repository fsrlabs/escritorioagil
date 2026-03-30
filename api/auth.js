export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { password } = req.body;
  const correct = process.env.DASHBOARD_PASSWORD;

  if (!correct) return res.status(500).json({ error: 'Senha não configurada.' });

  if (password === correct) {
    res.setHeader('Set-Cookie', `auth=ok; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${8 * 60 * 60}`);
    return res.status(200).json({ ok: true });
  }

  return res.status(401).json({ error: 'Senha incorreta.' });
}
