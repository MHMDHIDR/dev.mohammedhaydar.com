import { useOutsideClick } from "@/hooks/use-outside-click"
import { X } from "lucide-react"
import React from "react"
import { Logo } from "./Logo"
import Link from "next/link"
import SocialLinks from "./SocialLinks"
import type { User } from "next-auth"
import { signOut } from "next-auth/react"
import clsx from "clsx"

type SidebarProps = {
  isOpen?: boolean
  onClose: () => void
  pathname: string
  user: User | undefined
  navbarData: { title: string; href: string }[]
  side?: "left" | "right"
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen = false,
  onClose,
  pathname,
  navbarData,
  user,
  side = "right"
}) => {
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose)

  return (
    <div
      ref={sidebarRef}
      className={clsx(
        "fixed inset-y-0 z-50 min-w-72 max-w-96 bg-bodyColor border-l border-l-hoverColor/50 shadow-xl transform transition-transform duration-300 ease-in-out",
        {
          "translate-x-0": isOpen,
          "translate-x-full": !isOpen && side === "right",
          "-translate-x-full": !isOpen && side === "left",
          "left-0": side === "left",
          "right-0": side === "right"
        }
      )}
    >
      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          className="hover:text-red-600 hoverEffect"
          aria-label="Close sidebar"
        >
          <X />
        </button>
      </div>
      <nav className="flex flex-col px-5 gap-7 text-sm uppercase tracking-wide font-medium mt-2">
        <span className="flex gap-x-2 items-center">
          <Logo /> Mohammed Ibrahim
        </span>
        {navbarData.map(item => (
          <Link
            key={item.title}
            href={item.href}
            className={`hover:text-hoverColor hoverEffect ${
              pathname === item.href && "text-hoverColor"
            }`}
            onClick={onClose}
          >
            {item.title}
          </Link>
        ))}
        <Link
          href={"/contact"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm bg-lightSky/10 px-4 py-2 rounded-md border border-hoverColor/10 hover:border-hoverColor hover:bg-hoverColor hover:text-black hoverEffect"
          onClick={onClose}
        >
          Let's Talk
        </Link>
        {user && (
          <>
            <Link
              href={"/dashboard"}
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
        <SocialLinks />
      </nav>
    </div>
  )
}

export default Sidebar
