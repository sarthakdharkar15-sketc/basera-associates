import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user and token on load
    try {
      const savedUser = localStorage.getItem('basera_user');
      const token = localStorage.getItem('basera_token');
      if (savedUser && token && savedUser !== "undefined") {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Auth initialization failed:", error);
      localStorage.removeItem('basera_user');
      localStorage.removeItem('basera_token');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('basera_user', JSON.stringify(data.user));
        localStorage.setItem('basera_token', data.token);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Server connection failed. Is the backend running?' };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('basera_user', JSON.stringify(data.user));
        localStorage.setItem('basera_token', data.token);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, error: 'Server error. Please try again later.' };
    }
  };

  const googleLogin = async (credential) => {
    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('basera_user', JSON.stringify(data.user));
        localStorage.setItem('basera_token', data.token);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Google login failed' };
      }
    } catch (error) {
      console.error('Google login error:', error);
      return { success: false, error: 'Server connection failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('basera_user');
    localStorage.removeItem('basera_token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
