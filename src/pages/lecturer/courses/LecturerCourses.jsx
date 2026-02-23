import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const LecturerCourses = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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

  // Mock courses data
  const courses = [
    {
      id: 1,
      name: 'Web Development Fundamentals',
      code: 'WEB101',
      students: 32,
      duration: '12 weeks',
      modules: 4,
      completionRate: 75,
      status: 'active',
      thumbnail: 'https://via.placeholder.com/300x200/1e3a8a/ffffff?text=Web+Dev'
    },
    {
      id: 2,
      name: 'Database Management Systems',
      code: 'DB201',
      students: 28,
      duration: '10 weeks',
      modules: 5,
      completionRate: 68,
      status: 'active',
      thumbnail: 'https://via.placeholder.com/300x200/1e3a8a/ffffff?text=Database'
    },
    {
      id: 3,
      name: 'Mobile App Development',
      code: 'MOB301',
      students: 35,
      duration: '14 weeks',
      modules: 6,
      completionRate: 52,
      status: 'active',
      thumbnail: 'https://via.placeholder.com/300x200/1e3a8a/ffffff?text=Mobile'
    },
    {
      id: 4,
      name: 'Advanced JavaScript',
      code: 'JS401',
      students: 25,
      duration: '8 weeks',
      modules: 3,
      completionRate: 90,
      status: 'completed',
      thumbnail: 'https://via.placeholder.com/300x200/1e3a8a/ffffff?text=JavaScript'
    }
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
              <h1 className="text-2xl font-bold">My Courses</h1>
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
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 text-sm mb-2">Total Courses</p>
            <p className="text-3xl font-bold text-blue-900">{courses.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 text-sm mb-2">Total Students</p>
            <p className="text-3xl font-bold text-green-600">{courses.reduce((sum, c) => sum + c.students, 0)}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 text-sm mb-2">Active Courses</p>
            <p className="text-3xl font-bold text-purple-600">{courses.filter(c => c.status === 'active').length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 text-sm mb-2">Avg Completion</p>
            <p className="text-3xl font-bold text-orange-600">
              {Math.round(courses.reduce((sum, c) => sum + c.completionRate, 0) / courses.length)}%
            </p>
          </div>
        </div>

        {/* Add New Course Button */}
        <div className="mb-6">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 transition shadow-lg">
            + Add New Course
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src={course.thumbnail} alt={course.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-blue-900">{course.code}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    course.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {course.status === 'active' ? 'Active' : 'Completed'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{course.name}</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                  <div>
                    <p className="text-gray-500">Students</p>
                    <p className="font-semibold text-gray-800">{course.students}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Modules</p>
                    <p className="font-semibold text-gray-800">{course.modules}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-800">{course.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Completion</p>
                    <p className="font-semibold text-gray-800">{course.completionRate}%</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-900 to-blue-700 h-2 rounded-full"
                      style={{ width: `${course.completionRate}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/lecturer/course/${course.id}`)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 transition text-sm"
                  >
                    Manage
                  </button>
                  <button
                    onClick={() => navigate(`/lecturer/course/${course.id}/students`)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition text-sm"
                  >
                    Students
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition text-sm">
                    📊
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LecturerCourses;
