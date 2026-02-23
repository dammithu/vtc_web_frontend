import React, { createContext, useState, useContext, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme === 'dark'
  })

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    
    const root = document.documentElement
    if (isDarkMode) {
      root.classList.add('dark')
      // Set custom CSS variables for blue theme
      root.style.setProperty('--sidebar-bg', '#0c4a6e') // Blue-900
      root.style.setProperty('--sidebar-border', '#075985') // Blue-800
      root.style.setProperty('--navbar-bg', '#0c4a6e') // Blue-900
      root.style.setProperty('--navbar-border', '#075985') // Blue-800
      root.style.setProperty('--body-bg', '#0f172a') // Gray-950
    } else {
      root.classList.remove('dark')
      // Set light blue theme variables
      root.style.setProperty('--sidebar-bg', '#f0f9ff') // Blue-50
      root.style.setProperty('--sidebar-border', '#bae6fd') // Blue-200
      root.style.setProperty('--navbar-bg', '#f0f9ff') // Blue-50
      root.style.setProperty('--navbar-border', '#bae6fd') // Blue-200
      root.style.setProperty('--body-bg', '#f8fbff') // Light blue background
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const setTheme = (theme) => {
    setIsDarkMode(theme === 'dark')
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}