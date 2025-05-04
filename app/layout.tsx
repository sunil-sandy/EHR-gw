import type React from "react"
import { Providers } from "@/lib/providers"
import "./globals.css"

export const metadata = {
  title: "Hospital Management System",
  description: "A comprehensive hospital management system",
    generator: ''
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
