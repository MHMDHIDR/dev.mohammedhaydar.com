import { notFound } from "next/navigation"
import { formatDate } from "@/lib/format-date"
import { baseUrl } from "@/app/sitemap"
import type { Metadata } from "next"
import { getPostBySlug } from "@/app/data-access/posts/get-post-bySlug"
import { BlogLayout } from "@/app/components/blog-layout"
import GoBackbtn from "@/app/components/go-back-btn"
import { auth } from "@/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getBlogPosts } from "@/app/data-access/posts/get-posts"
import { SyntaxHighlighter } from "@/app/components/syntax-highlighter"

export async function generateStaticParams() {
  const { posts } = await getBlogPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug({ slug })
  if (!post) return {}

  const { title, publishedAt } = post

  return {
    title,
    description: title,
    openGraph: {
      title,
      description: title,
      type: "article",
      publishedTime: String(new Date(publishedAt!.toISOString())),
      url: `${baseUrl}/blog/${post.slug}`
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: title
    }
  }
}

export default async function BlogPost({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const session = await auth()
  const { slug } = await params
  const post = await getPostBySlug({ slug })

  if (!post) {
    notFound()
  }

  return (
    <>
      <div className="mx-auto w-full max-w-4xl px-4 flex justify-between">
        <GoBackbtn />
        {session && (
          <Link
            href={`/dashboard/blogs/${post.id}`}
            className="focus-outline mb-2 mt-4 flex hover:opacity-75 group px-0"
          >
            <Button>Edit</Button>
          </Link>
        )}
      </div>
      <BlogLayout pageTitle={post.title}>
        <div className="flex justify-between items-center mt-2 mb-8 text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">
            {formatDate(String(post.publishedAt))}
          </span>
        </div>

        <SyntaxHighlighter content={post.content} />
      </BlogLayout>
    </>
  )
}
