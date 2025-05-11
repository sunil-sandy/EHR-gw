"use client"

import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { User, HeartPulse, AlertTriangle, FileText, Stethoscope, Pill, FlaskConical, CreditCard, Calendar, FolderOpen, Plus, Activity, Home, MapPin, Mail, Phone, UserCheck, Filter, Search, ChevronDown } from "lucide-react"

// Mock patient data
const patient = {
  id: "GM2344627",
  name: "Vikram",
  gender: "M",
  age: 56,
  bloodGroup: "O +ve",
  dob: "12 Sept 1986",
  phone: "+2348065650633",
  email: "janet.adebayo@gmail.com",
  address: "No. 15 Adekunle Street, Yaba, Lagos State",
  doctor: "Dr. Rajesh",
  status: "Active",
  since: "12 Sept 2022 - 12:55 pm",
  image: "/sample-patient.jpg", // Use a sample image in public/
  vitals: { heartRate: 10, bloodPressure: 2, spo2: 8 },
  allergies: ["Atopic dermatitis", "Allergic asthma"],
  alerts: ["High BP Alert"],
  conditions: { current: "Fracture", existing: "Low BP" },
  files: [],
}

// Mock tab data
const medications = [
  { date: "12 Aug 2022 - 12:25 am", name: "Paracetamol", dosage: "500 mg - 3 times a day", duration: "7 days / Until further notice", doctor: "Dr. Rajesh", action: "View", status: "Active" },
  { date: "12 Aug 2022 - 12:25 am", name: "Paracetamol", dosage: "500 mg - 3 times a day", duration: "7 days / Until further notice", doctor: "Dr. Rajesh", action: "View", status: "Completed" },
  { date: "12 Aug 2022 - 12:25 am", name: "Paracetamol", dosage: "500 mg - 3 times a day", duration: "7 days / Until further notice", doctor: "Dr. Rajesh", action: "View", status: "Discontinued" },
]
const history = [
  { date: "12 Aug 2022 - 12:25 am", encounter: "Outpatient", diagnosis: "9348fjr73", doctor: "Dr. Rajesh", action: "View", status: "Resolved" },
  { date: "12 Aug 2022 - 12:25 am", encounter: "Emergency", diagnosis: "9348fjr73", doctor: "Dr. Rajesh", action: "View", status: "Ongoing" },
  { date: "12 Aug 2022 - 12:25 am", encounter: "Inpatient", diagnosis: "9348fjr73", doctor: "Dr. Rajesh", action: "View", status: "Pending Follow-up" },
]
const labResults = [
  { date: "12 Aug 2022 - 12:25 am", test: "Hyperlink", summary: "Normal", summaryColor: "green", doctor: "Dr. Rajesh", action: "View", status: "Reviewed" },
  { date: "12 Aug 2022 - 12:25 am", test: "Hyperlink", summary: "Normal", summaryColor: "green", doctor: "Dr. Rajesh", action: "View", status: "Pending Review" },
  { date: "12 Aug 2022 - 12:25 am", test: "Hyperlink", summary: "Abnormal", summaryColor: "red", doctor: "Dr. Rajesh", action: "View", status: "Pending Follow-up" },
]
const billing = [
  { date: "12 Aug 2022", service: "Paracetamol", amount: "500 mg - 3 times a day", paid: "7 days / Until further notice", balance: "Dr. Rajesh", method: "Cash", action: "View", status: "Paid" },
  { date: "12 Aug 2022", service: "Paracetamol", amount: "500 mg - 3 times a day", paid: "7 days / Until further notice", balance: "Dr. Rajesh", method: "Insurance", action: "View", status: "Partially Paid" },
  { date: "12 Aug 2022", service: "Paracetamol", amount: "500 mg - 3 times a day", paid: "7 days / Until further notice", balance: "Dr. Rajesh", method: "Credit Card", action: "View", status: "Overdue" },
]
const visits = [
  { date: "12 Aug 2022 - 12:25 am", type: "Outpatient", notes: "9348fjr73", doctor: "Dr. Rajesh", action: "View", status: "Resolved" },
  { date: "12 Aug 2022 - 12:25 am", type: "Emergency", notes: "9348fjr73", doctor: "Dr. Rajesh", action: "View", status: "Ongoing" },
  { date: "12 Aug 2022 - 12:25 am", type: "Inpatient", notes: "9348fjr73", doctor: "Dr. Rajesh", action: "View", status: "Pending Follow-up" },
]

