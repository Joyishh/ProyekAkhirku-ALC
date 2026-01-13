import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landing/LandingPage.jsx'
import AdminDashboard from './pages/dashboard/admin/AdminDashboard.jsx'
import StudentDashboard from './pages/dashboard/student/StudentDashboard.jsx'
import TeacherDashboard from './pages/dashboard/teacher/TeacherDashboard.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/dashboard/student" element={<StudentDashboard />} />
      <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
    </Routes>
  )
}

export default App
