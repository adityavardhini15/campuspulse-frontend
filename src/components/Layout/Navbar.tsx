import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { isAuthenticated, username, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <h1>CampusPulse</h1>
        </Link>
        {isAuthenticated && (
          <>
            <div className="navbar-links">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/feedback/submit" className="nav-link">Submit Feedback</Link>
              <Link to="/feedback" className="nav-link">My Feedback</Link>
            </div>
            <div className="navbar-user">
              <span className="username">Welcome, {username}</span>
              <button onClick={handleLogout} className="btn btn-logout">Logout</button>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
