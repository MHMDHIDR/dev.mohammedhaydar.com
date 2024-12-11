import { SOCIALS } from "@/constants"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full mt-10">
      <hr className="border-t my-4" />
      <div className="flex items-center py-4 container mx-auto">
        <div className="inline-flex flex-1 gap-x-3">
          {SOCIALS.filter(social => social.active).map(social => (
            <Link
              key={social.href}
              href={social.href}
              className="opacity-90 hover:opacity-100 rotate-6 hover:rotate-0 transition-transform"
              title={social.linkTitle}
              target="_blank"
              rel="noopener noreferrer"
            >
              <social.icon className="w-6 h-6" />
              <span className="sr-only">{social.linkTitle}</span>
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <span>Copyright © {currentYear}</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
