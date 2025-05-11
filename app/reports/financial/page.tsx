"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PieChart } from "@/components/charts/pie-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { LineChart } from "@/components/charts/line-chart"
import { AreaChart } from "@/components/charts/area-chart"
import { Download, Calendar, DollarSign, TrendingUp, TrendingDown, CreditCard } from "lucide-react"

// Mock data for financial reports
const revenueExpenseData = [
  { month: "Jan", revenue: 425000, expenses: 325000, profit: 100000 },
  { month: "Feb", revenue: 440000, expenses: 330000, profit: 110000 },
  { month: "Mar", revenue: 460000, expenses: 340000, profit: 120000 },
  { month: "Apr", revenue: 455000, expenses: 335000, profit: 120000 },
  { month: "May", revenue: 470000, expenses: 345000, profit: 125000 },
  { month: "Jun", revenue: 485000, expenses: 350000, profit: 135000 },
  { month: "Jul", revenue: 495000, expenses: 355000, profit: 140000 },
  { month: "Aug", revenue: 510000, expenses: 360000, profit: 150000 },
  { month: "Sep", revenue: 525000, expenses: 365000, profit: 160000 },
  { month: "Oct", revenue: 540000, expenses: 370000, profit: 170000 },
  { month: "Nov", revenue: 555000, expenses: 375000, profit: 180000 },
  { month: "Dec", revenue: 570000, expenses: 380000, profit: 190000 },
]

const departmentRevenueData = [
  { name: "Cardiology", value: 22 },
  { name: "Orthopedics", value: 18 },
  { name: "Neurology", value: 16 },
  { name: "Pediatrics", value: 12 },
  { name: "Oncology", value: 15 },
  { name: "Gynecology", value: 10 },
  { name: "Other", value: 7 },
]

const revenueSourceData = [
  { name: "Inpatient", value: 45 },
  { name: "Outpatient", value: 30 },
  { name: "Emergency", value: 15 },
  { name: "Other", value: 10 },
]

const expenseBreakdownData = [
  { name: "Staff Salaries", value: 55 },
  { name: "Medications", value: 15 },
  { name: "Equipment", value: 12 },
  { name: "Facilities", value: 10 },
  { name: "Administrative", value: 8 },
]

const invoicesData = [
  { id: "INV-2023-001", patient: "John Smith", date: "2023-12-01", amount: 1250.0, status: "Paid" },
  { id: "INV-2023-002", patient: "Jane Doe", date: "2023-12-02", amount: 850.75, status: "Paid" },
  { id: "INV-2023-003", patient: "Robert Johnson", date: "2023-12-03", amount: 2100.5, status: "Pending" },
  { id: "INV-2023-004", patient: "Emily Davis", date: "2023-12-04", amount: 1450.25, status: "Paid" },
  { id: "INV-2023-005", patient: "Michael Brown", date: "2023-12-05", amount: 975.0, status: "Overdue" },
  { id: "INV-2023-006", patient: "Sarah Wilson", date: "2023-12-06", amount: 1800.75, status: "Pending" },
  { id: "INV-2023-007", patient: "David Lee", date: "2023-12-07", amount: 650.5, status: "Paid" },
  { id: "INV-2023-008", patient: "Jennifer Taylor", date: "2023-12-08", amount: 1350.25, status: "Pending" },
  { id: "INV-2023-009", patient: "James Anderson", date: "2023-12-09", amount: 2250.0, status: "Overdue" },
  { id: "INV-2023-010", patient: "Lisa Martinez", date: "2023-12-10", amount: 950.75, status: "Paid" },
]

