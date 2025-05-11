"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Plus, RefreshCw } from "lucide-react"

export default function BedsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Bed Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button className="bg-[#5a67f6] hover:bg-[#4550e6]">
            <Plus className="mr-2 h-4 w-4" />
            Assign Bed
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="general">General Ward</SelectItem>
              <SelectItem value="icu">ICU</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
              <SelectItem value="pediatric">Pediatric</SelectItem>
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
            <span className="text-xs">Occupied</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs">Reserved</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-gray-300"></div>
            <span className="text-xs">Maintenance</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="all">All Beds</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="occupied">Occupied</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <Card
                key={i}
                className={i % 3 === 0 ? "border-green-500" : i % 3 === 1 ? "border-red-500" : "border-yellow-500"}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Bed #{i + 101}</CardTitle>
                  <CardDescription>{i % 3 === 0 ? "Available" : i % 3 === 1 ? "Occupied" : "Reserved"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Department:</span>
                      <span className="font-medium">
                        {i % 4 === 0 ? "General Ward" : i % 4 === 1 ? "ICU" : i % 4 === 2 ? "Emergency" : "Pediatric"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Room:</span>
                      <span className="font-medium">{Math.floor(i / 4) + 1}</span>
                    </div>
                    {i % 3 === 1 && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Patient:</span>
                          <span className="font-medium">Patient #{1000 + i}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Admitted:</span>
                          <span className="font-medium">{`${10 + (i % 20)} Jul 2023`}</span>
                        </div>
                      </>
                    )}
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full">
                        {i % 3 === 0 ? "Assign" : i % 3 === 1 ? "View Details" : "Cancel Reservation"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="available">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="border-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Bed #{i + 101}</CardTitle>
                  <CardDescription>Available</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Department:</span>
                      <span className="font-medium">
                        {i % 4 === 0 ? "General Ward" : i % 4 === 1 ? "ICU" : i % 4 === 2 ? "Emergency" : "Pediatric"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Room:</span>
                      <span className="font-medium">{Math.floor(i / 4) + 1}</span>
                    </div>
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Assign
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="occupied">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="border-red-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Bed #{i + 105}</CardTitle>
                  <CardDescription>Occupied</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Department:</span>
                      <span className="font-medium">
                        {i % 4 === 0 ? "General Ward" : i % 4 === 1 ? "ICU" : i % 4 === 2 ? "Emergency" : "Pediatric"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Room:</span>
                      <span className="font-medium">{Math.floor(i / 4) + 1}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Patient:</span>
                      <span className="font-medium">Patient #{1000 + i}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Admitted:</span>
                      <span className="font-medium">{`${10 + (i % 20)} Jul 2023`}</span>
                    </div>
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="maintenance">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="border-gray-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Bed #{i + 110}</CardTitle>
                  <CardDescription>Under Maintenance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Department:</span>
                      <span className="font-medium">
                        {i % 4 === 0 ? "General Ward" : i % 4 === 1 ? "ICU" : "Emergency"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Room:</span>
                      <span className="font-medium">{Math.floor(i / 4) + 1}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Since:</span>
                      <span className="font-medium">{`${5 + i} Jul 2023`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expected:</span>
                      <span className="font-medium">{`${15 + i} Jul 2023`}</span>
                    </div>
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Mark as Available
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
