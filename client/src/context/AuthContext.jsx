import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for persisted login on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { username, password });

      if (response.status === 200) {
        const loggedInUser = response.data;
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        return { success: true };
      } else {
        return { success: false, message: 'Invalid username or password' };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const signup = async (username, password, name, email) => {
    try {
      const newUser = { username, password, name, email };
      const response = await axios.post('http://localhost:3000/auth/signup', newUser);

      if (response.status === 201) {
        const createdUser = response.data;
        setUser(createdUser);
        localStorage.setItem('user', JSON.stringify(createdUser));
        return { success: true };
      } else {
        return { success: false, message: 'Failed to create account' };
      }
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, message: error.response?.data?.message || 'Signup failed' };
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
