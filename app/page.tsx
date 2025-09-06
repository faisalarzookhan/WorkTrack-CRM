"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import SplashScreen from "@/components/splash-screen"

export default function Home() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    // After splash screen, redirect to login or main screen
    const timer = setTimeout(() => {
      if (!loading) {
        if (user) {
          router.push("/dashboard")
        } else {
          router.push("/login")
        }
      }
    }, 2000) // 2 seconds for splash screen

    return () => clearTimeout(timer)
  }, [user, loading, router])

  return <SplashScreen />
}

