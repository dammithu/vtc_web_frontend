import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, MapPin, Calendar, Hash,
  Shield, Monitor, Clock, Loader, Edit3,
  CreditCard, FileText, ExternalLink
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

function LecturerProfile() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [lecturer, setLecturer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const lecturerId = localStorage.getItem('lecturerId');

  useEffect(() => {
    if (!lecturerId) {
      setError('Lecturer ID not found.');
      setLoading(false);
      return;
    }

    const fetchLecturer = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://3.109.1.245:9999/api/lecture/getLectureById/${lecturerId}`);
        const data = await res.json();
        if (data.status && data.result?.length > 0) {
          setLecturer(data.result[0]);
        } else {
          setError('Lecturer not found.');
        }
      } catch (err) {
        setError('Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchLecturer();
  }, [lecturerId]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader className="w-5 h-5 animate-spin text-blue-500" />
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}>Loading profile...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  const fields = [
    { icon: User,       label: 'Full Name',        value: lecturer.full_name },
    { icon: Mail,       label: 'Email',             value: lecturer.email },
    { icon: Phone,      label: 'Phone',             value: lecturer.phone || '—' },
    { icon: MapPin,     label: 'Address',           value: lecturer.address || '—' },
    { icon: Calendar,   label: 'Date of Birth',     value: formatDate(lecturer.dob) },
    { icon: Hash,       label: 'Registration No.',  value: lecturer.reg_number },
    { icon: CreditCard, label: 'NIC',               value: lecturer.nic || '—' },
    { icon: Monitor,    label: 'Mode',              value: lecturer.mode },
    { icon: Shield,     label: 'Account Status',    value: lecturer.account_status },
    { icon: Clock,      label: 'Member Since',      value: formatDate(lecturer.createdAt) },
    { icon: Clock,      label: 'Last Updated',      value: formatDate(lecturer.updatedAt) },
  ];

  return (
    <div className={`min-h-full ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Lecturer Profile</h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}>
            Your personal information
          </p>
        </div>
        <button
          onClick={() => navigate('/editlecturerprofile')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all
            ${isDarkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
        >
          <Edit3 className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-blue-50 border border-blue-200'}`}>
        {/* Avatar + Name */}
        <div className="flex items-center gap-5 mb-8 pb-6 border-b" style={{ borderColor: isDarkMode ? '#374151' : '#bae6fd' }}>
          <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
            {lecturer.imageURL ? (
              <img
                src={lecturer.imageURL}
                alt={lecturer.full_name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(lecturer.full_name)}&background=3b82f6&color=fff&size=80`;
                }}
              />
            ) : (
              <div className="w-full h-full bg-blue-500 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {lecturer.full_name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold">{lecturer.full_name}</h2>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}>{lecturer.email}</p>
            <span className={`
              inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full text-xs font-medium
              ${lecturer.account_status === 'active'
                ? isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                : isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'}
            `}>
              <span className={`w-1.5 h-1.5 rounded-full ${lecturer.account_status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
              {lecturer.account_status}
            </span>
          </div>
        </div>

        {/* Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((field, i) => {
            const Icon = field.icon;
            return (
              <div key={i} className="flex items-start gap-3">
                <div className={`p-2 rounded-lg mt-0.5 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-100'}`}>
                  <Icon className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{field.label}</p>
                  <p className="text-sm font-semibold mt-0.5">{field.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CV Section */}
        {lecturer.cvURL && (
          <div className={`mt-6 pt-6 border-t`} style={{ borderColor: isDarkMode ? '#374151' : '#bae6fd' }}>
            <p className={`text-xs font-medium mb-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Documents</p>
            <a
              href={lecturer.cvURL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all
                ${isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                }`}
            >
              <FileText className="w-4 h-4" />
              View CV / Resume
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default LecturerProfile;