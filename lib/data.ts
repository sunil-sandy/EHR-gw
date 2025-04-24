// Mock data for the hospital management system

// Patients
export const patients = [
  {
    id: "P001",
    name: "John Smith",
    age: 45,
    gender: "Male",
    phone: "555-123-4567",
    email: "john.smith@example.com",
    address: "123 Main St, Anytown, CA",
    bloodGroup: "O+",
    registrationDate: "2023-01-15",
    status: "Active",
    insuranceProvider: "Blue Cross",
    insuranceNumber: "BC123456789",
    emergencyContact: "Mary Smith",
    emergencyPhone: "555-987-6543",
    medicalHistory: ["Hypertension", "Type 2 Diabetes"],
    allergies: ["Penicillin"],
    doctor: "Dr. Sarah Wilson",
    lastVisit: "12 Apr 2023",
    diagnosis: "Hypertension",
  },
  {
    id: "P002",
    name: "Jane Doe",
    age: 32,
    gender: "Female",
    phone: "555-234-5678",
    email: "jane.doe@example.com",
    address: "456 Oak Ave, Somewhere, NY",
    bloodGroup: "A-",
    registrationDate: "2023-02-20",
    status: "Active",
    insuranceProvider: "Aetna",
    insuranceNumber: "AE987654321",
    emergencyContact: "John Doe",
    emergencyPhone: "555-876-5432",
    medicalHistory: ["Asthma"],
    allergies: ["Sulfa drugs", "Peanuts"],
    doctor: "Dr. Michael Brown",
    lastVisit: "05 May 2023",
    diagnosis: "Diabetes Type 2",
  },
  {
    id: "P003",
    name: "Robert Johnson",
    age: 68,
    gender: "Male",
    phone: "555-345-6789",
    email: "robert.johnson@example.com",
    address: "789 Pine Rd, Elsewhere, TX",
    bloodGroup: "B+",
    registrationDate: "2023-03-10",
    status: "Inactive",
    insuranceProvider: "Medicare",
    insuranceNumber: "MC456789123",
    emergencyContact: "Susan Johnson",
    emergencyPhone: "555-765-4321",
    medicalHistory: ["Coronary Artery Disease", "Arthritis", "Hyperlipidemia"],
    allergies: [],
    doctor: "Dr. Jennifer Lee",
    lastVisit: "22 Mar 2023",
    diagnosis: "Arthritis",
  },
  {
    id: "P004",
    name: "Emily Davis",
    age: 27,
    gender: "Female",
    phone: "555-456-7890",
    email: "maria.garcia@example.com",
    address: "101 Cedar Ln, Nowhere, FL",
    bloodGroup: "AB+",
    registrationDate: "2023-04-05",
    status: "Active",
    insuranceProvider: "Cigna",
    insuranceNumber: "CI789123456",
    emergencyContact: "Carlos Garcia",
    emergencyPhone: "555-654-3210",
    medicalHistory: [],
    allergies: ["Latex"],
    doctor: "Dr. David Clark",
    lastVisit: "18 Jun 2023",
    diagnosis: "Asthma",
  },
  {
    id: "P005",
    name: "Robert Wilson",
    age: 63,
    gender: "Male",
    phone: "555-567-8901",
    email: "william.chen@example.com",
    address: "202 Birch St, Somewhere, WA",
    bloodGroup: "A+",
    registrationDate: "2023-05-12",
    status: "Active",
    insuranceProvider: "United Healthcare",
    insuranceNumber: "UH321654987",
    emergencyContact: "Li Chen",
    emergencyPhone: "555-543-2109",
    medicalHistory: ["Gastroesophageal Reflux Disease", "Insomnia"],
    allergies: ["Aspirin"],
    doctor: "Dr. Lisa Rodriguez",
    lastVisit: "30 Jan 2023",
    diagnosis: "COPD",
  },
]

