import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Calendar, LogOut, User, 
  ShoppingBag, Settings, Shield, Lock, Eye, EyeOff,
  X, CheckCircle, AlertCircle, Package, Heart, Star,
  ChevronDown, ChevronUp, Clock, DollarSign, Truck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import axios from 'axios';

export default function Profile() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // Stats State
  const [stats, setStats] = useState({
    orders: [],
    wishlist: [],
    reviews: []
  });
  const [loading, setLoading] = useState(true);

  // Dropdown States
  const [openDropdown, setOpenDropdown] = useState(null);

  // Change Password State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fetch user stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get wishlist from localStorage
        const wishlistData = localStorage.getItem('wishlist');
        const wishlist = wishlistData ? JSON.parse(wishlistData) : [];
        
        // Get orders from localStorage
        const ordersData = localStorage.getItem('orders');
        const orders = ordersData ? JSON.parse(ordersData) : [];
        
        // Get reviews from localStorage
        const reviewsData = localStorage.getItem('reviews');
        const reviews = reviewsData ? JSON.parse(reviewsData) : [];

        setStats({
          orders: orders,
          wishlist: wishlist,
          reviews: reviews
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Toggle dropdown
  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // Validate password form
  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (!validatePasswordForm()) {
      return;
    }

    setPasswordLoading(true);

    try {
      const response = await axios.put(
        'http://localhost:5000/api/auth/change-password',
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      console.log('Password changed:', response.data);
      setPasswordSuccess(true);
      setPasswordLoading(false);

      setTimeout(() => {
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setPasswordSuccess(false);
        setShowPasswordModal(false);
      }, 2000);

    } catch (error) {
      console.error('Password change error:', error);
      
      if (error.response) {
        const message = error.response.data?.error || error.response.data?.message || 'Failed to change password';
        setPasswordError(message);
      } else if (error.request) {
        setPasswordError('Cannot connect to server. Please check your connection.');
      } else {
        setPasswordError('An unexpected error occurred. Please try again.');
      }
      
      setPasswordLoading(false);
    }
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // If user is not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gradient-to-br from-gray-50 via-white to-amber-50/30 py-10 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-4xl mx-auto">
        
        {/* Profile Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-amber-100/50 shadow-2xl shadow-amber-500/5 overflow-hidden">
          
          {/* Cover Banner */}
          <div className="relative h-40 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>
            
            {/* Avatar */}
            <div className="absolute -bottom-12 left-8">
              <div className="relative">
                <div className="w-28 h-28 bg-white rounded-2xl border-4 border-white shadow-xl flex items-center justify-center text-4xl font-black text-amber-500 overflow-hidden">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="absolute -bottom-1 -right-1 p-1.5 bg-emerald-500 rounded-full border-2 border-white">
                  <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Change Password Button */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button 
                onClick={() => setShowPasswordModal(true)}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition text-white text-sm font-medium rounded-xl border border-white/20 flex items-center gap-2"
              >
                <Lock className="h-4 w-4" />
                Change Password
              </button>
            </div>
          </div>

          {/* Profile Info Header */}
          <div className="pt-16 pb-6 px-8 border-b border-gray-100/80">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-gray-900">
                  {user.name}
                </h1>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>Joined: {user.joinedDate || 'June 2026'}</span>
                  </div>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
                    <Shield className="h-3.5 w-3.5" />
                    Verified Account
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium text-sm rounded-xl hover:scale-105 transition shadow-lg shadow-red-500/25"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>

          {/* User Details Grid */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Email */}
              <div className="group flex items-center gap-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-md transition">
                <div className="p-3 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl group-hover:scale-110 transition">
                  <Mail className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Email</p>
                  <p className="text-sm font-semibold text-gray-800">{user.email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="group flex items-center gap-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-md transition">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl group-hover:scale-110 transition">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Phone</p>
                  <p className="text-sm font-semibold text-gray-800">{user.phone || '+252 61 555 1234'}</p>
                </div>
              </div>

              {/* Address */}
              <div className="md:col-span-2 group flex items-center gap-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-md transition">
                <div className="p-3 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl group-hover:scale-110 transition">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Address</p>
                  <p className="text-sm font-semibold text-gray-800">{user.address || 'Hodan, Mogadishu, Somalia'}</p>
                </div>
              </div>

            </div>
          </div>

          {/* ============================================ */}
          {/* STATS WITH DROPDOWNS */}
          {/* ============================================ */}
          <div className="px-8 pb-8">
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100/80">
              
              {/* ORDERS DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('orders')}
                  className="w-full text-center group hover:bg-amber-50/50 p-3 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-amber-500 group-hover:scale-110 transition" />
                    <p className="text-2xl font-black text-gray-900">
                      {loading ? '...' : stats.orders.length}
                    </p>
                    {openDropdown === 'orders' ? (
                      <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </button>
                <p className="text-xs text-gray-400 font-medium text-center">Orders</p>

                {/* Dropdown Content */}
                {openDropdown === 'orders' && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 max-h-64 overflow-y-auto">
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Package className="h-4 w-4 text-amber-500" />
                        My Orders ({stats.orders.length})
                      </h4>
                      {stats.orders.length === 0 ? (
                        <div className="text-center py-6">
                          <Package className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">No orders yet</p>
                          <p className="text-xs text-gray-400">Start shopping to place your first order</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {stats.orders.map((order, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-semibold text-gray-800">
                                    Order #{order.id || index + 1}
                                  </p>
                                  <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {formatDate(order.date)}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-bold text-amber-600">
                                    ${order.total?.toFixed(2) || '0.00'}
                                  </p>
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                                    order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-600' :
                                    order.status === 'Pending' ? 'bg-amber-100 text-amber-600' :
                                    'bg-blue-100 text-blue-600'
                                  }`}>
                                    {order.status || 'Pending'}
                                  </span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-400 mt-1">
                                {order.items?.length || 0} items
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* WISHLIST DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('wishlist')}
                  className="w-full text-center group hover:bg-amber-50/50 p-3 rounded-xl transition flex items-center justify-center gap-2 border-x border-gray-100"
                >
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500 group-hover:scale-110 transition" />
                    <p className="text-2xl font-black text-gray-900">
                      {loading ? '...' : stats.wishlist.length}
                    </p>
                    {openDropdown === 'wishlist' ? (
                      <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </button>
                <p className="text-xs text-gray-400 font-medium text-center">Wishlist</p>

                {/* Dropdown Content */}
                {openDropdown === 'wishlist' && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 max-h-64 overflow-y-auto">
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        Wishlist ({stats.wishlist.length})
                      </h4>
                      {stats.wishlist.length === 0 ? (
                        <div className="text-center py-6">
                          <Heart className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">No items in wishlist</p>
                          <p className="text-xs text-gray-400">Save your favorite products here</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {stats.wishlist.map((item, index) => (
                            <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition">
                              <img 
                                src={item.image || 'https://via.placeholder.com/50'} 
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                <p className="text-xs text-amber-600 font-bold">${item.price?.toFixed(2) || '0.00'}</p>
                              </div>
                              <button className="p-1.5 bg-amber-50 text-amber-500 rounded-lg hover:bg-amber-100 transition text-xs">
                                Add to Cart
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* REVIEWS DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('reviews')}
                  className="w-full text-center group hover:bg-amber-50/50 p-3 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-400 group-hover:scale-110 transition" />
                    <p className="text-2xl font-black text-gray-900">
                      {loading ? '...' : stats.reviews.length}
                    </p>
                    {openDropdown === 'reviews' ? (
                      <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </button>
                <p className="text-xs text-gray-400 font-medium text-center">Reviews</p>

                {/* Dropdown Content */}
                {openDropdown === 'reviews' && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 max-h-64 overflow-y-auto">
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Star className="h-4 w-4 text-amber-400" />
                        My Reviews ({stats.reviews.length})
                      </h4>
                      {stats.reviews.length === 0 ? (
                        <div className="text-center py-6">
                          <Star className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">No reviews yet</p>
                          <p className="text-xs text-gray-400">Share your experience with products</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {stats.reviews.map((review, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-semibold text-gray-800">
                                    {review.productName || 'Product Review'}
                                  </p>
                                  <div className="flex items-center gap-1 mt-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} className={`h-3.5 w-3.5 ${
                                        i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                                      }`} />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-xs text-gray-400">
                                  {formatDate(review.date)}
                                </p>
                              </div>
                              {review.comment && (
                                <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                                  "{review.comment}"
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-8 pb-8">
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => toggleDropdown('orders')}
                className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 font-medium rounded-xl border border-amber-100/50 hover:shadow-lg transition flex items-center justify-center gap-2 group"
              >
                <Package className="h-4 w-4 group-hover:scale-110 transition" />
                My Orders
              </button>
              <button 
                onClick={() => setShowPasswordModal(true)}
                className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium rounded-xl border border-blue-100/50 hover:shadow-lg transition flex items-center justify-center gap-2 group"
              >
                <Lock className="h-4 w-4 group-hover:scale-110 transition" />
                Change Password
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ============================================ */}
      {/* CHANGE PASSWORD MODAL */}
      {/* ============================================ */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPasswordModal(false)}
          ></div>
          
          <div className="relative max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 animate-fade-in">
            
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl mb-4">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>
              <p className="text-sm text-gray-500 mt-1">Update your password to keep your account secure</p>
            </div>

            {passwordSuccess && (
              <div className="p-4 bg-emerald-50 text-emerald-600 text-sm font-medium rounded-xl border border-emerald-100/50 text-center flex items-center justify-center gap-2 mb-4">
                <CheckCircle className="h-5 w-5" />
                Password changed successfully!
              </div>
            )}

            {passwordError && (
              <div className="p-4 bg-red-50 text-red-600 text-sm font-medium rounded-xl border border-red-100/50 text-center flex items-center justify-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5" />
                {passwordError}
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Current Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    name="currentPassword"
                    required
                    value={passwordData.currentPassword}
                    placeholder="Enter current password"
                    className={`w-full bg-gray-50/80 text-sm pl-11 pr-12 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-4 text-gray-900 placeholder:text-gray-400 ${
                      passwordErrors.currentPassword 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' 
                        : 'border-gray-200 focus:border-amber-500 focus:ring-amber-500/10 focus:bg-white'
                    }`}
                    onChange={handlePasswordInputChange}
                  />
                  <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 transition ${
                    passwordErrors.currentPassword ? 'text-red-400' : 'text-gray-400'
                  }`} />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showCurrentPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
                {passwordErrors.currentPassword && (
                  <p className="mt-1.5 text-xs text-red-500">{passwordErrors.currentPassword}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    name="newPassword"
                    required
                    value={passwordData.newPassword}
                    placeholder="Enter new password (min 6 chars)"
                    className={`w-full bg-gray-50/80 text-sm pl-11 pr-12 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-4 text-gray-900 placeholder:text-gray-400 ${
                      passwordErrors.newPassword 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' 
                        : 'border-gray-200 focus:border-amber-500 focus:ring-amber-500/10 focus:bg-white'
                    }`}
                    onChange={handlePasswordInputChange}
                  />
                  <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 transition ${
                    passwordErrors.newPassword ? 'text-red-400' : 'text-gray-400'
                  }`} />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showNewPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
                {passwordErrors.newPassword && (
                  <p className="mt-1.5 text-xs text-red-500">{passwordErrors.newPassword}</p>
                )}
                <p className="mt-1.5 text-xs text-gray-400">Minimum 6 characters</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    required
                    value={passwordData.confirmPassword}
                    placeholder="Confirm new password"
                    className={`w-full bg-gray-50/80 text-sm pl-11 pr-12 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-4 text-gray-900 placeholder:text-gray-400 ${
                      passwordErrors.confirmPassword 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' 
                        : 'border-gray-200 focus:border-amber-500 focus:ring-amber-500/10 focus:bg-white'
                    }`}
                    onChange={handlePasswordInputChange}
                  />
                  <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 transition ${
                    passwordErrors.confirmPassword ? 'text-red-400' : 'text-gray-400'
                  }`} />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
                {passwordErrors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-500">{passwordErrors.confirmPassword}</p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl hover:scale-[1.02] transition shadow-lg shadow-amber-500/30 text-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {passwordLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    'Update Password'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>

    </div>
  );
}