"use client"
import type React from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Chatbot } from "@/components/chatbot"
import { useState } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div
        className={
          sidebarOpen
            ? "md:pl-16 lg:pl-64 min-h-screen transition-all duration-300 flex-1"
            : "md:pl-16 lg:pl-16 min-h-screen transition-all duration-300 flex-1"
        }
      >
        <Header />
        <main className="pt-16 md:pt-16 px-4">{children}</main>
      </div>
      <Chatbot />
    </div>
  )
}
