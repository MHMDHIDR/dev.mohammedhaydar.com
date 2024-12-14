import { db } from "@/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { notFound } from "next/navigation"
import authConfig from "./auth.config"
import { env } from "./env"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  ...authConfig,
  callbacks: {
    async signIn({ user }) {
      if (user.email !== env.ADMIN_EMAIL) {
        // throw new AuthError("Unauthorized access")
        notFound()
      }
      return true
    }
  }
})
