import { BlogLayout } from "@/app/components/blog-layout"
import { BlogPostCard } from "@/components/Card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"
import { SITE } from "@/constants"
import { getBlogPosts } from "@/app/data-access/posts/get-posts"
import { generatePaginationItems } from "@/lib/generate-pagination-items"

export const metadata = {
  title: "Blog | Mohammed Haydar",
  description: "Behold, my treasure of wisdom and wonder my collection of articles! 🚀📚"
}

export default async function BlogPage({
  searchParams
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const urlSearchParams = new URLSearchParams()
  urlSearchParams.set("page", String(params?.page ?? 1))
  urlSearchParams.set("limit", String(params?.limit ?? SITE.postPerPage))

  const { posts: allBlogs, pagination: paginationInfo } = await getBlogPosts({
    isPublished: true,
    searchParams: urlSearchParams
  })

  return (
    <BlogLayout
      pageTitle="Posts"
      pageDesc="Behold, my treasure of wisdom and wonder my collection of articles! 🚀📚"
    >
      <ul>
        {allBlogs.map(post => (
          <BlogPostCard
            key={post.id}
            title={post.title}
            slug={post.slug}
            publishedAt={String(post.publishedAt) || "Unknown Date"}
          />
        ))}
      </ul>

      {paginationInfo && paginationInfo.totalPages > 1 && (
        <div className="mt-10">
          <Pagination>
            <PaginationContent>
              {/* Previous button */}
              <PaginationItem>
                <PaginationPrevious
                  href={
                    paginationInfo.hasPreviousPage
                      ? `/blog?page=${paginationInfo.previousPage}&limit=${paginationInfo.pageSize}`
                      : undefined
                  }
                  aria-disabled={!paginationInfo.hasPreviousPage}
                  disabled={!paginationInfo.hasPreviousPage}
                  label={""}
                />
              </PaginationItem>

              {/* Page numbers */}
              {generatePaginationItems(
                paginationInfo.currentPage,
                paginationInfo.totalPages
              ).map((item, index) => (
                <PaginationItem key={`${item}-${index}`}>
                  {item === "ellipsis-start" || item === "ellipsis-end" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href={`/blog?page=${item}&limit=${paginationInfo.pageSize}`}
                      isActive={item === paginationInfo.currentPage}
                      aria-disabled={item === paginationInfo.currentPage}
                      disabled={item === paginationInfo.currentPage}
                      className="bg-transparent border-none hover:bg-transparent"
                    >
                      {item}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              {/* Next button */}
              <PaginationItem>
                <PaginationNext
                  href={
                    paginationInfo.hasNextPage
                      ? `/blog?page=${paginationInfo.nextPage}&limit=${paginationInfo.pageSize}`
                      : undefined
                  }
                  aria-disabled={!paginationInfo.hasNextPage}
                  disabled={!paginationInfo.hasNextPage}
                  label={""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </BlogLayout>
  )
}
