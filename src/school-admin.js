import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import RegisterUser from './components/auth/register-user'
import Login from './components/auth/login'
import Logout from './components/auth/logout'
import AdminDashboard from './components/dashboards/admin-dashboard'
import TeacherDashboard from './components/dashboards/teacher-dashboard'
import StudentDashboard from './components/dashboards/student-dashboard'
import 'bootstrap/dist/css/bootstrap.min.css'
import LoadingScreen from './loading-screen'
import Header from './components/header'
import ProtectedRoute from './protected-route'

const SchoolAdmin = () => {
  console.log('SchoolAdmin component rendered')

  return (
    <LoadingScreen>
      <Router>
        <Header />
        <div className="container mt-5">
          <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                Smart School
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/logout">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <Routes>
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/admin"
              element={<ProtectedRoute element={AdminDashboard} role="admin" />}
            />
            <Route
              path="/teacher"
              element={<ProtectedRoute element={TeacherDashboard} role="teacher" />}
            />
            <Route
              path="/student"
              element={<ProtectedRoute element={StudentDashboard} role="student" />}
            />
            <Route path="/" element={<Login />} /> {/* Default route */}
          </Routes>
        </div>
      </Router>
    </LoadingScreen>
  )
}

export default SchoolAdmin
