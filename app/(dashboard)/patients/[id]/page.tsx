"use client"

import { AreaChart } from "@/components/charts/area-chart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getPatientById, getPatientAppointments, getPatientLabReports, getPatientPrescriptions } from "@/lib/data"
import { ArrowLeft, Calendar, Download, FileText, Pill, Printer, User, Plus } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function PatientDetailsPage({ params }: { params: { id: string } }) {
  const [patient, setPatient] = useState<any>(null)
  const [appointments, setAppointments] = useState<any[]>([])
  const [prescriptions, setPrescriptions] = useState<any[]>([])
  const [labReports, setLabReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const patientData = await getPatientById(params.id)
        const appointmentsData = await getPatientAppointments(params.id)
        const prescriptionsData = await getPatientPrescriptions(params.id)
        const labReportsData = await getPatientLabReports(params.id)

        setPatient(patientData)
        setAppointments(appointmentsData)
        setPrescriptions(prescriptionsData)
        setLabReports(labReportsData)
      } catch (error) {
        console.error("Error fetching patient data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#5a67f6]"></div>
          <p>Loading patient data...</p>
        </div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold">Patient Not Found</h2>
          <p className="mt-2 text-gray-500">The patient you're looking for doesn't exist or has been removed.</p>
          <Link href="/patients">
            <Button className="mt-4 bg-[#5a67f6] hover:bg-[#4550e6]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Patients
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Generate mock vitals data for charts
  const vitalSigns = [
    { date: "Jan", bloodPressure: 120, heartRate: 72, temperature: 98.6 },
    { date: "Feb", bloodPressure: 118, heartRate: 70, temperature: 98.4 },
    { date: "Mar", bloodPressure: 122, heartRate: 74, temperature: 98.7 },
    { date: "Apr", bloodPressure: 125, heartRate: 76, temperature: 99.1 },
    { date: "May", bloodPressure: 121, heartRate: 73, temperature: 98.5 },
    { date: "Jun", bloodPressure: 119, heartRate: 71, temperature: 98.6 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/patients">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
          <span
            className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              patient.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {patient.status}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button className="bg-[#5a67f6] hover:bg-[#4550e6]">Edit Patient</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#5a67f6]/10 text-[#5a67f6]">
                <User className="h-12 w-12" />
              </div>
              <h2 className="text-xl font-bold">{patient.name}</h2>
              <p className="text-sm text-gray-500">{patient.id}</p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Age</span>
                <span>{patient.age} years</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Gender</span>
                <span>{patient.gender}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Blood Group</span>
                <span>{patient.bloodGroup}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Phone</span>
                <span>{patient.phone}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Email</span>
                <span className="truncate max-w-[180px]">{patient.email}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Address</span>
                <span className="truncate max-w-[180px] text-right">{patient.address}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Doctor</span>
                <span>{patient.doctor}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Last Visit</span>
                <span>{patient.lastVisit}</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="mb-2 font-medium">Allergies</h3>
              <div className="flex flex-wrap gap-2">
                {patient.allergies && patient.allergies.length > 0 ? (
                  patient.allergies.map((allergy: string, index: number) => (
                    <span
                      key={index}
                      className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800"
                    >
                      {allergy}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">No known allergies</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <Tabs defaultValue="overview">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Medical Records</CardTitle>
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="appointments">Appointments</TabsTrigger>
                  <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                  <TabsTrigger value="lab-reports">Lab Reports</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="overview">
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Diagnosis</h3>
                    <p>{patient.diagnosis || "No current diagnosis"}</p>
                  </div>

                  <div>
                    <h3 className="mb-4 text-lg font-medium">Vital Signs</h3>
                    <AreaChart
                      data={vitalSigns}
                      xAxisDataKey="date"
                      areas={[
                        { dataKey: "bloodPressure", name: "Blood Pressure", color: "#5a67f6" },
                        { dataKey: "heartRate", name: "Heart Rate", color: "#ef4444" },
                        { dataKey: "temperature", name: "Temperature", color: "#f59e0b" },
                      ]}
                      height={250}
                    />
                  </div>

                  <div>
                    <h3 className="mb-4 text-lg font-medium">Medical History</h3>
                    <ul className="list-inside list-disc space-y-1">
                      {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
                        patient.medicalHistory.map((item: string, index: number) => <li key={index}>{item}</li>)
                      ) : (
                        <li className="text-gray-500">No medical history recorded</li>
                      )}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="appointments">
                <div className="space-y-4">
                  {appointments && appointments.length > 0 ? (
                    appointments.map((appointment, index) => (
                      <div key={index} className="flex items-center justify-between rounded-md border p-4">
                        <div className="flex items-start gap-3">
                          <div className="rounded-md bg-blue-100 p-2 text-blue-700">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{appointment.doctor}</p>
                            <p className="text-sm text-gray-500">
                              {appointment.date} • {appointment.time} • {appointment.department}
                            </p>
                            <p className="mt-1 text-sm">{appointment.notes}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              appointment.status === "Confirmed"
                                ? "bg-green-100 text-green-800"
                                : appointment.status === "Completed"
                                  ? "bg-blue-100 text-blue-800"
                                  : appointment.status === "Waiting"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                          >
                            {appointment.status}
                          </span>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Calendar className="mb-2 h-10 w-10 text-gray-400" />
                      <h3 className="text-lg font-medium">No Appointments</h3>
                      <p className="text-sm text-gray-500">This patient has no scheduled appointments.</p>
                      <Button className="mt-4 bg-[#5a67f6] hover:bg-[#4550e6]">
                        <Plus className="mr-2 h-4 w-4" />
                        Schedule Appointment
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="prescriptions">
                <div className="space-y-4">
                  {prescriptions && prescriptions.length > 0 ? (
                    prescriptions.map((prescription, index) => (
                      <div key={index} className="rounded-md border">
                        <div className="flex items-center justify-between border-b p-4">
                          <div>
                            <p className="font-medium">{prescription.id}</p>
                            <p className="text-sm text-gray-500">
                              {prescription.doctor} • {prescription.date}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                prescription.status === "Dispensed"
                                  ? "bg-green-100 text-green-800"
                                  : prescription.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {prescription.status}
                            </span>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Printer className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="mb-2 font-medium">Medications</h4>
                          <div className="space-y-2">
                            {prescription.medications &&
                              prescription.medications.map((med: any, i: number) => (
                                <div key={i} className="flex items-start gap-3">
                                  <div className="rounded-md bg-purple-100 p-2 text-purple-700">
                                    <Pill className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{med.name}</p>
                                    <p className="text-sm text-gray-500">
                                      {med.dosage} • {med.frequency} • {med.duration}
                                    </p>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Pill className="mb-2 h-10 w-10 text-gray-400" />
                      <h3 className="text-lg font-medium">No Prescriptions</h3>
                      <p className="text-sm text-gray-500">This patient has no prescriptions.</p>
                      <Button className="mt-4 bg-[#5a67f6] hover:bg-[#4550e6]">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Prescription
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="lab-reports">
                <div className="space-y-4">
                  {labReports && labReports.length > 0 ? (
                    labReports.map((report, index) => (
                      <div key={index} className="rounded-md border">
                        <div className="flex items-center justify-between border-b p-4">
                          <div>
                            <p className="font-medium">{report.test}</p>
                            <p className="text-sm text-gray-500">
                              {report.doctor} • {report.date}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                report.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : report.status === "Processing"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {report.status}
                            </span>
                            {report.status === "Completed" && (
                              <>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                        {report.status === "Completed" && report.results && (
                          <div className="p-4">
                            <h4 className="mb-2 font-medium">Results</h4>
                            <div className="space-y-2">
                              {Object.entries(report.results).map(([key, value]) => (
                                <div key={key} className="flex justify-between border-b pb-1">
                                  <span className="font-medium">{key.toUpperCase()}</span>
                                  <span>{value as string}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <FileText className="mb-2 h-10 w-10 text-gray-400" />
                      <h3 className="text-lg font-medium">No Lab Reports</h3>
                      <p className="text-sm text-gray-500">This patient has no lab reports.</p>
                      <Button className="mt-4 bg-[#5a67f6] hover:bg-[#4550e6]">
                        <Plus className="mr-2 h-4 w-4" />
                        Request Lab Test
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