// Appointments
export const appointments = [
  {
    id: "A001",
    patient: "John Smith",
    doctor: "Dr. Sarah Wilson",
    department: "Cardiology",
    date: "12 Jul 2023",
    time: "09:00 AM",
    status: "Confirmed",
    notes: "Routine checkup",
  },
  {
    id: "A002",
    patient: "Emily Davis",
    doctor: "Dr. Michael Brown",
    department: "Neurology",
    date: "12 Jul 2023",
    time: "10:30 AM",
    status: "Completed",
    notes: "Follow-up appointment",
  },
  {
    id: "A003",
    patient: "Robert Wilson",
    doctor: "Dr. Jennifer Lee",
    department: "Orthopedics",
    date: "12 Jul 2023",
    time: "11:45 AM",
    status: "Cancelled",
    notes: "Cancelled due to illness",
  },
  {
    id: "A004",
    patient: "Sarah Johnson",
    doctor: "Dr. David Clark",
    department: "Dermatology",
    date: "12 Jul 2023",
    time: "02:15 PM",
    status: "Confirmed",
    notes: "Skin check",
  },
  {
    id: "A005",
    patient: "Michael Brown",
    doctor: "Dr. Lisa Rodriguez",
    department: "Ophthalmology",
    date: "12 Jul 2023",
    time: "03:30 PM",
    status: "Waiting",
    notes: "Eye exam",
  },
]

// Dashboard Stats
export const dashboardStats = {
  totalPatients: 2450,
  patientsGrowth: 12,
  todayAppointments: 32,
  appointmentsGrowth: 5,
  availableBeds: 18,
  occupancyRate: 85,
  pendingReports: 7,
  reportsChange: -2,
  monthlyPatients: [
    { month: "Jan", patients: 200 },
    { month: "Feb", patients: 220 },
    { month: "Mar", patients: 240 },
    { month: "Apr", patients: 230 },
    { month: "May", patients: 250 },
    { month: "Jun", patients: 260 },
    { month: "Jul", patients: 270 },
  ],
  monthlyRevenue: [
    { month: "Jan", revenue: 35000 },
    { month: "Feb", revenue: 38000 },
    { month: "Mar", revenue: 42000 },
    { month: "Apr", revenue: 40000 },
    { month: "May", revenue: 45000 },
    { month: "Jun", revenue: 48000 },
    { month: "Jul", revenue: 50000 },
  ],
  departmentStats: [
    { name: "Cardiology", patients: 550, revenue: 150000 },
    { name: "Neurology", patients: 420, revenue: 120000 },
    { name: "Orthopedics", patients: 380, revenue: 110000 },
  ],
  patientDemographics: {
    age: [
      { name: "18-30", value: 30 },
      { name: "31-45", value: 40 },
      { name: "46-60", value: 20 },
      { name: "60+", value: 10 },
    ],
    gender: [
      { name: "Male", value: 45 },
      { name: "Female", value: 55 },
    ],
  },
  recentActivities: [
    { activity: "John Smith scheduled an appointment", time: "30 minutes ago" },
    { activity: "Emily Davis requested a lab report", time: "1 hour ago" },
    { activity: "Robert Wilson paid his invoice", time: "2 hours ago" },
  ],
}

export const searchAppointments = async (query: string) => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return appointments.filter((appointment) => {
    return (
      appointment.patient.toLowerCase().includes(query.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(query.toLowerCase()) ||
      appointment.department.toLowerCase().includes(query.toLowerCase())
    )
  })
}

export const searchPatients = async (query: string) => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return patients.filter((patient) => {
    return (
      patient.name.toLowerCase().includes(query.toLowerCase()) ||
      patient.email?.toLowerCase().includes(query.toLowerCase()) ||
      patient.phone?.toLowerCase().includes(query.toLowerCase())
    )
  })
}

export const getPatientById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return patients.find((patient) => patient.id === id)
}

export const getPatientAppointments = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return appointments.filter((appointment) => appointment.patientId === id)
}

export const getPatientLabReports = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return [
    {
      id: "LR001",
      patient: "John Smith",
      doctor: "Dr. Sarah Wilson",
      test: "Complete Blood Count",
      date: "10 Jul 2023",
      status: "Completed",
      results: {
        WBC: "4.5 x10^9/L",
        RBC: "4.7 x10^12/L",
        Hemoglobin: "14 g/dL",
      },
    },
  ]
}

export const getPatientPrescriptions = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return [
    {
      id: "PRE001",
      patient: "John Smith",
      doctor: "Dr. Sarah Wilson",
      date: "10 Jul 2023",
      medications: [
        {
          name: "Amoxicillin",
          dosage: "500mg",
          frequency: "Twice daily",
          duration: "7 days",
        },
      ],
      status: "Dispensed",
    },
  ]
}
