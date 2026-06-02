import React, { useState } from 'react';
import { useDb } from '../context/DbContext';

export default function Navbar({ activeView, setActiveView, onShowAuth }) {
  const { currentUser, logout } = useDb();
  const [drawerActive, setDrawerActive] = useState(false);

  const handleLogoClick = () => {
    setDrawerActive(false);
    setActiveView('landing');
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setDrawerActive(false);
    setActiveView('landing');
  };

  const handleDashboardClick = (e) => {
    e.preventDefault();
    setDrawerActive(false);
    if (currentUser) {
      setActiveView(`${currentUser.role}-dashboard`);
    }
  };

  const handleLogout = () => {
    setDrawerActive(false);
    logout();
    alert('Logged out from the Beehive.');
    setActiveView('landing');
  };

  return (
    <nav className="navbar" id="app-navbar">
      <div className="container navbar-container">
        {/* Logo */}
        <div className="logo" style={{ cursor: 'pointer' }} onClick={handleLogoClick}>
          <img src="assets/beehive logo.jpg" alt="Beehive Logo" className="logo-img" />
          Beehive
        </div>

        {/* Desktop Links */}
        <div className="nav-links">
          <a
            href="#"
            className={`nav-link ${activeView === 'landing' ? 'active' : ''}`}
            onClick={handleHomeClick}
          >
            Home
          </a>
          
          {currentUser ? (
            <>
              <a
                href="#"
                className={`nav-link ${activeView.includes('dashboard') ? 'active' : ''}`}
                onClick={handleDashboardClick}
              >
                Dashboard
              </a>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderLeft: '1px solid var(--border-glass)',
                paddingLeft: '24px',
                marginLeft: '8px'
              }}>
                <span className={`badge-role badge-${currentUser.role}`}>{currentUser.role}</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{currentUser.name || currentUser.username}</span>
                <button
                  className="btn btn-glass"
                  onClick={handleLogout}
                  style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <button className="btn btn-glass" onClick={() => onShowAuth('login')} style={{ padding: '8px 16px' }}>
                Sign In
              </button>
              <button className="btn btn-gold" onClick={() => onShowAuth('signup')} style={{ padding: '8px 20px' }}>
                Join Swarm
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button className="nav-mobile-toggle" onClick={() => setDrawerActive(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        {/* Slide-out Drawer */}
        <div className={`nav-drawer ${drawerActive ? 'active' : ''}`}>
          <div className="nav-drawer-header">
            <div className="logo" onClick={handleLogoClick}>
              <img src="assets/beehive logo.jpg" alt="Logo" className="logo-img" />
              Beehive
            </div>
            <button className="nav-drawer-close" onClick={() => setDrawerActive(false)}>&times;</button>
          </div>
          <div className="nav-drawer-links">
            <a
              href="#"
              className={`nav-drawer-link ${activeView === 'landing' ? 'active' : ''}`}
              onClick={handleHomeClick}
            >
              Home
            </a>
            {currentUser ? (
              <>
                <a
                  href="#"
                  className={`nav-drawer-link ${activeView.includes('dashboard') ? 'active' : ''}`}
                  onClick={handleDashboardClick}
                >
                  Dashboard
                </a>
                <div style={{ margin: '20px 0', borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
                  <span className={`badge-role badge-${currentUser.role}`} style={{ display: 'inline-block', marginBottom: '12px' }}>
                    {currentUser.role}
                  </span>
                  <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-white)' }}>
                    {currentUser.name || currentUser.username}
                  </p>
                </div>
                <button className="btn btn-danger" onClick={handleLogout} style={{ width: '100%', marginTop: '10px' }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-glass"
                  onClick={() => { setDrawerActive(false); onShowAuth('login'); }}
                  style={{ width: '100%', marginTop: '20px' }}
                >
                  Sign In
                </button>
                <button
                  className="btn btn-gold"
                  onClick={() => { setDrawerActive(false); onShowAuth('signup'); }}
                  style={{ width: '100%', marginTop: '12px' }}
                >
                  Join Swarm
                </button>
              </>
            )}
          </div>
        </div>

        {/* Drawer Backdrop Overlay */}
        <div className={`nav-drawer-overlay ${drawerActive ? 'active' : ''}`} onClick={() => setDrawerActive(false)}></div>
      </div>
    </nav>
  );
}
