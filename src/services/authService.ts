import api from './api'
import type { AuthResponse } from '../types'

export const register = async (username: string, email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', { username, email, password })
  return response.data
}

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', { username, password })
  return response.data
}
