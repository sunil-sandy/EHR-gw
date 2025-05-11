"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { BedDouble } from "lucide-react"
import Link from "next/link"

export default function AdmitPatientPage() {
  return (
    <div className="p-6 bg-[#f6f8fa] min-h-screen">
      {/* Top Bar with Back Button */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-md px-4 py-2 text-base border-gray-300" asChild>
            <Link href="/inpatient">&#8592; Back to Inpatient Home</Link>
          </Button>
          <span className="text-2xl font-semibold ml-4">IP Admission</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-md px-4 py-1 text-sm border-gray-300">Edit Patient</Button>
          <Button className="bg-[#e74c3c] hover:bg-[#c0392b] text-white rounded-md px-4 py-1 text-sm">Emergency Contact</Button>
        </div>
      </div>
      {/* Patient Info Bar */}
      <div className="flex flex-wrap items-center gap-4 px-8 py-2 bg-[#f8fafc] rounded-lg mb-4">
        <span className="text-sm font-medium text-[#5a67f6]">Patient ID - GM234627</span>
        <span className="text-sm text-gray-500">Registration Date - 12 Sept 2022 - 12:55 pm</span>
        <span className="text-sm text-gray-500">Registration No - 1220221255</span>
      </div>
      {/* Main Form */}
      <div className="flex gap-6 px-8 pb-8">
        {/* Left Form */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="col-span-2 flex gap-2 items-center">
            <Select><SelectTrigger className="bg-[#f6f8fa] w-24"><SelectValue placeholder="Mr/Mrs" /></SelectTrigger><SelectContent><SelectItem value="mr">Mr</SelectItem><SelectItem value="mrs">Mrs</SelectItem></SelectContent></Select>
            <Input placeholder="Patient Name" className="bg-[#f6f8fa] flex-1" />
          </div>
          <div className="col-span-2 flex gap-2 items-center">
            <Select><SelectTrigger className="bg-[#f6f8fa] w-24"><SelectValue placeholder="Age" /></SelectTrigger><SelectContent><SelectItem value="1">1</SelectItem></SelectContent></Select>
            <Input placeholder="12/12/2020" type="date" className="bg-[#f6f8fa] flex-1" />
          </div>
          <div className="col-span-2 flex gap-2 items-center">
            <div className="flex items-center bg-[#f6f8fa] rounded-md border border-gray-200 px-2"><span className="mr-1"><img src="https://flagcdn.com/in.svg" alt="IN" className="w-5 h-5" /></span><Select><SelectTrigger className="bg-transparent border-none w-14"><SelectValue placeholder="+91" /></SelectTrigger><SelectContent><SelectItem value="+91">+91</SelectItem></SelectContent></Select></div>
            <Input placeholder="8023456789" className="bg-[#f6f8fa] flex-1" />
          </div>
          <div className="col-span-2 flex gap-2 items-center">
            <Select><SelectTrigger className="bg-[#f6f8fa] flex-1"><SelectValue placeholder="A+" /></SelectTrigger><SelectContent><SelectItem value="A+">A+</SelectItem></SelectContent></Select>
            <Select><SelectTrigger className="bg-[#f6f8fa] flex-1"><SelectValue placeholder="Gender" /></SelectTrigger><SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent></Select>
          </div>
          <div className="col-span-2 flex gap-2 items-center">
            <span className="text-xs text-gray-400">Marital Status</span>
            <span className="ml-2 text-xs">Single</span>
            <Switch className="mx-1" />
            <span className="text-xs">Married</span>
          </div>
          <div className="col-span-2 flex gap-2 items-center">
            <Select><SelectTrigger className="bg-[#f6f8fa] flex-1"><SelectValue placeholder="IND" /></SelectTrigger><SelectContent><SelectItem value="IND">IND</SelectItem></SelectContent></Select>
            <Input placeholder="Address" className="bg-[#f6f8fa] flex-1" />
          </div>
          <div className="col-span-2 flex gap-2 items-center">
            <Select><SelectTrigger className="bg-[#f6f8fa] flex-1"><SelectValue placeholder="Aadhar" /></SelectTrigger><SelectContent><SelectItem value="Aadhar">Aadhar</SelectItem></SelectContent></Select>
            <Input placeholder="Number" className="bg-[#f6f8fa] flex-1" />
          </div>
          <div className="col-span-2 flex gap-2 items-center">
            <Input placeholder="Parent Name" className="bg-[#f6f8fa] flex-1" />
            <Input placeholder="Name" className="bg-[#f6f8fa] flex-1" />
          </div>
          <div className="col-span-2 flex gap-2 items-center">
            <div className="flex items-center bg-[#f6f8fa] rounded-md border border-gray-200 px-2"><span className="mr-1"><img src="https://flagcdn.com/in.svg" alt="IN" className="w-5 h-5" /></span><Select><SelectTrigger className="bg-transparent border-none w-14"><SelectValue placeholder="+91" /></SelectTrigger><SelectContent><SelectItem value="+91">+91</SelectItem></SelectContent></Select></div>
            <Input placeholder="8023456789" className="bg-[#f6f8fa] flex-1" />
          </div>
        </div>
        {/* Center Form (Profile/Docs) */}
        <div className="flex flex-col gap-4 items-center justify-start min-w-[220px]">
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 bg-[#f6f8fa] rounded-lg flex items-center justify-center border border-gray-200"><svg width="40" height="40" fill="none" stroke="#b0b0b0" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M16 16c0-2.21-3.58-4-8-4s-8 1.79-8 4" /></svg></div>
            <Button variant="outline" className="rounded-md px-4 py-1 text-sm border-gray-300 mt-2">Upload</Button>
          </div>
          <div className="w-full">
            <Select><SelectTrigger className="bg-[#f6f8fa] w-full"><SelectValue placeholder="Document Type" /></SelectTrigger><SelectContent><SelectItem value="Aadhar">Aadhar</SelectItem></SelectContent></Select>
            <div className="flex flex-col gap-2 mt-2">
              <div className="w-32 h-24 bg-[#f6f8fa] rounded-lg flex items-center justify-center border border-gray-200"><svg width="40" height="40" fill="none" stroke="#b0b0b0" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M16 16c0-2.21-3.58-4-8-4s-8 1.79-8 4" /></svg></div>
              <Button variant="outline" className="rounded-md px-4 py-1 text-sm border-gray-300 mt-2">Upload</Button>
            </div>
          </div>
        </div>
        {/* Right Form (Ward Details) */}
        <div className="flex-1 bg-[#f8fafc] rounded-xl p-6 flex flex-col gap-4 min-w-[320px]">
          <div className="text-gray-500 font-medium mb-2">Ward Details</div>
          <div className="flex gap-2 mb-2">
            <Select><SelectTrigger className="bg-[#f6f8fa] flex-1"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="ward1">Ward 1</SelectItem></SelectContent></Select>
            <Select><SelectTrigger className="bg-[#f6f8fa] flex-1"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="room1">Room 1</SelectItem></SelectContent></Select>
          </div>
          <div className="flex gap-2 mb-2 items-center">
            <Select><SelectTrigger className="bg-[#f6f8fa] flex-1"><SelectValue placeholder="Enter or Select" /></SelectTrigger><SelectContent><SelectItem value="bed1">Bed 1</SelectItem></SelectContent></Select>
            <div className="flex items-center justify-center w-16 h-12 bg-[#f6f8fa] rounded-md border border-gray-200"><BedDouble className="w-8 h-8 text-gray-700" /></div>
          </div>
          <div className="flex gap-2 mb-2">
            <Select><SelectTrigger className="bg-[#f6f8fa] flex-1"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="treatedward1">Ward 1</SelectItem></SelectContent></Select>
            <div className="flex items-center gap-1 bg-[#f6f8fa] rounded-md border border-gray-200 px-2"><Input placeholder="0" className="bg-transparent border-none w-10 p-0 text-center" /><div className="flex flex-col gap-0.5"><button className="text-gray-400 hover:text-gray-700 p-0 leading-none"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"></polyline></svg></button><button className="text-gray-400 hover:text-gray-700 p-0 leading-none"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button></div></div>
          </div>
          <div className="flex gap-2 mb-2">
            <Select><SelectTrigger className="bg-[#f6f8fa] flex-1"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="doctor1">Dr. Rajesh</SelectItem></SelectContent></Select>
            <Input placeholder="Cardiology" className="bg-[#f6f8fa] flex-1" disabled />
          </div>
          <div className="flex gap-2 mb-2">
            <Select><SelectTrigger className="bg-[#f6f8fa] flex-1"><SelectValue placeholder="Enter or Select" /></SelectTrigger><SelectContent><SelectItem value="doctor2">Dr. Suresh</SelectItem></SelectContent></Select>
            <Input placeholder="Add Note" className="bg-[#f6f8fa] flex-1" />
          </div>
          <div className="mb-2">
            <Input placeholder="Add Note" className="bg-[#f6f8fa]" />
          </div>
        </div>
      </div>
    </div>
  )
} 