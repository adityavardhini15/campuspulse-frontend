export interface User {
  id?: number
  username: string
  email: string
  role: string
}

export interface AuthResponse {
  token: string
  username: string
  role: string
}

export interface Service {
  id: number
  name: string
  description: string
}

export interface Feedback {
  id: number
  username: string
  serviceName: string
  rating: number
  comment: string
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE'
  createdAt: string
}

export interface FeedbackRequest {
  serviceId: number
  rating: number
  comment: string
}

export interface AnalyticsOverview {
  totalFeedback: number
  averageRating: number
  positiveCount: number
  neutralCount: number
  negativeCount: number
}

export interface ServiceRating {
  serviceName: string
  averageRating: number
  totalFeedback: number
}
