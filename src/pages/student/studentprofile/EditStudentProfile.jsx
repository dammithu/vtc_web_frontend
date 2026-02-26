import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Phone, MapPin, Calendar,
  Loader, ArrowLeft, Save, CheckCircle, AlertCircle, Camera
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

function EditStudentProfile() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
  });

  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    if (!studentId) {
      setError('Student ID not found.');
      setLoading(false);
      return;
    }

    const fetchStudent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://3.109.1.245:9999/api/student/getStudentById/${studentId}`);
        const data = await res.json();
        if (data.status && data.result?.length > 0) {
          const s = data.result[0];
          setStudent(s);
          setForm({
            full_name: s.full_name || '',
            email: s.email || '',
            phone: s.phone || '',
            address: s.address || '',
            dob: s.dob ? s.dob.split('T')[0] : '',
          });
        } else {
          setError('Student not found.');
        }
      } catch {
        setError('Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;
    setUploadingImage(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      const res = await fetch(`http://3.109.1.245:9999/api/student/updateImageById/${studentId}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await res.json();
      if (data.status) {
        setSuccessMsg('Profile image updated!');
        setImageFile(null);
      } else {
        setError(data.message || 'Image upload failed.');
      }
    } catch {
      setError('Network error during image upload.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(`http://3.109.1.245:9999/api/student/updateStudentById/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: form.full_name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          dob: form.dob,
          role_id: student?.role_id ?? 2,
        }),
      });
      const data = await res.json();
      if (data.status) {
        setSuccessMsg('Profile updated successfully!');
        setTimeout(() => navigate('/studentprofile'), 1500);
      } else {
        setError(data.message || 'Update failed. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const inputBase = `w-full px-4 py-2.5 rounded-lg text-sm font-medium outline-none border transition-all
    ${isDarkMode
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:bg-gray-600'
      : 'bg-white border-blue-200 text-blue-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'}`;

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

  if (error && !student) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-full ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Edit Profile</h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}>
            Update your personal information
          </p>
        </div>
        <button
          onClick={() => navigate('/studentprofile')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all
            ${isDarkMode
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              : 'bg-blue-100 hover:bg-blue-200 text-blue-700'}`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Feedback */}
      {successMsg && (
        <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-lg bg-green-100 text-green-700 text-sm font-medium">
          <CheckCircle className="w-4 h-4 shrink-0" />
          {successMsg}
        </div>
      )}
      {error && (
        <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-lg bg-red-100 text-red-700 text-sm font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-blue-50 border border-blue-200'}`}>
        {/* Avatar with Upload */}
        <div className="flex items-center gap-5 mb-8 pb-6 border-b" style={{ borderColor: isDarkMode ? '#374151' : '#bae6fd' }}>
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-xl overflow-hidden">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : student?.imageURL ? (
                <img
                  src={student.imageURL}
                  alt={student.full_name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.full_name)}&background=3b82f6&color=fff&size=80`;
                  }}
                />
              ) : (
                <div className="w-full h-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {form.full_name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            {/* Camera button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center shadow-lg transition-all"
            >
              <Camera className="w-3.5 h-3.5 text-white" />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold capitalize">{form.full_name || 'Your Name'}</h2>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}>{form.email}</p>
            {imageFile && (
              <div className="mt-2 flex items-center gap-2">
                <span className={`text-xs truncate max-w-[140px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {imageFile.name}
                </span>
                <button
                  type="button"
                  onClick={handleImageUpload}
                  disabled={uploadingImage}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-blue-500 hover:bg-blue-600 text-white transition-all disabled:opacity-60"
                >
                  {uploadingImage ? <Loader className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                  {uploadingImage ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className={`flex items-center gap-2 text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <User className="w-3.5 h-3.5 text-blue-500" /> Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Enter full name"
                className={inputBase}
                required
              />
            </div>

            {/* Email - editable */}
            <div className="flex flex-col gap-1.5">
              <label className={`flex items-center gap-2 text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <User className="w-3.5 h-3.5 text-blue-500" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                className={inputBase}
                required
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className={`flex items-center gap-2 text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Phone className="w-3.5 h-3.5 text-blue-500" /> Phone
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className={inputBase}
              />
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col gap-1.5">
              <label className={`flex items-center gap-2 text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Calendar className="w-3.5 h-3.5 text-blue-500" /> Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className={inputBase}
              />
            </div>

            {/* Address - full width */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className={`flex items-center gap-2 text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <MapPin className="w-3.5 h-3.5 text-blue-500" /> Address
              </label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter address"
                rows={3}
                className={`${inputBase} resize-none`}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all
                ${saving ? 'opacity-60 cursor-not-allowed' : ''}
                ${isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            >
              {saving ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStudentProfile;