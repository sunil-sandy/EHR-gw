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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, Filter, Plus, Search, Upload } from "lucide-react"

const labReports = [
  {
    id: "LR001",
    patient: "John Smith",
    doctor: "Dr. Sarah Wilson",
    test: "Complete Blood Count",
    date: "10 Jul 2023",
    status: "Completed",
  },
  {
    id: "LR002",
    patient: "Emily Davis",
    doctor: "Dr. Michael Brown",
    test: "Lipid Profile",
    date: "11 Jul 2023",
    status: "Pending",
  },
  {
    id: "LR003",
    patient: "Robert Wilson",
    doctor: "Dr. Jennifer Lee",
    test: "Liver Function Test",
    date: "12 Jul 2023",
    status: "Processing",
  },
  {
    id: "LR004",
    patient: "Sarah Johnson",
    doctor: "Dr. David Clark",
    test: "Thyroid Function Test",
    date: "12 Jul 2023",
    status: "Completed",
  },
  {
    id: "LR005",
    patient: "Michael Brown",
    doctor: "Dr. Lisa Rodriguez",
    test: "Urinalysis",
    date: "13 Jul 2023",
    status: "Pending",
  },
]

export default function LabResultsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Lab Results</h1>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#5a67f6] hover:bg-[#4550e6]">
                <Plus className="mr-2 h-4 w-4" />
                New Test Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>New Lab Test Request</DialogTitle>
                <DialogDescription>Create a new lab test request for a patient</DialogDescription>
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
                  <Label htmlFor="doctor">Referring Doctor</Label>
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
                <div className="grid gap-2">
                  <Label htmlFor="test">Test Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select test" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cbc">Complete Blood Count</SelectItem>
                      <SelectItem value="lipid">Lipid Profile</SelectItem>
                      <SelectItem value="liver">Liver Function Test</SelectItem>
                      <SelectItem value="thyroid">Thyroid Function Test</SelectItem>
                      <SelectItem value="urinalysis">Urinalysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="routine">Routine</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Clinical Notes</Label>
                  <Input id="notes" placeholder="Add clinical notes (optional)" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button className="bg-[#5a67f6] hover:bg-[#4550e6]">Submit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Lab Test Reports</CardTitle>
              <CardDescription>View and manage all lab test reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input type="search" placeholder="Search reports..." className="pl-8" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="All Tests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tests</SelectItem>
                      <SelectItem value="cbc">Blood Tests</SelectItem>
                      <SelectItem value="imaging">Imaging</SelectItem>
                      <SelectItem value="urine">Urine Tests</SelectItem>
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
                      <TableHead>Test</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {labReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell>{report.patient}</TableCell>
                        <TableCell>{report.doctor}</TableCell>
                        <TableCell>{report.test}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              report.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : report.status === "Processing"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {report.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {report.status === "Completed" ? (
                              <>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                  <FileText className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                  <Download className="h-4 w-4" />
                                  <span className="sr-only">Download</span>
                                </Button>
                              </>
                            ) : report.status === "Processing" ? (
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                <Upload className="h-4 w-4" />
                                <span className="sr-only">Upload</span>
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Reports</CardTitle>
              <CardDescription>View and manage pending lab test reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8 text-muted-foreground">
                Pending reports will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="processing">
          <Card>
            <CardHeader>
              <CardTitle>Processing Reports</CardTitle>
              <CardDescription>View and manage reports in processing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8 text-muted-foreground">
                Processing reports will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Reports</CardTitle>
              <CardDescription>View and manage completed lab test reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8 text-muted-foreground">
                Completed reports will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
