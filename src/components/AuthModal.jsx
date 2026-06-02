import React, { useState } from 'react';
import { useDb } from '../context/DbContext';

export default function AuthModal({ activeTab, onClose, setActiveView }) {
  const { login, signUp } = useDb();
  
  // Tab control: 'login' or 'signup'
  const [currentTab, setCurrentTab] = useState(activeTab || 'login');
  const [selectedRole, setSelectedRole] = useState('student'); // 'student' or 'mentor'

  // Input states
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupUser, setSignupUser] = useState('');
  const [signupPass, setSignupPass] = useState('');
  const [signupError, setSignupError] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const user = login(loginUser, loginPass);
      alert(`Welcome back to the Hive, ${user.name || user.username}!`);
      onClose();
      setActiveView(`${user.role}-dashboard`);
    } catch (err) {
      setLoginError(err.message);
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setSignupError('');
    try {
      const newUser = signUp(signupUser, signupPass, selectedRole, { name: signupName });
      if (selectedRole === 'mentor') {
        alert('Mentor account created successfully! Please wait for administrator approval.');
        setCurrentTab('login');
      } else {
        alert(`Welcome to the Swarm, ${newUser.name}!`);
        // Log them in immediately
        login(signupUser, signupPass);
        onClose();
        setActiveView('student-dashboard');
      }
    } catch (err) {
      setSignupError(err.message);
    }
  };

  return (
    <div className="modal-overlay active" id="auth-modal">
      <div className="auth-perspective">
        <div className={`auth-card-flipper ${currentTab === 'signup' ? 'flipped' : ''}`} id="auth-flipper">
          
          {/* Login Front Card */}
          <div className="auth-front glass-panel glowing" style={{ background: 'rgba(18, 18, 22, 0.95)' }}>
            <div className="auth-form-wrapper">
              <h2 className="form-title">Enter the Hive</h2>
              <p className="form-subtitle">Welcome back! Access your workspace.</p>
              
              {loginError && (
                <div style={{ color: '#f87171', fontSize: '0.85rem', textAlign: 'center', marginBottom: '15px' }}>
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label className="form-label">Username</label>
                  <div className="input-wrapper">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="student1"
                      value={loginUser}
                      onChange={(e) => setLoginUser(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-wrapper">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <input
                      type="password"
                      className="form-input"
                      placeholder="••••••••"
                      value={loginPass}
                      onChange={(e) => setLoginPass(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-gold" style={{ width: '100%', marginTop: '10px' }}>
                  Login
                </button>
              </form>

              <div className="form-switch">
                Don't have an account?{' '}
                <span onClick={() => { setCurrentTab('signup'); setSignupError(''); }} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                  Sign up here
                </span>
              </div>
              <button className="btn btn-glass modal-close-btn" onClick={onClose} style={{ width: '100%', marginTop: '15px', padding: '8px 16px' }}>
                Cancel
              </button>
            </div>
          </div>

          {/* Register Back Card */}
          <div className="auth-back glass-panel glowing" style={{ background: 'rgba(18, 18, 22, 0.95)' }}>
            <div className="auth-form-wrapper">
              <h2 className="form-title">Join the Swarm</h2>
              <p className="form-subtitle">Create your Beehive account today.</p>

              {signupError && (
                <div style={{ color: '#f87171', fontSize: '0.85rem', textAlign: 'center', marginBottom: '15px' }}>
                  {signupError}
                </div>
              )}

              <form onSubmit={handleSignupSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <div className="input-wrapper">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Beatrice"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Username</label>
                  <div className="input-wrapper">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. beatrice"
                      value={signupUser}
                      onChange={(e) => setSignupUser(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-wrapper">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <input
                      type="password"
                      className="form-input"
                      placeholder="••••••••"
                      value={signupPass}
                      onChange={(e) => setSignupPass(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">I want to join as</label>
                  <div className="role-selector">
                    <div
                      className={`role-option ${selectedRole === 'student' ? 'active' : ''}`}
                      onClick={() => setSelectedRole('student')}
                    >
                      Student
                    </div>
                    <div
                      className={`role-option ${selectedRole === 'mentor' ? 'active' : ''}`}
                      onClick={() => setSelectedRole('mentor')}
                    >
                      Mentor
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-gold" style={{ width: '100%', marginTop: '10px' }}>
                  Sign Up
                </button>
              </form>

              <div className="form-switch">
                Already have an account?{' '}
                <span onClick={() => { setCurrentTab('login'); setLoginError(''); }} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                  Log in here
                </span>
              </div>
              <button className="btn btn-glass modal-close-btn" onClick={onClose} style={{ width: '100%', marginTop: '15px', padding: '8px 16px' }}>
                Cancel
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
