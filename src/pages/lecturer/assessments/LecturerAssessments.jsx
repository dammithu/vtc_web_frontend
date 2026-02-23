import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const LecturerAssessments = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('quizzes');

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
  const quizzes = [
    {
      id: 1,
      title: 'HTML Basics Quiz',
      course: 'Web Development',
      questions: 20,
      duration: '30 min',
      type: 'MCQ',
      submissions: 28,
      totalStudents: 32,
      avgScore: 82,
      status: 'active'
    },
    {
      id: 2,
      title: 'CSS Fundamentals',
      course: 'Web Development',
      questions: 15,
      duration: '25 min',
      type: 'MCQ',
      submissions: 15,
      totalStudents: 32,
      avgScore: 75,
      status: 'active'
    }
  ];

  const assignments = [
    {
      id: 1,
      title: 'Build a Portfolio Website',
      course: 'Web Development',
      deadline: '2026-02-20',
      submissions: 25,
      totalStudents: 32,
      graded: 18,
      pending: 7,
      status: 'open'
    },
    {
      id: 2,
      title: 'Database Design Project',
      course: 'Database Management',
      deadline: '2026-02-25',
      submissions: 12,
      totalStudents: 28,
      graded: 5,
      pending: 7,
      status: 'open'
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
              <h1 className="text-2xl font-bold">Assessments Management</h1>
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
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'quizzes'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Quizzes (MCQ)
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'assignments'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Assignments
          </button>
          <button
            onClick={() => setActiveTab('questionbank')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'questionbank'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Question Bank
          </button>
        </div>

        {/* Quizzes Tab */}
        {activeTab === 'quizzes' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">MCQ Quizzes</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 transition">
                + Create New Quiz
              </button>
            </div>

            <div className="space-y-6">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{quiz.title}</h3>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          {quiz.status}
                        </span>
                      </div>
                      <p className="text-gray-600">{quiz.course}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 transition">
                        Edit
                      </button>
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                        View Results
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Questions</p>
                      <p className="text-2xl font-bold text-blue-900">{quiz.questions}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Submissions</p>
                      <p className="text-2xl font-bold text-green-700">{quiz.submissions}/{quiz.totalStudents}</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Avg Score</p>
                      <p className="text-2xl font-bold text-purple-700">{quiz.avgScore}%</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Duration</p>
                      <p className="text-2xl font-bold text-orange-700">{quiz.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-4 py-2 bg-blue-100 text-blue-900 rounded-lg text-sm font-semibold">
                      {quiz.type} - Auto Grading
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Assignments (Manual Grading)</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 transition">
                + Create New Assignment
              </button>
            </div>

            <div className="space-y-6">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{assignment.title}</h3>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                          {assignment.pending} Pending Review
                        </span>
                      </div>
                      <p className="text-gray-600">{assignment.course}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 transition">
                        Edit
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                        Grade Submissions
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Submissions</p>
                      <p className="text-2xl font-bold text-blue-900">{assignment.submissions}/{assignment.totalStudents}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Graded</p>
                      <p className="text-2xl font-bold text-green-700">{assignment.graded}</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Pending</p>
                      <p className="text-2xl font-bold text-yellow-700">{assignment.pending}</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Deadline</p>
                      <p className="text-lg font-bold text-red-700">{assignment.deadline}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Grading Progress</span>
                      <span className="font-semibold">{Math.round((assignment.graded / assignment.submissions) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-600 to-green-500 h-2 rounded-full"
                        style={{ width: `${(assignment.graded / assignment.submissions) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Question Bank Tab */}
        {activeTab === 'questionbank' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Question Bank</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 transition">
                + Add Question
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-4xl mb-3">📝</div>
                <p className="text-3xl font-bold text-blue-900 mb-2">156</p>
                <p className="text-gray-600">Total Questions</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-4xl mb-3">✅</div>
                <p className="text-3xl font-bold text-green-600 mb-2">98</p>
                <p className="text-gray-600">MCQ Questions</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-4xl mb-3">📋</div>
                <p className="text-3xl font-bold text-purple-600 mb-2">58</p>
                <p className="text-gray-600">Essay Questions</p>
              </div>
            </div>

            {/* Filter by Course */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="font-bold text-gray-800 mb-4">Filter Questions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent bg-white">
                  <option>All Courses</option>
                  <option>Web Development</option>
                  <option>Database Management</option>
                  <option>Mobile App Development</option>
                </select>
                <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent bg-white">
                  <option>All Types</option>
                  <option>MCQ</option>
                  <option>True/False</option>
                  <option>Essay</option>
                </select>
                <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent bg-white">
                  <option>All Difficulty</option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>

            {/* Sample Questions */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-lg text-sm font-semibold">MCQ</span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">Easy</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 transition text-sm">
                        Edit
                      </button>
                      <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-800 font-semibold mb-3">
                    What does HTML stand for?
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>A) Hyper Text Markup Language ✓</p>
                    <p>B) High Tech Modern Language</p>
                    <p>C) Home Tool Markup Language</p>
                    <p>D) Hyperlinks and Text Markup Language</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LecturerAssessments;
