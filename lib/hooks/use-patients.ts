import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import PatientService from "@/lib/services/patient-service"
import type { Patient } from "@/lib/types"

export function usePatients(params?: any) {
  return useQuery({
    queryKey: ["patients", params],
    queryFn: () => PatientService.getAllPatients(params),
  })
}

export function usePatient(id: string) {
  return useQuery({
    queryKey: ["patient", id],
    queryFn: () => PatientService.getPatientById(id),
    enabled: !!id,
  })
}

export function usePatientAppointments(id: string) {
  return useQuery({
    queryKey: ["patient", id, "appointments"],
    queryFn: () => PatientService.getPatientAppointments(id),
    enabled: !!id,
  })
}

export function usePatientPrescriptions(id: string) {
  return useQuery({
    queryKey: ["patient", id, "prescriptions"],
    queryFn: () => PatientService.getPatientPrescriptions(id),
    enabled: !!id,
  })
}

export function usePatientLabReports(id: string) {
  return useQuery({
    queryKey: ["patient", id, "lab-reports"],
    queryFn: () => PatientService.getPatientLabReports(id),
    enabled: !!id,
  })
}

export function useCreatePatient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (patient: Partial<Patient>) => PatientService.createPatient(patient),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] })
    },
  })
}

export function useUpdatePatient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, patient }: { id: string; patient: Partial<Patient> }) =>
      PatientService.updatePatient(id, patient),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["patients"] })
      queryClient.invalidateQueries({ queryKey: ["patient", variables.id] })
    },
  })
}

export function useDeletePatient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => PatientService.deletePatient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] })
    },
  })
}
