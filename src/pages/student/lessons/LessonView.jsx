import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const LessonView = () => {
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams();
  const [user, setUser] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

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

  const handleMarkComplete = () => {
    setIsCompleted(true);
    alert('Lesson marked as completed!');
  };

  // Mock lesson data
  const lesson = {
    id: lessonId,
    title: 'HTML Elements & Tags',
    duration: '35 min',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'In this lesson, you will learn about HTML elements and tags. We\'ll cover common HTML tags, their attributes, and how to use them effectively to structure your web pages.',
    materials: [
      { id: 1, name: 'Lesson Slides.pdf', size: '2.5 MB', url: '#' },
      { id: 2, name: 'Code Examples.zip', size: '1.2 MB', url: '#' },
      { id: 3, name: 'Exercise Files.zip', size: '3.8 MB', url: '#' }
    ],
    comments: [
      { id: 1, user: 'John Doe', time: '2 days ago', text: 'Great explanation! Very clear and easy to understand.' },
      { id: 2, user: 'Jane Smith', time: '5 days ago', text: 'Can you provide more examples on nested elements?' }
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
              <button onClick={() => navigate(`/student/course/${courseId}`)} className="hover:text-blue-300 transition">
                ← Back to Course
              </button>
              <h1 className="text-xl font-bold">{lesson.title}</h1>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video & Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="bg-black rounded-xl overflow-hidden mb-6 shadow-lg">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={lesson.videoUrl}
                  title={lesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Lesson Description */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{lesson.title}</h2>
                <span className="text-gray-600">⏱️ {lesson.duration}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{lesson.description}</p>
              
              <div className="mt-6">
                <button
                  onClick={handleMarkComplete}
                  disabled={isCompleted}
                  className={`px-6 py-3 rounded-lg font-semibold transition ${
                    isCompleted
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-900 to-blue-700 text-white hover:from-blue-800 hover:to-blue-600'
                  }`}
                >
                  {isCompleted ? '✓ Completed' : 'Mark as Completed'}
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Comments & Discussion</h3>
              
              {/* Add Comment */}
              <div className="mb-6">
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent resize-none"
                  rows="3"
                  placeholder="Add a comment..."
                ></textarea>
                <button className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 transition">
                  Post Comment
                </button>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {lesson.comments.map((comment) => (
                  <div key={comment.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                        {comment.user.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{comment.user}</p>
                        <p className="text-xs text-gray-500">{comment.time}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 ml-13">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Downloadable Materials */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Downloadable Materials</h3>
              <div className="space-y-3">
                {lesson.materials.map((material) => (
                  <a
                    key={material.id}
                    href={material.url}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-900">
                        📄
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 group-hover:text-blue-900 transition">
                          {material.name}
                        </p>
                        <p className="text-xs text-gray-500">{material.size}</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Next Lesson */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Next Lesson</h3>
              <p className="text-blue-100 mb-4">Forms and Input Elements</p>
              <button
                onClick={() => navigate(`/student/course/${courseId}/lesson/${parseInt(lessonId) + 1}`)}
                className="w-full px-4 py-2 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Continue →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LessonView;
