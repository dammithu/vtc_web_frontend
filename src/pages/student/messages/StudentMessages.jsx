import { useState } from 'react';
import { Bell, Mail, AlertCircle, Info, CheckCircle } from 'lucide-react';

const StudentMessages = () => {
  const [activeTab, setActiveTab] = useState('all'); // all, announcements, messages, system

  const messages = [
    {
      id: 1,
      type: 'announcement',
      title: 'New Assignment Posted - Web Development',
      course: 'Web Development Fundamentals',
      message: 'A new assignment on React Hooks has been posted. Due date: Feb 10, 2026',
      sender: 'John Doe',
      date: '2 hours ago',
      read: false,
      icon: Bell,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      type: 'message',
      title: 'Question regarding SQL Query',
      course: 'Database Management Systems',
      message: 'Thank you for your question about JOIN operations. Please check the updated materials in the course section.',
      sender: 'Jane Smith',
      date: '5 hours ago',
      read: false,
      icon: Mail,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      type: 'system',
      title: 'Course Completion Certificate Available',
      course: 'UI/UX Design Principles',
      message: 'Congratulations! Your certificate for UI/UX Design Principles is now available for download.',
      sender: 'System',
      date: '1 day ago',
      read: true,
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 4,
      type: 'announcement',
      title: 'Class Schedule Change',
      course: 'Mobile App Development',
      message: 'The class scheduled for Feb 7 has been rescheduled to Feb 8 at the same time.',
      sender: 'Mike Johnson',
      date: '2 days ago',
      read: true,
      icon: Bell,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 5,
      type: 'message',
      title: 'Assignment Feedback',
      course: 'Web Development Fundamentals',
      message: 'Great work on your latest assignment! Check the detailed feedback in the assessments section.',
      sender: 'John Doe',
      date: '3 days ago',
      read: true,
      icon: Mail,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 6,
      type: 'system',
      title: 'Upcoming Exam Reminder',
      course: 'Database Management Systems',
      message: 'Reminder: Your final exam is scheduled for Feb 15, 2026. Please prepare accordingly.',
      sender: 'System',
      date: '4 days ago',
      read: true,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
  ];

  const filteredMessages = messages.filter(msg => {
    if (activeTab === 'all') return true;
    if (activeTab === 'announcements') return msg.type === 'announcement';
    if (activeTab === 'messages') return msg.type === 'message';
    if (activeTab === 'system') return msg.type === 'system';
    return true;
  });

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Messages & Announcements</h1>
        <p className="text-gray-600 mt-1">
          Stay updated with course announcements and messages
          {unreadCount > 0 && (
            <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
              {unreadCount} new
            </span>
          )}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-3 px-1 font-medium whitespace-nowrap transition-all ${
            activeTab === 'all'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          All Messages ({messages.length})
        </button>
        <button
          onClick={() => setActiveTab('announcements')}
          className={`pb-3 px-1 font-medium whitespace-nowrap transition-all ${
            activeTab === 'announcements'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Announcements ({messages.filter(m => m.type === 'announcement').length})
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`pb-3 px-1 font-medium whitespace-nowrap transition-all ${
            activeTab === 'messages'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Messages ({messages.filter(m => m.type === 'message').length})
        </button>
        <button
          onClick={() => setActiveTab('system')}
          className={`pb-3 px-1 font-medium whitespace-nowrap transition-all ${
            activeTab === 'system'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          System ({messages.filter(m => m.type === 'system').length})
        </button>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((msg) => {
          const Icon = msg.icon;
          return (
            <div
              key={msg.id}
              className={`bg-white rounded-xl shadow-sm border-2 p-6 transition-all hover:shadow-md ${
                !msg.read ? 'border-indigo-200' : 'border-gray-200'
              }`}
            >
              <div className="flex gap-4">
                <div className={`${msg.bgColor} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className={msg.color} size={24} />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{msg.title}</h3>
                      <p className="text-sm text-gray-600">{msg.course}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500">{msg.date}</span>
                      {!msg.read && (
                        <div className="mt-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                            New
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3">{msg.message}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">From: {msg.sender}</span>
                    {!msg.read && (
                      <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMessages.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <Info size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages found</h3>
          <p className="text-gray-600">Try changing your filter selection</p>
        </div>
      )}
    </div>
  );
};

export default StudentMessages;
