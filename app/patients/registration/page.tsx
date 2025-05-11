"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, Home, Upload } from "lucide-react"
import Link from "next/link"

export default function PatientRegistration() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patient Registration</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <Link href="/" className="text-[#5a67f6]">
              <Home className="h-3.5 w-3.5" />
            </Link>
            <span>/</span>
            <Link href="/patients" className="hover:text-[#5a67f6]">
              Patient List
            </Link>
            <span>/</span>
            <span>Patient Registration</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500">Patient ID</span>
                      <span className="font-medium">- GM234627</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-[#5a67f6]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                        </svg>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500">Registration Date</span>
                        <span className="font-medium">- 12 Sept 2022 - 12:55 pm</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500">Registration No</span>
                        <span className="font-medium">- 1220221255</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Patient Details</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">New Born</span>
                      <Switch />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Patient Name</Label>
                      <Input id="name" placeholder="Patient Name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Patient Email</Label>
                      <Input id="email" type="email" placeholder="Patient Email" />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Birth of Date or Age</Label>
                      <div className="flex gap-4">
                        <div className="relative flex-1">
                          <Input type="text" placeholder="12/12/2020" />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 text-gray-400"
                          >
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                        <Select>
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Age" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="years">Years</SelectItem>
                            <SelectItem value="months">Months</SelectItem>
                            <SelectItem value="days">Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex">
                        <Select>
                          <SelectTrigger className="w-[100px] rounded-r-none border-r-0">
                            <SelectValue>
                              <div className="flex items-center gap-2">
                                <img src="/placeholder.svg?height=20&width=30" alt="India" className="h-5 w-7" />
                                <span>+91</span>
                              </div>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+91">
                              <div className="flex items-center gap-2">
                                <img src="/placeholder.svg?height=20&width=30" alt="India" className="h-5 w-7" />
                                <span>+91</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="+1">
                              <div className="flex items-center gap-2">
                                <img src="/placeholder.svg?height=20&width=30" alt="USA" className="h-5 w-7" />
                                <span>+1</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Input id="phone" className="rounded-l-none" placeholder="8023456789" />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Blood Group</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a+">A+</SelectItem>
                          <SelectItem value="a-">A-</SelectItem>
                          <SelectItem value="b+">B+</SelectItem>
                          <SelectItem value="b-">B-</SelectItem>
                          <SelectItem value="ab+">AB+</SelectItem>
                          <SelectItem value="ab-">AB-</SelectItem>
                          <SelectItem value="o+">O+</SelectItem>
                          <SelectItem value="o-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="doctor">Doctor Name</Label>
                      <div className="relative">
                        <Input id="doctor" placeholder="Doctor Name" />
                        <div className="absolute right-1 top-1 flex flex-col">
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <div className="relative">
                        <Input id="department" placeholder="Department" />
                        <div className="absolute right-1 top-1 flex flex-col">
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Visit Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Visit Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="opd">OPD</SelectItem>
                        <SelectItem value="ipd">IPD</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Priority</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Emergency</span>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Marital Status</Label>
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Single</span>
                        <Switch />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Married</span>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Patient Address</h3>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Roboto
                  </Button>
                  <Button variant="outline" size="sm">
                    Paragraph
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 10h4"></path>
                      <path d="M12 4v16"></path>
                      <path d="M16 10h4"></path>
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 7V4h16v3"></path>
                      <path d="M9 20h6"></path>
                      <path d="M12 4v16"></path>
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M8 3v3a2 2 0 0 1-2 2H3"></path>
                      <path d="M21 8h-3a2 2 0 0 1-2-2V3"></path>
                      <path d="M3 16h3a2 2 0 0 1 2 2v3"></path>
                      <path d="M16 21v-3a2 2 0 0 1 2-2h3"></path>
                    </svg>
                  </Button>
                </div>
                <Textarea placeholder="Your text goes here" className="min-h-[120px]" />
                <p className="text-sm text-gray-500">Add a long description for your product</p>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Payment</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="card">Card</SelectItem>
                          <SelectItem value="insurance">Insurance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Amount</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Amount" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="500">$500</SelectItem>
                          <SelectItem value="1000">$1000</SelectItem>
                          <SelectItem value="1500">$1500</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Added</Label>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="relative">
                        <Input type="text" placeholder="12/12/2020" />
                        <Button variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 text-gray-400">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="relative">
                        <Input type="text" placeholder="12:00 PM" />
                        <Button variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 text-gray-400">
                          <Clock className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Button variant="outline" className="bg-[#5a67f6] text-white hover:bg-[#4550e6] hover:text-white">
                    Edit Patient
                  </Button>
                  <Button className="bg-red-500 hover:bg-red-600">Emergency Contact</Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Document Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="id">ID Proof</SelectItem>
                        <SelectItem value="insurance">Insurance</SelectItem>
                        <SelectItem value="medical">Medical Records</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Upload Documents</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-4">
                        <div className="mb-2 rounded-md bg-blue-100 p-2 text-[#5a67f6]">
                          <Upload className="h-5 w-5" />
                        </div>
                        <Button variant="ghost" size="sm" className="text-[#5a67f6]">
                          Upload
                        </Button>
                      </div>
                      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-4">
                        <div className="rounded-md border border-dashed p-8"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
