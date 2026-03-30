export const config = {
  runtime: 'edge',
}

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')

  const validUser = process.env.AUTH_USER
  const validPass = process.env.AUTH_PASS
  const authToken = process.env.AUTH_TOKEN

  if (username === validUser && password === validPass) {
    const response = new Response(null, {
      status: 302,
      headers: {
        'Location': '/',
        'Set-Cookie': `ea_auth=${authToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`,
      },
    })
    return response
  }

  return new Response(null, {
    status: 302,
    headers: { 'Location': '/?err=1' },
  })
}
