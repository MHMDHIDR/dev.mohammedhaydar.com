import { auth } from "@/auth"
import { notFound } from "next/navigation"
import LayoutSidebar from "./layout-sidebar"
import Container from "@/components/Container"

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session || !session.user) {
    notFound()
  }

  return (
    <>
      <LayoutSidebar user={session.user} />
      <Container className="max-w-4xl pt-5">
        <main className="md:mt-20">{children}</main>
      </Container>
    </>
  )
}
