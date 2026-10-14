import { useState, useEffect, FormEvent } from 'react'
import { getServices, submitFeedback } from '../../services/feedbackService'
import type { Service } from '../../types'

const FeedbackForm = () => {
  const [services, setServices] = useState<Service[]>([])
  const [serviceId, setServiceId] = useState<number>(0)
  const [rating, setRating] = useState<number>(5)
  const [comment, setComment] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getServices()
        setServices(data)
        if (data.length > 0) {
          setServiceId(data[0].id)
        }
      } catch (err) {
        setError('Failed to load services')
      }
    }
    loadServices()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    try {
      await submitFeedback({ serviceId, rating, comment })
      setSuccess(true)
      setComment('')
      setRating(5)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit feedback')
    }
  }

  return (
    <div className="feedback-form-container">
      <h2>Submit Feedback</h2>
      {success && <div className="success-message">Feedback submitted successfully!</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="service">Service</label>
          <select
            id="service"
            value={serviceId}
            onChange={(e) => setServiceId(Number(e.target.value))}
            required
          >
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating: {rating} / 5</label>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? 'active' : ''}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit Feedback</button>
      </form>
    </div>
  )
}

export default FeedbackForm
