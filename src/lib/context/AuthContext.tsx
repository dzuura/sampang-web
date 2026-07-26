import React, { createContext, useState, useEffect, useCallback } from 'react'
import apiClient from '../api/client'
import type { User, AuthResponse } from '@/types/index'

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshToken: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /**
   * Restore session on app mount by checking for stored token
   */
  useEffect(() => {
    const restoreSession = async () => {
      try {
        setIsLoading(true)
        const storedToken = localStorage.getItem('authToken')
        const storedUser = localStorage.getItem('authUser')

        if (storedToken && storedUser) {
          setToken(storedToken)
          setUser(JSON.parse(storedUser))
        }
      } catch (err) {
        // Failed to restore session
        localStorage.removeItem('authToken')
        localStorage.removeItem('authUser')
        setError('Failed to restore session')
      } finally {
        setIsLoading(false)
      }
    }

    restoreSession()
  }, [])

  /**
   * Login user with email and password
   * Stores token and user info in localStorage
   */
  const login = useCallback(async (email: string, password: string) => {
    try {
      setError(null)
      setIsLoading(true)

      const response = await apiClient.post<AuthResponse>('/auth/login', {
        email,
        password,
      })

      const { access_token, user: userData } = response.data

      // Store in localStorage
      localStorage.setItem('authToken', access_token)
      localStorage.setItem('authUser', JSON.stringify(userData))

      // Update state
      setToken(access_token)
      setUser(userData)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Logout user
   * Clears stored credentials and state
   */
  const logout = useCallback(async () => {
    try {
      setError(null)
      setIsLoading(true)

      // Call logout endpoint if token exists
      if (token) {
        try {
          await apiClient.post('/auth/logout')
        } catch {
          // Logout endpoint may fail, but we still clear local state
        }
      }

      // Clear storage and state
      localStorage.removeItem('authToken')
      localStorage.removeItem('authUser')
      setToken(null)
      setUser(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Logout failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [token])

  /**
   * Refresh JWT token
   * Called automatically when token expires
   */
  const refreshToken = useCallback(async () => {
    try {
      setError(null)
      const response = await apiClient.post<AuthResponse>('/auth/refresh')
      const { access_token } = response.data

      localStorage.setItem('authToken', access_token)
      setToken(access_token)
    } catch (err) {
      // Refresh failed - logout user
      await logout()
      const message = err instanceof Error ? err.message : 'Token refresh failed'
      setError(message)
      throw err
    }
  }, [logout])

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user && !!token,
    isLoading,
    error,
    token,
    login,
    logout,
    refreshToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