const tabList = [
  { label: "Medical History", icon: <Stethoscope className="w-4 h-4 mr-1" /> },
  { label: "Medications", icon: <Pill className="w-4 h-4 mr-1" /> },
  { label: "Lab Results & Diagnostic Reports", icon: <FlaskConical className="w-4 h-4 mr-1" /> },
  { label: "Billing & Payment History", icon: <CreditCard className="w-4 h-4 mr-1" /> },
  { label: "Visit History", icon: <Calendar className="w-4 h-4 mr-1" /> },
]

export default function PatientProfilePage() {
  const { id } = useParams();
  const [tab, setTab] = useState(1) // Default to Medications tab

  // Helper for status badge color
  const statusColor = (status: string) => {
    if (["Active", "Reviewed", "Paid", "Resolved"].includes(status)) return "bg-green-100 text-green-700";
    if (["Completed", "Partially Paid", "Ongoing", "Pending Review"].includes(status)) return "bg-blue-100 text-blue-700";
    if (["Discontinued", "Overdue", "Pending Follow-up"].includes(status)) return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  }

  // Helper for lab result dot color
  const dotColor = (color: string) => color === "green" ? "bg-green-500" : color === "red" ? "bg-red-500" : "bg-gray-400"

  return (
    <div className="bg-[#f8fafc] min-h-screen p-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
        <Link href="/patients" className="hover:underline flex items-center"><Home className="w-4 h-4 mr-1" />Patient List</Link>
        <span>/</span>
        <span className="font-medium text-gray-900">View Patient</span>
      </div>

      {/* Gradient Header with Patient Info */}
      <div className="rounded-xl shadow mb-6 p-6 flex flex-col md:flex-row md:items-center md:justify-between" style={{ background: "linear-gradient(90deg, #e0e7ff 0%, #f8fafc 100%)" }}>
        <div className="flex flex-col gap-2">
          <span className="text-[#6b7280] font-semibold flex items-center"><UserCheck className="w-4 h-4 mr-1 text-[#7c3aed]" /> Patient ID {patient.id}</span>
          <span className="text-[#6b7280] font-semibold flex items-center"><User className="w-4 h-4 mr-1 text-[#6366f1]" /> Assigned Doc - {patient.doctor}</span>
          <span className="text-[#6b7280] font-semibold flex items-center"><Calendar className="w-4 h-4 mr-1 text-[#f472b6]" /> Patient Since {patient.since}</span>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="font-semibold">Edit Patient</Button>
          <Button variant="destructive" className="font-semibold">Emergency Contact</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Patient Info Card */}
        <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-[#e0e7ff] flex items-center justify-center mb-2">
            {/* Patient image placeholder */}
            <span className="text-gray-400">Patient</span>
          </div>
          <div className="font-bold text-lg text-[#2d2d2d] mb-1">Vikram</div>
          <div className="text-[#6366f1] text-xs mb-1">Gender/Age - M/56</div>
          <div className="text-gray-500 text-xs mb-1">Blood Group - O +ve</div>
          <div className="text-gray-500 text-xs mb-1">Date of Birth - 12 Sept 1986</div>
          <div className="text-gray-500 text-xs mb-1">+2348065650633</div>
          <div className="text-gray-500 text-xs mb-1">janet.adebayo@gmail.com</div>
          <div className="text-gray-500 text-xs text-center mb-2">No. 15 Adekunle Street, Yaba, Lagos State</div>
          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-semibold">Active</span>
        </div>
        {/* Vitals */}
        <div className="bg-white rounded-xl shadow p-5 flex flex-col">
          <div className="font-semibold text-[#2d2d2d] mb-2 flex items-center"><HeartPulse className="w-4 h-4 mr-1 text-pink-500" />Vitals</div>
          <div className="flex gap-6 justify-center">
            <div className="flex flex-col items-center"><span className="text-xs text-gray-400">Heart Rate</span><span className="font-bold text-lg text-pink-600">72</span></div>
            <div className="flex flex-col items-center"><span className="text-xs text-gray-400">Blood Pressure</span><span className="font-bold text-lg text-blue-600">120</span></div>
            <div className="flex flex-col items-center"><span className="text-xs text-gray-400">SpO2</span><span className="font-bold text-lg text-green-600">98</span></div>
          </div>
        </div>
        {/* Allergies & Alerts */}
        <div className="bg-white rounded-xl shadow p-5 flex flex-col">
          <div className="font-semibold text-[#2d2d2d] mb-2 flex items-center"><AlertTriangle className="w-4 h-4 mr-1 text-yellow-500" />Allergies & Alerts</div>
          <div className="mb-2 text-sm">Allergies: <span className="text-[#f59e42]">Atopic dermatitis, Allergic asthma</span></div>
          <div className="text-sm">Alerts: <span className="text-[#ef4444]">High BP Alert</span></div>
        </div>
        {/* Conditions & Files */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow p-5 flex-1">
            <div className="font-semibold text-[#2d2d2d] mb-2 flex items-center"><FileText className="w-4 h-4 mr-1 text-blue-500" />Conditions</div>
            <div className="text-sm">Current Condition <br /><span className="text-[#6366f1] font-semibold cursor-pointer hover:underline">Fracture</span></div>
            <div className="mt-2 text-sm">Existing Conditions <br /><span className="text-[#7c3aed] font-semibold cursor-pointer hover:underline">Low BP</span></div>
          </div>
          <div className="bg-white rounded-xl shadow p-5 flex-1">
            <div className="font-semibold text-[#2d2d2d] mb-2 flex items-center"><FolderOpen className="w-4 h-4 mr-1 text-gray-500" />Files & Documents</div>
            <Button variant="outline" size="sm" className="font-semibold"><Plus className="w-4 h-4 mr-1" /> Add New</Button>
          </div>
        </div>
      </div>

      {/* Tabs and Start Encounter Button Row */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {tabList.map((t, i) => (
          <Button
            key={i}
            variant={tab === i ? "default" : "outline"}
            size="sm"
            onClick={() => setTab(i)}
            className={`flex items-center font-semibold ${tab === i ? "bg-[#6366f1] text-white" : "bg-white text-[#6366f1] border border-[#e0e7ff]"}`}
          >
            {t.icon}{t.label}
          </Button>
        ))}
        <div className="ml-auto">
          <Button className="bg-[#6366f1] hover:bg-[#4338ca] text-white font-semibold px-6" variant="secondary">
            <Stethoscope className="w-4 h-4 mr-1" /> Start Encounter
          </Button>
        </div>
      </div>

      {/* Table Actions */}
      <div className="flex flex-wrap items-center gap-2 bg-white rounded-lg px-4 py-2 mb-2 shadow">
        <div className="flex items-center gap-2 flex-1">
          <Search className="w-4 h-4 text-gray-400" />
          <input className="border-none outline-none bg-transparent flex-1" placeholder="Search" />
        </div>
        <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" />Filter</Button>
        <Button variant="outline" size="sm"><FileText className="mr-2 h-4 w-4" />Share</Button>
        <Button variant="outline" size="sm">Bulk Action <ChevronDown className="w-4 h-4 ml-1" /></Button>
      </div>

      {/* Tab Content */}
      {tab === 0 && (
        <Card className="shadow rounded-xl">
          <CardContent className="p-4">
            <div className="font-semibold mb-2">Medical History</div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    <th><input type="checkbox" /></th>
                    <th>Date</th>
                    <th>Encounter Type</th>
                    <th>Diagnosis/Procedure</th>
                    <th>Doctor/Provider</th>
                    <th>Action</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h, i) => (
                    <tr key={i} className="border-b">
                      <td><input type="checkbox" /></td>
                      <td>{h.date}</td>
                      <td>{h.encounter}</td>
                      <td>{h.diagnosis}</td>
                      <td>{h.doctor}</td>
                      <td><Button variant="outline" size="sm">{h.action}</Button></td>
                      <td><span className={`px-2 py-1 rounded-full text-xs ${statusColor(h.status)}`}>{h.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
      {tab === 1 && (
        <Card className="shadow rounded-xl">
          <CardContent className="p-4">
            <div className="font-semibold mb-2">Medications</div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    <th><input type="checkbox" /></th>
                    <th>Date Prescribed</th>
                    <th>Medication Name</th>
                    <th>Dosage</th>
                    <th>Duration</th>
                    <th>Prescribing Doctor</th>
                    <th>Action</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {medications.map((m, i) => (
                    <tr key={i} className="border-b">
                      <td><input type="checkbox" /></td>
                      <td>{m.date}</td>
                      <td>{m.name}</td>
                      <td>{m.dosage}</td>
                      <td>{m.duration}</td>
                      <td>{m.doctor}</td>
                      <td><Button variant="outline" size="sm">{m.action}</Button></td>
                      <td><span className={`px-2 py-1 rounded-full text-xs ${statusColor(m.status)}`}>{m.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
      {tab === 2 && (
        <Card className="shadow rounded-xl">
          <CardContent className="p-4">
            <div className="font-semibold mb-2">Lab Results & Diagnostic Reports</div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    <th><input type="checkbox" /></th>
                    <th>Date</th>
                    <th>Test Name</th>
                    <th>Result Summary</th>
                    <th>Doctor/Provider</th>
                    <th>Action</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {labResults.map((l, i) => (
                    <tr key={i} className="border-b">
                      <td><input type="checkbox" /></td>
                      <td>{l.date}</td>
                      <td>{l.test}</td>
                      <td>
                        {l.summary} <span className={`inline-block w-2 h-2 rounded-full ml-1 ${dotColor(l.summaryColor)}`}></span>
                      </td>
                      <td>{l.doctor}</td>
                      <td><Button variant="outline" size="sm">{l.action}</Button></td>
                      <td><span className={`px-2 py-1 rounded-full text-xs ${statusColor(l.status)}`}>{l.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
      {tab === 3 && (
        <Card className="shadow rounded-xl">
          <CardContent className="p-4">
            <div className="font-semibold mb-2">Billing & Payment History</div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    <th><input type="checkbox" /></th>
                    <th>Invoice Date</th>
                    <th>Service/Procedure</th>
                    <th>Total Amount</th>
                    <th>Paid Amount</th>
                    <th>Outstanding Balance</th>
                    <th>Payment Method</th>
                    <th>Action</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {billing.map((b, i) => (
                    <tr key={i} className="border-b">
                      <td><input type="checkbox" /></td>
                      <td>{b.date}</td>
                      <td>{b.service}</td>
                      <td>{b.amount}</td>
                      <td>{b.paid}</td>
                      <td>{b.balance}</td>
                      <td>{b.method}</td>
                      <td><Button variant="outline" size="sm">{b.action}</Button></td>
                      <td><span className={`px-2 py-1 rounded-full text-xs ${statusColor(b.status)}`}>{b.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
      {tab === 4 && (
        <Card className="shadow rounded-xl">
          <CardContent className="p-4">
            <div className="font-semibold mb-2">Visit History</div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    <th><input type="checkbox" /></th>
                    <th>Date</th>
                    <th>Visit Type</th>
                    <th>Purpose/Notes</th>
                    <th>Doctor/Provider</th>
                    <th>Action</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visits.map((v, i) => (
                    <tr key={i} className="border-b">
                      <td><input type="checkbox" /></td>
                      <td>{v.date}</td>
                      <td>{v.type}</td>
                      <td>{v.notes}</td>
                      <td>{v.doctor}</td>
                      <td><Button variant="outline" size="sm">{v.action}</Button></td>
                      <td><span className={`px-2 py-1 rounded-full text-xs ${statusColor(v.status)}`}>{v.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
