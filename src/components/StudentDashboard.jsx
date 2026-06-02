import React, { useState, useEffect } from 'react';
import { useDb } from '../context/DbContext';
import TiltCard from './TiltCard';

export default function StudentDashboard({ initialCourseId, setActiveView }) {
  const {
    currentUser,
    courses,
    enrollments,
    demoSlots,
    users,
    enrollInCourse,
    updateLessonProgress,
    bookDemoSlot
  } = useDb();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [classroomCourseId, setClassroomCourseId] = useState(initialCourseId || null);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  // Auto-switch tabs if classroom is closed
  useEffect(() => {
    if (initialCourseId) {
      const isEnrolled = enrollments.some(e => e.student === currentUser.username && e.courseId === initialCourseId);
      if (!isEnrolled) {
        enrollInCourse(currentUser.username, initialCourseId);
      }
      setClassroomCourseId(initialCourseId);
    }
  }, [initialCourseId, enrollments, currentUser.username, enrollInCourse]);

  if (!currentUser) return null;

  // Filter student specific items
  const myEnrollments = enrollments.filter(e => e.student === currentUser.username);
  
  const enrolledCourses = myEnrollments.map(enroll => {
    const course = courses.find(c => c.id === enroll.courseId);
    if (!course) return null;
    return { ...course, progress: enroll.progress };
  }).filter(Boolean);

  const approvedCourses = courses.filter(c => c.status === 'approved');
  const myEnrollmentIds = myEnrollments.map(e => e.courseId);

  // Honey levels helper
  const honeyLevelLimit = currentUser.level === 'Queen Bee' ? 500 : currentUser.level === 'Forager Bee' ? 100 : 50;
  const progressPercent = Math.min((currentUser.honeyDrops / honeyLevelLimit) * 100, 100);

  const badgesInfo = [
    { name: 'First Flight', desc: 'Unlock your first course in the Beehive.', key: 'First Flight' },
    { name: 'Elite Pollinator', desc: 'Gather more than 50 Honey drops.', key: 'Elite Pollinator' },
    { name: 'Queen\'s Favor', desc: 'Achieve Elite status with 100+ Honey drops.', key: 'Queen\'s Favor' }
  ];

  const handleEnrollClick = (courseId) => {
    const already = myEnrollmentIds.includes(courseId);
    if (!already) {
      enrollInCourse(currentUser.username, courseId);
      alert('Successfully enrolled in the hive! Redirecting to classroom...');
    }
    // Set default active lesson
    const enrollment = enrollments.find(e => e.student === currentUser.username && e.courseId === courseId);
    let firstUncompletedIdx = 0;
    if (enrollment) {
      for (let i = 0; i < courses.find(c => c.id === courseId).lessons.length; i++) {
        if (!enrollment.completedLessons.includes(i)) {
          firstUncompletedIdx = i;
          break;
        }
      }
    }
    setActiveLessonIndex(firstUncompletedIdx);
    setClassroomCourseId(courseId);
  };

  const handleMarkComplete = (courseId, idx) => {
    updateLessonProgress(currentUser.username, courseId, idx);
  };

  const handleBookSlot = (slotId) => {
    bookDemoSlot(currentUser.username, slotId);
    alert('Demo class successfully booked! Prepare your queries for the mentor.');
  };

  // Render classroom if a course is selected
  if (classroomCourseId) {
    const course = courses.find(c => c.id === classroomCourseId);
    const enrollment = enrollments.find(e => e.student === currentUser.username && e.courseId === classroomCourseId);

    if (!course || !enrollment) {
      setClassroomCourseId(null);
      return null;
    }

    const mentorInfo = users.find(u => u.username === course.mentor);
    const mentorName = mentorInfo ? mentorInfo.name : course.mentor;
    const activeLesson = course.lessons[activeLessonIndex] || course.lessons[0];
    const isCompleted = enrollment.completedLessons.includes(activeLessonIndex);

    return (
      <div className="dashboard-layout">
        <aside className="sidebar">
          <div>
            <div style={{ marginBottom: '30px', padding: '0 16px' }}>
              <span className="badge-role badge-student">Classroom</span>
            </div>
            <ul className="sidebar-menu">
              <li className="sidebar-item">
                <div className="sidebar-link active" onClick={() => setClassroomCourseId(null)}>
                  ← Exit Classroom
                </div>
              </li>
            </ul>
          </div>
        </aside>

        <main className="dashboard-content">
          <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="btn btn-glass" onClick={() => setClassroomCourseId(null)} style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
              ← Back to Hive
            </button>
            <span className="badge-role badge-student">{course.category}</span>
          </div>

          <div className="dashboard-header" style={{ marginBottom: '24px' }}>
            <div>
              <h1 className="dashboard-title">{course.title}</h1>
              <p className="dashboard-subtitle">By {mentorName} • Progress: {enrollment.progress}%</p>
            </div>
          </div>

          <div className="classroom-layout">
            {/* Video Viewer */}
            <div>
              <div className="video-container">
                <video key={activeLessonIndex} id="classroom-player" controls src={activeLesson ? activeLesson.videoUrl : ''}></video>
              </div>

              <div className="video-info-box glass-panel" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '1.4rem' }}>{activeLesson ? activeLesson.title : 'No Lesson Selected'}</h3>
                  
                  <div>
                    {isCompleted ? (
                      <span style={{ color: '#34d399', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        Lesson Completed
                      </span>
                    ) : (
                      <button className="btn btn-gold" onClick={() => handleMarkComplete(course.id, activeLessonIndex)} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                        Mark Module Complete (+10 Drops)
                      </button>
                    )}
                  </div>
                </div>
                
                <p style={{ color: 'var(--text-gray-300)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Welcome to this module. Follow along with the instructor, code locally in your IDE, and test interactions. 
                  Once done, check off this unit to grow your hive progress bar and gain honey drops.
                </p>
              </div>
            </div>

            {/* Honeycomb Grid Index */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '20px', fontFamily: 'var(--font-title)', textAlign: 'center' }}>
                Course Honeycomb Syllabus
              </h3>
              
              <div className="honeycomb-grid">
                {course.lessons.map((lesson, idx) => {
                  const lessonDone = enrollment.completedLessons.includes(idx);
                  const lessonActive = idx === activeLessonIndex;

                  return (
                    <div
                      key={idx}
                      className={`honeycomb-cell ${lessonDone ? 'completed' : ''} ${lessonActive ? 'active' : ''}`}
                      onClick={() => setActiveLessonIndex(idx)}
                    >
                      <div className="honeycomb-cell-content">
                        <span>L-{idx + 1}</span>
                        <h4 title={lesson.title}>{lesson.title}</h4>
                        <span style={{ fontSize: '0.6rem', opacity: 0.6 }}>{lesson.duration}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px', textAlign: 'center' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '8px' }}>Stuck on this concept?</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-gray-500)', marginBottom: '12px' }}>
                  Book a quick live demo session with {mentorName}
                </p>
                <button
                  className="btn btn-glass"
                  onClick={() => {
                    setClassroomCourseId(null);
                    setActiveTab('demo-booking');
                  }}
                  style={{ padding: '6px 12px', fontSize: '0.78rem', width: '100%' }}
                >
                  Book Live Office Hours
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div>
          <div style={{ marginBottom: '30px', padding: '0 16px' }}>
            <span className="badge-role badge-student">Student Portal</span>
          </div>
          <ul className="sidebar-menu">
            <li className="sidebar-item">
              <div className={`sidebar-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/>
                  <rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>
                </svg>
                My Hive
              </div>
            </li>
            <li className="sidebar-item">
              <div className={`sidebar-link ${activeTab === 'marketplace' ? 'active' : ''}`} onClick={() => setActiveTab('marketplace')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
                Explore Classes
              </div>
            </li>
            <li className="sidebar-item">
              <div className={`sidebar-link ${activeTab === 'wallet' ? 'active' : ''}`} onClick={() => setActiveTab('wallet')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
                </svg>
                Honey Wallet
              </div>
            </li>
            <li className="sidebar-item">
              <div className={`sidebar-link ${activeTab === 'demo-booking' ? 'active' : ''}`} onClick={() => setActiveTab('demo-booking')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Demo Booking
              </div>
            </li>
          </ul>
        </div>
        
        <div>
          <button className="btn btn-danger" onClick={() => setActiveView('landing')} style={{ width: '100%' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            Leave Hive
          </button>
        </div>
      </aside>

      {/* Main Content Viewports */}
      <main className="dashboard-content">
        {activeTab === 'dashboard' && (
          <>
            <div className="dashboard-header">
              <div>
                <h1 className="dashboard-title">Welcome Back, {currentUser.name || currentUser.username}</h1>
                <p className="dashboard-subtitle">Grow your skills, collect nectar, build your future.</p>
              </div>
            </div>

            {/* Gamified Wallet Progress Widget */}
            <div className="honey-wallet-container glass-panel glowing">
              <div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Gamified Wallet Progress</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-gray-300)' }}>
                  Collect honey drops to level up. Next Rank: <strong>
                    {currentUser.level === 'Queen Bee' ? 'Queen Bee (Max)' : currentUser.level === 'Forager Bee' ? 'Queen Bee' : 'Forager Bee'}
                  </strong>
                </p>
                <div className="progress-track" style={{ width: '320px' }}>
                  <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-gray-500)', display: 'block', marginTop: '6px' }}>
                  {currentUser.honeyDrops} / {honeyLevelLimit} Nectar collected
                </span>
              </div>

              <div className="honey-count">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--gold-primary)" stroke="none">
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
                </svg>
                <span>{currentUser.honeyDrops || 0} Drops</span>
              </div>
            </div>

            {/* Active Enrolled Courses */}
            <h2 style={{ fontSize: '1.6rem', marginBottom: '24px', fontFamily: 'var(--font-title)' }}>My Active Enrolled Courses</h2>
            {enrolledCourses.length === 0 ? (
              <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-gray-300)' }}>
                <p style={{ marginBottom: '20px' }}>You are not enrolled in any courses yet.</p>
                <button className="btn btn-gold" onClick={() => setActiveTab('marketplace')}>Browse Hives</button>
              </div>
            ) : (
              <div className="course-grid">
                {enrolledCourses.map(course => (
                  <TiltCard
                    key={course.id}
                    className="tilt-card glass-panel glowing"
                    onClick={() => handleEnrollClick(course.id)}
                  >
                    <div className="card-content">
                      <div className="card-img-wrapper">
                        <img src={course.image} alt={course.title} />
                        <span className="card-badge" style={{ background: 'var(--gold-primary)', color: '#000', fontWeight: 700 }}>
                          Progress: {course.progress}%
                        </span>
                      </div>
                      <h3 className="card-title tilt-depth">{course.title}</h3>
                      <p className="card-desc">{course.description.substring(0, 85)}...</p>
                      <div className="progress-track" style={{ marginBottom: '20px' }}>
                        <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                      </div>
                      <button className="btn btn-gold tilt-depth" style={{ width: '100%' }}>Enter Classroom</button>
                    </div>
                  </TiltCard>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'marketplace' && (
          <>
            <div className="dashboard-header">
              <div>
                <h1 className="dashboard-title">Explore Hives of Knowledge</h1>
                <p className="dashboard-subtitle">Gain access to top-tier verified classes</p>
              </div>
            </div>

            <div className="course-grid">
              {approvedCourses.map(course => {
                const isEnrolled = myEnrollmentIds.includes(course.id);
                const mentor = users.find(u => u.username === course.mentor);
                const mentorName = mentor ? mentor.name : course.mentor;
                
                return (
                  <TiltCard
                    key={course.id}
                    className="tilt-card glass-panel glowing"
                    onClick={() => handleEnrollClick(course.id)}
                  >
                    <div className="card-content">
                      <div className="card-img-wrapper">
                        <img src={course.image} alt={course.title} />
                        <span className="card-badge">{course.category}</span>
                      </div>
                      <h3 className="card-title tilt-depth">{course.title}</h3>
                      <p className="card-desc">{course.description}</p>
                      <div className="card-footer tilt-depth" style={{ marginBottom: '16px' }}>
                        <div className="card-author">
                          <div className="avatar-mini">{mentorName.charAt(0)}</div>
                          <span>By {mentorName}</span>
                        </div>
                        <div className="card-stat">
                          <span>{course.rating || '4.5'} ★</span>
                        </div>
                      </div>
                      <button className={`btn ${isEnrolled ? 'btn-glass' : 'btn-gold'} tilt-depth`} style={{ width: '100%' }}>
                        {isEnrolled ? 'Already Enrolled - View Class' : 'Enroll Now'}
                      </button>
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          </>
        )}

        {activeTab === 'wallet' && (
          <>
            <div className="dashboard-header">
              <div>
                <h1 className="dashboard-title">Honey Wallet</h1>
                <p className="dashboard-subtitle">Track your gamified learning achievements and nectar</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              <div className="glass-panel glowing" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Nectar Summary</h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                  <div className="avatar-large" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>🐝</div>
                  <div>
                    <h2 style={{ color: 'var(--gold-bright)', fontSize: '2.2rem' }}>{currentUser.honeyDrops || 0} Drops</h2>
                    <span className="badge-role badge-student">{currentUser.level} Status</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-gray-300)' }}>
                  Nectar is earned by completing modules in your enrolled courses. 
                  Each verified completed lesson awards you <strong>10 Honey drops</strong>. 
                  Accumulate more drops to climb the swarm ranks!
                </p>
              </div>

              <div className="glass-panel glowing" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Swarm Badges</h3>
                
                <div className="badge-row" style={{ flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
                  {badgesInfo.map(badge => {
                    const hasBadge = currentUser.badges && currentUser.badges.includes(badge.key);
                    return (
                      <div
                        key={badge.key}
                        className="glass-panel"
                        style={{
                          padding: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderColor: hasBadge ? 'var(--border-glass-gold)' : 'var(--border-glass)',
                          background: hasBadge ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.1)',
                          opacity: hasBadge ? 1 : 0.45
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ fontSize: '1.8rem' }}>{hasBadge ? '🏆' : '🔒'}</div>
                          <div>
                            <h4 style={{ color: hasBadge ? 'var(--gold-bright)' : 'var(--text-gray-300)' }}>{badge.name}</h4>
                            <p style={{ fontSize: '0.78rem', color: 'var(--text-gray-500)', marginTop: '4px' }}>{badge.desc}</p>
                          </div>
                        </div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', color: hasBadge ? '#34d399' : 'var(--text-gray-500)' }}>
                          {hasBadge ? 'UNLOCKED' : 'LOCKED'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'demo-booking' && (
          <>
            <div className="dashboard-header">
              <div>
                <h1 className="dashboard-title">1-on-1 Office Hours & Demo Classes</h1>
                <p className="dashboard-subtitle">Book visual interactive demo slots with verified mentors</p>
              </div>
            </div>

            <div className="glass-panel glowing" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '24px' }}>Available Live Sessions</h3>
              
              <div className="slots-container">
                {demoSlots.map(slot => {
                  const mentor = users.find(m => m.username === slot.mentor);
                  const mentorName = mentor ? mentor.name : slot.mentor;
                  const isBookedByMe = slot.bookedBy === currentUser.username;
                  const isBookedByOther = slot.bookedBy && !isBookedByMe;

                  return (
                    <div
                      key={slot.id}
                      className="slot-item glass-panel"
                      style={{
                        borderColor: isBookedByMe ? 'var(--border-glass-gold)' : 'var(--border-glass)',
                        background: isBookedByMe ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255,255,255,0.01)'
                      }}
                    >
                      <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🍯</div>
                      <h4 style={{ fontSize: '0.95rem' }}>{mentorName}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-gray-300)', marginTop: '4px' }}>{slot.date}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-gray-300)' }}>{slot.time}</p>
                      
                      <div className="slot-status">
                        {isBookedByMe ? (
                          <span style={{ color: '#34d399', fontWeight: 600 }}>Your Appointment</span>
                        ) : isBookedByOther ? (
                          <span style={{ color: 'var(--text-gray-500)' }}>Unavailable</span>
                        ) : (
                          <button
                            className="btn btn-gold book-slot-btn"
                            onClick={() => handleBookSlot(slot.id)}
                            style={{ padding: '6px 12px', fontSize: '0.78rem', marginTop: '8px' }}
                          >
                            Book Slot
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
