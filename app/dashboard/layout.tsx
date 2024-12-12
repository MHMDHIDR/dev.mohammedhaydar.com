import { auth } from "@/auth"
import { notFound } from "next/navigation"
import LayoutSidebar from "./layout-sidebar"

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  const user = session?.user

  return !session ? (
    notFound()
  ) : (
    <>
      <LayoutSidebar user={user} />
      {children}
    </>
  )
}
