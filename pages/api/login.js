import { serialize } from 'cookie'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { username, password } = req.body

  const validUser = process.env.AUTH_USER
  const validPass = process.env.AUTH_PASS
  const authToken = process.env.AUTH_TOKEN

  if (username === validUser && password === validPass) {
    res.setHeader('Set-Cookie', serialize('ea_auth', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    }))
    return res.redirect(302, '/')
  }

  return res.redirect(302, '/login?err=1')
}
