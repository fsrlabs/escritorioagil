import fs from 'fs'
import path from 'path'

export default function Home({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'public', 'dashboard.html')
  const html = fs.readFileSync(filePath, 'utf8')
    .replace(/<!DOCTYPE html>/i, '')
    .replace(/<html[^>]*>/i, '')
    .replace(/<\/html>/i, '')
    .replace(/<head>[\s\S]*?<\/head>/i, '')
    .replace(/<\/?body[^>]*>/gi, '')

  return { props: { html } }
}
