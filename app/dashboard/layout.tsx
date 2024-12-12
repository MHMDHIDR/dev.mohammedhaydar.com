import { auth } from "@/auth"
import { notFound } from "next/navigation"

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return !session ? notFound() : children
}
