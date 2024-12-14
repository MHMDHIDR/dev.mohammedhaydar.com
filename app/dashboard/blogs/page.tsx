import { getBlogPosts } from "@/app/data-access/posts/get-posts"
import NoItems from "@/components/NoItems"
import Container from "@/components/Container"
import { BlogPostCard } from "@/components/Card"
import AddBlogButton from "@/app/components/add-blog-btn"

export default async function Blogs() {
  const { posts: blogPosts, count } = await getBlogPosts()

  return (
    <Container>
      {!count ? (
        <NoItems>
          <div className="space-y-4">
            <h1 className="text-lg select-none">No Blogs Found</h1>
            <AddBlogButton />
          </div>
        </NoItems>
      ) : (
        <>
          <AddBlogButton />
          {blogPosts.map(post => (
            <BlogPostCard
              key={post.id}
              id={post.id}
              title={post.title}
              publishedAt={String(post.publishedAt) || "Unknown Date"}
            />
          ))}
        </>
      )}
    </Container>
  )
}
