import React, { useState } from 'react';
import { useDb } from '../context/DbContext';

export default function AdminDashboard({ setActiveView }) {
  const {
    currentUser,
    users,
    courses,
    enrollments,
    verifyMentor,
    toggleUserStatus,
    manageCourseStatus
  } = useDb();

  const [activeTab, setActiveTab] = useState('overview');

  if (!currentUser || currentUser.role !== 'admin') {
    return null;
  }

  // Calculations for overview tab
  const totalStudents = users.filter(u => u.role === 'student').length;
  const totalMentors = users.filter(u => u.role === 'mentor').length;
  const pendingCourses = courses.filter(c => c.status === 'pending').length;
  const systemEarnings = enrollments.length * 50;

  const handleVerify = (username) => {
    verifyMentor(username);
    alert(`Mentor account ${username} verified! They can now access all workspace assets.`);
  };

  const handleToggleSuspend = (username) => {
    toggleUserStatus(username);
    alert(`Updated account status for ${username}`);
  };

  const handleApproveCourse = (courseId) => {
    manageCourseStatus(courseId, 'approved');
    alert('Course approved successfully! It has been posted live onto the marketplace.');
  };

  const handleDeclineCourse = (courseId) => {
    manageCourseStatus(courseId, 'declined');
    alert('Submission declined.');
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div>
          <div style={{ marginBottom: '30px', padding: '0 16px' }}>
            <span className="badge-role badge-admin">Admin Dashboard</span>
          </div>
          <ul className="sidebar-menu">
            <li className="sidebar-item">
              <div
                className={`sidebar-link ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" />
                  <rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" />
                </svg>
                Overview
              </div>
            </li>
            
            <li className="sidebar-item">
              <div
                className={`sidebar-link ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Users Control
              </div>
            </li>
            
            <li className="sidebar-item">
              <div
                className={`sidebar-link ${activeTab === 'queue' ? 'active' : ''}`}
                onClick={() => setActiveTab('queue')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                Approval Queue
              </div>
            </li>
          </ul>
        </div>
        
        <div>
          <button className="btn btn-danger" onClick={() => setActiveView('landing')} style={{ width: '100%' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            Leave Hive
          </button>
        </div>
      </aside>

      {/* Main Content Viewports */}
      <main className="dashboard-content">
        {activeTab === 'overview' && (
          <>
            <div className="dashboard-header">
              <div>
                <h1 className="dashboard-title">Platform Statistics</h1>
                <p className="dashboard-subtitle">Real-time statistics of the Beehive network</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="stat-grid">
              <div className="stat-card glass-panel glowing">
                <div className="stat-header">
                  <span>Total Swarm Members</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                  </svg>
                </div>
                <div className="stat-value">{users.length}</div>
                <div className="stat-desc">{totalStudents} Students • {totalMentors} Mentors</div>
              </div>

              <div className="stat-card glass-panel glowing">
                <div className="stat-header">
                  <span>Decentralized Hives</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                  </svg>
                </div>
                <div className="stat-value">{courses.length}</div>
                <div className="stat-desc">{courses.filter(c => c.status === 'approved').length} Active • {pendingCourses} Pending</div>
              </div>

              <div className="stat-card glass-panel glowing">
                <div className="stat-header">
                  <span>Total Swarm Value</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="stat-value">${systemEarnings}</div>
                <div className="stat-desc">Generated via course enrollments</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px' }}>
              {/* Recent Courses */}
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '20px' }}>Top Enrolled Courses</h3>
                <div className="beehive-table-wrapper">
                  <table className="beehive-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Students</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.filter(c => c.status === 'approved').slice(0, 3).map(course => (
                        <tr key={course.id}>
                          <td style={{ fontWeight: 500 }}>{course.title}</td>
                          <td>{course.category}</td>
                          <td>{course.enrolledCount} enrolled</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Logs */}
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '20px' }}>System Activity log</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.82rem', color: 'var(--text-gray-300)' }}>
                  <div style={{ padding: '8px', borderLeft: '2px solid var(--gold-primary)', background: 'rgba(255,255,255,0.01)' }}>
                    <strong>student1</strong> completed lesson 1 in "3D CSS Transforms".
                  </div>
                  <div style={{ padding: '8px', borderLeft: '2px solid var(--gold-primary)', background: 'rgba(255,255,255,0.01)' }}>
                    <strong>mentor2</strong> submitted course "Honey-UI".
                  </div>
                  <div style={{ padding: '8px', borderLeft: '2px solid var(--gold-primary)', background: 'rgba(255,255,255,0.01)' }}>
                    <strong>student1</strong> enrolled in "3D CSS Transforms".
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'users' && (
          <>
            <div className="dashboard-header">
              <div>
                <h1 className="dashboard-title">Users Control Center</h1>
                <p className="dashboard-subtitle">Suspend profiles or verify new mentor applications</p>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '10px' }}>
              <div className="beehive-table-wrapper">
                <table className="beehive-table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Role</th>
                      <th>Verification</th>
                      <th>Acc Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => {
                      const isSuspended = user.status === 'suspended';
                      const isMentor = user.role === 'mentor';
                      const canVerify = isMentor && !user.verified;
                      const isAdmin = user.role === 'admin';

                      return (
                        <tr key={user.username}>
                          <td style={{ fontWeight: 500 }}>
                            {user.username}
                            {user.name && (
                              <>
                                <br />
                                <span style={{ fontSize: '0.72rem', color: 'var(--text-gray-500)', fontWeight: 'normal' }}>
                                  {user.name}
                                </span>
                              </>
                            )}
                          </td>
                          <td>
                            <span className={`badge-role badge-${user.role}`}>{user.role}</span>
                          </td>
                          <td>
                            {isMentor ? (
                              user.verified ? (
                                <span style={{ color: '#34d399', fontWeight: 600 }}>✓ Verified</span>
                              ) : (
                                <span style={{ color: 'var(--text-gray-500)' }}>Unverified</span>
                              )
                            ) : (
                              'N/A'
                            )}
                          </td>
                          <td>
                            {isSuspended ? (
                              <span style={{ color: '#f87171', fontWeight: 600 }}>Suspended</span>
                            ) : (
                              <span style={{ color: '#34d399', fontWeight: 600 }}>Active</span>
                            )}
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              {canVerify && (
                                <button
                                  className="btn btn-gold"
                                  onClick={() => handleVerify(user.username)}
                                  style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                                >
                                  Verify
                                </button>
                              )}
                              
                              {!isAdmin ? (
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleToggleSuspend(user.username)}
                                  style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                                >
                                  {isSuspended ? 'Unsuspend' : 'Suspend'}
                                </button>
                              ) : (
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-gray-500)' }}>No Actions</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'queue' && (
          <>
            <div className="dashboard-header">
              <div>
                <h1 className="dashboard-title">Verification Queue</h1>
                <p className="dashboard-subtitle">Approve or reject newly constructed courses</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {courses.filter(c => c.status === 'pending').length === 0 ? (
                <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-gray-300)' }}>
                  No pending submissions waiting in the gatekeeper database.
                </div>
              ) : (
                courses.filter(c => c.status === 'pending').map(course => {
                  const mentor = users.find(u => u.username === course.mentor);
                  const mentorName = mentor ? mentor.name : course.mentor;
                  
                  return (
                    <div key={course.id} className="glass-panel glowing" style={{ padding: '32px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <div>
                          <span className="badge-role badge-student" style={{ marginBottom: '12px', display: 'inline-block' }}>
                            {course.category}
                          </span>
                          <h3 style={{ fontSize: '1.4rem', marginBottom: '6px' }}>{course.title}</h3>
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-gray-300)' }}>
                            Submitted by: <strong>{mentorName} ({course.mentor})</strong>
                          </p>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <button
                            className="btn btn-gold"
                            onClick={() => handleApproveCourse(course.id)}
                          >
                            Approve Course
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeclineCourse(course.id)}
                          >
                            Reject
                          </button>
                        </div>
                      </div>

                      <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-gray-300)', marginBottom: '24px' }}>
                        {course.description}
                      </p>

                      <h4 style={{ fontSize: '0.88rem', marginBottom: '12px', color: 'var(--gold-bright)' }}>
                        Syllabus Checklist ({course.lessons.length} Modules):
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: 'var(--text-gray-500)' }}>
                        {course.lessons.map((l, i) => (
                          <div key={i} style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.02)' }}>
                            Module {i + 1}: {l.title} ({l.duration})
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
