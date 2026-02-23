import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const StudentPerformance = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('1');

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
    { id: '1', name: 'Web Development Fundamentals' },
    { id: '2', name: 'Database Management Systems' },
    { id: '3', name: 'Mobile App Development' }
  ];

  const performanceData = {
    avgScore: 78,
    passRate: 85,
    completionRate: 72,
    topPerformers: 8
  };

  const students = [
    {
      id: 1,
      name: 'John Doe',
      studentId: 'VTC2024001',
      avatar: 'J',
      progress: 95,
      avgScore: 92,
      attendance: 98,
      assignments: '12/12',
      quizzes: '8/8',
      status: 'excellent'
    },
    {
      id: 2,
      name: 'Jane Smith',
      studentId: 'VTC2024002',
      avatar: 'J',
      progress: 88,
      avgScore: 85,
      attendance: 95,
      assignments: '11/12',
      quizzes: '8/8',
      status: 'good'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      studentId: 'VTC2024003',
      avatar: 'M',
      progress: 65,
      avgScore: 68,
      attendance: 82,
      assignments: '9/12',
      quizzes: '6/8',
      status: 'average'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      studentId: 'VTC2024004',
      avatar: 'S',
      progress: 45,
      avgScore: 52,
      attendance: 70,
      assignments: '7/12',
      quizzes: '5/8',
      status: 'needs-attention'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'good':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'average':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'needs-attention':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

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
              <h1 className="text-2xl font-bold">Student Performance Analytics</h1>
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
                {course.name}
              </option>
            ))}
          </select>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl p-6 text-white shadow-lg">
            <p className="text-blue-100 text-sm font-medium mb-2">Average Score</p>
            <p className="text-4xl font-bold mb-1">{performanceData.avgScore}%</p>
            <p className="text-sm text-blue-100">Across all assessments</p>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-500 rounded-xl p-6 text-white shadow-lg">
            <p className="text-green-100 text-sm font-medium mb-2">Pass Rate</p>
            <p className="text-4xl font-bold mb-1">{performanceData.passRate}%</p>
            <p className="text-sm text-green-100">Students passing</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-500 rounded-xl p-6 text-white shadow-lg">
            <p className="text-purple-100 text-sm font-medium mb-2">Completion Rate</p>
            <p className="text-4xl font-bold mb-1">{performanceData.completionRate}%</p>
            <p className="text-sm text-purple-100">Course progress</p>
          </div>
          <div className="bg-gradient-to-br from-orange-600 to-orange-500 rounded-xl p-6 text-white shadow-lg">
            <p className="text-orange-100 text-sm font-medium mb-2">Top Performers</p>
            <p className="text-4xl font-bold mb-1">{performanceData.topPerformers}</p>
            <p className="text-sm text-orange-100">Above 90% score</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Performance Distribution</h3>
            <div className="h-64 flex items-end justify-around gap-4">
              <div className="flex flex-col items-center flex-1">
                <div className="w-full bg-red-500 rounded-t-lg" style={{ height: '30%' }}></div>
                <p className="text-sm font-semibold text-gray-700 mt-2">0-50</p>
                <p className="text-xs text-gray-500">12%</p>
              </div>
              <div className="flex flex-col items-center flex-1">
                <div className="w-full bg-yellow-500 rounded-t-lg" style={{ height: '45%' }}></div>
                <p className="text-sm font-semibold text-gray-700 mt-2">51-70</p>
                <p className="text-xs text-gray-500">28%</p>
              </div>
              <div className="flex flex-col items-center flex-1">
                <div className="w-full bg-blue-500 rounded-t-lg" style={{ height: '75%' }}></div>
                <p className="text-sm font-semibold text-gray-700 mt-2">71-85</p>
                <p className="text-xs text-gray-500">35%</p>
              </div>
              <div className="flex flex-col items-center flex-1">
                <div className="w-full bg-green-500 rounded-t-lg" style={{ height: '60%' }}></div>
                <p className="text-sm font-semibold text-gray-700 mt-2">86-100</p>
                <p className="text-xs text-gray-500">25%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Attendance vs Performance</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-gray-600">Chart visualization</p>
                <p className="text-sm text-gray-500">Coming soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Student Performance Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Individual Student Profiles</h2>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              Export Report
            </button>
          </div>

          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className={`border-2 rounded-xl p-6 ${getStatusColor(student.status)}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {student.avatar}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
                      <p className="text-gray-600">{student.studentId}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/lecturer/student/${student.id}`)}
                    className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
                  >
                    View Profile
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Progress</p>
                    <p className="text-2xl font-bold">{student.progress}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Avg Score</p>
                    <p className="text-2xl font-bold">{student.avgScore}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Attendance</p>
                    <p className="text-2xl font-bold">{student.attendance}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Assignments</p>
                    <p className="text-2xl font-bold">{student.assignments}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Quizzes</p>
                    <p className="text-2xl font-bold">{student.quizzes}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        student.status === 'excellent' ? 'bg-green-600' :
                        student.status === 'good' ? 'bg-blue-600' :
                        student.status === 'average' ? 'bg-yellow-600' :
                        'bg-red-600'
                      }`}
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                </div>

                <p className="text-sm font-semibold">
                  Status: <span className="uppercase">{student.status.replace('-', ' ')}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentPerformance;
