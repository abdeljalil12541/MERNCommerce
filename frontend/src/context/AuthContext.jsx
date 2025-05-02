"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Fetch user data if needed
      api.get('/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUser(null);
        });
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      setIsAuthenticated(true);
      
      // Force a page refresh to ensure all components update with new auth state
      window.location.reload();
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      setIsAuthenticated, 
      login,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };