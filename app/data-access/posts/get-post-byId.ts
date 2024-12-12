"use server"

import { db } from "@/prisma"
import { posts } from "@prisma/client"

export async function getPostById({ postId }: { postId: string }): Promise<posts | null> {
  const fetchedPost = await db.posts.findFirst({
    where: { id: postId }
  })

  return fetchedPost
}
