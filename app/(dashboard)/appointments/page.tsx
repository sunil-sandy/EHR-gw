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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#5a67f6] hover:bg-[#4550e6]">
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>New Appointment</DialogTitle>
              <DialogDescription>Schedule a new appointment for a patient</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="patient">Patient</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-smith">John Smith</SelectItem>
                    <SelectItem value="emily-davis">Emily Davis</SelectItem>
                    <SelectItem value="robert-wilson">Robert Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="doctor">Doctor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-wilson">Dr. Sarah Wilson</SelectItem>
                    <SelectItem value="dr-brown">Dr. Michael Brown</SelectItem>
                    <SelectItem value="dr-lee">Dr. Jennifer Lee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <Input id="date" placeholder="Select date" />
                    <Button variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 text-gray-400">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <div className="relative">
                    <Input id="time" placeholder="Select time" />
                    <Button variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 text-gray-400">
                      <Clock className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Input id="notes" placeholder="Add notes (optional)" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button className="bg-[#5a67f6] hover:bg-[#4550e6]">Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="today">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value="today">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>Manage and view today's appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <SearchInput placeholder="Search appointments..." onChange={setSearchQuery} className="w-64" />
                  <Button variant="outline" size="sm" onClick={() => setStatusFilter("all")}>
                    <Filter className="mr-2 h-4 w-4" />
                    All
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setStatusFilter("confirmed")}>
                    Confirmed
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setStatusFilter("waiting")}>
                    Waiting
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">July 12, 2023</span>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-4 rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          <div className="flex items-center justify-center">
                            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-[#5a67f6]"></div>
                            <span className="ml-2">Loading...</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : filteredAppointments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No appointments found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell className="font-medium">{appointment.id}</TableCell>
                          <TableCell>{appointment.patient}</TableCell>
                          <TableCell>{appointment.doctor}</TableCell>
                          <TableCell>{appointment.department}</TableCell>
                          <TableCell>{appointment.time}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                appointment.status === "Confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : appointment.status === "Completed"
                                    ? "bg-blue-100 text-blue-800"
                                    : appointment.status === "Waiting"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                              }`}
                            >
                              {appointment.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>View and manage upcoming appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.slice(5, 10).map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between rounded-md border p-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{appointment.patient}</span>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800`}
                        >
                          Confirmed
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {appointment.doctor} • {appointment.department} • {appointment.date} • {appointment.time}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button variant="outline" size="sm" className="bg-[#5a67f6] text-white hover:bg-[#4550e6]">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Appointments</CardTitle>
              <CardDescription>View history of completed appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments
                  .filter((a) => a.status === "Completed")
                  .map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between rounded-md border p-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{appointment.patient}</span>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800`}
                          >
                            Completed
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {appointment.doctor} • {appointment.department} • {appointment.date} • {appointment.time}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Report
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cancelled">
          <Card>
            <CardHeader>
              <CardTitle>Cancelled Appointments</CardTitle>
              <CardDescription>View history of cancelled appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments
                  .filter((a) => a.status === "Cancelled")
                  .map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between rounded-md border p-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{appointment.patient}</span>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800`}
                          >
                            Cancelled
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {appointment.doctor} • {appointment.department} • {appointment.date} • {appointment.time}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
