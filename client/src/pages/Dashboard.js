import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import './Dashboard.css';

const Dashboard = () => {
  const { user, isAuthenticated, logout, getMe, loading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      // Try to get user from token
      getMe();
    }
  }, [isAuthenticated, loading, getMe]);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-welcome">Welcome, {user?.name || user?.email}!</p>
      <div className="dashboard-info">
        <p className="dashboard-info-item">Email: {user?.email}</p>
        <p className="dashboard-info-item">ID: {user?.id}</p>
      </div>
      <button onClick={handleLogout} className="dashboard-button">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
