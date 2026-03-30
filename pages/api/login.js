export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { username, password } = req.body;

  const validUser = process.env.AUTH_USER;
  const validPass = process.env.AUTH_PASS;
  const authToken = process.env.AUTH_TOKEN;

  if (username === validUser && password === validPass) {
    const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
    res.setHeader(
      "Set-Cookie",
      `ea_auth=${authToken}; HttpOnly${secure}; SameSite=Strict; Max-Age=86400; Path=/`,
    );
    return res.redirect(302, "/");
  }

  return res.redirect(302, "/login?err=1");
}
