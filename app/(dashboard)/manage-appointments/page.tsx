"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Filter, Calendar, Plus, Users, CreditCard, FileText, User, Bell, HeartPulse } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const allAppointments = [
  { patient: "Janet Adebayo", id: "1", date: "12 Aug 2022 - 12:25 am", doctor: "Dr. Rajesh", pid: "GMO21510", contact: "924785421", action: "Checked Out", status: "Completed" },
  { patient: "Samuel Johnson", id: "2", date: "12 Aug 2022 - 12:25 am", doctor: "Dr. Rajesh", pid: "GMO21510", contact: "924785421", action: "Check-In", status: "In-Progress" },
  { patient: "Francis Doe", id: "3", date: "12 Aug 2022 - 12:25 am", doctor: "Dr. Rajesh", pid: "GMO21510", contact: "924785421", action: "Re-Schedule", status: "Pending" },
  { patient: "Christian Dior", id: "4", date: "12 Aug 2022 - 12:25 am", doctor: "Dr. Rajesh", pid: "GMO21510", contact: "924785421", action: "Completed", status: "Completed" },
  { patient: "Christian Dior", id: "5", date: "12 Aug 2022 - 12:25 am", doctor: "Dr. Rajesh", pid: "GMO21510", contact: "924785421", action: "Completed", status: "Completed" },
  { patient: "Janet Adebayo", id: "1", date: "12 Aug 2022 - 12:25 am", doctor: "Dr. Rajesh", pid: "GMO21510", contact: "924785421", action: "Completed", status: "Completed" },
  { patient: "Samuel Johnson", id: "2", date: "12 Aug 2022 - 12:25 am", doctor: "Dr. Rajesh", pid: "GMO21510", contact: "924785421", action: "In-Progress", status: "In-Progress" },
  { patient: "Francis Doe", id: "3", date: "12 Aug 2022 - 12:25 am", doctor: "Dr. Rajesh", pid: "GMO21510", contact: "924785421", action: "Pending", status: "Pending" },
  { patient: "Christian Dior", id: "4", date: "12 Aug 2022 - 12:25 am", doctor: "Dr. Rajesh", pid: "GMO21510", contact: "924785421", action: "Completed", status: "Completed" },
  { patient: "Christian Dior", id: "5", date: "12 Aug 2022 - 12:25 am", doctor: "Dr. Rajesh", pid: "GMO21510", contact: "924785421", action: "Completed", status: "Completed" },
]

