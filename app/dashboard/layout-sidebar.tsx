"use client"

import Sidebar from "@/components/Sidebar"
import { dashboardNavbarData } from "@/constants"
import { Menu } from "lucide-react"
import type { User } from "next-auth"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function LayoutSidebar({ user }: { user: User | undefined }) {
  const pathname = usePathname() as string
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <button
        aria-label="Toggle menu"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-0 hover:text-hoverColor hoverEffect w-full bg-primary/50 py-2"
      >
        <Menu className="ml-auto mr-4" />
      </button>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        pathname={pathname}
        navbarData={dashboardNavbarData}
        user={user}
        side="left"
      />
    </>
  )
}
