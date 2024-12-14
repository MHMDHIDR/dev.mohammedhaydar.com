"use server"

import { signIn } from "@/auth"

export async function handleSignIn() {
  return signIn("google", { redirectTo: "/dashboard/blogs" })
}
