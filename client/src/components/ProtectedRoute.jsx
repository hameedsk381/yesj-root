import React from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { isAdmin } = useAdmin();

  if (!isAdmin) {
    // Redirect to admin login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;