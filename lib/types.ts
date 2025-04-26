export interface Patient {
  id: string
  name: string
  age: number
  gender: string
  phone: string
  email: string
  address: string
  bloodGroup: string
  registrationDate: string
  status: string
  insuranceProvider: string
  insuranceNumber: string
  emergencyContact: string
  emergencyPhone: string
  medicalHistory: string[]
  allergies: string[]
  doctor: string
  lastVisit: string
  diagnosis: string
}

export interface Appointment {
  id: string
  patient: string
  patientId: string
  doctor: string
  doctorId: string
  department: string
  date: string
  time: string
  status: string
  notes: string
}

export interface User {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  role: string
  department?: string
  isMfaEnabled: boolean
  lastLogin: string
}

export interface Prescription {
  id: string
  patient: string
  patientId: string
  doctor: string
  date: string
  medications: Medication[]
  status: string
}

export interface Medication {
  name: string
  dosage: string
  frequency: string
  duration: string
}

export interface LabReport {
  id: string
  patient: string
  doctor: string
  test: string
  date: string
  status: string
  results?: Record<string, string>
}
