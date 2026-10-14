import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Layout/Navbar'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Dashboard from './components/Dashboard/Dashboard'
import FeedbackForm from './components/Feedback/FeedbackForm'
import FeedbackList from './components/Feedback/FeedbackList'
import PrivateRoute from './components/Common/PrivateRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/feedback/submit" element={<PrivateRoute><FeedbackForm /></PrivateRoute>} />
            <Route path="/feedback" element={<PrivateRoute><FeedbackList /></PrivateRoute>} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
