import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import '../styles/Login.scss';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      login(response.data);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-page'>
    <div className="login-page-left">
      <h1>OrderTracking</h1>
    </div>
    <div className="login-page-right">
      <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
          <label htmlFor='user-email'>Email:</label>
          <input
            type="email"
            id='user-email'
            placeholder='johndoe@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor='password'>Password:</label>
          <input
            type="Password"
            id='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      </div>
      </div>
    </div>
  );
};

export default Login;
