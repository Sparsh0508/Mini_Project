import React from 'react'
import { useAuth } from '../context/AuthContext'
import '../style/header.css'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <div className="header">
      <div className="header-content">
        <div>
          <h1>Student Result Management System</h1>
          <p>Manage students, sections, and academic results</p>
        </div>
        {user && (
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </div>
  )
}

export default Header