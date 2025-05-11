"use client"

import { AreaChart } from "@/components/charts/area-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { LineChart } from "@/components/charts/line-chart"
import { PieChart } from "@/components/charts/pie-chart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { dashboardStats } from "@/lib/data"
import { Activity, Bed, Calendar, Download, FileText, Users } from "lucide-react"
import { useState } from "react"

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly" | "yearly">("monthly")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="bg-[#5a67f6] hover:bg-[#4550e6]">New Patient</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-[#5a67f6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalPatients}</div>
            <p className="text-xs text-muted-foreground">+{dashboardStats.patientsGrowth}% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-[#5a67f6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.todayAppointments}</div>
            <p className="text-xs text-muted-foreground">+{dashboardStats.appointmentsGrowth}% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Available Beds</CardTitle>
            <Bed className="h-4 w-4 text-[#5a67f6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.availableBeds}</div>
            <p className="text-xs text-muted-foreground">{dashboardStats.occupancyRate}% occupancy rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
            <FileText className="h-4 w-4 text-[#5a67f6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.pendingReports}</div>
            <p className="text-xs text-muted-foreground">{dashboardStats.reportsChange}% from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Patient Statistics</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={timeRange === "daily" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange("daily")}
                  className={timeRange === "daily" ? "bg-[#5a67f6] hover:bg-[#4550e6]" : ""}
                >
                  Daily
                </Button>
                <Button
                  variant={timeRange === "weekly" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange("weekly")}
                  className={timeRange === "weekly" ? "bg-[#5a67f6] hover:bg-[#4550e6]" : ""}
                >
                  Weekly
                </Button>
                <Button
                  variant={timeRange === "monthly" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange("monthly")}
                  className={timeRange === "monthly" ? "bg-[#5a67f6] hover:bg-[#4550e6]" : ""}
                >
                  Monthly
                </Button>
                <Button
                  variant={timeRange === "yearly" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange("yearly")}
                  className={timeRange === "yearly" ? "bg-[#5a67f6] hover:bg-[#4550e6]" : ""}
                >
                  Yearly
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <LineChart
              data={dashboardStats.monthlyPatients}
              xAxisDataKey="month"
              lines={[{ dataKey: "patients", name: "Patients", color: "#5a67f6" }]}
              height={300}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart
              data={dashboardStats.monthlyRevenue}
              xAxisDataKey="month"
              areas={[{ dataKey: "revenue", name: "Revenue ($)", color: "#5a67f6" }]}
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={dashboardStats.departmentStats}
              xAxisDataKey="name"
              bars={[
                { dataKey: "patients", name: "Patients", color: "#5a67f6" },
                { dataKey: "revenue", name: "Revenue ($)", color: "#38bdf8" },
              ]}
              height={300}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Patient Demographics</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <h4 className="mb-2 text-sm font-medium">Age Distribution</h4>
              <PieChart data={dashboardStats.patientDemographics.age} height={180} />
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium">Gender Distribution</h4>
              <PieChart data={dashboardStats.patientDemographics.gender} colors={["#5a67f6", "#f472b6"]} height={180} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <p className="font-medium">Patient #{1000 + i}</p>
                    <p className="text-sm text-muted-foreground">Dr. Smith • {9 + i}:00 AM</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardStats.recentActivities.map((activity, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Activity className="h-4 w-4 text-[#5a67f6]" />
                  <div>
                    <p className="text-sm font-medium">{activity.activity}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
