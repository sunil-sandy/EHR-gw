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
import { Filter, Plus, Search } from "lucide-react"

const medications = [
  {
    id: "M001",
    name: "Amoxicillin",
    category: "Antibiotic",
    stock: 120,
    unit: "Tablets",
    supplier: "Pharma Inc.",
    expiry: "Dec 2023",
    price: "$5.99",
  },
  {
    id: "M002",
    name: "Lisinopril",
    category: "Antihypertensive",
    stock: 85,
    unit: "Tablets",
    supplier: "MediSupply Co.",
    expiry: "Mar 2024",
    price: "$8.50",
  },
  {
    id: "M003",
    name: "Ibuprofen",
    category: "NSAID",
    stock: 200,
    unit: "Tablets",
    supplier: "HealthMeds Ltd.",
    expiry: "Jun 2024",
    price: "$4.25",
  },
  {
    id: "M004",
    name: "Salbutamol",
    category: "Bronchodilator",
    stock: 45,
    unit: "Inhalers",
    supplier: "Pharma Inc.",
    expiry: "Sep 2023",
    price: "$12.75",
  },
  {
    id: "M005",
    name: "Metformin",
    category: "Antidiabetic",
    stock: 150,
    unit: "Tablets",
    supplier: "MediSupply Co.",
    expiry: "Apr 2024",
    price: "$6.80",
  },
]

const prescriptions = [
  {
    id: "P001",
    patient: "John Smith",
    doctor: "Dr. Sarah Wilson",
    date: "10 Jul 2023",
    status: "Pending",
    items: 3,
  },
  {
    id: "P002",
    patient: "Emily Davis",
    doctor: "Dr. Michael Brown",
    date: "11 Jul 2023",
    status: "Completed",
    items: 2,
  },
  {
    id: "P003",
    patient: "Robert Wilson",
    doctor: "Dr. Jennifer Lee",
    date: "12 Jul 2023",
    status: "Pending",
    items: 4,
  },
]

export default function PharmacyPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Pharmacy</h1>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-700 hover:bg-blue-800">
                <Plus className="mr-2 h-4 w-4" />
                Add Medication
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Medication</DialogTitle>
                <DialogDescription>Enter the details of the new medication</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Medication Name</Label>
                  <Input id="name" placeholder="Enter medication name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="antibiotic">Antibiotic</SelectItem>
                        <SelectItem value="antihypertensive">Antihypertensive</SelectItem>
                        <SelectItem value="nsaid">NSAID</SelectItem>
                        <SelectItem value="bronchodilator">Bronchodilator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="supplier">Supplier</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pharma-inc">Pharma Inc.</SelectItem>
                        <SelectItem value="medisupply">MediSupply Co.</SelectItem>
                        <SelectItem value="healthmeds">HealthMeds Ltd.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input id="stock" type="number" placeholder="Enter quantity" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tablets">Tablets</SelectItem>
                        <SelectItem value="capsules">Capsules</SelectItem>
                        <SelectItem value="inhalers">Inhalers</SelectItem>
                        <SelectItem value="bottles">Bottles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YYYY" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" placeholder="Enter price" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button className="bg-blue-700 hover:bg-blue-800">Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="inventory">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Medication Inventory</CardTitle>
              <CardDescription>Manage and view all medications in stock</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input type="search" placeholder="Search medications..." className="pl-8" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="antibiotic">Antibiotic</SelectItem>
                      <SelectItem value="antihypertensive">Antihypertensive</SelectItem>
                      <SelectItem value="nsaid">NSAID</SelectItem>
                      <SelectItem value="bronchodilator">Bronchodilator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4 rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Expiry</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medications.map((medication) => (
                      <TableRow key={medication.id}>
                        <TableCell className="font-medium">{medication.id}</TableCell>
                        <TableCell>{medication.name}</TableCell>
                        <TableCell>{medication.category}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              medication.stock < 50
                                ? "bg-red-100 text-red-800"
                                : medication.stock < 100
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {medication.stock}
                          </span>
                        </TableCell>
                        <TableCell>{medication.unit}</TableCell>
                        <TableCell>{medication.supplier}</TableCell>
                        <TableCell>{medication.expiry}</TableCell>
                        <TableCell>{medication.price}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="prescriptions">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Prescriptions</CardTitle>
              <CardDescription>Manage and process patient prescriptions</CardDescription>
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
                      <SelectItem value="completed">Completed</SelectItem>
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
                      <TableHead>Items</TableHead>
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
                        <TableCell>{prescription.items}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              prescription.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {prescription.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className={
                              prescription.status === "Pending"
                                ? "bg-blue-700 text-white hover:bg-blue-800 hover:text-white"
                                : ""
                            }
                          >
                            {prescription.status === "Pending" ? "Process" : "View"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
