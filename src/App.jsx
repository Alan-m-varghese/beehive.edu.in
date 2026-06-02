import React, { useState } from 'react';
import { useDb } from './context/DbContext';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import StudentDashboard from './components/StudentDashboard';
import MentorDashboard from './components/MentorDashboard';
import AdminDashboard from './components/AdminDashboard';
import BackgroundCanvas from './components/BackgroundCanvas';
import AuthModal from './components/AuthModal';
import './style.css';

export default function App() {
  const { currentUser } = useDb();
  const [activeView, setActiveView] = useState('landing');
  const [viewParams, setViewParams] = useState({});
  const [authModalActive, setAuthModalActive] = useState(false);
  const [authModalType, setAuthModalType] = useState('login'); // 'login' or 'signup'
  const [fadeOpacity, setFadeOpacity] = useState(1);

  const handleSetActiveView = (view, params = {}) => {
    setFadeOpacity(0);
    setTimeout(() => {
      setActiveView(view);
      setViewParams(params);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setFadeOpacity(1);
    }, 300);
  };

  const handleShowAuth = (type) => {
    setAuthModalType(type);
    setAuthModalActive(true);
  };

  return (
    <>
      <BackgroundCanvas isDashboard={activeView.includes('dashboard')} />
      
      <div id="app-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar
          activeView={activeView}
          setActiveView={handleSetActiveView}
          onShowAuth={handleShowAuth}
        />
        
        <div
          id="view-viewport"
          style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            transition: 'opacity 0.3s ease',
            opacity: fadeOpacity
          }}
        >
          {activeView === 'landing' && (
            <LandingPage
              setActiveView={handleSetActiveView}
              onShowAuth={handleShowAuth}
            />
          )}

          {activeView === 'student-dashboard' && (
            <StudentDashboard
              initialCourseId={viewParams.enrollCourseId}
              setActiveView={handleSetActiveView}
            />
          )}

          {activeView === 'mentor-dashboard' && (
            <MentorDashboard
              setActiveView={handleSetActiveView}
            />
          )}

          {activeView === 'admin-dashboard' && (
            <AdminDashboard
              setActiveView={handleSetActiveView}
            />
          )}
        </div>

        {authModalActive && (
          <AuthModal
            activeTab={authModalType}
            onClose={() => setAuthModalActive(false)}
            setActiveView={handleSetActiveView}
          />
        )}
      </div>
    </>
  );
}
