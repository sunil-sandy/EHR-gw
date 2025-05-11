"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChart } from "@/components/charts/pie-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { LineChart } from "@/components/charts/line-chart"
import { AreaChart } from "@/components/charts/area-chart"
import { Download, Calendar } from "lucide-react"

// Mock data for analytics
const patientAdmissionData = [
  { month: "Jan", admissions: 45, discharges: 40 },
  { month: "Feb", admissions: 52, discharges: 48 },
  { month: "Mar", admissions: 49, discharges: 45 },
  { month: "Apr", admissions: 63, discharges: 57 },
  { month: "May", admissions: 58, discharges: 53 },
  { month: "Jun", admissions: 64, discharges: 60 },
  { month: "Jul", admissions: 72, discharges: 65 },
  { month: "Aug", admissions: 68, discharges: 63 },
  { month: "Sep", admissions: 75, discharges: 70 },
  { month: "Oct", admissions: 82, discharges: 76 },
  { month: "Nov", admissions: 78, discharges: 72 },
  { month: "Dec", admissions: 85, discharges: 80 },
]

const revenueData = [
  { month: "Jan", revenue: 125000, expenses: 95000 },
  { month: "Feb", revenue: 132000, expenses: 98000 },
  { month: "Mar", revenue: 141000, expenses: 102000 },
  { month: "Apr", revenue: 138000, expenses: 99000 },
  { month: "May", revenue: 145000, expenses: 105000 },
  { month: "Jun", revenue: 152000, expenses: 110000 },
  { month: "Jul", revenue: 159000, expenses: 115000 },
  { month: "Aug", revenue: 164000, expenses: 118000 },
  { month: "Sep", revenue: 172000, expenses: 122000 },
  { month: "Oct", revenue: 178000, expenses: 125000 },
  { month: "Nov", revenue: 185000, expenses: 130000 },
  { month: "Dec", revenue: 195000, expenses: 135000 },
]

const departmentRevenueData = [
  { department: "Cardiology", revenue: 350000 },
  { department: "Orthopedics", revenue: 290000 },
  { department: "Neurology", revenue: 270000 },
  { department: "Pediatrics", revenue: 220000 },
  { department: "Oncology", revenue: 310000 },
  { department: "Gynecology", revenue: 180000 },
  { department: "Dermatology", revenue: 150000 },
]

const patientDemographicsData = [
  { name: "0-18", value: 15 },
  { name: "19-35", value: 25 },
  { name: "36-50", value: 30 },
  { name: "51-65", value: 20 },
  { name: "65+", value: 10 },
]

const genderDistributionData = [
  { name: "Male", value: 48 },
  { name: "Female", value: 52 },
]

const appointmentTypeData = [
  { name: "New Patient", value: 35 },
  { name: "Follow-up", value: 45 },
  { name: "Emergency", value: 10 },
  { name: "Specialist", value: 10 },
]

