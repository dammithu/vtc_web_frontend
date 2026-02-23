import { Download, Award, FileText, CheckCircle } from 'lucide-react';

const StudentResults = () => {
  const completedCourses = [
    {
      id: 1,
      title: 'UI/UX Design Principles',
      completedDate: 'Jan 15, 2026',
      grade: 'A',
      percentage: 92,
      certificate: true,
    },
    {
      id: 2,
      title: 'Introduction to Python',
      completedDate: 'Dec 10, 2025',
      grade: 'B+',
      percentage: 87,
      certificate: true,
    },
    {
      id: 3,
      title: 'HTML & CSS Basics',
      completedDate: 'Nov 20, 2025',
      grade: 'A-',
      percentage: 90,
      certificate: true,
    },
  ];

  const ongoingCourses = [
    {
      id: 1,
      title: 'Web Development Fundamentals',
      quizzes: { completed: 8, total: 10, average: 85 },
      assignments: { completed: 6, total: 8, average: 88 },
    },
    {
      id: 2,
      title: 'Database Management Systems',
      quizzes: { completed: 5, total: 8, average: 78 },
      assignments: { completed: 4, total: 6, average: 82 },
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Results & Certificates</h1>
        <p className="text-gray-600 mt-1">View your achievements and download certificates</p>
      </div>

      {/* Completed Courses */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="text-indigo-600" size={28} />
          Completed Courses
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {completedCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{course.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">Completed on {course.completedDate}</p>
                </div>
                <CheckCircle className="text-green-500" size={24} />
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-indigo-600">{course.grade}</div>
                  <div className="text-xs text-gray-600">Grade</div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-indigo-600">{course.percentage}%</div>
                  <div className="text-xs text-gray-600">Score</div>
                </div>
              </div>

              {course.certificate && (
                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2">
                  <Download size={18} />
                  Download Certificate
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Ongoing Courses Performance */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="text-indigo-600" size={28} />
          Ongoing Courses
        </h2>

        <div className="space-y-4">
          {ongoingCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">{course.title}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Quizzes</span>
                    <span className="text-xs text-gray-600">
                      {course.quizzes.completed}/{course.quizzes.total} completed
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(course.quizzes.completed / course.quizzes.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-blue-600">{course.quizzes.average}%</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Assignments</span>
                    <span className="text-xs text-gray-600">
                      {course.assignments.completed}/{course.assignments.total} completed
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(course.assignments.completed / course.assignments.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-green-600">{course.assignments.average}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentResults;
