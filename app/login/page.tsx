"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react"
import AuthService from "@/lib/services/auth-service"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [mfaCode, setMfaCode] = useState("")
  const [showMfaInput, setShowMfaInput] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) return

    setIsSubmitting(true)
    setError("")

    try {
      const response = await AuthService.login({
        username,
        password,
        ...(showMfaInput && mfaCode ? { mfaCode } : {}),
      })

      // Check if MFA is required
      if (response.mfaRequired && !showMfaInput) {
        setShowMfaInput(true)
        setIsSubmitting(false)
        return
      }

      // Login successful, redirect to dashboard
      router.push("/")
    } catch (error: any) {
      setError(error.response?.data?.detail || "Invalid credentials. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f6fa]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 relative mb-4">
            <Image src="/logo.png" alt="Hospital Logo" fill className="object-contain" />
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-gray-900">Welcome back!</h2>
          <p className="text-sm text-gray-500">Login to your account</p>
        </div>

        {error && (
          <Alert className="bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="username"
                name="username"
                type="text"
                required
                className="pl-10 bg-[#f5f6fa] border-0"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={showMfaInput}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="pl-10 pr-10 bg-[#f5f6fa] border-0"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={showMfaInput}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  disabled={showMfaInput}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {showMfaInput && (
              <div className="relative">
                <Input
                  id="mfaCode"
                  name="mfaCode"
                  type="text"
                  required
                  className="bg-[#f5f6fa] border-0"
                  placeholder="Enter 6-digit code from your authenticator app"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  maxLength={6}
                  pattern="[0-9]{6}"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link href="/forgot-password" className="text-[#5a67f6] hover:text-[#4550e6]">
                Recover Password
              </Link>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#5a67f6] hover:text-[#4550e6]">
              Sign Up
            </Link>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-[#5a67f6] hover:bg-[#4550e6] text-white py-2 px-4 rounded-md"
              disabled={isSubmitting || (showMfaInput && !mfaCode)}
            >
              {isSubmitting ? "Logging in..." : showMfaInput ? "Verify" : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
