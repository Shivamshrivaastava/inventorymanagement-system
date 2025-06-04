
import { useAppSelector } from '../store/hooks';
import { Navigate } from 'react-router-dom';
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  console.log('ProtectedRoute rendering...');
  
  // Add error boundary for Redux context
  try {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    console.log('Authentication status:', isAuthenticated);
    
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    
    return <>{children}</>;
  } catch (error) {
    console.error('Error in ProtectedRoute:', error);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
