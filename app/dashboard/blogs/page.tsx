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
import NoItems from "@/components/NoItems"
import AddBlogButton from "@/app/components/add-blog-btn"

export default async function Blogs({
  searchParams
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const urlSearchParams = new URLSearchParams()
  urlSearchParams.set("page", String(params?.page ?? 1))
  urlSearchParams.set("limit", String(params?.limit ?? SITE.postPerPage))

  const {
    posts: blogPosts,
    pagination: paginationInfo,
    count
  } = await getBlogPosts({
    isPublished: true,
    searchParams: urlSearchParams
  })

  return !count ? (
    <NoItems>
      <div className="space-y-4">
        <h1 className="text-lg select-none">No Blogs Found</h1>
        <AddBlogButton />
      </div>
    </NoItems>
  ) : (
    <>
      <AddBlogButton />
      {blogPosts
        .sort((a, b) => {
          if (new Date(String(a.publishedAt)) > new Date(String(b.publishedAt))) {
            return -1
          }
          return 1
        })
        .map(post => (
          <BlogPostCard
            key={post.id}
            id={post.id}
            title={post.title}
            publishedAt={String(post.publishedAt) || "Unknown Date"}
            classNames="border border-dashed border-gray-200 py-1.5 px-3 rounded-md"
          />
        ))}

      {paginationInfo && paginationInfo.totalPages > 1 && (
        <div className="mt-10">
          <Pagination>
            <PaginationContent>
              {/* Previous button */}
              <PaginationItem>
                <PaginationPrevious
                  href={
                    paginationInfo.hasPreviousPage
                      ? `/dashboard/blogs?page=${paginationInfo.previousPage}&limit=${paginationInfo.pageSize}`
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
                      href={`/dashboard/blogs?page=${item}&limit=${paginationInfo.pageSize}`}
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
                      ? `/dashboard/blogs?page=${paginationInfo.nextPage}&limit=${paginationInfo.pageSize}`
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
    </>
  )
}
