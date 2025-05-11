"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BedDouble, User, CheckCircle, AlertTriangle, Plus } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { X } from "lucide-react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';
import Link from "next/link"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTitle, Tooltip, Legend);

const summaryStats = [
  {
    title: "Total Beds",
    value: 450,
    desc: "Across 8 wards",
    icon: <BedDouble className="h-8 w-8 text-[#222]" />,
    bg: "bg-[#fff8ee]",
  },
  {
    title: "Occupied Beds",
    value: 92,
    desc: "77% Occupancy Rate",
    icon: <User className="h-8 w-8 text-[#222]" />,
    bg: "bg-[#fff8ee]",
  },
  {
    title: "Available Beds",
    value: 450,
    desc: "Ready for allocation",
    icon: <CheckCircle className="h-8 w-8 text-[#222]" />,
    bg: "bg-[#fff8ee]",
  },
  {
    title: "Emergency Wards",
    value: "18/20",
    desc: "Completed",
    icon: <AlertTriangle className="h-8 w-8 text-[#222]" />,
    bg: "bg-[#fff8ee]",
    status: "Completed",
  },
]

const bedTabs = [
  "General Ward",
  "Emergency Ward",
  "ICU",
  "Pediatric Ward",
  "Maternity Ward",
  "Psychiatric Ward",
]

const bedSummary = {
  total: 6,
  occupied: 4,
  available: 1,
  maintenance: 1,
}

const bedTable = [
  { id: "G01", patient: "Rahul Sharma", date: "5/4/2025", doctor: "Dr. Rajesh", status: "Occupied" },
  { id: "G02", patient: "-", date: "-", doctor: "-", status: "Available" },
  { id: "G03", patient: "Rahul Sharma", date: "5/4/2025", doctor: "Dr. Rajesh", status: "In-Progress" },
  { id: "G04", patient: "Rahul Sharma", date: "5/4/2025", doctor: "Dr. Rajesh", status: "Completed" },
  { id: "G05", patient: "Rahul Sharma", date: "5/4/2025", doctor: "Dr. Rajesh", status: "Completed" },
  { id: "G06", patient: "Rahul Sharma", date: "5/4/2025", doctor: "Dr. Rajesh", status: "Completed" },
]

const statusColors: Record<string, string> = {
  Occupied: "bg-yellow-50 text-yellow-800 border border-yellow-200",
  Available: "bg-green-50 text-green-800 border border-green-200",
  "In-Progress": "bg-blue-50 text-blue-800 border border-blue-200",
  Completed: "bg-green-50 text-green-800 border border-green-200",
}

const bedStatusLegend = [
  { label: "Available", color: "bg-green-50 text-green-800 border border-green-200" },
  { label: "Occupied (Stable)", color: "bg-yellow-50 text-yellow-800 border border-yellow-200" },
  { label: "Serious", color: "bg-orange-50 text-orange-800 border border-orange-200" },
  { label: "Critical", color: "bg-red-50 text-red-800 border border-red-200" },
]

const wardTabs = ["General Ward", "Emergency", "ICU", "Private Rooms"]

