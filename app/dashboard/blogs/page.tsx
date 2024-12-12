import { getBlogPosts } from "@/app/data-access/get-posts"
import NoItems from "@/components/NoItems"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Blogs() {
  const { blogs: blogPosts, count } = await getBlogPosts()

  return (
    <div>
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
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  )
}
