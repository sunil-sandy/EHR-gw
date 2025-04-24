"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Home,
  Users,
  Calendar,
  Bed,
  FileText,
  CreditCard,
  Package,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

type MenuItem = {
  title: string
  href: string
  icon: React.ElementType
  color: string
  submenu?: {
    title: string
    href: string
    color: string
  }[]
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
    color: "#6c5ce7",
  },
  {
    title: "Patients",
    href: "/patients",
    icon: Users,
    color: "#0984e3",
    submenu: [
      { title: "All Patients", href: "/patients", color: "#0984e3" },
      { title: "Add Patient", href: "/patients/registration", color: "#00b894" },
      { title: "Patient Records", href: "/patients/records", color: "#fdcb6e" },
    ],
  },
  {
    title: "Appointments",
    href: "/appointments",
    icon: Calendar,
    color: "#00b894",
    submenu: [
      { title: "Schedule", href: "/appointments", color: "#00b894" },
      { title: "Calendar View", href: "/appointments/calendar", color: "#00b894" },
    ],
  },
  {
    title: "Inpatient",
    href: "/inpatient",
    icon: Bed,
    color: "#e84393",
    submenu: [
      { title: "Ward View", href: "/inpatient", color: "#e84393" },
      { title: "Bed Allocation", href: "/inpatient/beds", color: "#e84393" },
    ],
  },
  {
    title: "EMR",
    href: "/emr",
    icon: FileText,
    color: "#fdcb6e",
    submenu: [
      { title: "Patient Records", href: "/emr/records", color: "#fdcb6e" },
      { title: "Prescriptions", href: "/emr/prescriptions", color: "#fdcb6e" },
      { title: "Lab Results", href: "/emr/lab-results", color: "#fdcb6e" },
    ],
  },
  {
    title: "Billing",
    href: "/billing",
    icon: CreditCard,
    color: "#e17055",
    submenu: [
      { title: "Invoices", href: "/billing/invoices", color: "#e17055" },
      { title: "Payments", href: "/billing/payments", color: "#e17055" },
    ],
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: Package,
    color: "#6c5ce7",
    submenu: [
      { title: "Medicines", href: "/inventory/medicines", color: "#6c5ce7" },
      { title: "Supplies", href: "/inventory/supplies", color: "#6c5ce7" },
      { title: "Orders", href: "/inventory/orders", color: "#6c5ce7" },
    ],
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
    color: "#00cec9",
    submenu: [
      { title: "Analytics", href: "/reports/analytics", color: "#00cec9" },
      { title: "Patient Stats", href: "/reports/patient-stats", color: "#00cec9" },
      { title: "Financial", href: "/reports/financial", color: "#00cec9" },
    ],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    color: "#636e72",
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({})
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Initialize open menus based on current path
  useEffect(() => {
    const currentOpenMenus: { [key: string]: boolean } = {}

    menuItems.forEach((item) => {
      if (item.submenu) {
        const isSubmenuActive = item.submenu.some(
          (subItem) => pathname === subItem.href || pathname.startsWith(`${subItem.href}/`),
        )
        if (isSubmenuActive) {
          currentOpenMenus[item.title] = true
        }
      }
    })

    setOpenMenus(currentOpenMenus)
  }, [pathname])

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 z-40 w-full h-16 bg-white border-b md:hidden flex items-center justify-between px-4">
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
          <div className="ml-4 relative h-8 w-8">
            <Image src="/logo.png" alt="Hospital Logo" fill className="object-contain" />
          </div>
          <span className="ml-2 text-lg font-semibold">HMS</span>
        </div>
      </div>

      {/* Backdrop for mobile */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/80 md:hidden transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full bg-[#f5f6fa] transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : "w-16",
          isMobile && !isOpen && "-translate-x-full",
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b bg-white px-4">
          <div className="flex items-center">
            <div className="relative h-8 w-8 mr-2">
              <Image src="/logo.png" alt="Hospital Logo" fill className="object-contain" />
            </div>
            {isOpen && <span className="text-lg font-semibold">HMS</span>}
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
            >
              <Menu className="h-5 w-5" />
            </button>
            {isMobile && (
              <button
                onClick={() => setIsOpen(false)}
                className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 md:hidden"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="overflow-y-auto py-4 px-2 h-[calc(100vh-4rem)]">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <div key={item.title} className="mb-1">
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleMenu(item.title)}
                      className={cn(
                        "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium",
                        isActive(item.href)
                          ? "bg-white text-[#5a67f6]"
                          : "text-gray-700 hover:bg-white hover:text-[#5a67f6]",
                      )}
                    >
                      <item.icon className="h-5 w-5" style={{ color: isActive(item.href) ? "#5a67f6" : item.color }} />
                      {isOpen && (
                        <>
                          <span className="ml-3 flex-1 text-left">{item.title}</span>
                          {openMenus[item.title] ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </>
                      )}
                    </button>
                    {openMenus[item.title] && isOpen && (
                      <div className="mt-1 ml-4 pl-4 border-l border-gray-200">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.title}
                            href={subitem.href}
                            className={cn(
                              "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                              isActive(subitem.href) ? "text-[#5a67f6]" : "text-gray-700 hover:text-[#5a67f6]",
                            )}
                          >
                            {subitem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                      isActive(item.href)
                        ? "bg-white text-[#5a67f6]"
                        : "text-gray-700 hover:bg-white hover:text-[#5a67f6]",
                    )}
                  >
                    <item.icon className="h-5 w-5" style={{ color: isActive(item.href) ? "#5a67f6" : item.color }} />
                    {isOpen && <span className="ml-3">{item.title}</span>}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
