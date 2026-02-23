import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const StudentAttendance = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'student') {
      navigate('/login');
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  // Mock attendance data
  const attendanceData = [
    {
      id: 1,
      course: 'Web Development Fundamentals',
      totalSessions: 24,
      attended: 22,
      percentage: 91.7,
      recentSessions: [
        { date: '2026-02-03', time: '10:00 AM', status: 'present' },
        { date: '2026-02-01', time: '10:00 AM', status: 'present' },
        { date: '2026-01-30', time: '10:00 AM', status: 'absent' },
        { date: '2026-01-28', time: '10:00 AM', status: 'present' },
        { date: '2026-01-26', time: '10:00 AM', status: 'present' }
      ]
    },
    {
      id: 2,
      course: 'Database Management Systems',
      totalSessions: 20,
      attended: 18,
      percentage: 90.0,
      recentSessions: [
        { date: '2026-02-02', time: '2:00 PM', status: 'present' },
        { date: '2026-01-31', time: '2:00 PM', status: 'present' },
        { date: '2026-01-29', time: '2:00 PM', status: 'present' },
        { date: '2026-01-27', time: '2:00 PM', status: 'absent' },
        { date: '2026-01-25', time: '2:00 PM', status: 'present' }
      ]
    },
    {
      id: 3,
      course: 'Mobile App Development',
      totalSessions: 28,
      attended: 24,
      percentage: 85.7,
      recentSessions: [
        { date: '2026-02-03', time: '11:00 AM', status: 'present' },
        { date: '2026-02-01', time: '11:00 AM', status: 'absent' },
        { date: '2026-01-30', time: '11:00 AM', status: 'present' },
        { date: '2026-01-28', time: '11:00 AM', status: 'present' },
        { date: '2026-01-26', time: '11:00 AM', status: 'absent' }
      ]
    }
  ];

  const overallStats = {
    totalSessions: attendanceData.reduce((sum, course) => sum + course.totalSessions, 0),
    totalAttended: attendanceData.reduce((sum, course) => sum + course.attended, 0)
  };
  overallStats.percentage = ((overallStats.totalAttended / overallStats.totalSessions) * 100).toFixed(1);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 to-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/student/dashboard')} className="hover:text-blue-300 transition">
                ← Back
              </button>
              <h1 className="text-2xl font-bold">Attendance</h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl p-6 text-white shadow-lg">
            <p className="text-blue-100 text-sm font-medium mb-2">Total Sessions</p>
            <p className="text-4xl font-bold">{overallStats.totalSessions}</p>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-500 rounded-xl p-6 text-white shadow-lg">
            <p className="text-green-100 text-sm font-medium mb-2">Sessions Attended</p>
            <p className="text-4xl font-bold">{overallStats.totalAttended}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-500 rounded-xl p-6 text-white shadow-lg">
            <p className="text-purple-100 text-sm font-medium mb-2">Overall Attendance</p>
            <p className="text-4xl font-bold">{overallStats.percentage}%</p>
          </div>
        </div>

        {/* Course-wise Attendance */}
        <div className="space-y-6">
          {attendanceData.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{course.course}</h3>
                  <p className="text-gray-600">
                    {course.attended} / {course.totalSessions} sessions attended
                  </p>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold mb-1 ${
                    course.percentage >= 90 ? 'text-green-600' :
                    course.percentage >= 75 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {course.percentage}%
                  </div>
                  <div className={`text-sm font-semibold ${
                    course.percentage >= 75 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {course.percentage >= 75 ? '✓ Good' : '⚠ Low'}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      course.percentage >= 90 ? 'bg-green-600' :
                      course.percentage >= 75 ? 'bg-yellow-500' :
                      'bg-red-600'
                    }`}
                    style={{ width: `${course.percentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Recent Sessions */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Recent Sessions</h4>
                <div className="space-y-2">
                  {course.recentSessions.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          session.status === 'present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {session.status === 'present' ? '✓' : '✗'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{session.date}</p>
                          <p className="text-sm text-gray-600">{session.time}</p>
                        </div>
                      </div>
                      <span className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                        session.status === 'present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {session.status === 'present' ? 'Present' : 'Absent'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default StudentAttendance;
