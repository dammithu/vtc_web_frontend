import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const StudentAssessments = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('quizzes');

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

  // Mock assessments data
  const quizzes = [
    {
      id: 1,
      title: 'HTML Basics Quiz',
      course: 'Web Development',
      questions: 20,
      duration: '30 min',
      deadline: '2026-02-10',
      status: 'completed',
      score: 85,
      passMark: 70
    },
    {
      id: 2,
      title: 'CSS Fundamentals',
      course: 'Web Development',
      questions: 15,
      duration: '25 min',
      deadline: '2026-02-15',
      status: 'pending',
      attempts: 2
    },
    {
      id: 3,
      title: 'Database Concepts',
      course: 'Database Management',
      questions: 25,
      duration: '40 min',
      deadline: '2026-02-12',
      status: 'in-progress',
      attempts: 1
    }
  ];

  const assignments = [
    {
      id: 1,
      title: 'Build a Portfolio Website',
      course: 'Web Development',
      deadline: '2026-02-20',
      status: 'submitted',
      submittedDate: '2026-02-18',
      marks: 92,
      totalMarks: 100
    },
    {
      id: 2,
      title: 'Database Design Project',
      course: 'Database Management',
      deadline: '2026-02-25',
      status: 'pending',
      daysLeft: 22
    },
    {
      id: 3,
      title: 'Mobile App Prototype',
      course: 'Mobile App Development',
      deadline: '2026-03-05',
      status: 'pending',
      daysLeft: 30
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
              <button onClick={() => navigate('/student/dashboard')} className="hover:text-blue-300 transition">
                ← Back
              </button>
              <h1 className="text-2xl font-bold">Assessments</h1>
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
            Quizzes
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
        </div>

        {/* Quizzes Tab */}
        {activeTab === 'quizzes' && (
          <div className="space-y-6">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{quiz.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        quiz.status === 'completed' ? 'bg-green-100 text-green-700' :
                        quiz.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {quiz.status === 'completed' ? 'Completed' :
                         quiz.status === 'in-progress' ? 'In Progress' : 'Not Attempted'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{quiz.course}</p>
                    <div className="flex gap-6 text-sm text-gray-600">
                      <span>📝 {quiz.questions} questions</span>
                      <span>⏱️ {quiz.duration}</span>
                      <span>📅 Due: {quiz.deadline}</span>
                    </div>
                    {quiz.status === 'completed' && (
                      <div className="mt-4 p-4 bg-green-50 rounded-lg">
                        <p className="text-green-800 font-semibold">
                          Score: {quiz.score}/{quiz.passMark} (Pass Mark: {quiz.passMark})
                        </p>
                        <p className="text-sm text-green-600 mt-1">✓ Passed</p>
                      </div>
                    )}
                    {quiz.status === 'pending' && quiz.attempts > 0 && (
                      <p className="mt-4 text-sm text-gray-600">Attempts remaining: {quiz.attempts}</p>
                    )}
                  </div>
                  <div>
                    {quiz.status === 'completed' ? (
                      <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition">
                        View Results
                      </button>
                    ) : (
                      <button className="px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 transition">
                        {quiz.status === 'in-progress' ? 'Continue' : 'Start Quiz'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{assignment.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        assignment.status === 'submitted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {assignment.status === 'submitted' ? 'Submitted' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{assignment.course}</p>
                    <div className="flex gap-6 text-sm text-gray-600">
                      <span>📅 Deadline: {assignment.deadline}</span>
                      {assignment.status === 'pending' && (
                        <span className="text-orange-600 font-semibold">
                          ⏰ {assignment.daysLeft} days left
                        </span>
                      )}
                    </div>
                    {assignment.status === 'submitted' && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-blue-800 font-semibold">
                          Submitted on: {assignment.submittedDate}
                        </p>
                        {assignment.marks && (
                          <p className="text-sm text-blue-600 mt-1">
                            Marks: {assignment.marks}/{assignment.totalMarks}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    {assignment.status === 'submitted' ? (
                      <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition">
                        View Submission
                      </button>
                    ) : (
                      <button className="px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 transition">
                        Upload Assignment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentAssessments;
