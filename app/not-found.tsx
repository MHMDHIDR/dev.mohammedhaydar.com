"use client"

import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function NotFound() {
  const searchParams = useSearchParams()
  const AccessDenied = searchParams?.get("error") === "AccessDenied"

  return (
    <main
      id="main-content"
      className="mx-auto flex max-w-3xl flex-1 items-center justify-center"
    >
      <div className="mb-14 flex flex-col items-center justify-center">
        <div aria-hidden="true">
          <Image
            src={AccessDenied ? "/access-denied.svg" : "/not-found.svg"}
            height={350}
            width={350}
            alt="not found"
            className="mx-auto my-10"
          />
        </div>

        <p className="mt-4 text-2xl sm:text-3xl">
          {AccessDenied ? "Sorry You're NOT ALLOWED TO BE HERE" : "Page Not Found"}
        </p>

        <Link
          href="/"
          className="my-6 text-lg underline decoration-dashed underline-offset-8"
        >
          Go back home
        </Link>
      </div>
    </main>
  )
}
