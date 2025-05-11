"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { useState } from "react"

// Mock data for calendar events
const events = [
  { id: 1, title: "John Smith", doctor: "Dr. Wilson", time: "09:00 AM", type: "Checkup" },
  { id: 2, title: "Emily Davis", doctor: "Dr. Brown", time: "10:30 AM", type: "Follow-up" },
  { id: 3, title: "Robert Wilson", doctor: "Dr. Lee", time: "11:45 AM", type: "Consultation" },
  { id: 4, title: "Sarah Johnson", doctor: "Dr. Clark", time: "02:15 PM", type: "Checkup" },
  { id: 5, title: "Michael Brown", doctor: "Dr. Rodriguez", time: "03:30 PM", type: "Surgery" },
]

// Generate days for the calendar
const generateDays = () => {
  const days = []
  const date = new Date(2023, 6, 1) // July 1, 2023
  const month = date.getMonth()

  // Find the first day of the month
  const firstDay = new Date(date.getFullYear(), month, 1).getDay()

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: "", date: null, events: [] })
  }

  // Add days of the month
  const daysInMonth = new Date(date.getFullYear(), month + 1, 0).getDate()
  for (let i = 1; i <= daysInMonth; i++) {
    const currentDate = new Date(date.getFullYear(), month, i)
    const dayEvents = i === 12 ? events : [] // Add events to July 12
    days.push({ day: i, date: currentDate, events: dayEvents })
  }

  return days
}

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState("July 2023")
  const days = generateDays()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Calendar View</h1>
        <Button className="bg-[#5a67f6] hover:bg-[#4550e6]">
          <Plus className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Appointments Calendar</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Select defaultValue="july">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="July 2023" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="june">June 2023</SelectItem>
                  <SelectItem value="july">July 2023</SelectItem>
                  <SelectItem value="august">August 2023</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardDescription>View and manage appointments in calendar format</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center font-medium">
                {day}
              </div>
            ))}
            {days.map((day, index) => (
              <div
                key={index}
                className={`min-h-[120px] rounded-md border p-2 ${
                  day.day === 12 ? "bg-blue-50 border-blue-200" : ""
                } ${!day.day ? "bg-gray-50" : ""}`}
              >
                {day.day && (
                  <>
                    <div className="text-right font-medium">{day.day}</div>
                    <div className="mt-1 space-y-1">
                      {day.events.map((event) => (
                        <div
                          key={event.id}
                          className="rounded-md bg-[#5a67f6] p-1 text-xs text-white truncate"
                          title={`${event.title} - ${event.doctor} - ${event.time}`}
                        >
                          {event.time} - {event.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>Appointments for July 12, 2023</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="flex items-center justify-between rounded-md border p-4">
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {event.doctor} • {event.time} • {event.type}
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
    </div>
  )
}
