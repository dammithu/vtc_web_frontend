import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../assets/vtclogo2.png";
import Swal from 'sweetalert2';
import { userAPI } from '../../apis/api';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'Student'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const showErrorAlert = (html) => {
    Swal.fire({
      title: 'Login Failed!',
      html,
      icon: 'error',
      timer: 3000,
      showConfirmButton: false,
      background: 'linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)',
      color: '#ffffff',
      iconColor: '#fca5a5',
      timerProgressBar: true,
      showClass: {
        popup: 'animate__animated animate__shakeX',
        icon: 'animate__animated animate__tada'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp animate__faster'
      },
      customClass: {
        popup: 'rounded-2xl shadow-2xl border-2 border-red-400',
        title: 'text-xl font-bold tracking-wide mb-2',
        htmlContainer: 'text-sm opacity-95 mt-2',
        timerProgressBar: 'bg-gradient-to-r from-red-300 to-red-400',
        icon: 'border-4 border-red-300'
      },
      didOpen: () => {
        Swal.getPopup().style.padding = '2rem';
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await userAPI.login(formData.email, formData.password);

      if (response.status && response.response_code === 200) {
        const { userDetails } = response.result;
        const token = response.token;

        // Determine actual user role from API response
        let userRole = null;
        let userRolePosition = null;
        let roleSpecificId = null; // 👈 student or lecturer record ID

        if (userDetails.students && userDetails.students.length > 0) {
          userRole = 'Student';
          userRolePosition = userDetails.students[0].role.position;
          roleSpecificId = userDetails.students[0].id; // 👈 student table ID
        } else if (userDetails.lectures && userDetails.lectures.length > 0) {
          userRole = 'Lecturer';
          userRolePosition = userDetails.lectures[0].role.position;
          roleSpecificId = userDetails.lectures[0].id; // 👈 lecturer table ID
        }

        // Role mismatch checks
        if (formData.role === 'Student' && userRole !== 'Student') {
          setIsLoading(false);
          Swal.fire({
            title: 'Role Mismatch!',
            html: '<p style="margin: 0; font-size: 15px; line-height: 1.6;">You selected <strong>Student</strong> role,<br/>but these credentials belong to a <strong>Lecturer</strong>.<br/><strong>Please select the correct role.</strong></p>',
            icon: 'error',
            timer: 3000,
            showConfirmButton: false,
            background: 'linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)',
            color: '#ffffff',
            iconColor: '#fca5a5',
            timerProgressBar: true,
            showClass: { popup: 'animate__animated animate__shakeX', icon: 'animate__animated animate__tada' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp animate__faster' },
            customClass: {
              popup: 'rounded-2xl shadow-2xl border-2 border-red-400',
              title: 'text-xl font-bold tracking-wide mb-2',
              htmlContainer: 'text-sm opacity-95 mt-2',
              timerProgressBar: 'bg-gradient-to-r from-red-300 to-red-400',
              icon: 'border-4 border-red-300'
            },
            didOpen: () => { Swal.getPopup().style.padding = '2rem'; }
          });
          return;
        }

        if (formData.role === 'Lecturer' && userRole !== 'Lecturer') {
          setIsLoading(false);
          Swal.fire({
            title: 'Role Mismatch!',
            html: '<p style="margin: 0; font-size: 15px; line-height: 1.6;">You selected <strong>Lecturer</strong> role,<br/>but these credentials belong to a <strong>Student</strong>.<br/><strong>Please select the correct role.</strong></p>',
            icon: 'error',
            timer: 3000,
            showConfirmButton: false,
            background: 'linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)',
            color: '#ffffff',
            iconColor: '#fca5a5',
            timerProgressBar: true,
            showClass: { popup: 'animate__animated animate__shakeX', icon: 'animate__animated animate__tada' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp animate__faster' },
            customClass: {
              popup: 'rounded-2xl shadow-2xl border-2 border-red-400',
              title: 'text-xl font-bold tracking-wide mb-2',
              htmlContainer: 'text-sm opacity-95 mt-2',
              timerProgressBar: 'bg-gradient-to-r from-red-300 to-red-400',
              icon: 'border-4 border-red-300'
            },
            didOpen: () => { Swal.getPopup().style.padding = '2rem'; }
          });
          return;
        }

        // Store user data in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userDetails.id);           // user table ID (2 or 3)
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('userRolePosition', userRolePosition);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', userDetails.email);

        // 👇 Store the role-specific record ID
        if (userRole === 'Student') {
          localStorage.setItem('studentId', roleSpecificId);
        } else if (userRole === 'Lecturer') {
          localStorage.setItem('lecturerId', roleSpecificId);
        }

        // Show success alert then navigate
        Swal.fire({
          title: 'Login Successful!',
          html: `<p style="margin: 0; font-size: 15px; line-height: 1.6;">Welcome back!<br/>You are logged in as <strong style="color: #60a5fa;">${userRole}</strong>.</p>`,
          icon: 'success',
          timer: 2500,
          showConfirmButton: false,
          background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
          color: '#ffffff',
          iconColor: '#60a5fa',
          timerProgressBar: true,
          showClass: {
            popup: 'animate__animated animate__fadeInDown animate__faster',
            icon: 'animate__animated animate__bounceIn'
          },
          hideClass: { popup: 'animate__animated animate__fadeOutUp animate__faster' },
          customClass: {
            popup: 'rounded-2xl shadow-2xl border-2 border-blue-400',
            title: 'text-xl font-bold tracking-wide mb-2',
            htmlContainer: 'text-sm opacity-95 mt-2',
            timerProgressBar: 'bg-gradient-to-r from-blue-300 to-blue-400',
            icon: 'border-4 border-blue-300'
          },
          didOpen: () => { Swal.getPopup().style.padding = '2rem'; }
        }).then(() => {
          if (userRole === 'Student') {
            navigate('/Studentdashboard');
          } else if (userRole === 'Lecturer') {
            navigate('/Lecturerdashboard');
          }
        });

      } else {
        setIsLoading(false);
        showErrorAlert('<p style="margin: 0; font-size: 15px; line-height: 1.6;">Invalid email or password.<br/><strong>Please try again.</strong></p>');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Login error:', error);
      showErrorAlert('<p style="margin: 0; font-size: 15px; line-height: 1.6;">Invalid email or password.<br/><strong>Please try again.</strong></p>');
    }
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full">
        
        {/* Left Side - Welcome Section */}
        <div className="w-full lg:w-2/5 p-8 md:p-12 flex flex-col justify-center items-center bg-white">
          <img src={Logo} alt="VTC Logo" className="w-24 h-24 md:w-32 md:h-32 mb-6 md:mb-10" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 text-center leading-relaxed">
            Welcome to the<br />
            VTC LMS
          </h1>
          <p className="text-gray-600 text-center mt-3 md:mt-4 text-sm md:text-base">
            Please login using your details
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-3/5 bg-gradient-to-b from-blue-800 to-blue-900 p-8 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <h2 className="text-white text-lg md:text-xl font-semibold mb-6 md:mb-8">
              Login into your account
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-400 rounded text-white text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              
              {/* Role Selection */}
              <div>
                <label className="block text-white text-sm mb-2">Role *</label>
                <select
                  value={formData.role}
                  onChange={handleRoleChange}
                  className="w-full px-4 py-2.5 bg-blue-700 bg-opacity-50 border border-blue-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  style={{ 
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%23fff\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3E%3C/svg%3E")',
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem',
                    appearance: 'none'
                  }}
                >
                  <option value="Student" className="bg-blue-800 text-white">Student</option>
                  <option value="Lecturer" className="bg-blue-800 text-white">Lecturer</option>
                </select>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-white text-sm mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-blue-700 bg-opacity-50 border border-blue-600 rounded text-white text-sm placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Email"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-white text-sm mb-2">Password *</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2.5 bg-blue-700 bg-opacity-50 border border-blue-600 rounded text-white text-sm placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Password"
                  required
                />
              </div>

              {/* Login Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-8 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'LOGGING IN...' : 'LOG IN'}
                </button>
              </div>

              {/* Links Section */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <Link
                  to="/forgetpassword"
                  className="text-blue-200 hover:text-white text-xs font-medium transition-colors uppercase tracking-wide text-center"
                >
                  I CAN'T ACCESS MY ACCOUNT
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;