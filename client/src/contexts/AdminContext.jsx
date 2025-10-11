import React, { createContext, useState, useContext, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  // Check if admin is already logged in on component mount
  useEffect(() => {
    const storedAdmin = localStorage.getItem('adminUser');
    if (storedAdmin) {
      try {
        const parsedAdmin = JSON.parse(storedAdmin);
        setIsAdmin(true);
        setAdminUser(parsedAdmin);
      } catch (error) {
        console.error('Error parsing admin user from localStorage:', error);
        localStorage.removeItem('adminUser');
      }
    }
  }, []);

  const login = (username, password) => {
    // Default admin credentials as per user preference
    if (username === 'admin' && password === 'admin123') {
      const adminData = { username: 'admin', role: 'administrator' };
      localStorage.setItem('adminUser', JSON.stringify(adminData));
      setIsAdmin(true);
      setAdminUser(adminData);
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    localStorage.removeItem('adminUser');
    setIsAdmin(false);
    setAdminUser(null);
  };

  const value = {
    isAdmin,
    adminUser,
    login,
    logout
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};