import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, getMe } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      getMe();
    }
  }, [isAuthenticated, loading, getMe]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
