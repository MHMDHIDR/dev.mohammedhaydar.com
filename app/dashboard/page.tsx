import { auth } from "@/auth"
import { notFound } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()

  return !session ? (
    notFound()
  ) : (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}