export default function FinancialReportsPage() {
  const [timeRange, setTimeRange] = useState("year")
  const [invoiceStatus, setInvoiceStatus] = useState("all")

  // Filter invoices based on status
  const filteredInvoices =
    invoiceStatus === "all"
      ? invoicesData
      : invoicesData.filter((invoice) => invoice.status.toLowerCase() === invoiceStatus.toLowerCase())

  // Calculate financial metrics
  const totalRevenue = revenueExpenseData.reduce((sum, item) => sum + item.revenue, 0)
  const totalExpenses = revenueExpenseData.reduce((sum, item) => sum + item.expenses, 0)
  const totalProfit = revenueExpenseData.reduce((sum, item) => sum + item.profit, 0)
  const profitMargin = ((totalProfit / totalRevenue) * 100).toFixed(1)

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Financial Reports</h1>
          <p className="text-gray-500 mt-1">Comprehensive financial performance metrics</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-gray-500" />
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" className="flex items-center">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold mt-1">${(totalRevenue / 1000000).toFixed(2)}M</h3>
                <p className="text-sm text-green-600 mt-1">↑ 8.5% from last period</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Expenses</p>
                <h3 className="text-2xl font-bold mt-1">${(totalExpenses / 1000000).toFixed(2)}M</h3>
                <p className="text-sm text-red-600 mt-1">↑ 5.2% from last period</p>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Net Profit</p>
                <h3 className="text-2xl font-bold mt-1">${(totalProfit / 1000000).toFixed(2)}M</h3>
                <p className="text-sm text-green-600 mt-1">↑ 12.3% from last period</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Profit Margin</p>
                <h3 className="text-2xl font-bold mt-1">{profitMargin}%</h3>
                <p className="text-sm text-green-600 mt-1">↑ 1.2% from last period</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Revenue vs Expenses</CardTitle>
                <CardDescription>Monthly financial performance</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={revenueExpenseData}
                  xAxisDataKey="month"
                  bars={[
                    { dataKey: "revenue", name: "Revenue", color: "#5a67f6" },
                    { dataKey: "expenses", name: "Expenses", color: "#e17055" },
                  ]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profit Trend</CardTitle>
                <CardDescription>Monthly profit performance</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={revenueExpenseData}
                  xAxisDataKey="month"
                  lines={[{ dataKey: "profit", name: "Profit", color: "#00b894" }]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profit Margin</CardTitle>
                <CardDescription>Monthly profit margin percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={revenueExpenseData.map((item) => ({
                    month: item.month,
                    margin: ((item.profit / item.revenue) * 100).toFixed(1),
                  }))}
                  xAxisDataKey="month"
                  lines={[{ dataKey: "margin", name: "Profit Margin (%)", color: "#e84393" }]}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Department</CardTitle>
                <CardDescription>Percentage of total revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart data={departmentRevenueData} innerRadius={60} outerRadius={90} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Sources</CardTitle>
                <CardDescription>Breakdown by service type</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={revenueSourceData}
                  innerRadius={60}
                  outerRadius={90}
                  colors={["#5a67f6", "#00b894", "#fdcb6e", "#e84393"]}
                />
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue performance</CardDescription>
              </CardHeader>
              <CardContent>
                <AreaChart
                  data={revenueExpenseData}
                  xAxisDataKey="month"
                  areas={[{ dataKey: "revenue", name: "Revenue", color: "#5a67f6" }]}
                />
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Department Revenue Growth</CardTitle>
                <CardDescription>Year-over-year growth by department</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { department: "Cardiology", growth: 12.5 },
                    { department: "Orthopedics", growth: 8.2 },
                    { department: "Neurology", growth: 15.3 },
                    { department: "Pediatrics", growth: 6.8 },
                    { department: "Oncology", growth: 10.2 },
                    { department: "Gynecology", growth: 7.5 },
                    { department: "Other", growth: 5.1 },
                  ]}
                  xAxisDataKey="department"
                  bars={[{ dataKey: "growth", name: "Growth (%)", color: "#00b894" }]}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Expenses Tab */}
        <TabsContent value="expenses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Percentage of total expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={expenseBreakdownData}
                  innerRadius={60}
                  outerRadius={90}
                  colors={["#e17055", "#fdcb6e", "#00b894", "#5a67f6", "#e84393"]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense by Department</CardTitle>
                <CardDescription>Monthly expenses by department</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { department: "Cardiology", expense: 85000 },
                    { department: "Orthopedics", expense: 72000 },
                    { department: "Neurology", expense: 68000 },
                    { department: "Pediatrics", expense: 55000 },
                    { department: "Oncology", expense: 78000 },
                    { department: "Gynecology", expense: 48000 },
                  ]}
                  xAxisDataKey="department"
                  bars={[{ dataKey: "expense", name: "Expenses", color: "#e17055" }]}
                />
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Expense Trend</CardTitle>
                <CardDescription>Monthly expense performance</CardDescription>
              </CardHeader>
              <CardContent>
                <AreaChart
                  data={revenueExpenseData}
                  xAxisDataKey="month"
                  areas={[{ dataKey: "expenses", name: "Expenses", color: "#e17055" }]}
                />
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
                <CardDescription>Monthly breakdown by category</CardDescription>
              </CardHeader>
              <CardContent>
                <AreaChart
                  data={[
                    { month: "Jan", salaries: 180000, supplies: 75000, equipment: 40000, facilities: 30000 },
                    { month: "Feb", salaries: 182000, supplies: 76000, equipment: 42000, facilities: 30000 },
                    { month: "Mar", salaries: 185000, supplies: 78000, equipment: 45000, facilities: 32000 },
                    { month: "Apr", salaries: 183000, supplies: 77000, equipment: 43000, facilities: 32000 },
                    { month: "May", salaries: 187000, supplies: 80000, equipment: 46000, facilities: 32000 },
                    { month: "Jun", salaries: 190000, supplies: 82000, equipment: 45000, facilities: 33000 },
                    { month: "Jul", salaries: 192000, supplies: 83000, equipment: 47000, facilities: 33000 },
                    { month: "Aug", salaries: 195000, supplies: 85000, equipment: 46000, facilities: 34000 },
                    { month: "Sep", salaries: 197000, supplies: 86000, equipment: 48000, facilities: 34000 },
                    { month: "Oct", salaries: 200000, supplies: 87000, equipment: 49000, facilities: 34000 },
                    { month: "Nov", salaries: 202000, supplies: 88000, equipment: 50000, facilities: 35000 },
                    { month: "Dec", salaries: 205000, supplies: 90000, equipment: 50000, facilities: 35000 },
                  ]}
                  xAxisDataKey="month"
                  areas={[
                    { dataKey: "salaries", name: "Salaries", color: "#e17055" },
                    { dataKey: "supplies", name: "Supplies", color: "#fdcb6e" },
                    { dataKey: "equipment", name: "Equipment", color: "#00b894" },
                    { dataKey: "facilities", name: "Facilities", color: "#5a67f6" },
                  ]}
                  stacked={true}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>Latest financial transactions</CardDescription>
              <div className="flex justify-between items-center mt-4">
                <Select value={invoiceStatus} onValueChange={setInvoiceStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Export Invoices
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.patient}</TableCell>
                        <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              invoice.status === "Paid"
                                ? "bg-green-100 text-green-800"
                                : invoice.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }
                          >
                            {invoice.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Status</CardTitle>
                <CardDescription>Distribution by payment status</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={[
                    { name: "Paid", value: 65 },
                    { name: "Pending", value: 25 },
                    { name: "Overdue", value: 10 },
                  ]}
                  colors={["#00b894", "#fdcb6e", "#e17055"]}
                  innerRadius={60}
                  outerRadius={90}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Distribution by payment type</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={[
                    { name: "Insurance", value: 55 },
                    { name: "Credit Card", value: 25 },
                    { name: "Bank Transfer", value: 15 },
                    { name: "Cash", value: 5 },
                  ]}
                  innerRadius={60}
                  outerRadius={90}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
