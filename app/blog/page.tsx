import { BlogLayout } from "@/app/components/blog-layout"
import { BlogPostCard } from "@/components/Card"
import { Pagination } from "@/components/Pagination"
import { SITE } from "@/constants"
import { getBlogPosts } from "@/app/data-access/posts/get-posts"

export const metadata = {
  title: "Blog | Mohammed Haydar",
  description: "Behold, my treasure of wisdom and wonder my collection of articles! 🚀📚"
}

export default async function BlogPage() {
  const { blogs: allBlogs, count } = await getBlogPosts()
  const totalPages = Math.ceil(count / SITE.postPerPage)
  const currentPage = 1

  const sortedPosts = allBlogs
    .sort(
      (a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime()
    )
    .slice(0, SITE.postPerPage)

  return (
    <BlogLayout
      pageTitle="Posts"
      pageDesc="Behold, my treasure of wisdom and wonder my collection of articles! 🚀📚"
    >
      <ul>
        {sortedPosts.map(post => (
          <BlogPostCard
            key={post.id}
            title={post.title}
            slug={post.slug}
            publishedAt={String(post.publishedAt) || "Unknown Date"}
          />
        ))}
      </ul>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </BlogLayout>
  )
}
