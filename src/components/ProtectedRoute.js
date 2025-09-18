import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole = 'admin' }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to admin login route, but save the current location they were trying to go to
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  // Check if user has the required role
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to home or unauthorized page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
