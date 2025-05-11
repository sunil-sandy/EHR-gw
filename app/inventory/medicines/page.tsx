"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Pill, AlertTriangle, Search, Plus } from "lucide-react"

// Mock data for medicines
const medicines = [
  {
    id: "MED001",
    name: "Amoxicillin",
    category: "Antibiotic",
    stock: 250,
    unit: "Tablets",
    supplier: "Pharma Inc.",
    expiryDate: "2024-12-15",
    status: "In Stock",
    price: 0.75,
  },
  {
    id: "MED002",
    name: "Lisinopril",
    category: "Antihypertensive",
    stock: 180,
    unit: "Tablets",
    supplier: "MediSupply Co.",
    expiryDate: "2024-10-20",
    status: "In Stock",
    price: 0.85,
  },
  {
    id: "MED003",
    name: "Salbutamol",
    category: "Bronchodilator",
    stock: 45,
    unit: "Inhalers",
    supplier: "Respiratory Care Ltd.",
    expiryDate: "2024-08-30",
    status: "Low Stock",
    price: 12.5,
  },
  {
    id: "MED004",
    name: "Metformin",
    category: "Antidiabetic",
    stock: 320,
    unit: "Tablets",
    supplier: "Pharma Inc.",
    expiryDate: "2025-01-25",
    status: "In Stock",
    price: 0.65,
  },
  {
    id: "MED005",
    name: "Paracetamol",
    category: "Analgesic",
    stock: 500,
    unit: "Tablets",
    supplier: "MediSupply Co.",
    expiryDate: "2024-11-10",
    status: "In Stock",
    price: 0.25,
  },
  {
    id: "MED006",
    name: "Ibuprofen",
    category: "NSAID",
    stock: 30,
    unit: "Bottles",
    supplier: "Pain Relief Inc.",
    expiryDate: "2024-07-15",
    status: "Low Stock",
    price: 5.99,
  },
  {
    id: "MED007",
    name: "Omeprazole",
    category: "Proton Pump Inhibitor",
    stock: 0,
    unit: "Tablets",
    supplier: "Digestive Health Co.",
    expiryDate: "2024-09-05",
    status: "Out of Stock",
    price: 0.95,
  },
]

export default function MedicinesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")

  // Filter medicines based on search term and filters
  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch =
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "All" || medicine.category === categoryFilter
    const matchesStatus = statusFilter === "All" || medicine.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Get unique categories for filter
  const categories = ["All", ...new Set(medicines.map((medicine) => medicine.category))]
  const statuses = ["All", "In Stock", "Low Stock", "Out of Stock"]

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Medicines Inventory</h1>
        <Button className="bg-[#5a67f6] hover:bg-[#4c56d6]">
          <Plus className="mr-2 h-4 w-4" /> Add Medicine
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-full mr-4">
                <Pill className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Medicines</p>
                <h3 className="text-2xl font-bold">{medicines.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-full mr-4">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Low Stock Items</p>
                <h3 className="text-2xl font-bold">{medicines.filter((m) => m.status === "Low Stock").length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-full mr-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Out of Stock</p>
                <h3 className="text-2xl font-bold">{medicines.filter((m) => m.status === "Out of Stock").length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Medicines List</CardTitle>
          <CardDescription>Manage your medicine inventory</CardDescription>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search medicines..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMedicines.length > 0 ? (
                  filteredMedicines.map((medicine) => (
                    <TableRow key={medicine.id}>
                      <TableCell className="font-medium">{medicine.id}</TableCell>
                      <TableCell>{medicine.name}</TableCell>
                      <TableCell>{medicine.category}</TableCell>
                      <TableCell className="text-right">
                        {medicine.stock} {medicine.unit}
                      </TableCell>
                      <TableCell>{medicine.supplier}</TableCell>
                      <TableCell>{new Date(medicine.expiryDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            medicine.status === "In Stock"
                              ? "bg-green-100 text-green-800"
                              : medicine.status === "Low Stock"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {medicine.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">${medicine.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                      No medicines found matching your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
