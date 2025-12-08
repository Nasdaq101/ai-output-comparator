import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function Signup({ onSuccess }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let data = null;
      try {
        data = await response.json();
        console.log('REGISTER RESPONSE:', data);
      } catch {
        data = null;
      }

      if (!response.ok) {
        setError((data && data.error) || 'Signup failed');
        return;
      }

      // ✅ success path
      if (data?.tokens?.access) {
        localStorage.setItem('token', data.tokens.access);
        localStorage.setItem('refresh', data.tokens.refresh);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      if (typeof onSuccess === 'function') {
        onSuccess(data.user);
      }

      navigate('/'); // ✅ NOW this won't crash

    } catch (err) {
      console.error('REAL network error:', err);
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <button onClick={() => navigate('/')} className="back-btn">← Back</button>

        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join and start comparing AI</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="yourusername"
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="auth-submit">
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
