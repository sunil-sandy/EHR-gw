"use client"

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
import { Textarea } from "@/components/ui/textarea"
import { Download, Filter, Plus, Printer, Search } from "lucide-react"

const prescriptions = [
  {
    id: "PR001",
    patient: "John Smith",
    doctor: "Dr. Sarah Wilson",
    date: "10 Jul 2023",
    medications: 3,
    status: "Dispensed",
  },
  {
    id: "PR002",
    patient: "Emily Davis",
    doctor: "Dr. Michael Brown",
    date: "11 Jul 2023",
    medications: 2,
    status: "Pending",
  },
  {
    id: "PR003",
    patient: "Robert Wilson",
    doctor: "Dr. Jennifer Lee",
    date: "12 Jul 2023",
    medications: 4,
    status: "Dispensed",
  },
  {
    id: "PR004",
    patient: "Sarah Johnson",
    doctor: "Dr. David Clark",
    date: "12 Jul 2023",
    medications: 1,
    status: "Pending",
  },
  {
    id: "PR005",
    patient: "Michael Brown",
    doctor: "Dr. Lisa Rodriguez",
    date: "13 Jul 2023",
    medications: 3,
    status: "Cancelled",
  },
]

export default function PrescriptionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#5a67f6] hover:bg-[#4550e6]">
                <Plus className="mr-2 h-4 w-4" />
                New Prescription
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Prescription</DialogTitle>
                <DialogDescription>Create a new prescription for a patient</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
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
                </div>

                <div className="space-y-2">
                  <Label>Medications</Label>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="grid grid-cols-[1fr_120px_120px_80px] gap-2 items-end">
                        <div className="space-y-2">
                          <Label htmlFor={`medication-${i}`}>Medication {i}</Label>
                          <Select>
                            <SelectTrigger id={`medication-${i}`}>
                              <SelectValue placeholder="Select medication" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="amoxicillin">Amoxicillin</SelectItem>
                              <SelectItem value="lisinopril">Lisinopril</SelectItem>
                              <SelectItem value="ibuprofen">Ibuprofen</SelectItem>
                              <SelectItem value="metformin">Metformin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`dosage-${i}`}>Dosage</Label>
                          <Input id={`dosage-${i}`} placeholder="e.g., 500mg" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`frequency-${i}`}>Frequency</Label>
                          <Select>
                            <SelectTrigger id={`frequency-${i}`}>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="once">Once daily</SelectItem>
                              <SelectItem value="twice">Twice daily</SelectItem>
                              <SelectItem value="three">Three times daily</SelectItem>
                              <SelectItem value="four">Four times daily</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`duration-${i}`}>Duration</Label>
                          <Input id={`duration-${i}`} placeholder="e.g., 7 days" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Medication
                  </Button>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="instructions">Special Instructions</Label>
                  <Textarea id="instructions" placeholder="Add any special instructions or notes" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button className="bg-[#5a67f6] hover:bg-[#4550e6]">Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Prescription List</CardTitle>
          <CardDescription>Manage and view all patient prescriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search prescriptions..." className="pl-8" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="dispensed">Dispensed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Medications</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prescriptions.map((prescription) => (
                  <TableRow key={prescription.id}>
                    <TableCell className="font-medium">{prescription.id}</TableCell>
                    <TableCell>{prescription.patient}</TableCell>
                    <TableCell>{prescription.doctor}</TableCell>
                    <TableCell>{prescription.date}</TableCell>
                    <TableCell>{prescription.medications}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          prescription.status === "Dispensed"
                            ? "bg-green-100 text-green-800"
                            : prescription.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {prescription.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <Printer className="h-4 w-4" />
                          <span className="sr-only">Print</span>
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
