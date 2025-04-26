import type React from "react"
import { Providers } from "@/lib/providers"
import "./globals.css"

export const metadata = {
  title: "Hospital Management System",
  description: "A comprehensive hospital management system",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
