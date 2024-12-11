import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Header from "@/components/Header"
import PageTransition from "@/components/PageTransition"
import StairTransition from "@/components/StairTransition"
import { Toaster } from "@/components/ui/toaster"
import Footer from "@/components/Footer"
import { auth } from "@/auth"

export const metadata: Metadata = {
  title: "Mohammed Ibrahim | A Full Stack Developer",
  description:
    "I'm a full stack developer based in London, UK. I build web applications with React, Next.js, and Node.js."
}

const raleway = localFont({
  src: "./fonts/Raleway.woff2",
  variable: "--font-raleway",
  weight: "100 900"
})

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  const user = session?.user

  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased text-white/80`}>
        <Header user={user} />
        <StairTransition />
        <PageTransition>{children}</PageTransition>
        <Toaster />
        <Footer />
      </body>
    </html>
  )
}
