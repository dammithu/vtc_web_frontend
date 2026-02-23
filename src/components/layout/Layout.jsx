import React from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import { useTheme } from '../../contexts/ThemeContext'
import { Outlet } from 'react-router-dom'

function Layout() {
  const { isDarkMode } = useTheme()

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'dark:bg-gray-950' : 'bg-gray-50'}`}>
      {/* Sidebar - Fixed on left */}
      <div className="sticky top-0 h-screen z-40">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar at top - Fixed */}
        <div className="sticky top-0 z-30">
          <Navbar onMenuClick={() => {}} />
        </div>
        
        {/* Page Content - Use Outlet here */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout