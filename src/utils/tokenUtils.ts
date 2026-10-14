import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
  sub: string
  exp: number
}

export const getToken = (): string | null => localStorage.getItem('token')
export const setToken = (token: string): void => localStorage.setItem('token', token)
export const removeToken = (): void => localStorage.removeItem('token')

export const isTokenValid = (): boolean => {
  const token = getToken()
  if (!token) return false
  try {
    const decoded = jwtDecode<JwtPayload>(token)
    return decoded.exp * 1000 > Date.now()
  } catch {
    return false
  }
}

export const getUsernameFromToken = (): string | null => {
  const token = getToken()
  if (!token) return null
  try {
    const decoded = jwtDecode<JwtPayload>(token)
    return decoded.sub
  } catch {
    return null
  }
}
