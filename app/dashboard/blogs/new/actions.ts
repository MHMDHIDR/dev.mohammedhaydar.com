"use server"

import { auth } from "@/auth"
import { db } from "@/prisma"
import { AuthError } from "next-auth"

export async function createPost(formData: FormData) {
  const session = await auth()
  const user = session?.user

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
    const newPost = await db.posts.create({
      data: { ...data, authorId: user.id }
    })
    return newPost.id
  } catch (error) {
    console.error("Error creating post", error)
    throw new Error("Error creating post")
  }
}
