import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Header from "@/components/Header"
import PageTransition from "@/components/PageTransition"
import StairTransition from "@/components/StairTransition"
import { Toaster } from "@/components/ui/toaster"
import Footer from "@/components/Footer"
import { Suspense } from "react"
import { SessionProvider } from "next-auth/react"

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
  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased text-white/80`}>
        <SessionProvider>
          <Header />
        </SessionProvider>
        <StairTransition />
        <PageTransition>
          <Suspense>{children}</Suspense>
        </PageTransition>
        <Toaster />
        <Footer />
      </body>
    </html>
  )
}
