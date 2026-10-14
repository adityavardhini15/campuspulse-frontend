import { useState, useEffect } from 'react'
import { getUserFeedback } from '../../services/feedbackService'
import type { Feedback } from '../../types'

const FeedbackList = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const data = await getUserFeedback()
        setFeedback(data)
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load feedback')
      } finally {
        setLoading(false)
      }
    }
    loadFeedback()
  }, [])

  const getSentimentClass = (sentiment: string) => {
    switch (sentiment) {
      case 'POSITIVE':
        return 'badge-positive'
      case 'NEGATIVE':
        return 'badge-negative'
      default:
        return 'badge-neutral'
    }
  }

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error-message">{error}</div>

  return (
    <div className="feedback-list-container">
      <h2>My Feedback</h2>
      {feedback.length === 0 ? (
        <p>No feedback submitted yet.</p>
      ) : (
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Sentiment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {feedback.map((item) => (
              <tr key={item.id}>
                <td>{item.serviceName}</td>
                <td>{item.rating} / 5</td>
                <td>{item.comment}</td>
                <td>
                  <span className={`badge ${getSentimentClass(item.sentiment)}`}>
                    {item.sentiment}
                  </span>
                </td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default FeedbackList
