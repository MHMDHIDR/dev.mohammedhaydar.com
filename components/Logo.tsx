import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import React from "react"

export function Logo({ className }: { className?: string }) {
  return (
    <Link href={"/"}>
      <Image
        src="/logo.svg"
        width={25}
        height={25}
        alt="Mohammed Ibrahim"
        className={cn("cursor-pointer", className)}
      />
    </Link>
  )
}