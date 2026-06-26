'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Cargar usuario del localStorage al montar
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error('Error parsing stored user:', e)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simular verificación de credenciales
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const foundUser = users.find((u: any) => u.email === email && u.password === password)

    if (!foundUser) {
      throw new Error('Email o contraseña incorrectos')
    }

    const userData = { id: foundUser.id, email: foundUser.email, name: foundUser.name }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const signup = async (email: string, password: string, name: string) => {
    // Verificar si el usuario ya existe
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.some((u: any) => u.email === email)) {
      throw new Error('El email ya está registrado')
    }

    // Crear nuevo usuario
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    // Auto-login después del signup
    const userData = { id: newUser.id, email: newUser.email, name: newUser.name }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider')
  }
  return context
}
