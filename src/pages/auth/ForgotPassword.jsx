import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Logo from "../../assets/vtclogo2.png";

function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    console.log('Email submitted:', formData.email);
    
    // Show loading toast
    const loadingToast = toast.loading('Sending OTP...');
    
    try {
      const response = await fetch('http://3.109.1.245:9999/api/user/sendOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email
        })
      });

      const data = await response.json();
      
      toast.dismiss(loadingToast);
      
      if (data.response_code === 200) {
        toast.success('OTP sent successfully to your email!', {
          duration: 4000,
          icon: '📧',
        });
        setStep(2);
      } else {
        toast.error(data.message || 'Failed to send OTP. Please try again.', {
          duration: 4000,
        });
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error('Error sending OTP:', error);
      toast.error('Network error. Please try again.', {
        duration: 4000,
      });
    }
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    
    if (formData.otp) {
      toast.success('OTP verified! Please set your new password.', {
        duration: 3000,
        icon: '✅',
      });
      setStep(3);
    } else {
      toast.error('Please enter OTP', {
        duration: 3000,
      });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters!', {
        duration: 3000,
        icon: '⚠️',
      });
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match!', {
        duration: 3000,
        icon: '❌',
      });
      return;
    }

    const loadingToast = toast.loading('Resetting password...');
    
    try {
      const response = await fetch('http://3.109.1.245:9999/api/user/validateOTPForFPW', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          enteredOTP: formData.otp,
          newPassword: formData.newPassword
        })
      });

      const data = await response.json();
      
      toast.dismiss(loadingToast);
      
      if (data.response_code === 200 && data.status === true) {
        toast.success('Password reset successful! Redirecting to login...', {
          duration: 3000,
          icon: '🎉',
        });
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        toast.error(data.message || 'Invalid OTP or password reset failed. Please try again.', {
          duration: 4000,
        });
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error('Error resetting password:', error);
      toast.error('Network error. Please try again.', {
        duration: 4000,
      });
    }
  };

  const handleResendOTP = async () => {
    const loadingToast = toast.loading('Resending OTP...');
    
    try {
      const response = await fetch('http://3.109.1.245:9999/api/user/sendOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email
        })
      });

      const data = await response.json();
      
      toast.dismiss(loadingToast);
      
      if (data.response_code === 200) {
        toast.success('OTP resent successfully!', {
          duration: 3000,
          icon: '🔄',
        });
      } else {
        toast.error(data.message || 'Failed to resend OTP. Please try again.', {
          duration: 4000,
        });
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error('Error resending OTP:', error);
      toast.error('Network error. Please try again.', {
        duration: 4000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Toast Container with custom styling */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          // Define default options
          className: '',
          duration: 4000,
          style: {
            background: '#fff',
            color: '#363636',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            fontWeight: '500',
          },
          // Success toast styling
          success: {
            style: {
              background: '#10B981',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#10B981',
            },
          },
          // Error toast styling
          error: {
            style: {
              background: '#EF4444',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#EF4444',
            },
          },
          // Loading toast styling
          loading: {
            style: {
              background: '#3B82F6',
              color: '#fff',
            },
          },
        }}
      />

      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full">
        
        {/* Left Side - Welcome Section */}
        <div className="w-full lg:w-2/5 p-8 md:p-12 flex flex-col justify-center items-center bg-white">
          <img src={Logo} alt="VTC Logo" className="w-24 h-24 md:w-32 md:h-32 mb-6 md:mb-10" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 text-center leading-relaxed">
            Password<br />
            Recovery
          </h1>
          <p className="text-gray-600 text-center mt-3 md:mt-4 text-sm md:text-base">
            {step === 1 && "Enter your email to receive OTP"}
            {step === 2 && "Enter the OTP sent to your email"}
            {step === 3 && "Create a new password"}
          </p>
          
          {/* Step Indicator */}
          <div className="flex items-center gap-2 mt-6">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              1
            </div>
            <div className={`w-8 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              2
            </div>
            <div className={`w-8 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              3
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full lg:w-3/5 bg-gradient-to-b from-blue-800 to-blue-900 p-8 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-sm">
            
            {/* Step 1: Email Input */}
            {step === 1 && (
              <>
                <h2 className="text-white text-lg md:text-xl font-semibold mb-6 md:mb-8">
                  Forgot Password
                </h2>
                <form onSubmit={handleEmailSubmit} className="space-y-4 md:space-y-5">
                  <div>
                    <label className="block text-white text-sm mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-blue-700 bg-opacity-50 border border-blue-600 rounded text-white text-sm placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-8 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                    >
                      SEND OTP
                    </button>
                  </div>

                  <div className="pt-2">
                    <Link
                      to="/"
                      className="text-blue-200 hover:text-white text-xs font-medium transition-colors uppercase tracking-wide"
                    >
                      ← BACK TO LOGIN
                    </Link>
                  </div>
                </form>
              </>
            )}

            {/* Step 2: OTP Input */}
            {step === 2 && (
              <>
                <h2 className="text-white text-lg md:text-xl font-semibold mb-6 md:mb-8">
                  Verify OTP
                </h2>
                <form onSubmit={handleOTPSubmit} className="space-y-4 md:space-y-5">
                  <div>
                    <label className="block text-white text-sm mb-2">
                      Enter OTP *
                    </label>
                    <input
                      type="text"
                      value={formData.otp}
                      onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                      className="w-full px-4 py-2.5 bg-blue-700 bg-opacity-50 border border-blue-600 rounded text-white text-sm placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent tracking-widest text-center text-lg"
                      placeholder="000000"
                      maxLength="6"
                      required
                    />
                    <p className="text-blue-200 text-xs mt-2">
                      OTP sent to {formData.email}
                    </p>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-8 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                    >
                      VERIFY OTP
                    </button>
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      className="bg-blue-700 hover:bg-blue-600 text-white font-medium py-2 px-8 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                    >
                      RESEND
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <>
                <h2 className="text-white text-lg md:text-xl font-semibold mb-6 md:mb-8">
                  Create New Password
                </h2>
                <form onSubmit={handlePasswordSubmit} className="space-y-4 md:space-y-5">
                  <div>
                    <label className="block text-white text-sm mb-2">
                      New Password *
                    </label>
                    <input
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      className="w-full px-4 py-2.5 bg-blue-700 bg-opacity-50 border border-blue-600 rounded text-white text-sm placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="Enter new password"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-2.5 bg-blue-700 bg-opacity-50 border border-blue-600 rounded text-white text-sm placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="Confirm new password"
                      required
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-8 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                    >
                      RESET PASSWORD
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;