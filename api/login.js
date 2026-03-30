module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()

  let body = ''
  await new Promise(resolve => {
    req.on('data', chunk => body += chunk)
    req.on('end', resolve)
  })

  const params = new URLSearchParams(body)
  const username = params.get('username')
  const password = params.get('password')

  if (username === process.env.AUTH_USER && password === process.env.AUTH_PASS) {
    const token = process.env.AUTH_TOKEN
    res.setHeader('Set-Cookie', `ea_auth=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400; Path=/`)
    res.writeHead(302, { Location: '/' })
    return res.end()
  }

  res.writeHead(302, { Location: '/?err=1' })
  res.end()
}
