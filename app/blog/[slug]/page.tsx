import { notFound } from "next/navigation"
import { formatDate, getBlogPosts } from "@/app/blog/utils"
import { baseUrl } from "@/app/sitemap"
import { CustomMDX } from "@/app/components/mdx"
import { BlogLayout } from "@/app/components/blog-layout"
import type { Metadata } from "next"

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPosts().find(post => post.slug === slug)
  if (!post) return {}

  const { title, publishedAt: publishedTime, summary: description, image } = post.metadata
  const ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [{ url: ogImage }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage]
    }
  }
}

export default async function BlogPost({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPosts().find(post => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <BlogLayout pageTitle={post.metadata.title}>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <span className="text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </span>
      </div>

      <article className="prose dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
    </BlogLayout>
  )
}
