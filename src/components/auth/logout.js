import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../services/auth-service'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../style.css'

const Logout = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title logout-text">Logout</h5>
          <p className="card-text">Are you sure you want to logout?</p>
          <div className="d-flex justify-content-between">
            <button className="btn btn-success" onClick={handleLogout}>
              Yes, Logout
            </button>
            <button className="btn btn-danger" onClick={() => navigate('/')}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Logout
