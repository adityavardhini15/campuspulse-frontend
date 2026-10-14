import axios from 'axios'
import { getToken } from '../utils/tokenUtils'

const baseURL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api`
  : 'https://campuspulse-backend-nvvn.onrender.com/api'

console.log('API Base URL:', baseURL) // Debug log

const api = axios.create({
  baseURL
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
