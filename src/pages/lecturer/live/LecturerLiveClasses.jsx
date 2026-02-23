import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const LecturerLiveClasses = () => {
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

  // Mock data
  const upcomingSessions = [
    {
      id: 1,
      course: 'Web Development',
      topic: 'JavaScript Functions & Closures',
      date: '2026-02-05',
      time: '10:00 AM',
      duration: '2 hours',
      platform: 'zoom',
      meetingLink: 'https://zoom.us/j/123456789',
      students: 32
    },
    {
      id: 2,
      course: 'Database Management',
      topic: 'SQL Joins & Subqueries',
      date: '2026-02-06',
      time: '2:00 PM',
      duration: '1.5 hours',
      platform: 'meet',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      students: 28
    }
  ];

  const recordings = [
    {
      id: 1,
      course: 'Web Development',
      topic: 'HTML & CSS Basics',
      date: '2026-02-01',
      duration: '1:45:30',
      views: 28,
      size: '245 MB',
      thumbnail: 'https://via.placeholder.com/400x225/1e3a8a/ffffff?text=Recording'
    },
    {
      id: 2,
      course: 'Database Management',
      topic: 'Database Design Principles',
      date: '2026-01-30',
      duration: '2:10:15',
      views: 25,
      size: '312 MB',
      thumbnail: 'https://via.placeholder.com/400x225/1e3a8a/ffffff?text=Recording'
    },
    {
      id: 3,
      course: 'Mobile App Development',
      topic: 'React Native Fundamentals',
      date: '2026-01-28',
      duration: '1:55:45',
      views: 30,
      size: '278 MB',
      thumbnail: 'https://via.placeholder.com/400x225/1e3a8a/ffffff?text=Recording'
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
              <h1 className="text-2xl font-bold">Live Classes</h1>
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
        {/* Schedule New Session */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Schedule New Live Session</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent bg-white">
                <option>Web Development Fundamentals</option>
                <option>Database Management Systems</option>
                <option>Mobile App Development</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
              <input
                type="text"
                placeholder="Enter session topic"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <input
                type="time"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
              <input
                type="number"
                step="0.5"
                placeholder="2"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent bg-white">
                <option>Zoom</option>
                <option>Google Meet</option>
                <option>Microsoft Teams</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Link</label>
              <input
                type="url"
                placeholder="https://zoom.us/j/..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2 flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5 text-blue-900 border-gray-300 rounded focus:ring-blue-900" />
              <label className="text-sm text-gray-700">Enable auto attendance capture for this session</label>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 transition"
              >
                Schedule Session
              </button>
            </div>
          </form>
        </div>

        {/* Upcoming Sessions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Live Sessions</h2>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-lg text-sm font-semibold">
                        {session.course}
                      </span>
                      <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                        session.platform === 'zoom' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {session.platform === 'zoom' ? '🎥 Zoom' : '📹 Google Meet'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{session.topic}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                      <div>
                        <p className="text-gray-500">Date</p>
                        <p className="font-semibold text-gray-800">{session.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Time</p>
                        <p className="font-semibold text-gray-800">{session.time}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Duration</p>
                        <p className="font-semibold text-gray-800">{session.duration}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Students</p>
                        <p className="font-semibold text-gray-800">{session.students}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm text-gray-600">Meeting Link:</span>
                      <a href={session.meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-700 text-sm font-semibold underline">
                        {session.meetingLink}
                      </a>
                      <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition text-sm">
                        📋 Copy
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-semibold hover:from-green-500 hover:to-green-400 transition">
                      Start Session
                    </button>
                    <button className="px-6 py-3 bg-blue-100 text-blue-900 rounded-lg font-semibold hover:bg-blue-200 transition">
                      Edit
                    </button>
                    <button className="px-6 py-3 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Session Recordings */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Session Recordings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recordings.map((recording) => (
              <div key={recording.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="relative">
                  <img src={recording.thumbnail} alt={recording.topic} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                    <button className="px-6 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-gray-100 transition">
                      ▶ Play
                    </button>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded">
                    {recording.duration}
                  </span>
                </div>
                <div className="p-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-900 rounded-lg text-xs font-semibold">
                    {recording.course}
                  </span>
                  <h3 className="font-bold text-gray-800 mt-2 mb-2">{recording.topic}</h3>
                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span>📅 {recording.date}</span>
                    <span>👁️ {recording.views} views</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mb-3">
                    <span>Size: {recording.size}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 transition text-sm">
                      Download
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LecturerLiveClasses;
