import { notFound } from "next/navigation"
import { formatDate } from "@/lib/format-date"
import { baseUrl } from "@/app/sitemap"
import type { Metadata } from "next"
import { getPostBySlug } from "@/app/data-access/posts/get-post-bySlug"
import { BlogLayout } from "@/app/components/blog-layout"

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug({ slug })
  if (!post) return {}

  const { title, publishedAt } = post
  // const ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description: title,
    openGraph: {
      title,
      description: title,
      type: "article",
      publishedTime: String(new Date(publishedAt!.toISOString())),
      url: `${baseUrl}/blog/${post.slug}`
      // ,images: [{ url: ogImage }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: title
      // ,images: [ogImage]
    }
  }
}

export default async function BlogPost({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug({ slug })

  if (!post) {
    notFound()
  }

  return (
    <BlogLayout pageTitle={post.title}>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <span className="text-neutral-600 dark:text-neutral-400">
          {formatDate(String(post.publishedAt))}
        </span>
      </div>

      <article id="article" role="article" className="prose mx-auto mt-8 max-w-3xl">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </BlogLayout>
  )
}
