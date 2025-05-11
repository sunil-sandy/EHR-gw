"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SearchInput } from "@/components/search-input"
import { PieChart } from "@/components/charts/pie-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { LineChart } from "@/components/charts/line-chart"
import { AreaChart } from "@/components/charts/area-chart"
import { Download, Calendar } from "lucide-react"

// Mock data for patient statistics
const patientsByAgeData = [
  { ageGroup: "0-10", count: 120 },
  { ageGroup: "11-20", count: 150 },
  { ageGroup: "21-30", count: 210 },
  { ageGroup: "31-40", count: 280 },
  { ageGroup: "41-50", count: 320 },
  { ageGroup: "51-60", count: 290 },
  { ageGroup: "61-70", count: 240 },
  { ageGroup: "71-80", count: 180 },
  { ageGroup: "81+", count: 90 },
]

const patientsByGenderData = [
  { name: "Male", value: 48 },
  { name: "Female", value: 52 },
]

const patientsByDiagnosisData = [
  { name: "Hypertension", value: 22 },
  { name: "Diabetes", value: 18 },
  { name: "Respiratory Infections", value: 15 },
  { name: "Heart Disease", value: 12 },
  { name: "Arthritis", value: 8 },
  { name: "Cancer", value: 7 },
  { name: "Other", value: 18 },
]

const patientTrendData = [
  { month: "Jan", newPatients: 85, returningPatients: 120 },
  { month: "Feb", newPatients: 92, returningPatients: 125 },
  { month: "Mar", newPatients: 88, returningPatients: 130 },
  { month: "Apr", newPatients: 99, returningPatients: 135 },
  { month: "May", newPatients: 105, returningPatients: 140 },
  { month: "Jun", newPatients: 112, returningPatients: 145 },
  { month: "Jul", newPatients: 118, returningPatients: 150 },
  { month: "Aug", newPatients: 125, returningPatients: 155 },
  { month: "Sep", newPatients: 130, returningPatients: 160 },
  { month: "Oct", newPatients: 135, returningPatients: 165 },
  { month: "Nov", newPatients: 140, returningPatients: 170 },
  { month: "Dec", newPatients: 145, returningPatients: 175 },
]

const patientsByInsuranceData = [
  { name: "Private Insurance", value: 45 },
  { name: "Medicare", value: 25 },
  { name: "Medicaid", value: 15 },
  { name: "Self-Pay", value: 10 },
  { name: "Other", value: 5 },
]

const topDiagnosesData = [
  { diagnosis: "Hypertension", patients: 320, change: "+5%" },
  { diagnosis: "Type 2 Diabetes", patients: 280, change: "+8%" },
  { diagnosis: "Acute Respiratory Infection", patients: 245, change: "+12%" },
  { diagnosis: "Coronary Artery Disease", patients: 210, change: "+3%" },
  { diagnosis: "Osteoarthritis", patients: 185, change: "+2%" },
  { diagnosis: "Anxiety Disorder", patients: 170, change: "+15%" },
  { diagnosis: "Urinary Tract Infection", patients: 155, change: "-2%" },
  { diagnosis: "Asthma", patients: 140, change: "+4%" },
  { diagnosis: "GERD", patients: 125, change: "+1%" },
  { diagnosis: "Depression", patients: 120, change: "+10%" },
]

const readmissionRateData = [
  { month: "Jan", rate: 4.2 },
  { month: "Feb", rate: 4.5 },
  { month: "Mar", rate: 4.3 },
  { month: "Apr", rate: 4.1 },
  { month: "May", rate: 3.9 },
  { month: "Jun", rate: 3.8 },
  { month: "Jul", rate: 3.7 },
  { month: "Aug", rate: 3.6 },
  { month: "Sep", rate: 3.5 },
  { month: "Oct", rate: 3.4 },
  { month: "Nov", rate: 3.3 },
  { month: "Dec", rate: 3.2 },
]

