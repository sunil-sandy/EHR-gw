"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, AlertTriangle, Search, Plus } from "lucide-react"

// Mock data for supplies
const supplies = [
  {
    id: "SUP001",
    name: "Surgical Gloves",
    category: "Protective Equipment",
    stock: 1200,
    unit: "Pairs",
    supplier: "MedSupply Co.",
    lastOrdered: "2023-08-15",
    status: "In Stock",
    price: 0.45,
  },
  {
    id: "SUP002",
    name: "Surgical Masks",
    category: "Protective Equipment",
    stock: 800,
    unit: "Pieces",
    supplier: "SafetyFirst Inc.",
    lastOrdered: "2023-09-02",
    status: "In Stock",
    price: 0.25,
  },
  {
    id: "SUP003",
    name: "Syringes (5ml)",
    category: "Disposables",
    stock: 350,
    unit: "Pieces",
    supplier: "MedSupply Co.",
    lastOrdered: "2023-07-20",
    status: "Low Stock",
    price: 0.3,
  },
  {
    id: "SUP004",
    name: "IV Cannulas",
    category: "Disposables",
    stock: 420,
    unit: "Pieces",
    supplier: "MedEquip Ltd.",
    lastOrdered: "2023-08-25",
    status: "In Stock",
    price: 1.2,
  },
  {
    id: "SUP005",
    name: "Gauze Bandages",
    category: "Wound Care",
    stock: 600,
    unit: "Rolls",
    supplier: "WoundCare Solutions",
    lastOrdered: "2023-09-10",
    status: "In Stock",
    price: 0.85,
  },
  {
    id: "SUP006",
    name: "Surgical Sutures",
    category: "Surgical Supplies",
    stock: 25,
    unit: "Boxes",
    supplier: "SurgicalTech Inc.",
    lastOrdered: "2023-06-30",
    status: "Low Stock",
    price: 45.0,
  },
  {
    id: "SUP007",
    name: "Disinfectant Solution",
    category: "Cleaning Supplies",
    stock: 0,
    unit: "Bottles",
    supplier: "CleanMed Co.",
    lastOrdered: "2023-05-15",
    status: "Out of Stock",
    price: 12.5,
  },
]

export default function SuppliesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")

  // Filter supplies based on search term and filters
  const filteredSupplies = supplies.filter((supply) => {
    const matchesSearch =
      supply.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supply.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "All" || supply.category === categoryFilter
    const matchesStatus = statusFilter === "All" || supply.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Get unique categories for filter
  const categories = ["All", ...new Set(supplies.map((supply) => supply.category))]
  const statuses = ["All", "In Stock", "Low Stock", "Out of Stock"]

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Medical Supplies</h1>
        <Button className="bg-[#5a67f6] hover:bg-[#4c56d6]">
          <Plus className="mr-2 h-4 w-4" /> Add Supply
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-full mr-4">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Supplies</p>
                <h3 className="text-2xl font-bold">{supplies.length}</h3>
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
                <h3 className="text-2xl font-bold">{supplies.filter((s) => s.status === "Low Stock").length}</h3>
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
                <h3 className="text-2xl font-bold">{supplies.filter((s) => s.status === "Out of Stock").length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Supplies List</CardTitle>
          <CardDescription>Manage your medical supplies inventory</CardDescription>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search supplies..."
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
                  <TableHead>Last Ordered</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSupplies.length > 0 ? (
                  filteredSupplies.map((supply) => (
                    <TableRow key={supply.id}>
                      <TableCell className="font-medium">{supply.id}</TableCell>
                      <TableCell>{supply.name}</TableCell>
                      <TableCell>{supply.category}</TableCell>
                      <TableCell className="text-right">
                        {supply.stock} {supply.unit}
                      </TableCell>
                      <TableCell>{supply.supplier}</TableCell>
                      <TableCell>{new Date(supply.lastOrdered).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            supply.status === "In Stock"
                              ? "bg-green-100 text-green-800"
                              : supply.status === "Low Stock"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {supply.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">${supply.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                      No supplies found matching your search criteria
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
