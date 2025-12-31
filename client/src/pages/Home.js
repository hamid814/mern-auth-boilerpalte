import useAuthStore from '../store/authStore';
import './Home.css';

const Home = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to MERN Auth</h1>
      <div className="home-content">
        {isAuthenticated ? (
          <div>
            <p className="home-greeting">Hello, {user?.name || user?.email}!</p>
            <p className="home-message">You are successfully logged in.</p>
          </div>
        ) : (
          <div>
            <p className="home-message">
              Please login or register to access your dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
