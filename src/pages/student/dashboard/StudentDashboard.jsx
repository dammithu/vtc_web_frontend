import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  Bell, 
  TrendingUp,
  Users,
  FileText,
  Clock,
  Download,
  ChevronRight,
  X,
  ChevronLeft,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

function StudentDashboard() {
  const { isDarkMode } = useTheme();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Mock data
  const courses = [
    { id: 1, name: 'Mathematics', progress: 75, color: 'bg-blue-500', lessons: 12, teacher: 'Dr. Smith' },
    { id: 2, name: 'Physics', progress: 60, color: 'bg-green-500', lessons: 8, teacher: 'Prof. Johnson' },
    { id: 3, name: 'Computer Science', progress: 90, color: 'bg-purple-500', lessons: 15, teacher: 'Ms. Williams' },
    { id: 4, name: 'English Literature', progress: 45, color: 'bg-yellow-500', lessons: 10, teacher: 'Dr. Brown' },
  ];

  const upcomingAssignments = [
    { id: 1, title: 'Calculus Homework', course: 'Mathematics', dueDate: 'Tomorrow', priority: 'high' },
    { id: 2, title: 'Physics Lab Report', course: 'Physics', dueDate: 'In 2 days', priority: 'medium' },
    { id: 3, title: 'Programming Project', course: 'Computer Science', dueDate: 'Friday', priority: 'high' },
    { id: 4, title: 'Essay Writing', course: 'English Literature', dueDate: 'Next Week', priority: 'low' },
  ];

  const announcements = [
    { id: 1, title: 'Exam Schedule Released', time: '2 hours ago', type: 'important' },
    { id: 2, title: 'Library Closed on Friday', time: '1 day ago', type: 'notice' },
    { id: 3, title: 'New Study Material Available', time: '2 days ago', type: 'update' },
  ];

  const recentActivities = [
    { id: 1, action: 'Submitted assignment', course: 'Mathematics', time: '10:30 AM' },
    { id: 2, action: 'Joined live class', course: 'Physics', time: 'Yesterday' },
    { id: 3, action: 'Downloaded material', course: 'Computer Science', time: '2 days ago' },
  ];

  // Calendar events
  const calendarEvents = [
    { date: '2026-02-14', title: 'Mathematics Exam', type: 'exam', time: '10:00 AM' },
    { date: '2026-02-15', title: 'Physics Lab', type: 'class', time: '2:00 PM' },
    { date: '2026-02-18', title: 'CS Assignment Due', type: 'assignment', time: '11:59 PM' },
    { date: '2026-02-20', title: 'English Literature Class', type: 'class', time: '9:00 AM' },
    { date: '2026-02-22', title: 'Physics Exam', type: 'exam', time: '1:00 PM' },
  ];

  // Calendar helper functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date) => {
    const dateStr = formatDate(date);
    return calendarEvents.filter(event => event.date === dateStr);
  };

  const isSameDay = (date1, date2) => {
    return formatDate(date1) === formatDate(date2);
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


  return (
    <div className={`min-h-full ${isDarkMode ? 'dark:text-white' : 'text-blue-900'}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, Alex!</h1>
            <p className={`text-sm sm:text-base mt-1 ${isDarkMode ? 'text-gray-300' : 'text-blue-700'}`}>
              Here's your learning progress for today
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className={`
              px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2
              shadow-lg transform transition-all hover:scale-105
              ${isDarkMode 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white' 
                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
              }
            `}>
              <BookOpen className="w-4 h-4" />
              Continue Learning
            </button>
            <button 
              onClick={() => setShowCalendar(true)}
              className={`
              px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2
              ${isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700' 
                : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200'
              }
            `}>
              <Calendar className="w-4 h-4" />
              Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className={`
          rounded-xl p-5
          ${isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-blue-50 border border-blue-200'}
        `}>
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-blue-700'}`}>Enrolled Courses</p>
              <p className="text-2xl font-bold mt-1">8</p>
            </div>
          </div>
          <div className={`mt-3 text-xs ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            +2 this month
          </div>
        </div>

        <div className={`
          rounded-xl p-5
          ${isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-blue-50 border border-blue-200'}
        `}>
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-blue-700'}`}>Overall Progress</p>
              <p className="text-2xl font-bold mt-1">78%</p>
            </div>
          </div>
          <div className={`mt-3 text-xs ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            ↑ 5% from last week
          </div>
        </div>

        <div className={`
          rounded-xl p-5
          ${isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-blue-50 border border-blue-200'}
        `}>
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'}`}>
              <Calendar className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-blue-700'}`}>Upcoming Classes</p>
              <p className="text-2xl font-bold mt-1">5</p>
            </div>
          </div>
          <div className={`mt-3 text-xs ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            Next: Tomorrow 10 AM
          </div>
        </div>

        <div className={`
          rounded-xl p-5
          ${isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-blue-50 border border-blue-200'}
        `}>
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-blue-700'}`}>Pending Exams</p>
              <p className="text-2xl font-bold mt-1">3</p>
            </div>
          </div>
          <div className={`mt-3 text-xs ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
            Next exam in 5 days
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Progress */}
          <div className={`
            rounded-xl p-6
            ${isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-blue-50 border border-blue-200'}
          `}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Course Progress</h2>
              <button className={`
                text-sm font-medium flex items-center gap-1
                ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}
              `}>
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-5">
              {courses.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{course.name}</span>
                      <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}>
                        {course.lessons} lessons • {course.teacher}
                      </div>
                    </div>
                    <span className="font-semibold">{course.progress}%</span>
                  </div>
                  <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-blue-200'} rounded-full h-2.5`}>
                    <div
                      className={`h-2.5 rounded-full ${course.color}`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Classes & Exams */}
          <div className={`
            rounded-xl p-6
            ${isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-blue-50 border border-blue-200'}
          `}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Upcoming Classes & Exams</h2>
              <div className="flex items-center gap-2">
                <Calendar className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-blue-500'}`} />
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}>5 upcoming</span>
              </div>
            </div>
            <div className="space-y-4">
              {upcomingAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className={`
                    flex items-center justify-between p-4 rounded-lg
                    ${isDarkMode 
                      ? 'bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700' 
                      : 'hover:bg-blue-100 border border-blue-200'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className={`
                      p-2 rounded-lg
                      ${assignment.priority === 'high' 
                        ? 'bg-red-500/10 text-red-500' 
                        : assignment.priority === 'medium'
                        ? 'bg-yellow-500/10 text-yellow-500'
                        : 'bg-blue-500/10 text-blue-500'
                      }
                    `}>
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">{assignment.title}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}>
                        {assignment.course}
                      </p>
                    </div>
                  </div>
                  <span className={`
                    px-3 py-1 text-sm font-medium rounded-full
                    ${assignment.priority === 'high' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
                      : assignment.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                    }
                  `}>
                    Due {assignment.dueDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Latest Announcements */}
          <div className={`
            rounded-xl p-6
            ${isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-blue-50 border border-blue-200'}
          `}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Latest Announcements</h2>
              <div className="relative">
                <Bell className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-blue-500'}`} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
            </div>
            <div className="space-y-5">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="pb-4 border-b last:border-0 last:pb-0"
                  style={{ borderColor: isDarkMode ? '#374151' : '#bae6fd' }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`
                      p-2 rounded-lg mt-1
                      ${announcement.type === 'important' 
                        ? 'bg-red-500/10 text-red-500' 
                        : announcement.type === 'notice'
                        ? 'bg-yellow-500/10 text-yellow-500'
                        : 'bg-blue-500/10 text-blue-500'
                      }
                    `}>
                      {announcement.type === 'important' ? '!' : announcement.type === 'notice' ? 'i' : '📢'}
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{announcement.title}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}>
                        <Clock className="inline w-3 h-3 mr-1" />
                        {announcement.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className={`
            rounded-xl p-6
            ${isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-blue-50 border border-blue-200'}
          `}>
            <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className={`flex items-center gap-3 p-3 rounded-lg ${isDarkMode ? 'bg-gray-800/30' : 'bg-blue-100'}`}
                >
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-200'}
                  `}>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}>
                      {activity.course}
                    </p>
                  </div>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}>
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className={`
            rounded-xl p-6
            ${isDarkMode 
              ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-800/30' 
              : 'bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200'
            }
          `}>
            <h2 className="text-xl font-bold mb-4">Weekly Overview</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-blue-700'}`}>Study Hours</span>
                <span className="font-semibold">24.5 hrs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-blue-700'}`}>Assignments Done</span>
                <span className="font-semibold">8/12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-blue-700'}`}>Attendance</span>
                <span className="font-semibold">96%</span>
              </div>
              <div className="pt-3 mt-3 border-t" style={{ borderColor: isDarkMode ? '#374151' : '#bae6fd' }}>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-blue-700'}`}>Current Streak</span>
                  <span className="font-bold text-green-500">14 days 🔥</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`
            w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden
            ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-blue-200'}
          `}>
            {/* Calendar Header */}
            <div className={`
              flex items-center justify-between p-6 border-b
              ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-blue-200 bg-blue-50'}
            `}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                  <Calendar className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Academic Calendar</h2>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}>
                    Track your classes, exams, and assignments
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCalendar(false)}
                className={`
                  p-2 rounded-lg transition-colors
                  ${isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                    : 'hover:bg-blue-100 text-blue-600 hover:text-blue-700'
                  }
                `}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Calendar Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar Grid */}
                <div className="lg:col-span-2">
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={previousMonth}
                      className={`
                        p-2 rounded-lg transition-colors
                        ${isDarkMode 
                          ? 'hover:bg-gray-700 text-gray-400' 
                          : 'hover:bg-blue-100 text-blue-600'
                        }
                      `}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h3 className="text-xl font-bold">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h3>
                    <button
                      onClick={nextMonth}
                      className={`
                        p-2 rounded-lg transition-colors
                        ${isDarkMode 
                          ? 'hover:bg-gray-700 text-gray-400' 
                          : 'hover:bg-blue-100 text-blue-600'
                        }
                      `}
                    >
                      <ChevronRightIcon className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Day Names */}
                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {dayNames.map(day => (
                      <div
                        key={day}
                        className={`
                          text-center text-sm font-semibold py-2
                          ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}
                        `}
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-2">
                    {(() => {
                      const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
                      const days = [];

                      // Empty cells for days before month starts
                      for (let i = 0; i < startingDayOfWeek; i++) {
                        days.push(
                          <div key={`empty-${i}`} className="aspect-square p-2"></div>
                        );
                      }

                      // Days of the month
                      for (let day = 1; day <= daysInMonth; day++) {
                        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                        const events = getEventsForDate(date);
                        const isToday = isSameDay(date, new Date());
                        const isSelected = isSameDay(date, selectedDate);

                        days.push(
                          <button
                            key={day}
                            onClick={() => setSelectedDate(date)}
                            className={`
                              aspect-square p-2 rounded-lg text-sm font-medium
                              transition-all relative
                              ${isToday 
                                ? isDarkMode 
                                  ? 'ring-2 ring-blue-500' 
                                  : 'ring-2 ring-blue-400'
                                : ''
                              }
                              ${isSelected
                                ? isDarkMode
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-blue-500 text-white'
                                : isDarkMode
                                  ? 'hover:bg-gray-700 text-gray-300'
                                  : 'hover:bg-blue-50 text-blue-900'
                              }
                            `}
                          >
                            <div>{day}</div>
                            {events.length > 0 && (
                              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                                {events.slice(0, 3).map((event, idx) => (
                                  <div
                                    key={idx}
                                    className={`w-1 h-1 rounded-full ${
                                      event.type === 'exam' 
                                        ? 'bg-red-500' 
                                        : event.type === 'class'
                                        ? 'bg-green-500'
                                        : 'bg-yellow-500'
                                    }`}
                                  ></div>
                                ))}
                              </div>
                            )}
                          </button>
                        );
                      }

                      return days;
                    })()}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-4 mt-6 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}>
                        Exam
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}>
                        Class
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}>
                        Assignment
                      </span>
                    </div>
                  </div>
                </div>

                {/* Events for Selected Date */}
                <div className="lg:col-span-1">
                  <div className={`
                    rounded-xl p-4 h-full
                    ${isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-blue-50 border border-blue-200'}
                  `}>
                    <h3 className="font-bold mb-4">
                      {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h3>
                    
                    {(() => {
                      const events = getEventsForDate(selectedDate);
                      
                      if (events.length === 0) {
                        return (
                          <div className={`
                            text-center py-8
                            ${isDarkMode ? 'text-gray-500' : 'text-blue-400'}
                          `}>
                            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p className="text-sm">No events scheduled</p>
                          </div>
                        );
                      }

                      return (
                        <div className="space-y-3">
                          {events.map((event, idx) => (
                            <div
                              key={idx}
                              className={`
                                p-3 rounded-lg border
                                ${event.type === 'exam'
                                  ? isDarkMode
                                    ? 'bg-red-900/20 border-red-500/30'
                                    : 'bg-red-50 border-red-200'
                                  : event.type === 'class'
                                    ? isDarkMode
                                      ? 'bg-green-900/20 border-green-500/30'
                                      : 'bg-green-50 border-green-200'
                                    : isDarkMode
                                      ? 'bg-yellow-900/20 border-yellow-500/30'
                                      : 'bg-yellow-50 border-yellow-200'
                                }
                              `}
                            >
                              <div className="flex items-start gap-2">
                                <div className={`
                                  w-2 h-2 rounded-full mt-2
                                  ${event.type === 'exam' 
                                    ? 'bg-red-500' 
                                    : event.type === 'class'
                                    ? 'bg-green-500'
                                    : 'bg-yellow-500'
                                  }
                                `}></div>
                                <div className="flex-1">
                                  <p className="font-semibold text-sm">{event.title}</p>
                                  <p className={`
                                    text-xs mt-1
                                    ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}
                                  `}>
                                    <Clock className="inline w-3 h-3 mr-1" />
                                    {event.time}
                                  </p>
                                  <span className={`
                                    inline-block mt-2 px-2 py-1 rounded text-xs font-medium
                                    ${event.type === 'exam'
                                      ? 'bg-red-500/20 text-red-600 dark:text-red-400'
                                      : event.type === 'class'
                                        ? 'bg-green-500/20 text-green-600 dark:text-green-400'
                                        : 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
                                    }
                                  `}>
                                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;