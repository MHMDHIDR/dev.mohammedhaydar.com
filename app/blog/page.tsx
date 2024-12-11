import { BlogLayout } from "@/app/components/blog-layout"
import { BlogPostCard } from "@/components/Card"
import { Pagination } from "@/components/Pagination"
import { getBlogPosts } from "./utils"

export const metadata = {
  title: "Blog | Mohammed Haydar",
  description: "Behold, my treasure of wisdom and wonder my collection of articles! 🚀📚"
}

export default function BlogPage() {
  const allBlogs = getBlogPosts()
  const POSTS_PER_PAGE = 10
  const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE)
  const currentPage = 1

  const paginatedPosts = allBlogs
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
    .slice(0, POSTS_PER_PAGE)

  return (
    <BlogLayout
      pageTitle="Posts"
      pageDesc="Behold, my treasure of wisdom and wonder my collection of articles! 🚀📚"
    >
      <ul>
        {paginatedPosts.map(post => (
          <BlogPostCard
            key={post.slug}
            title={post.metadata.title}
            slug={post.slug}
            publishedAt={post.metadata.publishedAt}
            description={post.metadata.summary}
          />
        ))}
      </ul>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </BlogLayout>
  )
}
