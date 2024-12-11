import { prisma } from "@/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { notFound } from "next/navigation"
import authConfig from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  callbacks: {
    async signIn({ user }) {
      if (user.email !== process.env.ADMIN_EMAIL) {
        // throw new AuthError("Unauthorized access")
        notFound()
      }
      return true
    }
  }
})
