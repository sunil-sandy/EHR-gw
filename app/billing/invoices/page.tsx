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
import { Download, Filter, Plus, Printer, Search } from "lucide-react"

const invoices = [
  {
    id: "INV001",
    patient: "John Smith",
    date: "10 Jul 2023",
    amount: "$1,250.00",
    status: "Paid",
  },
  {
    id: "INV002",
    patient: "Emily Davis",
    date: "11 Jul 2023",
    amount: "$850.00",
    status: "Pending",
  },
  {
    id: "INV003",
    patient: "Robert Wilson",
    date: "12 Jul 2023",
    amount: "$2,100.00",
    status: "Overdue",
  },
  {
    id: "INV004",
    patient: "Sarah Johnson",
    date: "12 Jul 2023",
    amount: "$750.00",
    status: "Paid",
  },
  {
    id: "INV005",
    patient: "Michael Brown",
    date: "13 Jul 2023",
    amount: "$1,500.00",
    status: "Pending",
  },
]

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#5a67f6] hover:bg-[#4550e6]">
                <Plus className="mr-2 h-4 w-4" />
                New Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
                <DialogDescription>Create a new invoice for a patient</DialogDescription>
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="invoice-date">Invoice Date</Label>
                    <Input id="invoice-date" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="due-date">Due Date</Label>
                    <Input id="due-date" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Items</Label>
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 items-end">
                        <div className="space-y-2">
                          <Label htmlFor={`item-${i}`}>Item {i}</Label>
                          <Input id={`item-${i}`} placeholder="Item description" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`quantity-${i}`}>Quantity</Label>
                          <Input id={`quantity-${i}`} type="number" placeholder="1" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`price-${i}`}>Price</Label>
                          <Input id={`price-${i}`} placeholder="$0.00" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`total-${i}`}>Total</Label>
                          <Input id={`total-${i}`} placeholder="$0.00" disabled />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="subtotal">Subtotal</Label>
                    <Input id="subtotal" placeholder="$0.00" disabled />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tax">Tax (10%)</Label>
                    <Input id="tax" placeholder="$0.00" disabled />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="total">Total Amount</Label>
                  <Input id="total" placeholder="$0.00" disabled className="text-lg font-bold" />
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
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Invoice List</CardTitle>
          <CardDescription>Manage and view all patient invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search invoices..." className="pl-8" />
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
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.patient}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          invoice.status === "Paid"
                            ? "bg-green-100 text-green-800"
                            : invoice.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {invoice.status}
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
