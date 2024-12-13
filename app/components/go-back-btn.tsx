"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function GoBackbtn() {
  const router = useRouter()
  return (
    <Button
      className="focus-outline mb-2 mt-4 flex hover:opacity-75 group px-0"
      onClick={router.back}
      variant={"link"}
    >
      <ArrowLeft
        size={24}
        className="group-hover:-translate-x-1.5 transition-transform"
      />
      <span>Go back</span>
    </Button>
  )
}
