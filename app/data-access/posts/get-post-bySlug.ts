"use server"

import { db } from "@/prisma"
import { posts } from "@prisma/client"

export async function getPostBySlug({ slug }: { slug: string }): Promise<posts | null> {
  const fetchedPost = await db.posts.findFirst({
    where: { slug }
  })

  return fetchedPost
}
