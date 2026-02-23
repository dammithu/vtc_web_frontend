import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { BookOpen, Clock, User, Mail, Phone, PlayCircle, CheckCircle, Lock, FileText, Award } from 'lucide-react';

const CourseDetails = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState('content');

  // Mock course data
  const course = {
    id: courseId,
    name: 'Web Development Fundamentals',
    instructor: 'Mr. Silva',
    email: 'silva@vtc.lk',
    phone: '+94 77 123 4567',
    description: 'Learn the fundamentals of web development including HTML, CSS, JavaScript, and modern frameworks. This comprehensive course will take you from beginner to advanced level.',
    duration: '12 weeks',
    totalLessons: 24,
    completedLessons: 18,
    progress: 75,
    thumbnail: 'https://via.placeholder.com/800x400/4f46e5/ffffff?text=Web+Development+Fundamentals',
    modules: [
      {
        id: 1,
        title: 'Introduction to Web Development',
        lessons: [
          { id: 1, title: 'What is Web Development?', duration: '15 min', completed: true },
          { id: 2, title: 'Setting up Development Environment', duration: '30 min', completed: true },
          { id: 3, title: 'Your First Webpage', duration: '45 min', completed: true }
        ]
      },
      {
        id: 2,
        title: 'HTML Basics',
        lessons: [
          { id: 4, title: 'HTML Structure', duration: '20 min', completed: true },
          { id: 5, title: 'HTML Elements & Tags', duration: '35 min', completed: true },
          { id: 6, title: 'Forms and Input', duration: '40 min', completed: true }
        ]
      },
      {
        id: 3,
        title: 'CSS Styling',
        lessons: [
          { id: 7, title: 'CSS Basics', duration: '25 min', completed: true },
          { id: 8, title: 'Flexbox Layout', duration: '45 min', completed: true },
          { id: 9, title: 'Responsive Design', duration: '50 min', completed: false }
        ]
      },
      {
        id: 4,
        title: 'JavaScript Fundamentals',
        lessons: [
          { id: 10, title: 'Variables and Data Types', duration: '30 min', completed: false },
          { id: 11, title: 'Functions and Scope', duration: '35 min', completed: false },
          { id: 12, title: 'DOM Manipulation', duration: '40 min', completed: false }
        ]
      }
    ],
    syllabus: [
      'HTML5 and Semantic Markup',
      'CSS3 and Modern Styling',
      'JavaScript ES6+ Fundamentals',
      'Responsive Web Design',
      'Version Control with Git',
      'Web Development Best Practices'
    ],
    learningOutcomes: [
      'Build responsive websites from scratch',
      'Understand HTML, CSS, and JavaScript fundamentals',
      'Create interactive web applications',
      'Apply modern web development practices'
    ]
  };


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Course Banner */}
      <div className="relative mb-8 rounded-2xl overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-white mb-2">{course.name}</h1>
            <p className="text-gray-200 mb-4">{course.description}</p>
            <div className="flex items-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <BookOpen size={20} />
                <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={20} />
                <span>{course.instructor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-700 font-medium">Course Progress</span>
          <span className="text-indigo-600 font-bold">{course.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 px-6">
            <button
              onClick={() => setActiveTab('content')}
              className={`py-4 px-4 font-medium transition border-b-2 ${
                activeTab === 'content'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <FileText className="inline mr-2" size={18} />
              Course Content
            </button>
            <button
              onClick={() => setActiveTab('instructor')}
              className={`py-4 px-4 font-medium transition border-b-2 ${
                activeTab === 'instructor'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <User className="inline mr-2" size={18} />
              Instructor
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`py-4 px-4 font-medium transition border-b-2 ${
                activeTab === 'about'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <Award className="inline mr-2" size={18} />
              About
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'content' && (
            <div className="space-y-4">
              {course.modules.map((module) => (
                <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4">
                    <h3 className="font-bold text-lg text-gray-800">
                      Module {module.id}: {module.title}
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition flex items-center justify-between"
                        onClick={() => navigate(`/student/course/${courseId}/lesson/${lesson.id}`)}
                      >
                        <div className="flex items-center gap-4">
                          {lesson.completed ? (
                            <CheckCircle className="text-green-500" size={24} />
                          ) : (
                            <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
                              <Lock className="text-gray-400" size={14} />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-gray-800">{lesson.title}</p>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock size={14} />
                              {lesson.duration}
                            </p>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition">
                          <PlayCircle size={18} />
                          {lesson.completed ? 'Review' : 'Start'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'instructor' && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {course.instructor.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{course.instructor}</h3>
                  <p className="text-gray-600">Senior Lecturer</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail size={20} className="text-indigo-600" />
                  <span>{course.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone size={20} className="text-indigo-600" />
                  <span>{course.phone}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Course Syllabus</h3>
                <ul className="space-y-2">
                  {course.syllabus.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Learning Outcomes</h3>
                <ul className="space-y-2">
                  {course.learningOutcomes.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Award className="text-indigo-600 mt-1 flex-shrink-0" size={18} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
