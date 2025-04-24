"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Clock, CheckCircle2, Search, Plus, FileText } from "lucide-react"

// Mock data for orders
const orders = [
  {
    id: "ORD001",
    date: "2023-09-15",
    supplier: "MedSupply Co.",
    items: [
      { name: "Surgical Gloves", quantity: 500, price: 0.45 },
      { name: "Syringes (5ml)", quantity: 200, price: 0.3 },
    ],
    total: 285.0,
    status: "Delivered",
    deliveryDate: "2023-09-20",
  },
  {
    id: "ORD002",
    date: "2023-09-18",
    supplier: "SafetyFirst Inc.",
    items: [
      { name: "Surgical Masks", quantity: 1000, price: 0.25 },
      { name: "Face Shields", quantity: 50, price: 2.5 },
    ],
    total: 375.0,
    status: "Processing",
    deliveryDate: "2023-09-25",
  },
  {
    id: "ORD003",
    date: "2023-09-20",
    supplier: "Pharma Inc.",
    items: [
      { name: "Amoxicillin", quantity: 100, price: 0.75 },
      { name: "Paracetamol", quantity: 200, price: 0.25 },
    ],
    total: 125.0,
    status: "Pending",
    deliveryDate: "2023-09-27",
  },
  {
    id: "ORD004",
    date: "2023-09-22",
    supplier: "MedEquip Ltd.",
    items: [
      { name: "IV Cannulas", quantity: 150, price: 1.2 },
      { name: "Blood Collection Tubes", quantity: 100, price: 0.9 },
    ],
    total: 270.0,
    status: "Processing",
    deliveryDate: "2023-09-29",
  },
  {
    id: "ORD005",
    date: "2023-09-25",
    supplier: "WoundCare Solutions",
    items: [
      { name: "Gauze Bandages", quantity: 200, price: 0.85 },
      { name: "Adhesive Bandages", quantity: 300, price: 0.15 },
    ],
    total: 215.0,
    status: "Delivered",
    deliveryDate: "2023-09-30",
  },
  {
    id: "ORD006",
    date: "2023-09-28",
    supplier: "CleanMed Co.",
    items: [
      { name: "Disinfectant Solution", quantity: 50, price: 12.5 },
      { name: "Hand Sanitizer", quantity: 100, price: 3.75 },
    ],
    total: 1000.0,
    status: "Cancelled",
    deliveryDate: null,
  },
]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [supplierFilter, setSupplierFilter] = useState("All")

  // Filter orders based on search term and filters
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || order.status === statusFilter
    const matchesSupplier = supplierFilter === "All" || order.supplier === supplierFilter

    return matchesSearch && matchesStatus && matchesSupplier
  })

  // Get unique statuses and suppliers for filters
  const statuses = ["All", ...new Set(orders.map((order) => order.status))]
  const suppliers = ["All", ...new Set(orders.map((order) => order.supplier))]

  // Calculate statistics
  const pendingOrders = orders.filter((order) => order.status === "Pending" || order.status === "Processing").length
  const deliveredOrders = orders.filter((order) => order.status === "Delivered").length
  const totalSpent = orders.filter((order) => order.status !== "Cancelled").reduce((sum, order) => sum + order.total, 0)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Purchase Orders</h1>
        <Button className="bg-[#5a67f6] hover:bg-[#4c56d6]">
          <Plus className="mr-2 h-4 w-4" /> Create Order
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-full mr-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Orders</p>
                <h3 className="text-2xl font-bold">{pendingOrders}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-full mr-4">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Delivered Orders</p>
                <h3 className="text-2xl font-bold">{deliveredOrders}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-full mr-4">
                <ShoppingCart className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Spent</p>
                <h3 className="text-2xl font-bold">${totalSpent.toFixed(2)}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Orders List</CardTitle>
          <CardDescription>Manage your purchase orders</CardDescription>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search orders..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

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

            <Select value={supplierFilter} onValueChange={setSupplierFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((supplier) => (
                  <SelectItem key={supplier} value={supplier}>
                    {supplier}
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
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>{order.supplier}</TableCell>
                      <TableCell>{order.items.length} items</TableCell>
                      <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                      No orders found matching your search criteria
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
