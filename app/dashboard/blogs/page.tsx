import { getBlogPosts } from "@/app/data-access/posts/get-posts"
import NoItems from "@/components/NoItems"
import { Button } from "@/components/ui/button"
import Container from "@/components/Container"
import Link from "next/link"
import { BlogPostCard } from "@/components/Card"

export default async function Blogs() {
  const { blogs: blogPosts, count } = await getBlogPosts()

  return (
    <Container>
      {!count ? (
        <NoItems>
          <div className="space-y-4">
            <h1 className="text-lg select-none">No Blogs Found</h1>
            <Link href="/dashboard/blogs/new" className="inline-flex">
              <Button className="bg-primary/50 py-2 px-4 rounded-md hover:bg-lightSky">
                Create Blog
              </Button>
            </Link>
          </div>
        </NoItems>
      ) : (
        blogPosts.map(post => (
          <BlogPostCard
            key={post.id}
            id={post.id}
            title={post.title}
            publishedAt={String(post.publishedAt) || "Unknown Date"}
            //dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ))
      )}
    </Container>
  )
}
