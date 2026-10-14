import { useState, useEffect } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import { getOverview, getServiceRatings } from '../../services/analyticsService'
import type { AnalyticsOverview, ServiceRating } from '../../types'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

const Dashboard = () => {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null)
  const [serviceRatings, setServiceRatings] = useState<ServiceRating[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const [overviewData, ratingsData] = await Promise.all([
          getOverview(),
          getServiceRatings()
        ])
        setOverview(overviewData)
        setServiceRatings(ratingsData)
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load analytics')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error-message">{error}</div>
  if (!overview) return null

  const hasData = overview.totalFeedback > 0

  const barChartData = {
    labels: serviceRatings.map(s => s.serviceName),
    datasets: [
      {
        label: 'Average Rating',
        data: serviceRatings.map(s => s.averageRating),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  }

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 5
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Average Rating by Service'
      }
    }
  }

  const doughnutData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: [overview.positiveCount, overview.neutralCount, overview.negativeCount],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Sentiment Distribution'
      }
    }
  }

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Feedback</h3>
          <p className="stat-value">{overview.totalFeedback}</p>
        </div>
        <div className="stat-card">
          <h3>Average Rating</h3>
          <p className="stat-value">{overview.averageRating.toFixed(2)} / 5</p>
        </div>
        <div className="stat-card">
          <h3>Positive</h3>
          <p className="stat-value positive">{overview.positiveCount}</p>
        </div>
        <div className="stat-card">
          <h3>Neutral</h3>
          <p className="stat-value neutral">{overview.neutralCount}</p>
        </div>
        <div className="stat-card">
          <h3>Negative</h3>
          <p className="stat-value negative">{overview.negativeCount}</p>
        </div>
      </div>
      <div className="charts-grid">
        {hasData ? (
          <>
            <div className="chart-container">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
            <div className="chart-container">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </>
        ) : (
          <div className="empty-state">
            <p>No data available yet. Submit your first feedback to see analytics!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
