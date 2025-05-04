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
  PanelLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (open: boolean) => void }) {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({})
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) {
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
  }, [setIsOpen])

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
    <TooltipProvider delayDuration={300}>
      <>
        {/* Mobile Header */}
        <div className="fixed top-0 z-40 w-full h-16 bg-white border-b md:hidden flex items-center justify-between px-4">
          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#5a67f6]"
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
            "fixed inset-0 z-40 bg-black/80 md:hidden transition-opacity duration-300 ease-in-out",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
          onClick={() => setIsOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={cn(
            "fixed top-0 left-0 z-50 h-full bg-[#f5f6fa] transition-all duration-300 ease-in-out transform",
            isOpen ? "w-64" : "w-16",
            isMobile && !isOpen && "-translate-x-full",
          )}
        >
          {/* Toggle and Logo Row */}
          <div className="flex items-center h-16 border-b bg-white px-4 gap-2 justify-between">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <Image src="/logo.png" alt="Hospital Logo" fill className="object-contain" />
              </div>
              {isOpen && <span className="ml-2 text-lg font-semibold">HMS</span>}
            </div>
            {isOpen && (
              <button
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[#5a67f6] hover:bg-[#f5f6fa] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#5a67f6]"
              >
                <PanelLeft className="h-6 w-6" />
              </button>
            )}
          </div>
          {/* Floating toggle for collapsed sidebar */}
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-50 inline-flex h-10 w-10 items-center justify-center rounded-md bg-white text-[#5a67f6] shadow hover:bg-[#f5f6fa] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#5a67f6]"
            >
              <PanelLeft className="h-6 w-6" />
            </button>
          )}

          {/* Sidebar Content */}
          <div className="overflow-y-auto py-4 px-2 h-[calc(100vh-4rem)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <div key={item.title} className="mb-1">
                  {item.submenu ? (
                    <>
                      {!isOpen ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => toggleMenu(item.title)}
                              className={cn(
                                "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                                isActive(item.href)
                                  ? "bg-white text-[#5a67f6] shadow-sm"
                                  : "text-gray-700 hover:bg-white hover:text-[#5a67f6]",
                              )}
                            >
                              <item.icon
                                className="h-5 w-5"
                                style={{ color: isActive(item.href) ? "#5a67f6" : item.color }}
                              />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="bg-white text-gray-900 border shadow-md">
                            {item.title}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <button
                          onClick={() => toggleMenu(item.title)}
                          className={cn(
                            "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                            isActive(item.href)
                              ? "bg-white text-[#5a67f6] shadow-sm"
                              : "text-gray-700 hover:bg-white hover:text-[#5a67f6]",
                          )}
                        >
                          <item.icon
                            className="h-5 w-5"
                            style={{ color: isActive(item.href) ? "#5a67f6" : item.color }}
                          />
                          {isOpen && (
                            <>
                              <span className="ml-3 flex-1 text-left">{item.title}</span>
                              {openMenus[item.title] ? (
                                <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                              ) : (
                                <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                              )}
                            </>
                          )}
                        </button>
                      )}
                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-200 ease-in-out",
                          openMenus[item.title] && isOpen ? "max-h-96" : "max-h-0",
                        )}
                      >
                        <div className="mt-1 ml-4 pl-4 border-l border-gray-200">
                          {item.submenu.map((subitem) => (
                            <Link
                              key={subitem.title}
                              href={subitem.href as any}
                              className={cn(
                                "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                                isActive(subitem.href)
                                  ? "text-[#5a67f6] bg-white/50"
                                  : "text-gray-700 hover:text-[#5a67f6] hover:bg-white/50",
                              )}
                            >
                              {subitem.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {!isOpen ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={item.href as any}
                              className={cn(
                                "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                                isActive(item.href)
                                  ? "bg-white text-[#5a67f6] shadow-sm"
                                  : "text-gray-700 hover:bg-white hover:text-[#5a67f6]",
                              )}
                            >
                              <item.icon
                                className="h-5 w-5"
                                style={{ color: isActive(item.href) ? "#5a67f6" : item.color }}
                              />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="bg-white text-gray-900 border shadow-md">
                            {item.title}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <Link
                          href={item.href as any}
                          className={cn(
                            "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                            isActive(item.href)
                              ? "bg-white text-[#5a67f6] shadow-sm"
                              : "text-gray-700 hover:bg-white hover:text-[#5a67f6]",
                          )}
                        >
                          <item.icon
                            className="h-5 w-5"
                            style={{ color: isActive(item.href) ? "#5a67f6" : item.color }}
                          />
                          {isOpen && <span className="ml-3">{item.title}</span>}
                        </Link>
                      )}
                    </>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </>
    </TooltipProvider>
  )
}
