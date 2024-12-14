"use client"

import Container from "./Container"
import Link from "next/link"
import { Menu } from "lucide-react"
import Sidebar from "./Sidebar"
import { useState } from "react"
import { Logo } from "./Logo"
import { usePathname } from "next/navigation"
import { navbarData } from "@/constants"
import { signOut, useSession } from "next-auth/react"
import type { User } from "next-auth"

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { data: session } = useSession()
  const user = session?.user as User
  const pathname = usePathname() || ""

  return (
    <header className="border-b border-b-hoverColor/20 bg-bodyColor text-white sticky top-0 z-50">
      <Container className="py-5 flex items-center justify-between">
        <Logo />
        <div className="hidden md:inline-flex items-center gap-7 text-sm uppercase tracking-wide font-medium">
          {navbarData?.map(item => (
            <Link
              key={item?.title}
              href={item?.href}
              className={`hover:text-hoverColor hoverEffect relative group overflow-x-hidden ${
                pathname === item?.href && "text-hoverColor"
              }`}
            >
              {item?.title}
              <span
                className={`w-full h-px bg-hoverColor inline-block absolute left-0 bottom-0 group-hover:translate-x-0 hoverEffect ${
                  pathname === item?.href ? "translate-x-0" : "-translate-x-[105%]"
                }`}
              />
            </Link>
          ))}
          <Link
            href={"/contact"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-lightSky/10 px-4 py-2 rounded-md border border-hoverColor/10 hover:border-hoverColor hover:bg-hoverColor hover:text-black hoverEffect"
          >
            Hire me
          </Link>
          {user && (
            <>
              <Link
                href={"/dashboard/blogs"}
                className="text-sm bg-lightSky/10 px-4 py-2 rounded-md hover:border-hoverColor hover:bg-hoverColor hover:text-black hoverEffect border border-lightSky/100"
              >
                Dashboard
              </Link>
              <button
                onClick={async () => await signOut({ redirectTo: "/" })}
                className="text-sm bg-red-500 px-4 py-2 rounded-md hover:bg-red-700 hoverEffect"
              >
                Sign out
              </button>
            </>
          )}
        </div>
        <button
          aria-label="Toggle menu"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="inline-flex md:hidden relative hover:text-hoverColor hoverEffect"
        >
          <Menu />
        </button>
      </Container>
      <div className="md:hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          pathname={pathname}
          navbarData={navbarData}
          user={user}
        />
      </div>
    </header>
  )
}
