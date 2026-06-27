import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ShoppingBag, ArrowRight, Eye, EyeOff, CheckCircle, AlertCircle, XCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          name: formData.name,
          email: formData.email,
          password: formData.password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Registration successful:', response.data);

      const userData = {
        id: response.data.userId || Date.now(),
        name: formData.name,
        email: formData.email,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      };

      login(userData, response.data.token || 'fake-jwt-token');
      
      setSuccess(true);
      setLoading(false);

      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.response) {
        const message = error.response.data?.error || error.response.data?.message || 'Registration failed';
        setServerError(message);
      } else if (error.request) {
        setServerError('Cannot connect to server. Please check your connection.');
      } else {
        setServerError('An unexpected error occurred. Please try again.');
      }
      
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-amber-50/30 px-4 py-12 sm:px-6 lg:px-8">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -left-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-md w-full space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-amber-100/50 shadow-2xl shadow-amber-500/5">
        
        {success && (
          <div className="p-4 bg-emerald-50/80 backdrop-blur-sm text-emerald-600 text-sm font-medium rounded-xl border border-emerald-100/50 text-center flex items-center justify-center gap-2 animate-fade-in">
            <CheckCircle className="h-5 w-5" />
            Account successfully created! Redirecting...
          </div>
        )}

        {serverError && (
          <div className="p-4 bg-red-50/80 backdrop-blur-sm text-red-600 text-sm font-medium rounded-xl border border-red-100/50 text-center flex items-center justify-center gap-2 animate-shake">
            <AlertCircle className="h-5 w-5" />
            {serverError}
          </div>
        )}

        <div className="text-center">
          <div className="inline-flex p-4 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-2xl shadow-lg shadow-amber-500/25 mb-4 group hover:scale-105 transition">
            <ShoppingBag className="h-8 w-8 group-hover:rotate-12 transition" />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-gray-900">
            Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Account</span>
          </h2>
          <p className="mt-2 text-sm text-gray-500">Register to start shopping</p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                placeholder="Omar Hassan Ali"
                className={`w-full bg-gray-50/80 text-sm pl-11 pr-4 py-3.5 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-4 text-gray-900 placeholder:text-gray-400 ${
                  errors.name 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' 
                    : 'border-gray-200 focus:border-amber-500 focus:ring-amber-500/10 focus:bg-white'
                }`}
                onChange={handleChange}
              />
              <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 transition ${
                errors.name ? 'text-red-400' : 'text-gray-400 group-focus-within:text-amber-500'
              }`} />
              {errors.name && (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  <AlertCircle className="h-4.5 w-4.5 text-red-500" />
                </div>
              )}
            </div>
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <XCircle className="h-3 w-3" /> {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                placeholder="omar@gmail.com"
                className={`w-full bg-gray-50/80 text-sm pl-11 pr-4 py-3.5 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-4 text-gray-900 placeholder:text-gray-400 ${
                  errors.email 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' 
                    : 'border-gray-200 focus:border-amber-500 focus:ring-amber-500/10 focus:bg-white'
                }`}
                onChange={handleChange}
              />
              <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 transition ${
                errors.email ? 'text-red-400' : 'text-gray-400 group-focus-within:text-amber-500'
              }`} />
              {errors.email && (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  <AlertCircle className="h-4.5 w-4.5 text-red-500" />
                </div>
              )}
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <XCircle className="h-3 w-3" /> {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                placeholder="Create a password (min 6 chars)"
                className={`w-full bg-gray-50/80 text-sm pl-11 pr-12 py-3.5 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-4 text-gray-900 placeholder:text-gray-400 ${
                  errors.password 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' 
                    : 'border-gray-200 focus:border-amber-500 focus:ring-amber-500/10 focus:bg-white'
                }`}
                onChange={handleChange}
              />
              <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 transition ${
                errors.password ? 'text-red-400' : 'text-gray-400 group-focus-within:text-amber-500'
              }`} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <XCircle className="h-3 w-3" /> {errors.password}
              </p>
            )}
            <p className="mt-1.5 text-xs text-gray-400 flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Minimum 6 characters
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                placeholder="Confirm your password"
                className={`w-full bg-gray-50/80 text-sm pl-11 pr-12 py-3.5 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-4 text-gray-900 placeholder:text-gray-400 ${
                  errors.confirmPassword 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' 
                    : 'border-gray-200 focus:border-amber-500 focus:ring-amber-500/10 focus:bg-white'
                }`}
                onChange={handleChange}
              />
              <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 transition ${
                errors.confirmPassword ? 'text-red-400' : 'text-gray-400 group-focus-within:text-amber-500'
              }`} />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showConfirmPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <XCircle className="h-3 w-3" /> {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="relative w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group mt-4"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : success ? (
                <>
                  <CheckCircle className="h-4 w-4" /> Account Created!
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                </>
              )}
            </span>
          </button>
        </form>

        <div className="text-center pt-4 border-t border-gray-100/80">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-amber-500 hover:text-amber-600 transition hover:underline">
              Sign in now
            </Link>
          </p>
        </div>

        <div className="text-xs text-gray-400 text-center space-y-1">
          <p className="flex items-center justify-center gap-2">
            <CheckCircle className={`h-3 w-3 ${formData.password.length >= 6 ? 'text-emerald-500' : 'text-gray-300'}`} />
            Minimum 6 characters
          </p>
          <p className="flex items-center justify-center gap-2">
            <CheckCircle className={`h-3 w-3 ${formData.password && formData.password === formData.confirmPassword ? 'text-emerald-500' : 'text-gray-300'}`} />
            Passwords match
          </p>
        </div>

      </div>
    </div>
  );
}