export default function PatientStatsPage() {
  const [timeRange, setTimeRange] = useState("year")
  const [searchTerm, setSearchTerm] = useState("")

  // Filter diagnoses based on search term
  const filteredDiagnoses = topDiagnosesData.filter((item) =>
    item.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Patient Statistics</h1>
          <p className="text-gray-500 mt-1">Comprehensive patient demographic and health data</p>
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
              <p className="text-sm text-gray-500">New Patients</p>
              <h3 className="text-3xl font-bold mt-1">145</h3>
              <p className="text-sm text-green-600 mt-1">↑ 8.2% from last period</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Readmission Rate</p>
              <h3 className="text-3xl font-bold mt-1">3.2%</h3>
              <p className="text-sm text-green-600 mt-1">↓ 0.3% from last period</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Avg. Length of Stay</p>
              <h3 className="text-3xl font-bold mt-1">4.2 days</h3>
              <p className="text-sm text-green-600 mt-1">↓ 0.3 days from last period</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="demographics" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="diagnoses">Diagnoses</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        {/* Demographics Tab */}
        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Patients by Age Group</CardTitle>
                <CardDescription>Distribution across age ranges</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={patientsByAgeData}
                  xAxisDataKey="ageGroup"
                  bars={[{ dataKey: "count", name: "Patients", color: "#5a67f6" }]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gender Distribution</CardTitle>
                <CardDescription>Patient gender breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={patientsByGenderData}
                  colors={["#5a67f6", "#e84393"]}
                  innerRadius={60}
                  outerRadius={90}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Insurance Coverage</CardTitle>
                <CardDescription>Patients by insurance type</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart data={patientsByInsuranceData} innerRadius={60} outerRadius={90} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Patients by location</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { location: "Urban", patients: 1450 },
                    { location: "Suburban", patients: 850 },
                    { location: "Rural", patients: 250 },
                  ]}
                  xAxisDataKey="location"
                  bars={[{ dataKey: "patients", name: "Patients", color: "#00b894" }]}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Diagnoses Tab */}
        <TabsContent value="diagnoses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Diagnoses</CardTitle>
                <CardDescription>Percentage of total patients</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart data={patientsByDiagnosisData} innerRadius={60} outerRadius={90} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Diagnoses by Age Group</CardTitle>
                <CardDescription>Top conditions by patient age</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { ageGroup: "0-18", respiratory: 45, cardiac: 5, diabetes: 10, other: 40 },
                    { ageGroup: "19-40", respiratory: 30, cardiac: 15, diabetes: 20, other: 35 },
                    { ageGroup: "41-60", respiratory: 20, cardiac: 30, diabetes: 35, other: 15 },
                    { ageGroup: "61+", respiratory: 15, cardiac: 45, diabetes: 30, other: 10 },
                  ]}
                  xAxisDataKey="ageGroup"
                  bars={[
                    { dataKey: "respiratory", color: "#5a67f6" },
                    { dataKey: "cardiac", color: "#e84393" },
                    { dataKey: "diabetes", color: "#00b894" },
                    { dataKey: "other", color: "#fdcb6e" },
                  ]}
                />
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Top Diagnoses</CardTitle>
                <CardDescription>Most common patient conditions</CardDescription>
                <div className="mt-4">
                  <SearchInput placeholder="Search diagnoses..." onSearch={setSearchTerm} className="max-w-md" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Diagnosis</TableHead>
                        <TableHead className="text-right">Patients</TableHead>
                        <TableHead className="text-right">Change</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDiagnoses.length > 0 ? (
                        filteredDiagnoses.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.diagnosis}</TableCell>
                            <TableCell className="text-right">{item.patients}</TableCell>
                            <TableCell
                              className={`text-right ${item.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                            >
                              {item.change}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-4 text-gray-500">
                            No diagnoses found matching your search criteria
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Patient Trends</CardTitle>
                <CardDescription>New vs. returning patients over time</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={patientTrendData}
                  xAxisDataKey="month"
                  lines={[
                    { dataKey: "newPatients", name: "New Patients", color: "#5a67f6" },
                    { dataKey: "returningPatients", name: "Returning Patients", color: "#00b894" },
                  ]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Readmission Rate</CardTitle>
                <CardDescription>30-day readmission percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={readmissionRateData}
                  xAxisDataKey="month"
                  lines={[{ dataKey: "rate", name: "Readmission Rate (%)", color: "#e84393" }]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Length of Stay</CardTitle>
                <CardDescription>By department in days</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { department: "Cardiology", los: 5.2 },
                    { department: "Orthopedics", los: 4.8 },
                    { department: "Neurology", los: 6.1 },
                    { department: "Pediatrics", los: 3.2 },
                    { department: "Oncology", los: 7.5 },
                    { department: "General", los: 3.9 },
                  ]}
                  xAxisDataKey="department"
                  bars={[{ dataKey: "los", name: "Avg. Days", color: "#fdcb6e" }]}
                />
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Seasonal Illness Trends</CardTitle>
                <CardDescription>Common conditions by month</CardDescription>
              </CardHeader>
              <CardContent>
                <AreaChart
                  data={[
                    { month: "Jan", respiratory: 120, flu: 85, allergies: 30 },
                    { month: "Feb", respiratory: 110, flu: 95, allergies: 25 },
                    { month: "Mar", respiratory: 90, flu: 70, allergies: 45 },
                    { month: "Apr", respiratory: 70, flu: 40, allergies: 80 },
                    { month: "May", respiratory: 60, flu: 20, allergies: 110 },
                    { month: "Jun", respiratory: 50, flu: 10, allergies: 90 },
                    { month: "Jul", respiratory: 45, flu: 5, allergies: 70 },
                    { month: "Aug", respiratory: 50, flu: 5, allergies: 65 },
                    { month: "Sep", respiratory: 65, flu: 15, allergies: 85 },
                    { month: "Oct", respiratory: 80, flu: 30, allergies: 60 },
                    { month: "Nov", respiratory: 95, flu: 60, allergies: 40 },
                    { month: "Dec", respiratory: 115, flu: 80, allergies: 30 },
                  ]}
                  xAxisDataKey="month"
                  areas={[
                    { dataKey: "respiratory", name: "Respiratory", color: "#5a67f6" },
                    { dataKey: "flu", name: "Influenza", color: "#e84393" },
                    { dataKey: "allergies", name: "Allergies", color: "#00b894" },
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
