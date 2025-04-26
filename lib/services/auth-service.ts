import apiClient from "../api-service"

export interface LoginCredentials {
  username: string
  password: string
  mfaCode?: string
}

export interface ResetPasswordRequest {
  email: string
}

export interface ConfirmResetRequest {
  token: string
  password: string
  confirmPassword: string
}

export interface MfaSetupResponse {
  qrCodeUrl: string
  secret: string
}

const AuthService = {
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post("/auth/login/", credentials)
    return response.data
  },

  logout: async () => {
    const response = await apiClient.post("/auth/logout/")
    return response.data
  },

  getCurrentUser: async () => {
    const response = await apiClient.get("/auth/user/")
    return response.data
  },

  requestPasswordReset: async (data: ResetPasswordRequest) => {
    const response = await apiClient.post("/auth/password-reset/", data)
    return response.data
  },

  confirmPasswordReset: async (data: ConfirmResetRequest) => {
    const response = await apiClient.post("/auth/password-reset/confirm/", data)
    return response.data
  },

  setupMfa: async () => {
    const response = await apiClient.post("/auth/mfa/setup/")
    return response.data as MfaSetupResponse
  },

  verifyMfa: async (code: string) => {
    const response = await apiClient.post("/auth/mfa/verify/", { code })
    return response.data
  },

  disableMfa: async (code: string) => {
    const response = await apiClient.post("/auth/mfa/disable/", { code })
    return response.data
  },
}

export default AuthService