const floorData = [
  {
    floor: "First Floor",
    beds: [
      { id: 1, label: "201 - ICU", patient: "Patient 1000", age: "3y, Male", status: "Occupied" },
      { id: 2, label: "201 - ICU", patient: "Patient 1000", age: "3y, Male", status: "Occupied" },
      { id: 3, label: "201 - ICU", patient: "Patient 1000", age: "3y, Male", status: "Available" },
      { id: 4, label: "201 - ICU", patient: "Patient 1000", age: "3y, Male", status: "Available" },
      { id: 5, label: "201 - ICU", patient: "Patient 1000", age: "3y, Male", status: "Available" },
      { id: 6, label: "201 - ICU", patient: "Patient 1000", age: "3y, Male", status: "Available" },
      { id: 7, label: "201 - ICU", patient: "Patient 1000", age: "3y, Male", status: "Available" },
      { id: 8, label: "201 - ICU", patient: "Patient 1000", age: "3y, Male", status: "Critical" },
    ],
  },
  {
    floor: "Second Floor",
    beds: [
      { id: 1, label: "201 - ICU", patient: "Patient 1000", age: "3y, Male", status: "Occupied" },
      { id: 2, label: "201 - ICU", patient: "Patient 1000", age: "3y, Male", status: "Available" },
      { id: 3, label: "201 - ICU", patient: "Patient 1000", age: "3y, Male", status: "Available" },
      { id: 4, label: "201 - ICU", patient: "Patient 1000", age: "3y, Male", status: "Available" },
      { id: 5, label: "201 - ICU", patient: "Patient 1000", age: "3y, Male", status: "Available" },
      { id: 6, label: "201 - ICU", patient: "Patient 1000", age: "3y, Male", status: "Available" },
      { id: 7, label: "201 - ICU", patient: "Patient 1000", age: "3y, Male", status: "Allocate" },
      { id: 8, label: "201 - ICU", patient: "Patient 1000", age: "3y, Male", status: "Critical" },
    ],
  },
]

const bedCardStatus: Record<string, string> = {
  "Available": "bg-green-50 border border-green-200 text-green-800",
  "Occupied": "bg-yellow-50 border border-yellow-200 text-yellow-800",
  "Occupied (Stable)": "bg-yellow-50 border border-yellow-200 text-yellow-800",
  "Serious": "bg-orange-50 border border-orange-200 text-orange-800",
  "Critical": "bg-red-50 border border-red-200 text-red-800",
  "Allocate": "bg-violet-50 border border-violet-200 text-violet-800",
}

const vitalsData = [
  { time: "08:00", temperature: "37.2°C", bp: "120/80 mmHg", pulse: "72 bpm", respiration: "16 /min", spo2: "98%", recordedBy: "Nurse Singh" },
  { time: "12:00", temperature: "37.5°C", bp: "124/82 mmHg", pulse: "78 bpm", respiration: "18 /min", spo2: "97%", recordedBy: "Nurse Singh" },
  { time: "16:00", temperature: "37.8°C", bp: "126/84 mmHg", pulse: "82 bpm", respiration: "19 /min", spo2: "96%", recordedBy: "Nurse Singh" },
  { time: "20:00", temperature: "37.3°C", bp: "122/80 mmHg", pulse: "75 bpm", respiration: "17 /min", spo2: "98%", recordedBy: "Nurse Singh" },
]

const vitalsChartData = {
  labels: ["08:00", "12:00", "16:00", "20:00"],
  temperature: [37.2, 37.5, 37.8, 37.3],
  pulse: [72, 78, 82, 75],
  spo2: [98, 97, 96, 98],
}

