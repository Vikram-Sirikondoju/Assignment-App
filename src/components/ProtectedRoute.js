// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const { user } = useSelector((state) => state.auth);

  // Check if the user is logged in
  return user ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
