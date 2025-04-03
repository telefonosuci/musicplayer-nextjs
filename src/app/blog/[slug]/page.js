import { notFound } from "next/navigation"
import { posts } from "../../../data/posts"
import Link from "next/link"

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function PostPage({ params }) {
  const post = posts.find((p) => p.slug === params.slug)

  if (!post) return notFound()

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>
        Vai all&apos;App: <Link href="/musicplayer">Music</Link>
      </p>
      <p>
        <Link href="/">← Torna alla home</Link>
      </p>
    </main>
  )
}
