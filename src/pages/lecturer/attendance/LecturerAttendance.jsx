import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const LecturerAttendance = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('1');
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'lecturer') {
      navigate('/login');
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  // Mock data
  const courses = [
    { id: '1', name: 'Web Development Fundamentals', students: 32 },
    { id: '2', name: 'Database Management Systems', students: 28 },
    { id: '3', name: 'Mobile App Development', students: 35 }
  ];

  const sessions = [
    {
      id: 1,
      date: '2026-02-03',
      time: '10:00 AM',
      topic: 'Introduction to JavaScript',
      marked: true,
      present: 28,
      absent: 4,
      type: 'classroom'
    },
    {
      id: 2,
      date: '2026-02-01',
      time: '10:00 AM',
      topic: 'HTML Forms & Validation',
      marked: true,
      present: 30,
      absent: 2,
      type: 'classroom'
    },
    {
      id: 3,
      date: '2026-01-30',
      time: '2:00 PM',
      topic: 'CSS Flexbox & Grid',
      marked: false,
      present: 0,
      absent: 0,
      type: 'online'
    }
  ];

  const students = [
    { id: 1, name: 'John Doe', studentId: 'VTC2024001', status: 'present' },
    { id: 2, name: 'Jane Smith', studentId: 'VTC2024002', status: 'present' },
    { id: 3, name: 'Mike Johnson', studentId: 'VTC2024003', status: 'absent' },
    { id: 4, name: 'Sarah Williams', studentId: 'VTC2024004', status: 'present' },
    { id: 5, name: 'David Brown', studentId: 'VTC2024005', status: 'present' }
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 to-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/lecturer/dashboard')} className="hover:text-blue-300 transition">
                ← Back
              </button>
              <h1 className="text-2xl font-bold">Attendance Management</h1>
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
        {/* Course Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">Select Course</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent bg-white"
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name} ({course.students} students)
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sessions List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Sessions</h2>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg text-sm hover:from-blue-800 hover:to-blue-600 transition">
                  + New
                </button>
              </div>

              <div className="space-y-3">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    onClick={() => setSelectedSession(session)}
                    className={`p-4 rounded-lg cursor-pointer transition ${
                      selectedSession?.id === session.id
                        ? 'bg-blue-100 border-2 border-blue-900'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-800">{session.date}</p>
                      {session.marked ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                          ✓ Marked
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">
                          Pending
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{session.time}</p>
                    <p className="text-sm text-gray-800 font-medium">{session.topic}</p>
                    {session.marked && (
                      <div className="mt-2 pt-2 border-t border-gray-200 flex gap-4 text-xs">
                        <span className="text-green-600">✓ {session.present} Present</span>
                        <span className="text-red-600">✗ {session.absent} Absent</span>
                      </div>
                    )}
                    <div className="mt-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        session.type === 'online' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {session.type === 'online' ? '🌐 Online' : '🏫 Classroom'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Attendance Marking */}
          <div className="lg:col-span-2">
            {selectedSession ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Mark Attendance</h2>
                    <p className="text-gray-600">{selectedSession.topic}</p>
                    <p className="text-sm text-gray-500">{selectedSession.date} at {selectedSession.time}</p>
                  </div>
                  <div className="text-right">
                    <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
                      Save Attendance
                    </button>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-3 mb-6">
                  <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition">
                    Mark All Present
                  </button>
                  <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition">
                    Mark All Absent
                  </button>
                  {selectedSession.type === 'online' && (
                    <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition">
                      Auto Capture (Live Session)
                    </button>
                  )}
                </div>

                {/* Student List */}
                <div className="space-y-3">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{student.name}</p>
                          <p className="text-sm text-gray-600">{student.studentId}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className={`px-6 py-2 rounded-lg font-semibold transition ${
                            student.status === 'present'
                              ? 'bg-green-600 text-white'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          className={`px-6 py-2 rounded-lg font-semibold transition ${
                            student.status === 'absent'
                              ? 'bg-red-600 text-white'
                              : 'bg-red-100 text-red-700 hover:bg-red-200'
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Total: {students.length}</span>
                    <span className="text-green-700 font-semibold">
                      Present: {students.filter(s => s.status === 'present').length}
                    </span>
                    <span className="text-red-700 font-semibold">
                      Absent: {students.filter(s => s.status === 'absent').length}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Select a Session</h3>
                <p className="text-gray-600">Choose a session from the left to mark attendance</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LecturerAttendance;