export default function InpatientManagement() {
  const [tab, setTab] = useState(bedTabs[0])
  const [open, setOpen] = useState(false)
  const [notify, setNotify] = useState(true)
  const [discount, setDiscount] = useState(false)
  const [activeMainTab, setActiveMainTab] = useState<'Ward View' | 'Bed Allocation' | 'Patient Vitals'>('Ward View')

  // Chart data for vitals
  const chartData = {
    labels: vitalsChartData.labels,
    datasets: [
      {
        label: 'Temperature',
        data: vitalsChartData.temperature,
        borderColor: '#2563eb',
        backgroundColor: '#2563eb22',
        yAxisID: 'y',
        tension: 0.4,
      },
      {
        label: 'Pulse',
        data: vitalsChartData.pulse,
        borderColor: '#fb923c',
        backgroundColor: '#fb923c22',
        yAxisID: 'y1',
        tension: 0.4,
      },
      {
        label: 'SpO2',
        data: vitalsChartData.spo2,
        borderColor: '#06b6d4',
        backgroundColor: '#06b6d422',
        yAxisID: 'y2',
        tension: 0.4,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: { display: true, text: 'Temperature (°C)' },
        min: 35, max: 40,
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: { drawOnChartArea: false },
        title: { display: true, text: 'Pulse (bpm)' },
        min: 60, max: 100,
      },
      y2: {
        type: 'linear',
        display: false,
        min: 90, max: 100,
      },
    },
  };

  return (
    <div className="p-6 bg-[#f6f8fa] min-h-screen">
      {/* Top Bar with Admit New Patient */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-xs text-gray-400 flex items-center gap-2">
          <span>Inpatient</span>
        </div>
        <Button className="bg-[#5a67f6] hover:bg-[#4550e6] text-white rounded-md flex items-center gap-2 px-4 py-2 text-base font-medium shadow" asChild>
          <Link href="/inpatient/admit-patient">+ Admit New Patient</Link>
        </Button>
      </div>
      {/* Inpatient Management Header */}
      <div className="bg-[#f8fafc] rounded-xl p-6 shadow flex flex-col gap-6">
        <div className="flex flex-wrap gap-4 justify-between">
          {summaryStats.map((stat, i) => (
            <Card key={i} className={`flex-1 min-w-[200px] max-w-[260px] ${stat.bg} border-none shadow-none`}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="bg-[#fff8ee] rounded-lg p-2 flex items-center justify-center">{stat.icon}</div>
                <div>
                  <div className="text-xl font-bold leading-tight">{stat.value}</div>
                  <div className="text-xs text-gray-700 font-medium">{stat.title}</div>
                  <div className="text-xs text-gray-400">{stat.desc}</div>
                  {stat.status && (
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded bg-red-100 text-red-700 font-semibold">{stat.status}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          {['Ward View', 'Bed Allocation', 'Patient Vitals'].map((t) => (
            <Button
              key={t}
              variant={activeMainTab === t ? "default" : "outline"}
              size="sm"
              className={
                activeMainTab === t
                  ? "bg-[#5a67f6] hover:bg-[#4550e6] text-white rounded-md"
                  : "rounded-md border-gray-300"
              }
              onClick={() => setActiveMainTab(t as any)}
            >
              {t}
            </Button>
          ))}
        </div>
      </div>
      {/* Main Tab Content */}
      {activeMainTab === 'Ward View' && (
        <div className="bg-white rounded-xl p-6 shadow mt-6">
          {/* Legend and Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex gap-2 items-center">
              {bedStatusLegend.map((s) => (
                <span key={s.label} className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${s.color}`}>{s.label}</span>
              ))}
            </div>
            <div className="flex gap-2 ml-4">
              {wardTabs.map((t) => (
                <Button key={t} variant="outline" size="sm" className="rounded-md border-gray-300">{t}</Button>
              ))}
            </div>
            <div className="flex gap-2 ml-auto">
              <Input placeholder="Search bed or patient" className="w-64 rounded-md border-gray-300" />
              <Button className="bg-[#5a67f6] hover:bg-[#4550e6] text-white rounded-md flex items-center gap-2" onClick={() => setOpen(true)}><Plus className="w-4 h-4" />Assign Bed</Button>
            </div>
          </div>
          {/* Bed Grid by Floor */}
          {floorData.map((floor) => (
            <div key={floor.floor} className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <input type="checkbox" className="rounded" />
                <span className="font-medium text-gray-700">{floor.floor}</span>
                <span className="ml-1 text-gray-400 cursor-pointer">&#9660;</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {floor.beds.map((bed, idx) => (
                  <div key={idx} className={`rounded-xl p-4 flex flex-col items-center border ${bedCardStatus[bed.status] || "bg-gray-50 border border-gray-200 text-gray-700"}`}>
                    <BedDouble className="w-8 h-8 mb-2" />
                    <div className="font-semibold text-sm mb-1">{bed.label}</div>
                    <div className="text-xs text-gray-500 mb-1">{bed.patient}</div>
                    <div className="text-xs text-gray-400 mb-2">{bed.age}</div>
                    {bed.status === "Allocate" ? (
                      <Button size="sm" className="bg-violet-600 text-white rounded-full px-4 py-1 text-xs">Allocate</Button>
                    ) : (
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${bedCardStatus[bed.status]}`}>{bed.status}</span>
                    )}
                    <span className="mt-2 text-gray-400 text-lg">...</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {activeMainTab === 'Patient Vitals' && (
        <div className="bg-white rounded-xl p-6 shadow mt-6">
          <div className="text-xl font-semibold mb-2">Patient Vitals Monitoring</div>
          <div className="text-gray-500 mb-4">Track and record patient vital signs</div>
          <div className="flex flex-wrap gap-2 mb-4 items-center">
            <Input placeholder="Search bed or patient" className="w-64 rounded-md border-gray-300" />
            <Select>
              <SelectTrigger className="w-64 bg-[#f6f8fa] rounded-md border-gray-300"><SelectValue placeholder="Rahul Sharma (G01)" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="rahul">Rahul Sharma (G01)</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-[#5a67f6] hover:bg-[#4550e6] text-white rounded-md flex items-center gap-2 ml-2"><Plus className="w-4 h-4" />Record New Vitals</Button>
          </div>
          {/* Chart */}
          <div className="bg-[#f8fafc] rounded-xl p-6 mb-6">
            <div className="flex items-center mb-2">
              <span className="font-bold text-lg">Patient Vitals - Rahul Sharma</span>
              <span className="ml-2 px-2 py-0.5 rounded-full bg-violet-100 text-violet-800 text-xs font-semibold">Bed G01</span>
              <span className="ml-auto text-xs text-gray-400">Last updated: Today, 20:00</span>
            </div>
            <div className="h-64 flex items-center justify-center">
              <Line data={chartData} options={chartOptions} />
            </div>
            <div className="flex gap-4 mt-2 text-xs">
              <span className="text-blue-600 font-semibold">● Temperature</span>
              <span className="text-orange-500 font-semibold">● Pulse</span>
              <span className="text-cyan-600 font-semibold">● SpO2</span>
            </div>
          </div>
          {/* Vitals Table */}
          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="text-xs text-gray-500 bg-[#f6f8fa]">
                  <th className="p-3 text-left">Time</th>
                  <th className="p-3 text-left">Temperature</th>
                  <th className="p-3 text-left">Blood Pressure</th>
                  <th className="p-3 text-left">Pulse</th>
                  <th className="p-3 text-left">Respiration</th>
                  <th className="p-3 text-left">SpO2</th>
                  <th className="p-3 text-left">Recorded By</th>
                </tr>
              </thead>
              <tbody>
                {vitalsData.map((row, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-gray-50 text-sm">
                    <td className="p-3">{row.time}</td>
                    <td className="p-3">{row.temperature}</td>
                    <td className="p-3">{row.bp}</td>
                    <td className="p-3">{row.pulse}</td>
                    <td className="p-3">{row.respiration}</td>
                    <td className="p-3">{row.spo2}</td>
                    <td className="p-3">{row.recordedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {activeMainTab === 'Bed Allocation' && (
        <div className="bg-white rounded-xl p-6 shadow mt-6 text-center text-gray-400 text-lg">Bed Allocation view coming soon...</div>
      )}
      {/* Assign Bed Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl w-full rounded-2xl p-0 overflow-hidden">
          <div className="flex flex-col w-full bg-white">
            <div className="flex items-center justify-between px-8 pt-8 pb-2">
              <DialogTitle className="text-2xl font-semibold">Assign New Bed</DialogTitle>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700"><X className="w-6 h-6" /></button>
            </div>
            <div className="flex flex-row gap-8 px-8 pb-2 pt-2">
              {/* Patient Details */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500 font-medium">Patient Details</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">Notify Patient</span>
                    <Switch checked={notify} onCheckedChange={setNotify} />
                  </div>
                </div>
                <div className="mb-2">
                  <label className="text-xs text-gray-400">Patient ID</label>
                  <div className="relative mt-1">
                    <Input placeholder="Search" className="pl-10 bg-[#f6f8fa]" />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg></span>
                  </div>
                </div>
                <div className="flex gap-2 mb-2">
                  <Select>
                    <SelectTrigger className="bg-[#f6f8fa] w-24"><SelectValue placeholder="Mr/Mrs" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mr">Mr</SelectItem>
                      <SelectItem value="mrs">Mrs</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Patient Name" className="bg-[#f6f8fa] flex-1" />
                </div>
                <div className="flex gap-2 mb-2 items-center">
                  <div className="flex items-center bg-[#f6f8fa] rounded-md border border-gray-200 px-2">
                    <span className="mr-1"><img src="https://flagcdn.com/in.svg" alt="IN" className="w-5 h-5" /></span>
                    <Select>
                      <SelectTrigger className="bg-transparent border-none w-14"><SelectValue placeholder="+91" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+91">+91</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Input placeholder="8023456789" className="bg-[#f6f8fa] flex-1" />
                </div>
                <div className="flex gap-2 mb-2">
                  <Input placeholder="Age" className="bg-[#f6f8fa]" />
                  <Input placeholder="12/12/2020" type="date" className="bg-[#f6f8fa]" />
                </div>
                <div className="flex gap-2 mb-2">
                  <Select>
                    <SelectTrigger className="bg-[#f6f8fa]"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="bg-[#f6f8fa]"><SelectValue placeholder="Family" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 mb-2">
                  <Input placeholder="Name" className="bg-[#f6f8fa]" />
                  <Select>
                    <SelectTrigger className="bg-[#f6f8fa]"><SelectValue placeholder="Family" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="family">Family</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-2">
                  <Input placeholder="Address" className="bg-[#f6f8fa]" />
                </div>
              </div>
              {/* Ward Details */}
              <div className="flex-1">
                <div className="text-gray-500 font-medium mb-4">Ward Details</div>
                <div className="flex gap-2 mb-2">
                  <Select>
                    <SelectTrigger className="bg-[#f6f8fa]"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ward1">Ward 1</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="bg-[#f6f8fa]"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="room1">Room 1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 mb-2 items-center">
                  <Select>
                    <SelectTrigger className="bg-[#f6f8fa] flex-1"><SelectValue placeholder="Enter or Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bed1">Bed 1</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center justify-center w-16 h-12 bg-[#f6f8fa] rounded-md border border-gray-200">
                    <BedDouble className="w-8 h-8 text-gray-700" />
                  </div>
                </div>
                <div className="flex gap-2 mb-2">
                  <Select>
                    <SelectTrigger className="bg-[#f6f8fa]"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="treatedward1">Ward 1</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-1 bg-[#f6f8fa] rounded-md border border-gray-200 px-2">
                    <Input placeholder="0" className="bg-transparent border-none w-10 p-0 text-center" />
                    <div className="flex flex-col gap-0.5">
                      <button className="text-gray-400 hover:text-gray-700 p-0 leading-none"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"></polyline></svg></button>
                      <button className="text-gray-400 hover:text-gray-700 p-0 leading-none"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mb-2">
                  <Select>
                    <SelectTrigger className="bg-[#f6f8fa]"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="doctor1">Dr. Rajesh</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Cardiology" className="bg-[#f6f8fa]" disabled />
                </div>
                <div className="flex gap-2 mb-2">
                  <Select>
                    <SelectTrigger className="bg-[#f6f8fa] flex-1"><SelectValue placeholder="Enter or Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="doctor2">Dr. Suresh</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Add Note" className="bg-[#f6f8fa] flex-1" />
                </div>
                <div className="mb-2">
                  <Input placeholder="Add Note" className="bg-[#f6f8fa]" />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-gray-400 text-sm">Add Discount</span>
                  <Switch checked={discount} onCheckedChange={setDiscount} />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 px-8 py-6 bg-white border-t border-gray-100">
              <Button variant="outline" className="rounded-md px-8 py-2 text-base border-gray-300" onClick={() => setOpen(false)}>Cancel</Button>
              <Button className="bg-[#5a67f6] hover:bg-[#4550e6] text-white rounded-md px-8 py-2 text-base">Assign Bed</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
