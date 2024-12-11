import Link from "next/link"

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null
  const nextPage = currentPage < totalPages ? currentPage + 1 : null

  return totalPages > 1 ? (
    <nav className="mb-8 mt-auto flex justify-center" aria-label="Pagination">
      {prevPage && (
        <Link
          href={`/blog${prevPage > 1 ? `/${prevPage}` : ""}`}
          className="mr-4 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 inline-block w-5 h-5">
            <path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z" />
          </svg>
          Prev
        </Link>
      )}

      <span>
        {currentPage} / {totalPages}
      </span>

      {nextPage && (
        <Link href={`/blog/${nextPage}`} className="ml-4 flex items-center">
          Next
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 inline-block w-5 h-5">
            <path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z" />
          </svg>
        </Link>
      )}
    </nav>
  ) : null
}
