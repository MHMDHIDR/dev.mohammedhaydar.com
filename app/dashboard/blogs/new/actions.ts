"use server"

import { auth } from "@/auth"
import { db } from "@/prisma"
import { AuthError } from "next-auth"

export async function createPost() {
  const session = await auth()
  const user = session?.user

  if (!user || !user.id) {
    throw new AuthError("Unauthorized")
  }

  try {
    // Create a new blog post with minimal initial data
    const newPost = await db.posts.create({
      data: {
        title: "Untitled Draft",
        content: "",
        slug: `draft-${Date.now()}`,
        authorId: user.id,
        published: false
      }
    })
    return newPost.id
  } catch (error) {
    console.error("Error creating post", error)
    throw new Error("Error creating post")
  }
}
