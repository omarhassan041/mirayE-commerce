import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Abuurista Auth Context
const AuthContext = createContext();

// 2. Auth Provider-ka maamulaya haddii qofku soo galay iyo haddii kale
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. Marka ugu horreysa ee app-ka la fuuro, hubi localStorage
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 4. Shaqada Login-ka
  const login = (userData, token) => {
    try {
      // Store in localStorage
      if (token) {
        localStorage.setItem('token', token);
      }
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Update state
      setUser(userData);
      setError(null);
      
      return { success: true };
    } catch (error) {
      setError('Login failed. Please try again.');
      return { success: false, error: error.message };
    }
  };

  // 5. Shaqada Logout-ka (Ka bixitaanka)
  const logout = () => {
    try {
      // Remove from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Update state
      setUser(null);
      setError(null);
      
      return { success: true };
    } catch (error) {
      setError('Logout failed. Please try again.');
      return { success: false, error: error.message };
    }
  };

  // 6. Shaqada Update User
  const updateUser = (userData) => {
    try {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (error) {
      setError('Update failed. Please try again.');
      return { success: false, error: error.message };
    }
  };

  // 7. Check if user is authenticated
  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('token');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        error, 
        login, 
        logout, 
        updateUser,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 8. Custom hook si fudud loogu isticmaalo boggaga iyo components-ka auth
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}