import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from './AuthService.jsx'; // ✅ Ensure correct import

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleError = (err) => {
    const message = err.response?.data?.message || 'Something went wrong';
    setError(message);
    return message;
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const { user, token } = await authService.login(credentials);

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));

      setUser(user);
      setToken(token);
      navigate('/dashboard');
    } catch (err) {
      throw new Error(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const { user, token } = await authService.signup(userData);

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));

      setUser(user);
      setToken(token);
      navigate('/preferences');
    } catch (err) {
      throw new Error(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, loading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
