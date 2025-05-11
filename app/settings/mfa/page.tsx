"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Shield } from "lucide-react"
import Image from "next/image"
import AuthService from "@/lib/services/auth-service"

export default function MfaSetupPage() {
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [secret, setSecret] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMfaEnabled, setIsMfaEnabled] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    // Check if MFA is already enabled
    const checkMfaStatus = async () => {
      try {
        const user = await AuthService.getCurrentUser()
        setIsMfaEnabled(user.isMfaEnabled)

        if (!user.isMfaEnabled) {
          // If not enabled, get setup info
          const setupData = await AuthService.setupMfa()
          setQrCodeUrl(setupData.qrCodeUrl)
          setSecret(setupData.secret)
        }
      } catch (error) {
        setErrorMessage("Failed to load MFA setup. Please try again.")
        setStatus("error")
      } finally {
        setIsLoading(false)
      }
    }

    checkMfaStatus()
  }, [])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!verificationCode) return

    setIsSubmitting(true)
    setStatus("idle")
    setErrorMessage("")

    try {
      await AuthService.verifyMfa(verificationCode)
      setStatus("success")
      setIsMfaEnabled(true)
    } catch (error: any) {
      setStatus("error")
      setErrorMessage(error.response?.data?.detail || "Invalid verification code. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDisable = async () => {
    setIsSubmitting(true)
    setStatus("idle")
    setErrorMessage("")

    try {
      await AuthService.disableMfa(verificationCode)
      setStatus("success")
      setIsMfaEnabled(false)
      // Reset form
      setVerificationCode("")

      // Get new setup info
      const setupData = await AuthService.setupMfa()
      setQrCodeUrl(setupData.qrCodeUrl)
      setSecret(setupData.secret)
    } catch (error: any) {
      setStatus("error")
      setErrorMessage(error.response?.data?.detail || "Failed to disable MFA. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#5a67f6]"></div>
          <p>Loading MFA settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Two-Factor Authentication</h1>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-[#5a67f6]" />
              {isMfaEnabled ? "Manage Two-Factor Authentication" : "Set Up Two-Factor Authentication"}
            </div>
          </CardTitle>
          <CardDescription>
            {isMfaEnabled
              ? "Two-factor authentication is currently enabled for your account."
              : "Protect your account with two-factor authentication"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {status === "success" && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                {isMfaEnabled
                  ? "Two-factor authentication has been enabled successfully!"
                  : "Two-factor authentication has been disabled."}
              </AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <Alert className="bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">{errorMessage}</AlertDescription>
            </Alert>
          )}

          {!isMfaEnabled ? (
            <>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Step 1: Scan QR Code</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Scan this QR code with your authenticator app (like Google Authenticator, Authy, or Microsoft
                    Authenticator).
                  </p>
                  <div className="flex justify-center mb-4">
                    {qrCodeUrl && (
                      <div className="border p-4 rounded-md bg-white">
                        <Image src={qrCodeUrl || "/placeholder.svg"} alt="QR Code" width={200} height={200} />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Step 2: Manual Setup</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    If you can't scan the QR code, enter this code manually in your app:
                  </p>
                  <div className="bg-gray-100 p-3 rounded-md font-mono text-center mb-4">{secret}</div>
                </div>

                <form onSubmit={handleVerify}>
                  <h3 className="text-lg font-medium mb-2">Step 3: Verify Setup</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Enter the 6-digit verification code from your authenticator app:
                  </p>
                  <div className="flex space-x-4">
                    <Input
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="max-w-[200px]"
                      maxLength={6}
                      pattern="[0-9]{6}"
                      required
                    />
                    <Button type="submit" className="bg-[#5a67f6] hover:bg-[#4550e6]" disabled={isSubmitting}>
                      {isSubmitting ? "Verifying..." : "Verify & Enable"}
                    </Button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                <h3 className="text-lg font-medium text-yellow-800 mb-2">Important</h3>
                <p className="text-sm text-yellow-700">
                  If you disable two-factor authentication, your account will be less secure. You'll need to set it up
                  again if you want to re-enable it.
                </p>
              </div>

              <div className="flex space-x-4">
                <Input
                  type="text"
                  placeholder="Enter 6-digit code to confirm"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="max-w-[250px]"
                  maxLength={6}
                  pattern="[0-9]{6}"
                />
                <Button onClick={handleDisable} variant="destructive" disabled={isSubmitting || !verificationCode}>
                  {isSubmitting ? "Disabling..." : "Disable 2FA"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
