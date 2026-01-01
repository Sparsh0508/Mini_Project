import React from 'react'
import { Routes, Route } from 'react-router-dom'
import StudentTable from './pages/StudentTable'
import SectionTable from './pages/SectionTable'
import ResultTable from './pages/ResultTable'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Header from './components/Header'
import Tab from './components/Tab'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <AuthProvider>
      <div className="maincontainer">
        <Header />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Tab />
              <StudentTable />
            </ProtectedRoute>
          } />
          <Route path="/sections" element={
            <ProtectedRoute>
              <Tab />
              <SectionTable />
            </ProtectedRoute>
          } />
          <Route path="/results" element={
            <ProtectedRoute>
              <Tab />
              <ResultTable />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App;
