"use server"

import { db } from "@/prisma"
import { posts } from "@prisma/client"

export async function getBlogPosts(): Promise<{ blogs: posts[]; count: number }> {
  const blogs = await db.posts.findMany()
  const count = await db.posts.count()

  return { blogs, count }
}
