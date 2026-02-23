import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const CourseContentManagement = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('modules');

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

  // Mock course data
  const course = {
    id: courseId,
    name: 'Web Development Fundamentals',
    code: 'WEB101',
    description: 'Comprehensive course on web development covering HTML, CSS, JavaScript, and modern frameworks.',
    duration: '12 weeks',
    students: 32,
    modules: [
      {
        id: 1,
        title: 'Introduction to Web Development',
        lessons: [
          { id: 1, title: 'What is Web Development?', type: 'video', duration: '15 min', status: 'published' },
          { id: 2, title: 'Setting up Environment', type: 'video', duration: '30 min', status: 'published' },
          { id: 3, title: 'First Webpage', type: 'pdf', size: '2 MB', status: 'published' }
        ]
      },
      {
        id: 2,
        title: 'HTML Basics',
        lessons: [
          { id: 4, title: 'HTML Structure', type: 'video', duration: '20 min', status: 'published' },
          { id: 5, title: 'HTML Elements', type: 'video', duration: '35 min', status: 'draft' }
        ]
      }
    ]
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 to-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/lecturer/courses')} className="hover:text-blue-300 transition">
                ← Back to Courses
              </button>
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

      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-200 mb-2">{course.code}</p>
              <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
              <div className="flex gap-6 text-sm text-blue-100">
                <span>👥 {course.students} Students</span>
                <span>⏱️ {course.duration}</span>
                <span>📚 {course.modules.length} Modules</span>
              </div>
            </div>
            <button className="px-6 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition">
              Edit Course Info
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('modules')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'modules'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Modules & Lessons
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'materials'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Materials
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'settings'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Modules & Lessons Tab */}
        {activeTab === 'modules' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Course Modules</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 transition">
                + Add Module
              </button>
            </div>

            <div className="space-y-6">
              {course.modules.map((module) => (
                <div key={module.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        Module {module.id}: {module.title}
                      </h3>
                      <p className="text-gray-600">{module.lessons.length} lessons</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 transition">
                        Edit
                      </button>
                      <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition">
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Lessons List */}
                  <div className="space-y-3 mb-4">
                    {module.lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-900">
                            {lesson.type === 'video' ? '🎥' : '📄'}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{lesson.title}</p>
                            <p className="text-sm text-gray-600">
                              {lesson.type === 'video' ? lesson.duration : lesson.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            lesson.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {lesson.status}
                          </span>
                          <button className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition text-sm">
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                    + Add Lesson
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Materials Tab */}
        {activeTab === 'materials' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload Materials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Upload Video */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-2xl">
                      🎥
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Upload Video</h3>
                      <p className="text-sm text-gray-600">MP4, MOV, AVI (Max 500MB)</p>
                    </div>
                  </div>
                  <button className="w-full px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-900 hover:bg-blue-50 transition">
                    Choose Video File
                  </button>
                </div>

                {/* Upload PDF */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                      📄
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Upload PDF</h3>
                      <p className="text-sm text-gray-600">PDF Documents (Max 50MB)</p>
                    </div>
                  </div>
                  <button className="w-full px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-900 hover:bg-blue-50 transition">
                    Choose PDF File
                  </button>
                </div>

                {/* Upload Lab Manual */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                      📗
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Lab Manual</h3>
                      <p className="text-sm text-gray-600">PDF, DOCX (Max 50MB)</p>
                    </div>
                  </div>
                  <button className="w-full px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-900 hover:bg-blue-50 transition">
                    Choose Manual File
                  </button>
                </div>

                {/* Upload Resource */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
                      📦
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Other Resources</h3>
                      <p className="text-sm text-gray-600">ZIP, RAR (Max 100MB)</p>
                    </div>
                  </div>
                  <button className="w-full px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-900 hover:bg-blue-50 transition">
                    Choose Resource File
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Settings</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
                <input
                  type="text"
                  defaultValue={course.name}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Code</label>
                <input
                  type="text"
                  defaultValue={course.code}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows="4"
                  defaultValue={course.description}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    defaultValue={course.duration}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent bg-white">
                    <option>Active</option>
                    <option>Draft</option>
                    <option>Archived</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 transition"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default CourseContentManagement;
