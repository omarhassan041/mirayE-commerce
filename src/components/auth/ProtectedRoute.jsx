import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2, Shield } from 'lucide-react';

export default function ProtectedRoute({ children, redirectTo = "/login" }) {
  const { user, loading } = useAuth();

  // 1. Haddii uu loading ku jiro (la hubinayo user-ka)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-amber-50/30">
        <div className="flex flex-col items-center gap-4 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100/50">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-amber-100"></div>
            <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-t-amber-500 border-r-orange-500 border-b-transparent border-l-transparent animate-spin"></div>
            <Shield className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-amber-500" />
          </div>
          <p className="text-gray-600 font-medium">Checking authentication...</p>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Haddii qofku uusan Login samayn (user === null), u weeci bogga Login-ka
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // 3. Haddii uu soo galay, u oggolaan inuu arko bogga uu rabo
  return children;
}