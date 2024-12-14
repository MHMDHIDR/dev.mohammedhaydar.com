import { auth } from "@/auth"
import { IconBrandGoogleFilled } from "@tabler/icons-react"
import { redirect } from "next/navigation"
import { handleSignIn } from "./actions"

export default async function SignIn() {
  const session = await auth()
  const user = session?.user

  if (user) {
    redirect("/")
  }

  return (
    <form
      action={handleSignIn as unknown as string}
      className="grid place-items-center my-80"
    >
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex gap-x-2.5"
      >
        <IconBrandGoogleFilled className="w-6 h-6" />
        Sign in with Google
      </button>
    </form>
  )
}