const bedOccupancyData = [
  { date: "Jan", icu: 85, general: 75, pediatric: 60, maternity: 70 },
  { date: "Feb", icu: 90, general: 78, pediatric: 65, maternity: 72 },
  { date: "Mar", icu: 88, general: 80, pediatric: 68, maternity: 75 },
  { date: "Apr", icu: 92, general: 82, pediatric: 70, maternity: 78 },
  { date: "May", icu: 95, general: 85, pediatric: 72, maternity: 80 },
  { date: "Jun", icu: 93, general: 83, pediatric: 75, maternity: 82 },
  { date: "Jul", icu: 91, general: 81, pediatric: 73, maternity: 79 },
  { date: "Aug", icu: 94, general: 84, pediatric: 76, maternity: 81 },
  { date: "Sep", icu: 96, general: 86, pediatric: 78, maternity: 83 },
  { date: "Oct", icu: 97, general: 87, pediatric: 80, maternity: 85 },
  { date: "Nov", icu: 95, general: 85, pediatric: 79, maternity: 84 },
  { date: "Dec", icu: 98, general: 88, pediatric: 82, maternity: 86 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("year")

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-500 mt-1">Comprehensive hospital performance metrics</p>
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
            <div className="text-center">
              <p className="text-sm text-gray-500">Total Patients</p>
              <h3 className="text-3xl font-bold mt-1">2,547</h3>
              <p className="text-sm text-green-600 mt-1">↑ 12.5% from last period</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Average Length of Stay</p>
              <h3 className="text-3xl font-bold mt-1">4.2 days</h3>
              <p className="text-sm text-green-600 mt-1">↓ 0.3 days from last period</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Bed Occupancy Rate</p>
              <h3 className="text-3xl font-bold mt-1">85.3%</h3>
              <p className="text-sm text-yellow-600 mt-1">↑ 3.1% from last period</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Revenue</p>
              <h3 className="text-3xl font-bold mt-1">$1.95M</h3>
              <p className="text-sm text-green-600 mt-1">↑ 8.7% from last period</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="patients" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-6">
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
        </TabsList>

        {/* Patients Tab */}
        <TabsContent value="patients" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Admissions & Discharges</CardTitle>
                <CardDescription>Monthly trend of patient flow</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={patientAdmissionData}
                  xAxisDataKey="month"
                  lines={[
                    { dataKey: "admissions", color: "#5a67f6" },
                    { dataKey: "discharges", color: "#00b894" },
                  ]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Patient Demographics</CardTitle>
                <CardDescription>Age distribution of patients</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart data={patientDemographicsData} innerRadius={60} outerRadius={90} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gender Distribution</CardTitle>
                <CardDescription>Patient gender breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={genderDistributionData}
                  colors={["#5a67f6", "#e84393"]}
                  innerRadius={60}
                  outerRadius={90}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Appointment Types</CardTitle>
                <CardDescription>Distribution by appointment category</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart data={appointmentTypeData} innerRadius={60} outerRadius={90} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Financial Tab */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Revenue vs Expenses</CardTitle>
                <CardDescription>Monthly financial performance</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={revenueData}
                  xAxisDataKey="month"
                  bars={[
                    { dataKey: "revenue", color: "#5a67f6" },
                    { dataKey: "expenses", color: "#e17055" },
                  ]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Department</CardTitle>
                <CardDescription>Top performing departments</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={departmentRevenueData}
                  xAxisDataKey="department"
                  bars={[{ dataKey: "revenue", color: "#5a67f6" }]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profit Margin</CardTitle>
                <CardDescription>Monthly profit margin trend</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={revenueData.map((item) => ({
                    month: item.month,
                    margin: (((item.revenue - item.expenses) / item.revenue) * 100).toFixed(1),
                  }))}
                  xAxisDataKey="month"
                  lines={[{ dataKey: "margin", name: "Profit Margin (%)", color: "#00b894" }]}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Operations Tab */}
        <TabsContent value="operations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Bed Occupancy Rates</CardTitle>
                <CardDescription>Monthly occupancy by ward type</CardDescription>
              </CardHeader>
              <CardContent>
                <AreaChart
                  data={bedOccupancyData}
                  xAxisDataKey="date"
                  areas={[
                    { dataKey: "icu", name: "ICU", color: "#e84393" },
                    { dataKey: "general", name: "General Ward", color: "#5a67f6" },
                    { dataKey: "pediatric", name: "Pediatric", color: "#00b894" },
                    { dataKey: "maternity", name: "Maternity", color: "#fdcb6e" },
                  ]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Wait Times</CardTitle>
                <CardDescription>By department in minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { department: "Emergency", waitTime: 12 },
                    { department: "Cardiology", waitTime: 35 },
                    { department: "Orthopedics", waitTime: 28 },
                    { department: "Pediatrics", waitTime: 18 },
                    { department: "General", waitTime: 25 },
                  ]}
                  xAxisDataKey="department"
                  bars={[{ dataKey: "waitTime", name: "Wait Time (min)", color: "#5a67f6" }]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Staff Utilization</CardTitle>
                <CardDescription>Average hours by role</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { role: "Doctors", hours: 8.5 },
                    { role: "Nurses", hours: 7.8 },
                    { role: "Technicians", hours: 7.2 },
                    { role: "Admin", hours: 6.9 },
                  ]}
                  xAxisDataKey="role"
                  bars={[{ dataKey: "hours", name: "Avg. Hours/Day", color: "#00b894" }]}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Departments Tab */}
        <TabsContent value="departments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Patient volume by department</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { department: "Cardiology", patients: 450 },
                    { department: "Orthopedics", patients: 380 },
                    { department: "Neurology", patients: 320 },
                    { department: "Pediatrics", patients: 290 },
                    { department: "Oncology", patients: 260 },
                    { department: "Gynecology", patients: 230 },
                    { department: "Dermatology", patients: 180 },
                  ]}
                  xAxisDataKey="department"
                  bars={[{ dataKey: "patients", color: "#5a67f6" }]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Revenue Share</CardTitle>
                <CardDescription>Percentage of total revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={[
                    { name: "Cardiology", value: 22 },
                    { name: "Orthopedics", value: 18 },
                    { name: "Neurology", value: 16 },
                    { name: "Pediatrics", value: 12 },
                    { name: "Oncology", value: 15 },
                    { name: "Gynecology", value: 10 },
                    { name: "Other", value: 7 },
                  ]}
                  innerRadius={60}
                  outerRadius={90}
                />
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Department Growth</CardTitle>
                <CardDescription>Year-over-year patient growth by department</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { department: "Cardiology", growth: 8.5 },
                    { department: "Orthopedics", growth: 6.2 },
                    { department: "Neurology", growth: 9.8 },
                    { department: "Pediatrics", growth: 4.5 },
                    { department: "Oncology", growth: 12.3 },
                    { department: "Gynecology", growth: 3.7 },
                    { department: "Dermatology", growth: 7.1 },
                  ]}
                  xAxisDataKey="department"
                  bars={[{ dataKey: "growth", name: "Growth (%)", color: "#00b894" }]}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
