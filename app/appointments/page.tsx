"use client"

import { SearchInput } from "@/components/search-input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { appointments, searchAppointments } from "@/lib/data"
import { Calendar, Clock, Filter, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useRef } from "react"

export default function AppointmentsPage() {
  const [filteredAppointments, setFilteredAppointments] = useState(appointments)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const results = await searchAppointments(searchQuery)

        // Apply filters
        let filtered = results

        if (statusFilter !== "all") {
          filtered = filtered.filter((appointment) => appointment.status.toLowerCase() === statusFilter.toLowerCase())
        }

        if (departmentFilter !== "all") {
          filtered = filtered.filter(
            (appointment) => appointment.department.toLowerCase() === departmentFilter.toLowerCase(),
          )
        }

        setFilteredAppointments(filtered)
      } catch (error) {
        console.error("Error searching appointments:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [searchQuery, statusFilter, departmentFilter])

  return (
    <div className="space-y-6">
      {/* Top summary cards and actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-none border bg-[#f8fafc]">
            <CardContent className="py-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center rounded-full bg-[#f5f6fa] p-2">
                  <span className="text-xl">🤍</span>
                </span>
                <span className="font-semibold text-gray-700">All Appointments</span>
                <span className="ml-auto text-xs text-gray-400 cursor-pointer">View All</span>
              </div>
              <div className="flex gap-6 mt-2">
                <div className="flex flex-col"><span className="text-lg font-bold">450</span><span className="text-xs text-gray-400">Scheduled</span></div>
                <div className="flex flex-col"><span className="text-lg font-bold">5</span><span className="text-xs text-gray-400">Active</span></div>
                <div className="flex flex-col"><span className="text-lg font-bold">320</span><span className="text-xs text-gray-400">Completed</span></div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-none border bg-[#f8fafc]">
            <CardContent className="py-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center rounded-full bg-[#f5f6fa] p-2">
                  <span className="text-xl">💲</span>
                </span>
                <span className="font-semibold text-gray-700">Billing</span>
                <span className="ml-auto text-xs text-gray-400 cursor-pointer">View All</span>
              </div>
              <div className="flex gap-6 mt-2">
                <div className="flex flex-col"><span className="text-lg font-bold">30</span><span className="text-xs text-gray-400">Total Earning</span></div>
                <div className="flex flex-col"><span className="text-lg font-bold">20</span><span className="text-xs text-gray-400">Settled</span></div>
                <div className="flex flex-col"><span className="text-lg font-bold">5</span><span className="text-xs text-gray-400">To be Settled</span></div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-none border bg-[#f8fafc]">
            <CardContent className="py-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center rounded-full bg-[#f5f6fa] p-2">
                  <span className="text-xl">🤍</span>
                </span>
                <span className="font-semibold text-gray-700">Lab Reports</span>
                <span className="ml-auto text-xs text-gray-400 cursor-pointer">View All</span>
              </div>
              <div className="flex gap-6 mt-2">
                <div className="flex flex-col"><span className="text-lg font-bold">20%</span><span className="text-xs text-gray-400">All Bookings</span></div>
                <div className="flex flex-col"><span className="text-lg font-bold">30</span><span className="text-xs text-gray-400">Sample collected</span></div>
                <div className="flex flex-col"><span className="text-lg font-bold">0</span><span className="text-xs text-gray-400">Reports Generated</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-2 md:gap-4 md:flex-row md:items-center">
          <Button className="bg-[#5a67f6] hover:bg-[#4550e6] w-full md:w-auto">
            + Create New Appointment
          </Button>
          <Button className="bg-[#5a67f6] hover:bg-[#4550e6] w-full md:w-auto">
            + Add New Patient
          </Button>
        </div>
      </div>

      {/* Appointment List Controls */}
      <Card className="p-4 bg-[#f8fafc] border shadow-none">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2 flex-1">
            <Input placeholder="Search" className="w-64" />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex gap-2">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="font-semibold mb-2">By Date</div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> This Week</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Last Week</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> This Month</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Last Month</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> This Year</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Last Year</label>
                </div>
                <label className="flex items-center gap-2 text-sm mb-2"><input type="checkbox" /> Date Range</label>
                <div className="flex gap-2 mb-2">
                  <Input type="date" className="w-1/2" />
                  <Input type="date" className="w-1/2" />
                </div>
                <Button className="w-full bg-[#5a67f6] hover:bg-[#4550e6]">Filter</Button>
              </PopoverContent>
            </Popover>
            <Button variant="outline" size="sm">Share</Button>
            <Link href="/appointments/calendar" passHref legacyBehavior>
              <Button variant="outline" size="sm">
                Calendar View
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Calendar View</span>
          </div>
        </div>
      </Card>

      {/* Appointment List Table */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Appointment List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead><input type="checkbox" /></TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Doctor Name</TableHead>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Example rows, replace with real data */}
                {filteredAppointments.slice(0, 10).map((a, i) => (
                  <TableRow key={i}>
                    <TableCell><input type="checkbox" /></TableCell>
                    <TableCell>{a.patient}</TableCell>
                    <TableCell>12 Aug 2022 - 12:25 am</TableCell>
                    <TableCell>Dr. Rajesh</TableCell>
                    <TableCell>GMO21510 <span className="ml-1 cursor-pointer text-gray-400">📋</span></TableCell>
                    <TableCell>924785421</TableCell>
                    <TableCell>
                      <Select defaultValue="Checked Out">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Checked Out">Checked Out</SelectItem>
                          <SelectItem value="Check-In">Check-In</SelectItem>
                          <SelectItem value="Re-Schedule">Re-Schedule</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {/* Status badge logic */}
                      {i % 3 === 0 && <Badge className="bg-green-100 text-green-800">Completed</Badge>}
                      {i % 3 === 1 && <Badge className="bg-blue-100 text-blue-800">In-Progress</Badge>}
                      {i % 3 === 2 && <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Select defaultValue="10">
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              Items per page
              <span className="ml-2">1-10 of 200 items</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">1</Button>
              <Button variant="outline" size="sm">of 44 pages</Button>
              <Button variant="outline" size="sm">&gt;</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
