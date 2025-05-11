"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Filter, Plus, Home, Share } from "lucide-react"
import Link from "next/link"

// Mock summary data for the cards
const summaryData = [
  {
    all: 1250,
    active: 1180,
    inactive: 70,
    allChange: "+15.80%",
    activeChange: "+85%",
    inactiveChange: "+10%",
  },
  {
    all: 1250,
    active: 1180,
    inactive: 70,
    allChange: "+15.80%",
    activeChange: "+85%",
    inactiveChange: "+10%",
  },
]

export default function PatientsPage() {
  // State for pagination (if needed in the future)
  const [page] = useState(1)
  const [pageSize] = useState(10)

  // TODO: Replace with real API data
  const patientsData = [
    { name: "Janet Adebayo", id: "GM0215210", lastVisit: "12 Aug 2022 - 12:25 am", status: "Active" },
    { name: "Janet Adebayo", id: "GM0215211", lastVisit: "12 Aug 2022 - 12:25 am", status: "Active" },
    // ...more mock rows
  ]

  return (
    <div>
      {/* Breadcrumb and Add Patient Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Home className="w-4 h-4" />
          <span>/</span>
          <span className="font-medium text-gray-900">Patient List</span>
        </div>
        {/* Add Patient Button */}
        <div className="flex items-center gap-4 justify-end">
          <Button asChild className="bg-[#5a67f6] hover:bg-[#4550e6]">
            <Link href="/patients/registration">
              <Plus className="mr-2 h-4 w-4" /> Add a New Patient
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {summaryData.map((data, idx) => (
          <Card key={idx} className="bg-[#f8fafc]">
            <CardContent className="flex flex-col md:flex-row justify-between items-center py-6 gap-4">
              <div className="flex flex-col items-center flex-1">
                <span className="text-2xl font-bold">All Patients</span>
                <span className="text-3xl font-semibold mt-2">{data.all.toLocaleString()}</span>
                <span className="text-green-500 text-xs mt-1">{data.allChange}</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <span className="text-2xl font-bold">Active</span>
                <span className="text-3xl font-semibold mt-2">{data.active.toLocaleString()}</span>
                <span className="text-green-500 text-xs mt-1">{data.activeChange}</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <span className="text-2xl font-bold">In-Active</span>
                <span className="text-3xl font-semibold mt-2">{data.inactive.toLocaleString()}</span>
                <span className="text-green-500 text-xs mt-1">{data.inactiveChange}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Patient List Table */}
      <Card className="mt-6">
        <CardHeader className="pb-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle>Patient List</CardTitle>
          {/* Table actions */}
          <div className="flex flex-wrap gap-2 items-center">
            <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" />Filter</Button>
            <Button variant="outline" size="sm"><Share className="mr-2 h-4 w-4" />Share</Button>
            <Button variant="outline" size="sm">Bulk Action</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead><input type="checkbox" /></TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Last Visit Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Appointments</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientsData.map((p, i) => (
                  <TableRow key={i}>
                    <TableCell><input type="checkbox" /></TableCell>
                    <TableCell>
                      <Link href={`/patients/${p.id}`} className="text-[#5a67f6] hover:underline">
                        {p.name}
                      </Link>
                    </TableCell>
                    <TableCell>{p.id}</TableCell>
                    <TableCell>{p.lastVisit}</TableCell>
                    <TableCell>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">{p.status}</span>
                    </TableCell>
                    <TableCell>
                      <Link href={`/appointments?patientId=${p.id}`} className="text-blue-500 hover:underline">
                        Appointments
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* Pagination */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 gap-2">
            <div className="text-sm text-gray-500">10 items per page &nbsp; 1-10 of 200 items</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Prev</Button>
              <span className="text-sm text-gray-500">1</span>
              <span className="text-sm text-gray-500">of 44 pages</span>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