function CalendarView({ appointments, onClose }: { appointments: typeof allAppointments, onClose: () => void }) {
  // Map appointments to time slots and columns for a realistic calendar grid
  const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];
  const columns = [
    { name: "Abril Lewis", role: "Physician" },
    { name: "Allan Hicks", role: "Physician" },
    { name: "Bianca Heath", role: "Nurse practitioner" },
    { name: "Emmy Massey", role: "Physician assistant" },
  ];
  // Assign appointments to columns and hours for demo
  const grid = hours.map((hour, i) =>
    columns.map((col, j) => {
      // Just for demo, assign appointments in order
      const appt = appointments[(i * columns.length + j) % appointments.length];
      return appt;
    })
  );
  return (
    <div className="bg-white rounded-xl p-6 mt-4 shadow border max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">&#8592;</Button>
          <span className="font-semibold text-lg">May 27, 2022 Today</span>
          <Button variant="outline" size="icon">&#8594;</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon"><Calendar className="h-5 w-5" /></Button>
          <Button variant="outline" size="sm">Day</Button>
          <Button variant="outline" size="sm">Week</Button>
          <Select defaultValue="primary-care">
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="primary-care">Primary care</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-pink-500 text-white" size="sm" onClick={onClose}>Close Calendar View</Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-5 gap-2 min-w-[900px]">
          <div className="text-center font-semibold"></div>
          {columns.map((col, i) => (
            <div key={i} className="text-center font-semibold">
              {col.name}<br /><span className='text-xs font-normal'>{col.role}</span>
            </div>
          ))}
        </div>
        {/* Calendar grid with appointments */}
        <div className="grid grid-cols-5 gap-2 min-w-[900px]">
          {/* Time column */}
          <div className="flex flex-col gap-2">
            {hours.map((h, i) => (
              <div key={i} className="h-16 flex items-center justify-center text-xs font-semibold text-gray-500">{h}</div>
            ))}
          </div>
          {/* Appointment columns */}
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-2">
              {hours.map((h, rowIdx) => {
                const appt = grid[rowIdx][colIdx];
                return (
                  <div key={h} className="h-16 bg-[#f5f6fa] rounded-md flex flex-col items-start justify-center px-2 border border-gray-100">
                    <span className="font-medium text-sm text-[#5a67f6]">{appt.patient}</span>
                    <span className="text-xs text-gray-500">{appt.status}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NewAppointmentModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full rounded-2xl p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-2xl font-bold">Create New Appointment</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-[#f8fafc]">
          {/* Left column */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Patient Details</span>
              <span className="flex items-center gap-2 text-sm">Notify Patient <input type="checkbox" className="accent-blue-500 scale-125" defaultChecked /></span>
            </div>
            <Input placeholder="Patient ID" className="mb-2" />
            <Input placeholder="Search" className="mb-2" />
            <div className="flex gap-2">
              <Select><SelectTrigger className="w-24"><SelectValue placeholder="Mr/Mrs" /></SelectTrigger><SelectContent><SelectItem value="mr">Mr</SelectItem><SelectItem value="mrs">Mrs</SelectItem></SelectContent></Select>
              <Input placeholder="Patient Name" />
            </div>
            <div className="flex gap-2">
              <Select><SelectTrigger className="w-24"><SelectValue placeholder="+91" /></SelectTrigger><SelectContent><SelectItem value="+91">+91</SelectItem></SelectContent></Select>
              <Input placeholder="8023456789" />
            </div>
            <div className="flex gap-2">
              <Input placeholder="Age" />
              <Input placeholder="12/12/2020" type="date" />
            </div>
            <div className="flex gap-2">
              <Select><SelectTrigger className="w-24"><SelectValue placeholder="Gender" /></SelectTrigger><SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent></Select>
              <Select><SelectTrigger className="w-24"><SelectValue placeholder="Blood Group" /></SelectTrigger><SelectContent><SelectItem value="A+">A+</SelectItem><SelectItem value="B+">B+</SelectItem></SelectContent></Select>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Attendant Name" />
              <Select><SelectTrigger className="w-24"><SelectValue placeholder="Relation" /></SelectTrigger><SelectContent><SelectItem value="family">Family</SelectItem></SelectContent></Select>
            </div>
            <Input placeholder="Address" />
          </div>
          {/* Right column */}
          <div className="flex-1 space-y-4">
            <div className="font-semibold mb-2">Appointment Date & Time</div>
            <div className="flex gap-2">
              <Input placeholder="12/12/2020" type="date" />
              <Input placeholder="12:00 PM" type="time" />
            </div>
            <div className="flex gap-2">
              <Select><SelectTrigger className="w-48"><SelectValue placeholder="Consultant Doctor" /></SelectTrigger><SelectContent><SelectItem value="dr-rajesh">Dr. Rajesh</SelectItem></SelectContent></Select>
              <Select><SelectTrigger className="w-48"><SelectValue placeholder="Department" /></SelectTrigger><SelectContent><SelectItem value="cardiology">Cardiology</SelectItem></SelectContent></Select>
            </div>
            <div className="flex gap-2">
              <Select><SelectTrigger className="w-48"><SelectValue placeholder="Patient Type" /></SelectTrigger><SelectContent><SelectItem value="new">New</SelectItem><SelectItem value="returning">Returning</SelectItem></SelectContent></Select>
              <Input placeholder="Organization" />
            </div>
            <div className="flex gap-2">
              <Select><SelectTrigger className="w-48"><SelectValue placeholder="Visit Type" /></SelectTrigger><SelectContent><SelectItem value="consultation">Consultation</SelectItem></SelectContent></Select>
              <Input placeholder="Reference" />
            </div>
            <div className="flex gap-2">
              <Input placeholder="Chief Complaint" />
              <Input placeholder="Add Note" />
            </div>
            <div className="flex gap-2">
              <Select><SelectTrigger className="w-48"><SelectValue placeholder="Payment Mode" /></SelectTrigger><SelectContent><SelectItem value="cash">Cash</SelectItem><SelectItem value="card">Card</SelectItem></SelectContent></Select>
              <Input placeholder="Amount" type="number" />
            </div>
            <div className="flex items-center gap-2">
              <span>Add Discount</span>
              <input type="checkbox" className="accent-blue-500 scale-125" />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 p-6 border-t bg-white">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-[#5a67f6] hover:bg-[#4550e6]">Create Appointment</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function ManageAppointments() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [calendarView, setCalendarView] = useState(false)
  const [showNewAppointment, setShowNewAppointment] = useState(false)
  const pageSize = 5
  const filtered = allAppointments.filter(a => a.patient.toLowerCase().includes(search.toLowerCase()))
  const paginated = filtered.slice((page-1)*pageSize, page*pageSize)
  const totalPages = Math.ceil(filtered.length / pageSize)

  return (
    <div className="space-y-6">
      {/* Small right-aligned action buttons */}
      <div className="flex justify-end gap-2 mb-2">
        <Button size="sm" className="bg-[#5a67f6] hover:bg-[#4550e6]" onClick={() => setShowNewAppointment(true)}>
          <Plus className="h-4 w-4 mr-1" /> Create New Appointment
        </Button>
        <Button size="sm" className="bg-[#5a67f6] hover:bg-[#4550e6]">
          <User className="h-4 w-4 mr-1" /> Add New Patient
        </Button>
      </div>
      {/* Colorful summary cards */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-none border bg-gradient-to-br from-[#e0e7ff] to-[#f8fafc] min-h-[140px]">
          <CardContent className="py-6 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-7 w-7 text-[#5a67f6] bg-white rounded-full p-1 shadow" />
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
        <Card className="shadow-none border bg-gradient-to-br from-[#fceabb] to-[#f8fafc] min-h-[140px]">
          <CardContent className="py-6 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <CreditCard className="h-7 w-7 text-[#e17055] bg-white rounded-full p-1 shadow" />
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
        <Card className="shadow-none border bg-gradient-to-br from-[#e0f7fa] to-[#f8fafc] min-h-[140px]">
          <CardContent className="py-6 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FileText className="h-7 w-7 text-[#00b894] bg-white rounded-full p-1 shadow" />
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
      {/* Appointment List Controls */}
      <Card className="p-4 bg-[#f8fafc] border shadow-none">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1"></div>
          <div className="flex items-center gap-2">
            <Input placeholder="Search" className="w-64" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
            <Button variant="outline" size="sm" className="flex gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button variant="outline" size="sm">Share</Button>
            <Button variant="outline" size="sm" onClick={() => setCalendarView(true)}>Calendar View</Button>
          </div>
        </div>
      </Card>
      {/* Table or Calendar View */}
      {!calendarView ? (
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
                  {paginated.map((a, i) => (
                    <TableRow key={i}>
                      <TableCell><input type="checkbox" /></TableCell>
                      <TableCell>
                        <Link href={`/patients/${a.id}`} className="text-[#5a67f6] hover:underline">{a.patient}</Link>
                      </TableCell>
                      <TableCell>{a.date}</TableCell>
                      <TableCell>{a.doctor}</TableCell>
                      <TableCell>{a.pid} <span className="ml-1 cursor-pointer text-gray-400">📋</span></TableCell>
                      <TableCell>{a.contact}</TableCell>
                      <TableCell>
                        <Select defaultValue={a.action}>
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
                        {a.status === "Completed" && <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">Completed</span>}
                        {a.status === "In-Progress" && <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">In-Progress</span>}
                        {a.status === "Pending" && <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs">Pending</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="ml-2">{(page-1)*pageSize+1}-{Math.min(page*pageSize, filtered.length)} of {filtered.length} items</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled={page===1} onClick={()=>setPage(page-1)}>&lt;</Button>
                <span>{page}</span>
                <Button variant="outline" size="sm" disabled={page===totalPages} onClick={()=>setPage(page+1)}>&gt;</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <CalendarView appointments={filtered} onClose={() => setCalendarView(false)} />
      )}
      <NewAppointmentModal open={showNewAppointment} onClose={() => setShowNewAppointment(false)} />
    </div>
  )
} 