import apiClient from "../api-service"
import type { Appointment } from "../types"

const AppointmentService = {
  getAllAppointments: async (params?: any) => {
    const response = await apiClient.get("/appointments/", { params })
    return response.data
  },

  getAppointmentById: async (id: string) => {
    const response = await apiClient.get(`/appointments/${id}/`)
    return response.data
  },

  createAppointment: async (appointment: Partial<Appointment>) => {
    const response = await apiClient.post("/appointments/", appointment)
    return response.data
  },

  updateAppointment: async (id: string, appointment: Partial<Appointment>) => {
    const response = await apiClient.put(`/appointments/${id}/`, appointment)
    return response.data
  },

  deleteAppointment: async (id: string) => {
    const response = await apiClient.delete(`/appointments/${id}/`)
    return response.data
  },

  getAvailableSlots: async (doctorId: string, date: string) => {
    const response = await apiClient.get(`/appointments/available-slots/`, {
      params: { doctor_id: doctorId, date },
    })
    return response.data
  },
}

export default AppointmentService
