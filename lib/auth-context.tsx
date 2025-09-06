"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type User = {
  id: string
  username: string
  name: string
  role: "admin" | "user"
  departments: string[]
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data - in a real app, this would come from an API
const MOCK_USERS = [
  {
    id: "1",
    username: "1234@xyz.com",
    password: "password123",
    name: "John Doe",
    role: "user",
    departments: ["HR"],
  },
  {
    id: "2",
    username: "2902@xyz.com",
    password: "password123",
    name: "Faisal",
    role: "user",
    departments: ["IT", "Administrator"],
  },
  {
    id: "3",
    username: "admin@xyz.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
    departments: ["All"],
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("worktrack_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    // In a real app, this would be an API call
    const foundUser = MOCK_USERS.find((u) => u.username === username && u.password === password)

    if (!foundUser) {
      throw new Error("Invalid credentials")
    }

    const userData: User = {
      id: foundUser.id,
      username: foundUser.username,
      name: foundUser.name,
      role: foundUser.role as "admin" | "user",
      departments: foundUser.departments,
    }

    // Save to localStorage
    localStorage.setItem("worktrack_user", JSON.stringify(userData))

    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("worktrack_user")
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

