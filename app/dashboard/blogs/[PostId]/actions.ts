"use server"

import { auth } from "@/auth"
import { db } from "@/prisma"
import { AuthError } from "next-auth"

export async function editPost(formData: FormData, postId: string) {
  const session = await auth()
  const user = session?.user

  if (!postId) {
    throw new Error("Post ID is required")
  }

  if (!user || !user.id) {
    throw new AuthError("Unauthorized")
  }

  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    published: formData.get("published") === "true"
  }

  try {
    // Create a new blog post
    const updatedPost = await db.posts.update({
      where: { id: postId },
      data: { ...data, authorId: user.id }
    })
    return updatedPost.id
  } catch (error) {
    console.error("Error creating post", error)
    throw new Error("Error creating post")
  }
}
