"use server"

import { pagination, PaginationResult } from "@/lib/pagination"
import { db } from "@/prisma"
import { posts } from "@prisma/client"

export type GetPostsResponse = {
  posts: Array<posts>
  count: number
  pagination?: PaginationResult
}

export async function getBlogPosts(params?: {
  isPublished?: boolean
  searchParams?: URLSearchParams
}): Promise<GetPostsResponse> {
  let whereClause: { published: boolean } | undefined

  if (params?.isPublished !== undefined) {
    whereClause = { published: params.isPublished }
  }

  const count = await db.posts.count({ where: whereClause })

  const totalItems = Number(count)

  // If no searchParams provided, return all results without pagination
  if (!params?.searchParams) {
    const allPosts = await db.posts.findMany({ where: whereClause })

    return { posts: allPosts, count: totalItems }
  }

  // Handle pagination when searchParams is provided
  const { page, limit } = pagination.parseSearchParams(params.searchParams)
  const paginationData = pagination.calculate({ page, limit, totalItems })

  const paginatedPosts = await db.posts.findMany({
    where: whereClause,
    take: paginationData.pageSize,
    skip: paginationData.offset,
    orderBy: { publishedAt: "desc" }
  })

  return { posts: paginatedPosts, count: totalItems, pagination: paginationData }
}
