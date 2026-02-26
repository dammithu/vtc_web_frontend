import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Login from "../pages/auth/Login"
import ForgotPassword from '../pages/auth/ForgotPassword'

//student
import StudentDashboard from "../pages/student/dashboard/StudentDashboard"
import StudentProfile from "../pages/student/studentprofile/StudentProfile"
import EditStudentProfile from '../pages/student/studentprofile/EditStudentProfile'
import MyCourses from '../pages/student/courses/MyCourses'
import StudentAssessments from '../pages/student/assessments/StudentAssessments'
import StudentAttendance from '../pages/student/attendance/StudentAttendance'
import StudentResults from '../pages/student/results/StudentResults'
import StudentMessages from '../pages/student/messages/StudentMessages'

//lecturer
import LecturerDashboard from "../pages/lecturer/dashboard/LecturerDashboard"
import LecturerProfile from "../pages/lecturer/lecturerprofile/LecturerProfile"
import EditLecturerProfile from '../pages/lecturer/lecturerprofile/EditLecturerProfile'
import LecturerCourses from '../pages/lecturer/courses/LecturerCourses'
import MyStudents from '../pages/lecturer/mystudents/MyStudents'
import LecturerAssessments from '../pages/lecturer/assessments/LecturerAssessments'
import LecturerAttendance from '../pages/lecturer/attendance/LecturerAttendance'
import CourseMaterials from '../pages/lecturer/coursematerials/CourseMaterials'
import LecturerAnalytics from '../pages/lecturer/lectureranalytics/LecturerAnalytics'
import LecturerMessages from '../pages/lecturer/messages/LecturerMessages'

import Settings from '../pages/settings/Settings'
import ContactUs from '../pages/contactus/ContactUs'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function VTCRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Routes WITHOUT layout */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgotPassword />} />

        {/* Protected Routes WITH layout */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          {/* Student Role Routes */}
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/studentprofile" element={<StudentProfile />} />
          <Route path="/editstudentprofile" element={<EditStudentProfile />} />
          <Route path="/student/courses" element={<MyCourses />} />
          <Route path="/student/assessments" element={<StudentAssessments />} />
          <Route path="/student/attendance" element={<StudentAttendance />} />
          <Route path="/student/results" element={<StudentResults />} />
          <Route path="/student/messages" element={<StudentMessages />} />
          
          {/* Lecturer Role Routes */}
          <Route path="/lecturerdashboard" element={<LecturerDashboard />} />
          <Route path="/lecturerprofile" element={<LecturerProfile />} />
          <Route path="/editlecturerprofile" element={<EditLecturerProfile />} />
          <Route path="/lecturer/courses" element={<LecturerCourses />} />
          <Route path="/lecturer/students" element={<MyStudents />} />
          <Route path="/lecturer/assessments" element={<LecturerAssessments />} />
          <Route path="/lecturer/attendance" element={<LecturerAttendance />} />
          <Route path="/lecturer/materials" element={<CourseMaterials />} />
          <Route path="/lecturer/analytics" element={<LecturerAnalytics />} />
          <Route path="/lecturer/messages" element={<LecturerMessages />} />

          <Route path="/settings" element={<Settings />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Route>

        {/* Optional: Catch all unmatched routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default VTCRoutes