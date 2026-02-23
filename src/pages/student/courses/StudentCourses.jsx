import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BookOpen, Clock, TrendingUp, Search, Filter } from 'lucide-react';

const StudentCourses = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock courses data
  const courses = [
    {
      id: 1,
      name: 'Web Development Fundamentals',
      instructor: 'Mr. Silva',
      progress: 75,
      thumbnail: 'https://via.placeholder.com/400x250/4f46e5/ffffff?text=Web+Development',
      duration: '12 weeks',
      lessons: 24,
      completedLessons: 18,
      status: 'in-progress'
    },
    {
      id: 2,
      name: 'Database Management Systems',
      instructor: 'Ms. Perera',
      progress: 60,
      thumbnail: 'https://via.placeholder.com/400x250/7c3aed/ffffff?text=Database',
      duration: '10 weeks',
      lessons: 20,
      completedLessons: 12,
      status: 'in-progress'
    },
    {
      id: 3,
      name: 'Mobile App Development',
      instructor: 'Mr. Fernando',
      progress: 45,
      thumbnail: 'https://via.placeholder.com/400x250/2563eb/ffffff?text=Mobile+Apps',
      duration: '14 weeks',
      lessons: 28,
      completedLessons: 13,
      status: 'in-progress'
    },
    {
      id: 4,
      name: 'UI/UX Design Principles',
      instructor: 'Ms. Jayawardena',
      progress: 100,
      thumbnail: 'https://via.placeholder.com/400x250/059669/ffffff?text=UI+UX+Design',
      duration: '8 weeks',
      lessons: 16,
      completedLessons: 16,
      status: 'completed'
    },
    {
      id: 5,
      name: 'Cloud Computing Basics',
      instructor: 'Mr. Rajapaksa',
      progress: 20,
      thumbnail: 'https://via.placeholder.com/400x250/dc2626/ffffff?text=Cloud+Computing',
      duration: '16 weeks',
      lessons: 32,
      completedLessons: 6,
      status: 'in-progress'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'in-progress' && course.status === 'in-progress') ||
                      (activeTab === 'completed' && course.status === 'completed');
    return matchesSearch && matchesTab;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Courses</h1>
        <p className="text-gray-600">Continue learning and track your progress</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({courses.length})
            </button>
            <button
              onClick={() => setActiveTab('in-progress')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'in-progress'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              In Progress ({courses.filter(c => c.status === 'in-progress').length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'completed'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed ({courses.filter(c => c.status === 'completed').length})
            </button>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group"
            onClick={() => navigate(`/student/course/${course.id}`)}
          >
            {/* Thumbnail */}
            <div className="relative overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {course.status === 'completed' && (
                <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Completed
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition">
                {course.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {course.instructor}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <BookOpen size={16} />
                  <span>{course.completedLessons}/{course.lessons} lessons</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 font-medium">Progress</span>
                  <span className="font-bold text-indigo-600">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      course.progress === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-indigo-500 to-purple-600'
                    }`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Button */}
              <button
                className="w-full mt-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/student/course/${course.id}`);
                }}
              >
                {course.status === 'completed' ? 'Review Course' : 'Continue Learning'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="mx-auto mb-4 text-gray-400" size={64} />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No courses found</h3>
          <p className="text-gray-500">Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  );
};

export default StudentCourses;
