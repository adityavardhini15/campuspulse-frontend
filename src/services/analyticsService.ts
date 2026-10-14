import api from './api'
import type { AnalyticsOverview, ServiceRating } from '../types'

export const getOverview = async (): Promise<AnalyticsOverview> => {
  const response = await api.get<AnalyticsOverview>('/analytics/overview')
  return response.data
}

export const getServiceRatings = async (): Promise<ServiceRating[]> => {
  const response = await api.get<ServiceRating[]>('/analytics/service-ratings')
  return response.data
}

export const getSentimentBreakdown = async () => {
  const response = await api.get('/analytics/sentiment')
  return response.data
}

export const getTrends = async () => {
  const response = await api.get('/analytics/trends')
  return response.data
}
