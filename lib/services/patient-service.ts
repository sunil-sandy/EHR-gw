import apiClient from "../api-service"
import type { Patient } from "../types"

const PatientService = {
  getAllPatients: async (params?: any) => {
    const response = await apiClient.get("/patients/", { params })
    return response.data
  },

  getPatientById: async (id: string) => {
    const response = await apiClient.get(`/patients/${id}/`)
    return response.data
  },

  createPatient: async (patient: Partial<Patient>) => {
    const response = await apiClient.post("/patients/", patient)
    return response.data
  },

  updatePatient: async (id: string, patient: Partial<Patient>) => {
    const response = await apiClient.put(`/patients/${id}/`, patient)
    return response.data
  },

  deletePatient: async (id: string) => {
    const response = await apiClient.delete(`/patients/${id}/`)
    return response.data
  },

  getPatientAppointments: async (id: string) => {
    const response = await apiClient.get(`/patients/${id}/appointments/`)
    return response.data
  },

  getPatientPrescriptions: async (id: string) => {
    const response = await apiClient.get(`/patients/${id}/prescriptions/`)
    return response.data
  },

  getPatientLabReports: async (id: string) => {
    const response = await apiClient.get(`/patients/${id}/lab-reports/`)
    return response.data
  },
}

export default PatientService
