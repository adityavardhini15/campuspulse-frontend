import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getToken, setToken, removeToken, isTokenValid, getUsernameFromToken } from '../utils/tokenUtils'

interface AuthContextType {
  isAuthenticated: boolean
  username: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    if (isTokenValid()) {
      setIsAuthenticated(true)
      setUsername(getUsernameFromToken())
    }
  }, [])

  const login = (token: string) => {
    setToken(token)
    setIsAuthenticated(true)
    setUsername(getUsernameFromToken())
  }

  const logout = () => {
    removeToken()
    setIsAuthenticated(false)
    setUsername(null)
  }

  return (
    <AuthContext.Provider value={{isAuthenticated, username, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
