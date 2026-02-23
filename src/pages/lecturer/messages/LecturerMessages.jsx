import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const LecturerMessages = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('announcements');

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
  const announcements = [
    {
      id: 1,
      course: 'Web Development',
      title: 'Assignment 3 Deadline Extended',
      message: 'The deadline for Assignment 3 has been extended to February 20, 2026.',
      date: '2 hours ago',
      views: 28
    },
    {
      id: 2,
      course: 'Database Management',
      title: 'Lab Session Moved',
      message: 'Tomorrow\'s lab session has been moved from Thursday to Friday at 2:00 PM.',
      date: '1 day ago',
      views: 25
    }
  ];

  const messages = [
    {
      id: 1,
      from: 'John Doe',
      studentId: 'VTC2024001',
      subject: 'Question about Assignment 2',
      message: 'Hi sir, I have a question regarding the database design assignment...',
      date: '3 hours ago',
      read: false
    },
    {
      id: 2,
      from: 'Jane Smith',
      studentId: 'VTC2024002',
      subject: 'Request for Extension',
      message: 'Dear sir, I would like to request an extension for the project submission...',
      date: '1 day ago',
      read: true
    }
  ];

  const discussions = [
    {
      id: 1,
      course: 'Web Development',
      title: 'Best practices for responsive design',
      author: 'John Doe',
      replies: 12,
      lastActivity: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      course: 'Database Management',
      title: 'SQL query optimization tips',
      author: 'Sarah Williams',
      replies: 8,
      lastActivity: '5 hours ago',
      status: 'active'
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
              <h1 className="text-2xl font-bold">Messages & Announcements</h1>
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
            onClick={() => setActiveTab('announcements')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'announcements'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Course Announcements
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-3 font-semibold transition relative ${
              activeTab === 'messages'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Student Messages
            {messages.filter(m => !m.read).length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {messages.filter(m => !m.read).length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('discussions')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'discussions'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Discussion Threads
          </button>
        </div>

        {/* Announcements Tab */}
        {activeTab === 'announcements' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Course Announcements</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 transition">
                + Create Announcement
              </button>
            </div>

            {/* Create Announcement Form */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="font-bold text-gray-800 mb-4">New Announcement</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent bg-white">
                    <option>Web Development Fundamentals</option>
                    <option>Database Management Systems</option>
                    <option>Mobile App Development</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="Enter announcement title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows="4"
                    placeholder="Enter your announcement message"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 transition"
                >
                  Post Announcement
                </button>
              </form>
            </div>

            {/* Announcements List */}
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-lg text-sm font-semibold">
                        {announcement.course}
                      </span>
                      <h3 className="text-xl font-bold text-gray-800 mt-2">{announcement.title}</h3>
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
                  <p className="text-gray-700 mb-4">{announcement.message}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>👁️ {announcement.views} views</span>
                    <span>{announcement.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Messages</h2>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`bg-white rounded-xl shadow-lg p-6 ${!message.read ? 'border-l-4 border-blue-900' : ''}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                        {message.from.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{message.from}</h3>
                        <p className="text-sm text-gray-600">{message.studentId}</p>
                      </div>
                      {!message.read && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-semibold">
                          New
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{message.date}</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">{message.subject}</h4>
                  <p className="text-gray-700 mb-4">{message.message}</p>
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg hover:from-blue-800 hover:to-blue-600 transition">
                    Reply
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Discussion Threads</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 transition">
                + Create Thread
              </button>
            </div>

            <div className="space-y-4">
              {discussions.map((discussion) => (
                <div key={discussion.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-purple-100 text-purple-900 rounded-lg text-sm font-semibold">
                          {discussion.course}
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          {discussion.status}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{discussion.title}</h3>
                      <p className="text-sm text-gray-600">Started by {discussion.author}</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>💬 {discussion.replies} replies</span>
                    <span>Last activity: {discussion.lastActivity}</span>
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

export default LecturerMessages;
