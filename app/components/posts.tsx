import { formatDate, getBlogPosts } from "@/app/blog/utils"
import Link from "next/link"

export function BlogPosts() {
  const allBlogs = getBlogPosts()

  return (
    <div className="flex flex-col gap-2 p-10">
      {allBlogs
        .sort((a, b) => {
          // Sort by date from newest to oldest
          if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
            return -1
          }
          return 1
        })
        .map(post => (
          <Link
            key={post.slug}
            className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            href={`/blog/${post.slug}`}
          >
            <div className="flex flex-col">
              <p className="text-lightSky dark:text-lightSky w-full text-sm tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="text-lightSky dark:text-lightSky tracking-tight">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}
