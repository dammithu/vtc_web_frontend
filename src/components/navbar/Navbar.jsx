import React, { useState, useRef, useEffect } from 'react'
import { Bell, Search, User, LogOut, Settings, HelpCircle, Menu, X } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { userAPI } from '../../apis/api' // Adjust the import path based on your file structure

function Navbar({ onMenuClick }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [searchFocus, setSearchFocus] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [userDetails, setUserDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const dropdownRef = useRef(null)
  const searchRef = useRef(null)
  const { isDarkMode } = useTheme()
  const navigate = useNavigate()

  // Fetch user details from API
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem('userId')
        if (!userId) {
          setLoading(false)
          return
        }

        const response = await userAPI.getUserById(userId)
        
        if (response.status && response.response_code === 200) {
          const userData = response.result[0]
          setUserDetails(userData)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user details:', error)
        setLoading(false)
      }
    }

    fetchUserDetails()
  }, [])

  // Get user information from API response
  const getUserInfo = () => {
    if (!userDetails) {
      return {
        name: 'User',
        email: localStorage.getItem('userEmail') || 'user@vtc.ac.lk',
        role: localStorage.getItem('userRole') || 'Student',
        displayRole: 'User',
        userType: null
      }
    }

    let name = 'User'
    let role = 'Student'
    let displayRole = 'Student'
    let userType = null

    // Check if user is a lecturer
    if (userDetails.lectures && userDetails.lectures.length > 0) {
      const lectureData = userDetails.lectures[0]
      name = lectureData.full_name
      role = lectureData.role.position
      displayRole = 'Lecturer'
      userType = 'lecturer'
    }
    // Check if user is a student
    else if (userDetails.students && userDetails.students.length > 0) {
      const studentData = userDetails.students[0]
      name = studentData.full_name
      role = studentData.role.position
      displayRole = 'Student'
      userType = 'student'
    }
    // Check if user is an admin
    else if (userDetails.admins && userDetails.admins.length > 0) {
      const adminData = userDetails.admins[0]
      name = adminData.full_name || 'Admin'
      role = adminData.role?.position || 'admin'
      displayRole = 'Admin'
      userType = 'admin'
    }

    return {
      name: name,
      email: userDetails.email,
      role: role,
      displayRole: displayRole,
      userType: userType
    }
  }

  const userInfo = getUserInfo()

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (showMobileSearch && searchRef.current) {
      searchRef.current.focus()
    }
  }, [showMobileSearch])

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel',
      background: isDarkMode ? '#1e3a8a' : '#ffffff',
      color: isDarkMode ? '#e0f2fe' : '#1e293b',
      customClass: {
        popup: isDarkMode ? 'dark-mode-popup' : '',
        title: isDarkMode ? 'text-blue-100' : 'text-blue-900',
        htmlContainer: isDarkMode ? 'text-blue-200' : 'text-blue-800'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsProfileOpen(false)
        
        // Optional: Call logout API if endpoint exists
        try {
          await userAPI.logout();
        } catch (error) {
          console.error('Logout API error:', error);
          // Continue with local logout even if API fails
        }
        
        // Clear all localStorage items
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('userRole')
        localStorage.removeItem('userRolePosition')
        localStorage.removeItem('userEmail')
        localStorage.removeItem('isAuthenticated')
        sessionStorage.removeItem('loginSuccessShown')
        sessionStorage.clear()
        
        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          background: isDarkMode ? '#1e3a8a' : '#ffffff',
          color: isDarkMode ? '#e0f2fe' : '#1e293b',
          customClass: {
            popup: isDarkMode ? 'dark-mode-popup' : '',
            title: isDarkMode ? 'text-blue-100' : 'text-blue-900'
          }
        }).then(() => {
          navigate('/')
        })
      }
    })
  }

  // Handle profile navigation based on user type
  const handleProfileClick = () => {
    setIsProfileOpen(false)
    if (userInfo.userType === 'student') {
      navigate('/studentprofile')
    } else if (userInfo.userType === 'lecturer') {
      navigate('/lecturerprofile')
    } else if (userInfo.userType === 'admin') {
      navigate('/profile') // Default profile page for admin
    } else {
      navigate('/profile') // Fallback
    }
  }

  // Handle settings navigation
  const handleSettingsClick = () => {
    setIsProfileOpen(false)
    navigate('/settings')
  }

  // Handle help & support navigation
  const handleHelpClick = () => {
    setIsProfileOpen(false)
    navigate('/contactus')
  }

  return (
    <div 
      className={`
        h-16 px-4 sm:px-6
        ${isDarkMode ? 'dark:bg-gray-900 dark:border-blue-800' : 'bg-blue-50 border-blue-200'}
        border-b
        flex items-center justify-between gap-4
        font-sans
        ${showMobileSearch ? 'flex-row-reverse' : ''}
      `}
    >
      {/* Mobile Menu Button - Hide when search is active */}
      {!showMobileSearch && (
        <button
          onClick={onMenuClick}
          className={`
            lg:hidden p-2 rounded-lg
            ${isDarkMode 
              ? 'dark:hover:bg-gray-800 dark:text-gray-200' 
              : 'hover:bg-blue-100 text-blue-800'
            }
          `}
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Left Section - Search */}
      <div className={`${showMobileSearch ? 'flex-1' : 'flex-1 max-w-xl hidden md:block'}`}>
        <div className={`
          relative flex items-center
          ${searchFocus 
            ? isDarkMode ? 'ring-2 ring-blue-500' : 'ring-2 ring-blue-400'
            : ''
          }
          rounded-lg transition-all
        `}>
          <Search className={`
            absolute left-3 w-5 h-5
            ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}
          `} />
          <input
            ref={searchRef}
            type="text"
            placeholder="Search courses, assessments..."
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            className={`
              w-full pl-10 pr-4 py-2.5 rounded-lg
              ${isDarkMode 
                ? 'dark:bg-blue-900/20 dark:text-blue-100 dark:placeholder-blue-400' 
                : 'bg-blue-100 text-blue-900 placeholder-blue-400'
              }
              border ${isDarkMode ? 'dark:border-blue-800' : 'border-blue-300'}
              focus:outline-none
              transition-all
              text-sm sm:text-base
            `}
          />
          {showMobileSearch && (
            <button
              onClick={() => setShowMobileSearch(false)}
              className="md:hidden absolute right-3 p-1"
            >
              <X className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-blue-500'}`} />
            </button>
          )}
        </div>
      </div>

      {/* Right Section - Notifications & Profile - Hide when mobile search is active */}
      {!showMobileSearch && (
        <div className="flex items-center gap-3">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setShowMobileSearch(true)}
            className={`
              md:hidden p-2 rounded-lg
              ${isDarkMode 
                ? 'dark:hover:bg-gray-800 dark:text-gray-200' 
                : 'hover:bg-blue-100 text-blue-800'
              }
            `}
          >
            <Search className="w-6 h-6" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`
                flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-lg
                transition-all
                ${isDarkMode 
                  ? 'dark:hover:bg-blue-800 dark:text-blue-100' 
                  : 'hover:bg-blue-100 text-blue-900'
                }
              `}
            >
              {/* Profile Icon with Blue Transparent Background */}
              <div className="relative">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <span className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              
              <div className="text-left hidden sm:block">
                <p className={`text-sm font-medium ${isDarkMode ? 'dark:text-blue-100' : 'text-blue-900'}`}>
                  {loading ? 'Loading...' : userInfo.name}
                </p>
                <p className={`text-xs ${isDarkMode ? 'dark:text-blue-400' : 'text-blue-700'}`}>
                  {loading ? '...' : userInfo.displayRole}
                </p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div 
                className={`
                  absolute right-0 mt-2 w-56 rounded-xl shadow-lg
                  ${isDarkMode ? 'dark:bg-blue-900 dark:border-blue-800' : 'bg-blue-50 border border-blue-200'}
                  overflow-hidden z-50
                `}
              >
                {/* User Info */}
                <div className={`px-4 py-3 border-b ${isDarkMode ? 'dark:border-blue-800' : 'border-blue-200'}`}>
                  <p className={`text-sm font-medium ${isDarkMode ? 'dark:text-blue-100' : 'text-blue-900'}`}>
                    {loading ? 'Loading...' : userInfo.name}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'dark:text-blue-400' : 'text-blue-700'}`}>
                    {loading ? 'Loading...' : userInfo.email}
                  </p>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'dark:text-blue-300' : 'text-blue-600'}`}>
                    Role: {loading ? 'Loading...' : userInfo.displayRole}
                  </p>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button
                    onClick={handleProfileClick}
                    className={`
                      w-full flex items-center gap-3 px-4 py-2.5
                      transition-all
                      ${isDarkMode 
                        ? 'dark:hover:bg-blue-800 dark:text-blue-200' 
                        : 'hover:bg-blue-100 text-blue-800'
                      }
                    `}
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm">My Profile</span>
                  </button>

                  <button
                    onClick={handleSettingsClick}
                    className={`
                      w-full flex items-center gap-3 px-4 py-2.5
                      transition-all
                      ${isDarkMode 
                        ? 'dark:hover:bg-blue-800 dark:text-blue-200' 
                        : 'hover:bg-blue-100 text-blue-800'
                      }
                    `}
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Settings</span>
                  </button>

                  <button
                    onClick={handleHelpClick}
                    className={`
                      w-full flex items-center gap-3 px-4 py-2.5
                      transition-all
                      ${isDarkMode 
                        ? 'dark:hover:bg-blue-800 dark:text-blue-200' 
                        : 'hover:bg-blue-100 text-blue-800'
                      }
                    `}
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span className="text-sm">Help & Support</span>
                  </button>
                </div>

                {/* Logout */}
                <div className={`border-t ${isDarkMode ? 'dark:border-blue-800' : 'border-blue-200'} py-2`}>
                  <button
                    onClick={handleLogout}
                    className={`
                      w-full flex items-center gap-3 px-4 py-2.5
                      transition-all
                      ${isDarkMode 
                        ? 'dark:hover:bg-red-900/20 dark:text-red-400' 
                        : 'hover:bg-red-100 text-red-600'
                      }
                    `}
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar