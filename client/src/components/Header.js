import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import './Header.css';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div>
        <Link to="/" className="header-logo">
          MERN Auth
        </Link>
      </div>
      <nav className="header-nav">
        {isAuthenticated ? (
          <>
            <span>Hello, {user?.name || user?.email}</span>
            <Link to="/dashboard" className="header-link">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="header-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="header-link">
              Login
            </Link>
            <Link to="/register" className="header-link">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
