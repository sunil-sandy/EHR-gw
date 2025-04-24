import type React from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Chatbot } from "@/components/chatbot"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:pl-16 lg:pl-64 min-h-screen transition-all duration-300">
        <Header />
        <main className="pt-16 md:pt-16 px-4">{children}</main>
      </div>
      <Chatbot />
    </div>
  )
}
