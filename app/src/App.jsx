import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/landing/LandingPage.jsx'
import AdminDashboard from './pages/dashboard/admin/AdminDashboard.jsx'
import AdminDashboardModule from './pages/dashboard/admin/modules/Dashboard/AdminDashboardModule.jsx'
import TeachersModule from './pages/dashboard/admin/modules/Teachers/TeachersModule.jsx'
import StudentsModule from './pages/dashboard/admin/modules/Students/StudentsModule.jsx'
import RegistrationModule from './pages/dashboard/admin/modules/Students/Registration/RegistrationModule.jsx'
import DataManagementModule from './pages/dashboard/admin/modules/Students/DataManagement/DataManagementModule.jsx'
import AttendanceModule from './pages/dashboard/admin/modules/Students/Attendance/AttendanceModule.jsx'
import LearningProgressModule from './pages/dashboard/admin/modules/Students/LearningProgress/LearningProgressModule.jsx'
import ClassesModule from './pages/dashboard/admin/modules/Classes/ClassesModule.jsx'
import ScheduleModule from './pages/dashboard/admin/modules/Classes/Schedule/ScheduleModule.jsx'
import FinanceModule from './pages/dashboard/admin/modules/Finance/FinanceModule.jsx'
import AnnouncementsModule from './pages/dashboard/admin/modules/Announcements/AnnouncementsModule.jsx'
import StudentDashboard from './pages/dashboard/student/StudentDashboard.jsx'
import TeacherDashboard from './pages/dashboard/teacher/TeacherDashboard.jsx'
import TeacherDashboardModule from './pages/dashboard/teacher/modules/Dashboard/TeacherDashboardModule.jsx'
import MyClassesModule from './pages/dashboard/teacher/modules/MyClasses/MyClassesModule.jsx'
import TeacherLearningProgressModule from './pages/dashboard/teacher/modules/LearningProgress/LearningProgressModule.jsx'
import TeacherScheduleModule from './pages/dashboard/teacher/modules/Schedule/ScheduleModule.jsx'
import StudentDashboardModule from './pages/dashboard/student/modules/Dashboard/StudentDashboardModule.jsx'
import PaymentModule from './pages/dashboard/student/modules/Payment/PaymentModule.jsx'
import StudentRegistrationModule from './pages/dashboard/student/modules/Registration/RegistrationModule.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      {/* Admin Dashboard with Nested Routes */}
      <Route path="/dashboard/admin" element={<AdminDashboard />}>
        <Route index element={<AdminDashboardModule />} />
        
        {/* Teachers Module */}
        <Route path="teachers" element={<TeachersModule />} />
        
        {/* Students Module with Nested Sub-Routes */}
        <Route path="students" element={<StudentsModule />}>
          <Route index element={<Navigate to="registration" replace />} />
          <Route path="registration" element={<RegistrationModule />} />
          <Route path="data" element={<DataManagementModule />} />
          <Route path="attendance" element={<AttendanceModule />} />
          <Route path="learning-progress" element={<LearningProgressModule />} />
        </Route>
        
        {/* Classes Module with Nested Sub-Routes */}
        <Route path="classes" element={<ClassesModule />}>
          <Route index element={<Navigate to="schedule" replace />} />
          <Route path="schedule" element={<ScheduleModule />} />
        </Route>
        
        <Route path="finance" element={<FinanceModule />} />
        <Route path="announcements" element={<AnnouncementsModule />} />
      </Route>
      
      {/* Teacher Dashboard with Nested Routes */}
      <Route path="/dashboard/teacher" element={<TeacherDashboard />}>
        <Route index element={<TeacherDashboardModule />} />
        <Route path="classes" element={<MyClassesModule />} />
        <Route path="learning-progress" element={<TeacherLearningProgressModule />} />
        <Route path="schedule" element={<TeacherScheduleModule />} />
      </Route>
      
      {/* Student Dashboard*/}
      <Route path="/dashboard/student" element={<StudentDashboard />}>
        <Route index element={<StudentDashboardModule />} />
        <Route path="registration" element={<StudentRegistrationModule />} />
        <Route path="payment" element={<PaymentModule />} />
      </Route>
    </Routes>
  )
}

export default App