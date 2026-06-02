import React, { createContext, useContext, useState, useEffect } from 'react';
import * as mockDb from '../js/mockDb.js';

const DbContext = createContext();

export function DbProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [demoSlots, setDemoSlots] = useState([]);

  // Sync state from LocalStorage on mount
  useEffect(() => {
    setCurrentUser(mockDb.db.getCurrentUser());
    setUsers(mockDb.db.getUsers());
    setCourses(mockDb.db.getCourses());
    setEnrollments(mockDb.db.getEnrollments());
    setDemoSlots(mockDb.db.getDemoSlots());
  }, []);

  const refreshState = () => {
    setCurrentUser(mockDb.db.getCurrentUser());
    setUsers(mockDb.db.getUsers());
    setCourses(mockDb.db.getCourses());
    setEnrollments(mockDb.db.getEnrollments());
    setDemoSlots(mockDb.db.getDemoSlots());
  };

  const handleLogin = (username, password) => {
    const user = mockDb.login(username, password);
    refreshState();
    return user;
  };

  const handleSignUp = (username, password, role, extraInfo) => {
    const user = mockDb.signUp(username, password, role, extraInfo);
    refreshState();
    return user;
  };

  const handleLogout = () => {
    mockDb.logout();
    refreshState();
  };

  const handleEnroll = (username, courseId) => {
    mockDb.enrollInCourse(username, courseId);
    refreshState();
  };

  const handleUpdateProgress = (username, courseId, lessonIndex) => {
    mockDb.updateLessonProgress(username, courseId, lessonIndex);
    refreshState();
  };

  const handleCreateCourse = (mentorUsername, courseData) => {
    mockDb.createCourse(mentorUsername, courseData);
    refreshState();
  };

  const handleCreateDemoSlot = (mentorUsername, date, time) => {
    mockDb.createDemoSlot(mentorUsername, date, time);
    refreshState();
  };

  const handleToggleUserStatus = (username) => {
    mockDb.toggleUserStatus(username);
    refreshState();
  };

  const handleVerifyMentor = (username) => {
    mockDb.verifyMentor(username);
    refreshState();
  };

  const handleManageCourseStatus = (courseId, status) => {
    mockDb.manageCourseStatus(courseId, status);
    refreshState();
  };

  const handleBookDemoSlot = (studentUsername, slotId) => {
    mockDb.bookDemoSlot(studentUsername, slotId);
    refreshState();
  };

  return (
    <DbContext.Provider value={{
      currentUser,
      users,
      courses,
      enrollments,
      demoSlots,
      login: handleLogin,
      signUp: handleSignUp,
      logout: handleLogout,
      enrollInCourse: handleEnroll,
      updateLessonProgress: handleUpdateProgress,
      createCourse: handleCreateCourse,
      createDemoSlot: handleCreateDemoSlot,
      toggleUserStatus: handleToggleUserStatus,
      verifyMentor: handleVerifyMentor,
      manageCourseStatus: handleManageCourseStatus,
      bookDemoSlot: handleBookDemoSlot,
      refreshState
    }}>
      {children}
    </DbContext.Provider>
  );
}

export function useDb() {
  return useContext(DbContext);
}
