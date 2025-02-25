import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navbar from "../components/Navbar"
import { ClerkProvider } from "@/components/ClerkProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MoveMate",
  description: "Connect movers with house hunters - no agents, no fees.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </ClerkProvider>
    </html>
  )
}



import './globals.css'