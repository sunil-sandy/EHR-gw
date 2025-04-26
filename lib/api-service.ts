import axios from "axios"

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for handling cookies/CSRF
})

// Request interceptor to add CSRF token for Django
apiClient.interceptors.request.use((config) => {
  // Get CSRF token from cookie if it exists
  const csrfToken = getCookie("csrftoken")
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken
  }
  return config
})

// Helper to get cookies
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null
  return null
}

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      // Redirect to login page
      window.location.href = "/login"
    }

    // Handle CSRF errors
    if (error.response?.status === 403 && error.response?.data?.detail?.includes("CSRF")) {
      // Refresh CSRF token and retry
      return fetch("/api/csrf/").then(() => apiClient(error.config))
    }

    return Promise.reject(error)
  },
)

export default apiClient
