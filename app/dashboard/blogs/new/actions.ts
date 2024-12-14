"use server"

import { auth } from "@/auth"
import { slugify } from "@/lib/slugify"
import { db } from "@/prisma"
import { AuthError } from "next-auth"
import { posts } from "@prisma/client"

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

export async function updatePostContent(
  postId: posts["id"],
  title: posts["title"],
  content: posts["content"]
) {
  const session = await auth()
  const user = session?.user

  if (!user || !user.id) {
    throw new AuthError("Unauthorized")
  }

  try {
    const updatedPost = await db.posts.update({
      where: { id: postId, authorId: user.id },
      data: { content, title, slug: slugify(title) }
    })
    return updatedPost
  } catch (error) {
    console.error("Error updating post", error)
    throw new Error("Error updating post")
  }
}
