import { IconBrandGoogleFilled } from "@tabler/icons-react"
import { auth, signIn } from "@/auth"
import { redirect } from "next/navigation"

export default async function SignIn() {
  const session = await auth()
  const user = session?.user

  return user ? (
    redirect("/")
  ) : (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
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
