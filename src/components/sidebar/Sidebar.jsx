import React, { useState, useEffect } from 'react'
import { 
  Home, 
  BookOpen, 
  Calendar,
  FileText,
  Award,
  MessageSquare,
  User,
  Sun,
  Moon,
  Menu,
  X,
  Users,
  ClipboardList,
  BookMarked,
  Settings,
  BarChart,
  FileCheck
} from 'lucide-react'
import vtclogo from "../../assets/vtclogo2.png"
import { useTheme } from '../../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { userAPI } from '../../apis/api'

function Sidebar() {
  const navigate = useNavigate()
  const [activeItem, setActiveItem] = useState('Dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [userRole, setUserRole] = useState('Student')
  const [userDetails, setUserDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const { isDarkMode, setTheme } = useTheme()

  // Fetch user details from API to get role
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userId = localStorage.getItem('userId')
        const storedRole = localStorage.getItem('userRole')
        
        // First, try to get role from localStorage (faster)
        if (storedRole) {
          setUserRole(storedRole)
        }

        // Then fetch from API to get the most accurate data
        if (userId) {
          const response = await userAPI.getUserById(userId)
          
          if (response.status && response.response_code === 200) {
            const userData = response.result[0]
            setUserDetails(userData)
            
            // Determine user role from API response
            let role = 'Student'
            if (userData.lectures && userData.lectures.length > 0) {
              role = 'Lecturer'
            } else if (userData.students && userData.students.length > 0) {
              role = 'Student'
            }
            
            setUserRole(role)
            // Update localStorage with the correct role
            localStorage.setItem('userRole', role)
          }
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user role:', error)
        setLoading(false)
      }
    }

    fetchUserRole()
  }, [])

  // Student Menu Items with navigation paths
  const studentMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/studentdashboard' },
    { icon: BookOpen, label: 'My Courses', path: '/student/courses' },
    { icon: FileText, label: 'Assessments', path: '/student/assessments' },
    { icon: Calendar, label: 'Attendance', path: '/student/attendance' },
    { icon: Award, label: 'Results', path: '/student/results' },
    { icon: MessageSquare, label: 'Messages', path: '/student/messages' },
    { icon: User, label: 'Profile', path: '/student/profile' }
  ]

  // Lecturer Menu Items with navigation paths
  const lecturerMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/lecturerdashboard' },
    { icon: BookOpen, label: 'My Courses', path: '/lecturer/courses' },
    { icon: Users, label: 'My Students', path: '/lecturer/students' },
    { icon: ClipboardList, label: 'Assignments', path: '/lecturer/assignments' },
    { icon: Calendar, label: 'Attendance', path: '/lecturer/attendance' },
    { icon: FileCheck, label: 'Gradebook', path: '/lecturer/gradebook' },
    { icon: BookMarked, label: 'Course Materials', path: '/lecturer/materials' },
    { icon: BarChart, label: 'Analytics', path: '/lecturer/analytics' },
    { icon: MessageSquare, label: 'Messages', path: '/lecturer/messages' },
    { icon: User, label: 'Profile', path: '/lecturer/profile' },
    { icon: Settings, label: 'Settings', path: '/lecturer/settings' }
  ]

  const handleThemeChange = (theme) => {
    setTheme(theme)
  }

  const handleMenuItemClick = (path, label) => {
    setActiveItem(label)
    setIsSidebarOpen(false)
    navigate(path)
  }

  // Get menu items based on role
  const getMenuItems = () => {
    switch(userRole) {
      case 'Lecturer':
        return lecturerMenuItems
      case 'Student':
      default:
        return studentMenuItems
    }
  }

  const menuItems = getMenuItems()

  // Set active item based on current path
  useEffect(() => {
    const currentPath = window.location.pathname
    const foundItem = menuItems.find(item => item.path === currentPath)
    if (foundItem) {
      setActiveItem(foundItem.label)
    }
  }, [menuItems])

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className={`
          lg:hidden fixed top-4 left-4 z-40
          p-2 rounded-lg
          ${isDarkMode 
            ? 'bg-gray-800 text-gray-200' 
            : 'bg-blue-50 text-blue-700 shadow-md'
          }
        `}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 h-screen
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isDarkMode ? 'bg-gray-900' : 'bg-blue-50'}
          border-r ${isDarkMode ? 'border-gray-800' : 'border-blue-200'}
          flex flex-col
          font-sans
        `}
      >
        {/* Close Button for Mobile */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-1"
        >
          <X className={`w-6 h-6 ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`} />
        </button>

        {/* Logo Section */}
        <div className={`p-6 flex items-center justify-center border-b ${isDarkMode ? 'border-gray-800' : 'border-blue-200'}`}>
          <img 
            src={vtclogo} 
            alt="VTC Logo" 
            className="h-28 w-auto object-contain"
          />
        </div>

        {/* User Role Badge */}
        {!loading && (
          <div className={`px-4 py-2 mx-4 mt-2 rounded-lg text-center
            ${isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'}
            text-xs font-medium uppercase tracking-wider
          `}>
            {userRole} Dashboard
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.label
              
              return (
                <div key={item.label}>
                  <button
                    onClick={() => handleMenuItemClick(item.path, item.label)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                      transition-all duration-200 group relative
                      ${isActive
                        ? isDarkMode 
                          ? 'bg-blue-900/30 text-blue-400' 
                          : 'bg-blue-100 text-blue-600'
                        : isDarkMode
                          ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                          : 'text-blue-800 hover:bg-blue-100 hover:text-blue-900'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="flex-1 text-left text-sm font-medium">
                      {item.label}
                    </span>
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <span className={`
                        absolute left-0 w-1 h-8 rounded-r-full
                        ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'}
                      `} />
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        </nav>

        {/* Theme Toggle */}
        <div className={`
          px-4 py-3 mx-4 mb-4 rounded-xl
          ${isDarkMode ? 'bg-gray-800' : 'bg-blue-100'}
          flex items-center justify-center gap-2
        `}>
          <button
            onClick={() => handleThemeChange('light')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg transition-all flex-1 justify-center
              ${!isDarkMode 
                ? 'bg-blue-50 text-blue-900 shadow-sm' 
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
              }
            `}
          >
            <Sun className="w-4 h-4" />
            <span className="text-sm font-medium">Light</span>
          </button>
          
          <button
            onClick={() => handleThemeChange('dark')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg transition-all flex-1 justify-center
              ${isDarkMode 
                ? 'bg-blue-700 text-white shadow-sm' 
                : 'text-blue-700 hover:text-blue-900 hover:bg-blue-200'
              }
            `}
          >
            <Moon className="w-4 h-4" />
            <span className="text-sm font-medium">Dark</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar