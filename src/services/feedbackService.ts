import api from './api'
import type { Feedback, FeedbackRequest, Service } from '../types'

export const getServices = async (): Promise<Service[]> => {
  const response = await api.get<Service[]>('/services')
  return response.data
}

export const submitFeedback = async (data: FeedbackRequest): Promise<Feedback> => {
  const response = await api.post<Feedback>('/feedback', data)
  return response.data
}

export const getFeedback = async (): Promise<Feedback[]> => {
  const response = await api.get<Feedback[]>('/feedback')
  return response.data
}

export const getUserFeedback = async (): Promise<Feedback[]> => {
  const response = await api.get<Feedback[]>('/feedback/user')
  return response.data
}
