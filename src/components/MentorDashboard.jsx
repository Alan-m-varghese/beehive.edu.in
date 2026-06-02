import React, { useState } from 'react';
import { useDb } from '../context/DbContext';

export default function MentorDashboard({ setActiveView }) {
  const {
    currentUser,
    courses,
    demoSlots,
    createCourse,
    createDemoSlot
  } = useDb();

  const [activeTab, setActiveTab] = useState('analytics');
  
  // Course builder form states
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDesc, setCourseDesc] = useState('');
  const [courseCategory, setCourseCategory] = useState('Design');
  const [courseImage, setCourseImage] = useState('');
  const [addedLessons, setAddedLessons] = useState([]);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDur, setLessonDur] = useState('');

  // Uploader states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, processing, completed
  const [isUploaded, setIsUploaded] = useState(false);

  // Scheduler states
  const [slotDate, setSlotDate] = useState('');
  const [slotTime, setSlotTime] = useState('');

  if (!currentUser || currentUser.role !== 'mentor') {
    return null;
  }

  // Filter mentor-specific courses and slots
  const myCourses = courses.filter(c => c.mentor === currentUser.username);
  const mySlots = demoSlots.filter(s => s.mentor === currentUser.username);

  // Calculations
  const totalStudents = myCourses.reduce((acc, c) => acc + (c.enrolledCount || 0), 0);
  const estimatedEarnings = totalStudents * 15;

  const handleAddLesson = () => {
    if (!lessonTitle || !lessonDur) return;
    setAddedLessons([
      ...addedLessons,
      {
        title: lessonTitle,
        duration: lessonDur,
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
      }
    ]);
    setLessonTitle('');
    setLessonDur('');
  };

  const handleRemoveLesson = (idx) => {
    setAddedLessons(addedLessons.filter((_, i) => i !== idx));
  };

  const handleUploadClick = () => {
    if (isUploaded || isUploading) return;
    setIsUploading(true);
    setUploadStatus('uploading');
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 4;
      setUploadProgress(progress);
      
      if (progress <= 40) {
        setUploadStatus('uploading');
      } else if (progress <= 80) {
        setUploadStatus('processing');
      } else if (progress < 100) {
        setUploadStatus('finalizing');
      } else {
        clearInterval(interval);
        setUploadStatus('completed');
        setIsUploaded(true);
        setIsUploading(false);
      }
    }, 100);
  };

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    if (addedLessons.length === 0) {
      alert('Please add at least one lesson module.');
      return;
    }

    createCourse(currentUser.username, {
      title: courseTitle,
      description: courseDesc,
      category: courseCategory,
      image: courseImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
      lessons: addedLessons
    });

    alert('Hive course submitted to Admin Queue successfully! Redirecting...');
    
    // Reset builder form states
    setCourseTitle('');
    setCourseDesc('');
    setCourseCategory('Design');
    setCourseImage('');
    setAddedLessons([]);
    setIsUploaded(false);
    setUploadProgress(0);
    setUploadStatus('idle');

    setActiveTab('analytics');
  };

  const handleSlotSubmit = (e) => {
    e.preventDefault();
    if (!slotDate || !slotTime) return;

    createDemoSlot(currentUser.username, slotDate, slotTime);
    alert('Office hour slot opened successfully!');
    setSlotDate('');
    setSlotTime('');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div>
          <div style={{ marginBottom: '30px', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span className="badge-role badge-mentor">Mentor Workspace</span>
            {currentUser.verified ? (
              <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Hive Verified
              </span>
            ) : (
              <span style={{ fontSize: '0.72rem', color: '#f87171', fontWeight: 600 }}>
                Pending Verification
              </span>
            )}
          </div>
          
          <ul className="sidebar-menu">
            <li className="sidebar-item">
              <div
                className={`sidebar-link ${activeTab === 'analytics' ? 'active' : ''}`}
                onClick={() => setActiveTab('analytics')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
                </svg>
                Analytics
              </div>
            </li>
            
            <li className="sidebar-item">
              <div
                className={`sidebar-link ${activeTab === 'builder' ? 'active' : ''} ${!currentUser.verified ? 'disabled' : ''}`}
                onClick={() => {
                  if (currentUser.verified) {
                    setActiveTab('builder');
                  }
                }}
                style={{ cursor: currentUser.verified ? 'pointer' : 'not-allowed' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                Course Builder
              </div>
            </li>
            
            <li className="sidebar-item">
              <div
                className={`sidebar-link ${activeTab === 'scheduler' ? 'active' : ''}`}
                onClick={() => setActiveTab('scheduler')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Office Hours
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
        {activeTab === 'analytics' && (
          <>
            <div className="dashboard-header">
              <div>
                <h1 className="dashboard-title">Workspace Analytics</h1>
                <p className="dashboard-subtitle">Monitor your platform achievements and submissions</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="stat-grid">
              <div className="stat-card glass-panel glowing">
                <div className="stat-header">
                  <span>Enrolled Students</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="stat-value">{totalStudents}</div>
                <div className="stat-desc">Students learning in your hives</div>
              </div>

              <div className="stat-card glass-panel glowing">
                <div className="stat-header">
                  <span>Estimated Earnings</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="stat-value">${estimatedEarnings}</div>
                <div className="stat-desc">Calculated at standard royalty share</div>
              </div>

              <div className="stat-card glass-panel glowing">
                <div className="stat-header">
                  <span>Active Hives</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                  </svg>
                </div>
                <div className="stat-value">{myCourses.length}</div>
                <div className="stat-desc">Courses drafted or approved</div>
              </div>
            </div>

            {/* Course List Table */}
            <h2 style={{ fontSize: '1.6rem', marginBottom: '20px', fontFamily: 'var(--font-title)' }}>My Hives Status</h2>
            
            <div className="glass-panel" style={{ padding: '10px' }}>
              <div className="beehive-table-wrapper">
                <table className="beehive-table">
                  <thead>
                    <tr>
                      <th>Hive Title</th>
                      <th>Category</th>
                      <th>Enrolled</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myCourses.length === 0 ? (
                      <tr>
                        <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-gray-500)', padding: '40px 0' }}>
                          No courses created yet. Apply to launch a new hive course.
                        </td>
                      </tr>
                    ) : (
                      myCourses.map(course => (
                        <tr key={course.id}>
                          <td style={{ fontWeight: 500 }}>{course.title}</td>
                          <td>{course.category}</td>
                          <td>{course.enrolledCount} bees</td>
                          <td>
                            {course.status === 'approved' && (
                              <span style={{ color: '#34d399', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                ● Approved
                              </span>
                            )}
                            {course.status === 'declined' && (
                              <span style={{ color: '#f87171', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                ● Declined
                              </span>
                            )}
                            {course.status === 'pending' && (
                              <span style={{ color: 'var(--gold-primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                ● Pending Approval
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'builder' && (
          <>
            <div className="dashboard-header">
              <div>
                <h1 className="dashboard-title">Create New Hive Course</h1>
                <p className="dashboard-subtitle">Upload assets, title, and structure lessons</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px' }}>
              <form onSubmit={handleCourseSubmit} className="glass-panel glowing" style={{ padding: '32px' }}>
                <div className="form-grid">
                  <div className="form-group form-full-width">
                    <label className="form-label">Hive Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={courseTitle}
                      onChange={(e) => setCourseTitle(e.target.value)}
                      placeholder="e.g. Masterclass in Web Motion"
                      style={{ paddingLeft: '16px' }}
                      required
                    />
                  </div>

                  <div className="form-group form-full-width">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-input"
                      value={courseDesc}
                      onChange={(e) => setCourseDesc(e.target.value)}
                      placeholder="Provide a detailed overview of what student bees will learn..."
                      style={{ paddingLeft: '16px', minHeight: '80px', resize: 'vertical' }}
                      required
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      className="form-input"
                      value={courseCategory}
                      onChange={(e) => setCourseCategory(e.target.value)}
                      style={{ paddingLeft: '16px', backgroundColor: 'var(--bg-dark-card)' }}
                      required
                    >
                      <option value="Design">Design & 3D CSS</option>
                      <option value="Development">Development</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Cover Image URL</label>
                    <input
                      type="url"
                      className="form-input"
                      value={courseImage}
                      onChange={(e) => setCourseImage(e.target.value)}
                      placeholder="https://unsplash.com/..."
                      style={{ paddingLeft: '16px' }}
                    />
                  </div>
                </div>

                <h3 style={{ fontSize: '1.15rem', margin: '24px 0 16px 0', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px' }}>
                  Lesson Modules
                </h3>
                
                <div id="lessons-list" style={{ marginBottom: '20px' }}>
                  {addedLessons.length === 0 ? (
                    <p style={{ color: 'var(--text-gray-500)', fontSize: '0.88rem', textAlign: 'center', padding: '12px 0' }}>
                      No modules added yet.
                    </p>
                  ) : (
                    addedLessons.map((l, i) => (
                      <div
                        key={i}
                        className="glass-panel"
                        style={{
                          padding: '10px 16px',
                          marginBottom: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderColor: 'rgba(255,255,255,0.05)',
                          background: 'rgba(255,255,255,0.01)'
                        }}
                      >
                        <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>
                          Module {i + 1}: {l.title} ({l.duration})
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveLesson(i)}
                          className="btn-remove-lesson"
                          style={{ color: '#f87171', fontSize: '0.8rem', cursor: 'pointer', background: 'none', border: 'none' }}
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="glass-panel" style={{ padding: '16px', marginBottom: '24px', background: 'rgba(0,0,0,0.1)', borderColor: 'rgba(255,255,255,0.03)' }}>
                  <h4 style={{ fontSize: '0.88rem', marginBottom: '12px', color: 'var(--gold-bright)' }}>Add New Module</h4>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <input
                      type="text"
                      className="form-input"
                      value={lessonTitle}
                      onChange={(e) => setLessonTitle(e.target.value)}
                      placeholder="Lesson title"
                      style={{ flex: 2, paddingLeft: '16px' }}
                    />
                    <input
                      type="text"
                      className="form-input"
                      value={lessonDur}
                      onChange={(e) => setLessonDur(e.target.value)}
                      placeholder="Duration (e.g. 15m)"
                      style={{ flex: 1, paddingLeft: '16px' }}
                    />
                    <button
                      type="button"
                      className="btn btn-glass"
                      onClick={handleAddLesson}
                      style={{ padding: '10px 16px', fontSize: '0.82rem' }}
                    >
                      Add
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-gold"
                  style={{ width: '100%' }}
                  disabled={!isUploaded}
                >
                  Submit Hive for Verification
                </button>
              </form>

              {/* Dynamic Upload Progress Simulator */}
              <div>
                <div className="glass-panel glowing" style={{ padding: '32px' }}>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '16px' }}>Simulated Video Uploader</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-gray-300)', marginBottom: '24px' }}>
                    Simulate uploading your course demo video and lessons to the decentralized Hive storage before submitting.
                  </p>

                  <div
                    className="upload-dropzone"
                    onClick={handleUploadClick}
                    style={{ cursor: isUploaded || isUploading ? 'default' : 'pointer' }}
                  >
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" strokeWidth="2" style={{ marginBottom: '16px' }}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                    </svg>
                    <h4 style={{ fontSize: '0.95rem' }}>
                      {isUploaded ? 'File Ready' : 'Drag & Drop Video Files'}
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-gray-500)', marginTop: '6px' }}>
                      {isUploaded ? 'Simulated upload completed.' : 'MP4 or MKV up to 500MB. Click to upload.'}
                    </p>
                  </div>

                  {/* Upload progress visualizer */}
                  {(isUploading || isUploaded) && (
                    <div id="uploader-progress-card" style={{ marginTop: '24px' }}>
                      <div className="upload-progress-container">
                        <div
                          className={`upload-status-pill ${
                            uploadStatus === 'uploading'
                              ? 'upload-status-uploading'
                              : uploadStatus === 'completed'
                              ? 'upload-status-completed'
                              : 'upload-status-processing'
                          }`}
                        >
                          {uploadStatus === 'uploading' && 'Uploading...'}
                          {uploadStatus === 'processing' && 'Optimizing...'}
                          {uploadStatus === 'finalizing' && 'Finalizing...'}
                          {uploadStatus === 'completed' && 'Completed'}
                        </div>
                        <h4 style={{ fontSize: '0.88rem', marginBottom: '8px' }}>lecture-intro.mp4</h4>
                        
                        <div className="progress-track" style={{ marginBottom: '10px' }}>
                          <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray-500)' }}>
                          <span>{uploadProgress}% completed</span>
                          <span>
                            {uploadStatus === 'uploading' && 'Transferring node blocks...'}
                            {uploadStatus === 'processing' && 'Transcoding visual assets...'}
                            {uploadStatus === 'finalizing' && 'Configuring database index...'}
                            {uploadStatus === 'completed' && 'File verified successfully.'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'scheduler' && (
          <>
            <div className="dashboard-header">
              <div>
                <h1 className="dashboard-title">Office Hours Scheduler</h1>
                <p className="dashboard-subtitle">Define live session availability for students to book 1-on-1 calls</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '32px' }}>
              {/* Add Slot Form */}
              <form onSubmit={handleSlotSubmit} className="glass-panel glowing" style={{ padding: '32px', height: 'fit-content' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '20px' }}>Open New Session</h3>

                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={slotDate}
                    onChange={(e) => setSlotDate(e.target.value)}
                    min={today}
                    style={{ paddingLeft: '16px' }}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Time</label>
                  <input
                    type="time"
                    className="form-input"
                    value={slotTime}
                    onChange={(e) => setSlotTime(e.target.value)}
                    style={{ paddingLeft: '16px' }}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-gold" style={{ width: '100%', marginTop: '10px' }}>
                  Open Availability
                </button>
              </form>

              {/* Open Slots List */}
              <div className="glass-panel glowing" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '20px' }}>Your Scheduled Sessions</h3>

                <div className="slots-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {mySlots.length === 0 ? (
                    <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-gray-500)', padding: '40px 0' }}>
                      No sessions scheduled yet.
                    </p>
                  ) : (
                    mySlots.map(slot => (
                      <div
                        key={slot.id}
                        className="slot-item glass-panel"
                        style={{
                          borderColor: slot.bookedBy ? 'var(--border-glass-gold)' : 'var(--border-glass)',
                          background: slot.bookedBy ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.1)'
                        }}
                      >
                        <div style={{ fontSize: '1.3rem', marginBottom: '8px' }}>⏰</div>
                        <h4 style={{ fontSize: '0.9rem' }}>{slot.date}</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-gray-300)' }}>{slot.time}</p>
                        
                        <div className="slot-status" style={{ marginTop: '12px' }}>
                          {slot.bookedBy ? (
                            <span style={{ color: '#34d399', fontWeight: 600 }}>Booked by: {slot.bookedBy}</span>
                          ) : (
                            <span style={{ color: 'var(--text-gray-500)' }}>Open for Booking</span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
