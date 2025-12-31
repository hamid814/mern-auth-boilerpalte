import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(name, email, password);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      {error && <p className="register-error">{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="register-form-group">
          <label className="register-form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="register-form-input"
            required
          />
        </div>
        <div className="register-form-group">
          <label className="register-form-label">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-form-input"
            required
          />
        </div>
        <div className="register-form-group">
          <label className="register-form-label">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-form-input"
            required
            minLength={6}
          />
        </div>
        <button type="submit" disabled={loading} className="register-button">
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className="register-footer">
        Already have an account?{' '}
        <Link to="/login" className="register-footer-link">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
