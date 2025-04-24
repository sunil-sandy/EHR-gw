"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Plus, RefreshCw } from "lucide-react"

// Mock data for wards
const wards = [
  { id: 1, name: "General Ward A", totalBeds: 20, occupiedBeds: 15, availableBeds: 5 },
  { id: 2, name: "General Ward B", totalBeds: 20, occupiedBeds: 18, availableBeds: 2 },
  { id: 3, name: "ICU", totalBeds: 10, occupiedBeds: 8, availableBeds: 2 },
  { id: 4, name: "Pediatric Ward", totalBeds: 15, occupiedBeds: 10, availableBeds: 5 },
  { id: 5, name: "Maternity Ward", totalBeds: 12, occupiedBeds: 9, availableBeds: 3 },
  { id: 6, name: "Surgical Ward", totalBeds: 18, occupiedBeds: 14, availableBeds: 4 },
]

export default function InpatientPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Ward View</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button className="bg-[#5a67f6] hover:bg-[#4550e6]">
            <Plus className="mr-2 h-4 w-4" />
            Admit Patient
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Wards" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Wards</SelectItem>
              <SelectItem value="general">General Wards</SelectItem>
              <SelectItem value="icu">ICU</SelectItem>
              <SelectItem value="pediatric">Pediatric</SelectItem>
              <SelectItem value="maternity">Maternity</SelectItem>
              <SelectItem value="surgical">Surgical</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-xs">Available</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span className="text-xs">Full</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs">Limited</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {wards.map((ward) => {
          const availabilityPercentage = (ward.availableBeds / ward.totalBeds) * 100
          let statusColor = "bg-yellow-500"
          if (availabilityPercentage > 20) statusColor = "bg-green-500"
          if (availabilityPercentage < 10) statusColor = "bg-red-500"

          return (
            <Card key={ward.id} className={`border-l-4 ${statusColor}`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>{ward.name}</CardTitle>
                  <div className={`h-3 w-3 rounded-full ${statusColor}`}></div>
                </div>
                <CardDescription>
                  {ward.availableBeds} beds available out of {ward.totalBeds}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className={`h-2 rounded-full ${
                      availabilityPercentage > 20
                        ? "bg-green-500"
                        : availabilityPercentage > 10
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                    style={{ width: `${(ward.occupiedBeds / ward.totalBeds) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Occupied: {ward.occupiedBeds}</span>
                  <span>Available: {ward.availableBeds}</span>
                </div>
                <div className="mt-4 flex justify-between">
                  <Button variant="outline" size="sm">
                    View Patients
                  </Button>
                  <Button size="sm" className="bg-[#5a67f6] hover:bg-[#4550e6]">
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ward Occupancy Overview</CardTitle>
          <CardDescription>Current status of all wards in the hospital</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {wards.map((ward) => {
              const occupancyPercentage = (ward.occupiedBeds / ward.totalBeds) * 100
              return (
                <div key={ward.id} className="flex items-center gap-4">
                  <div className="w-36 shrink-0 font-medium">{ward.name}</div>
                  <div className="flex-1">
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className={`h-2 rounded-full ${
                          occupancyPercentage > 90
                            ? "bg-red-500"
                            : occupancyPercentage > 70
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                        style={{ width: `${occupancyPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-16 text-right text-sm font-medium">{Math.round(occupancyPercentage)}%</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
