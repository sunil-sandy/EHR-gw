import { redirect } from "next/navigation"

export default function Home() {
  // In a real app, you would check for authentication here
  // For now, we'll just redirect to the dashboard
  redirect("/dashboard")
  return null
}
