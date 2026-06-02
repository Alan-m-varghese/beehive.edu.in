// Mock Database and State Management for Beehive Platform

const SEED_USERS = [
  { username: 'admin1', password: 'password', role: 'admin', verified: true, status: 'active' },
  { username: 'mentor1', password: 'password', role: 'mentor', verified: true, status: 'active', name: 'Dr. Beatrice Amber', bio: 'Expert front-end architect specializing in 3D layouts.' },
  { username: 'mentor2', password: 'password', role: 'mentor', verified: false, status: 'active', name: 'Buzz Miller', bio: 'Full-stack honey enthusiast and instructor.' },
  { username: 'student1', password: 'password', role: 'student', verified: true, status: 'active', honeyDrops: 45, level: 'Worker Bee', badges: ['First Flight', 'Pollen Gatherer'] }
];

const SEED_COURSES = [
  {
    id: 'course-1',
    title: '3D CSS Transforms & Premium Animations',
    description: 'Learn the secrets of depth, lighting, perspective, and 3D card tilt effects using pure CSS.',
    mentor: 'mentor1',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    demoVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    lessons: [
      { title: 'Introduction to Perspective and 3D space', duration: '12 mins', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'The transform-style: preserve-3d Property', duration: '18 mins', videoUrl: 'https://www.w3schools.com/html/movie.mp4' },
      { title: 'Creating Interactive 3D Parallax Hover Tilts', duration: '22 mins', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'Glassmorphism & Depth Blending Layers', duration: '15 mins', videoUrl: 'https://www.w3schools.com/html/movie.mp4' }
    ],
    status: 'approved', // approved, pending, declined
    enrolledCount: 124,
    rating: 4.8
  },
  {
    id: 'course-2',
    title: 'Mastering ES6 Modules & Modern Web Architectures',
    description: 'Build fast, lightweight, and scalable modular web applications directly in the browser without bundlers.',
    mentor: 'mentor1',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
    demoVideo: 'https://www.w3schools.com/html/movie.mp4',
    lessons: [
      { title: 'Dynamic Imports & Module Dependency Resolution', duration: '10 mins', videoUrl: 'https://www.w3schools.com/html/movie.mp4' },
      { title: 'State Partitioning & Singletone Modules', duration: '15 mins', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'Performance Optimization & Script Preloading', duration: '20 mins', videoUrl: 'https://www.w3schools.com/html/movie.mp4' }
    ],
    status: 'approved',
    enrolledCount: 88,
    rating: 4.9
  },
  {
    id: 'course-3',
    title: 'Honey-UI: Web Component Design Systems',
    description: 'Drafting pixel-perfect design languages using custom web components and responsive styling variables.',
    mentor: 'mentor2',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    demoVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    lessons: [
      { title: 'Setting up custom CSS variables & tokens', duration: '14 mins', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'Crafting the dynamic Honeycomb CSS layout', duration: '25 mins', videoUrl: 'https://www.w3schools.com/html/movie.mp4' }
    ],
    status: 'pending',
    enrolledCount: 0,
    rating: 0
  }
];

const SEED_ENROLLMENTS = [
  { student: 'student1', courseId: 'course-1', completedLessons: [0], progress: 25 },
];

const SEED_DEMO_SLOTS = [
  { id: 'slot-1', mentor: 'mentor1', date: '2026-06-03', time: '14:00', bookedBy: null },
  { id: 'slot-2', mentor: 'mentor1', date: '2026-06-04', time: '16:30', bookedBy: 'student1' },
  { id: 'slot-3', mentor: 'mentor2', date: '2026-06-05', time: '11:00', bookedBy: null }
];

// LocalStorage Initializer Helper
function getStorage(key, seed) {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(data);
}

function setStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Initialize Database State
export const db = {
  getUsers: () => getStorage('beehive_users', SEED_USERS),
  setUsers: (users) => setStorage('beehive_users', users),
  
  getCourses: () => getStorage('beehive_courses', SEED_COURSES),
  setCourses: (courses) => setStorage('beehive_courses', courses),

  getEnrollments: () => getStorage('beehive_enrollments', SEED_ENROLLMENTS),
  setEnrollments: (enrollments) => setStorage('beehive_enrollments', enrollments),

  getDemoSlots: () => getStorage('beehive_demo_slots', SEED_DEMO_SLOTS),
  setDemoSlots: (slots) => setStorage('beehive_demo_slots', slots),

  getCurrentUser: () => {
    const user = localStorage.getItem('beehive_current_user');
    return user ? JSON.parse(user) : null;
  },
  setCurrentUser: (user) => {
    if (user) {
      localStorage.setItem('beehive_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('beehive_current_user');
    }
  }
};

// Authentication Methods
export function signUp(username, password, role, extraInfo = {}) {
  const users = db.getUsers();
  if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
    throw new Error('Username already exists in the hive.');
  }

  const newUser = {
    username,
    password,
    role,
    verified: role === 'student', // Students are auto-verified, mentors need admin approval
    status: 'active',
    name: extraInfo.name || username,
    bio: extraInfo.bio || '',
    ...(role === 'student' ? { honeyDrops: 0, level: 'Worker Bee', badges: [] } : {})
  };

  users.push(newUser);
  db.setUsers(users);
  return newUser;
}

export function login(username, password) {
  const users = db.getUsers();
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
  if (!user) {
    throw new Error('Invalid Hive credentials.');
  }
  if (user.status === 'suspended') {
    throw new Error('Your account has been suspended from the Hive.');
  }
  db.setCurrentUser(user);
  return user;
}

export function logout() {
  db.setCurrentUser(null);
}

// Student Course Operations
export function enrollInCourse(username, courseId) {
  const enrollments = db.getEnrollments();
  const alreadyEnrolled = enrollments.find(e => e.student === username && e.courseId === courseId);
  
  if (alreadyEnrolled) return alreadyEnrolled;

  const newEnrollment = {
    student: username,
    courseId,
    completedLessons: [],
    progress: 0
  };

  enrollments.push(newEnrollment);
  db.setEnrollments(enrollments);

  // Increment enrolled count on course
  const courses = db.getCourses();
  const course = courses.find(c => c.id === courseId);
  if (course) {
    course.enrolledCount = (course.enrolledCount || 0) + 1;
    db.setCourses(courses);
  }

  return newEnrollment;
}

export function updateLessonProgress(username, courseId, lessonIndex) {
  const enrollments = db.getEnrollments();
  const enrollment = enrollments.find(e => e.student === username && e.courseId === courseId);
  if (!enrollment) return null;

  if (!enrollment.completedLessons.includes(lessonIndex)) {
    enrollment.completedLessons.push(lessonIndex);
    
    // Fetch total lessons
    const courses = db.getCourses();
    const course = courses.find(c => c.id === courseId);
    const totalLessons = course ? course.lessons.length : 1;
    
    enrollment.progress = Math.round((enrollment.completedLessons.length / totalLessons) * 100);
    db.setEnrollments(enrollments);

    // Reward student with honey drops (e.g. 10 drops per completed lesson)
    const users = db.getUsers();
    const studentUser = users.find(u => u.username === username);
    if (studentUser && studentUser.role === 'student') {
      studentUser.honeyDrops = (studentUser.honeyDrops || 0) + 10;
      
      // Update levels
      if (studentUser.honeyDrops >= 100) {
        studentUser.level = 'Queen Bee';
        if (!studentUser.badges.includes('Queen\'s Favor')) {
          studentUser.badges.push('Queen\'s Favor');
        }
      } else if (studentUser.honeyDrops >= 50) {
        studentUser.level = 'Forager Bee';
        if (!studentUser.badges.includes('Elite Pollinator')) {
          studentUser.badges.push('Elite Pollinator');
        }
      } else {
        studentUser.level = 'Worker Bee';
      }
      
      db.setUsers(users);
      // Sync current user state
      db.setCurrentUser(studentUser);
    }
  }

  return enrollment;
}

// Mentor Operations
export function createCourse(mentorUsername, courseData) {
  const courses = db.getCourses();
  const newCourse = {
    id: `course-${Date.now()}`,
    title: courseData.title,
    description: courseData.description,
    mentor: mentorUsername,
    category: courseData.category || 'Development',
    image: courseData.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    demoVideo: courseData.demoVideo || 'https://www.w3schools.com/html/mov_bbb.mp4',
    lessons: courseData.lessons || [],
    status: 'pending', // Starts pending until admin approves
    enrolledCount: 0,
    rating: 0
  };

  courses.push(newCourse);
  db.setCourses(courses);
  return newCourse;
}

export function createDemoSlot(mentorUsername, date, time) {
  const slots = db.getDemoSlots();
  const newSlot = {
    id: `slot-${Date.now()}`,
    mentor: mentorUsername,
    date,
    time,
    bookedBy: null
  };
  slots.push(newSlot);
  db.setDemoSlots(slots);
  return newSlot;
}

// Admin / User Management Operations
export function toggleUserStatus(username) {
  const users = db.getUsers();
  const user = users.find(u => u.username === username);
  if (!user) return null;
  
  if (user.role === 'admin') {
    throw new Error('Admin status cannot be modified.');
  }

  user.status = user.status === 'active' ? 'suspended' : 'active';
  db.setUsers(users);
  return user;
}

export function verifyMentor(username) {
  const users = db.getUsers();
  const user = users.find(u => u.username === username);
  if (!user || user.role !== 'mentor') return null;

  user.verified = true;
  db.setUsers(users);
  return user;
}

export function manageCourseStatus(courseId, status) {
  const courses = db.getCourses();
  const course = courses.find(c => c.id === courseId);
  if (!course) return null;

  course.status = status; // approved or declined
  db.setCourses(courses);
  return course;
}

// Book demo slots
export function bookDemoSlot(studentUsername, slotId) {
  const slots = db.getDemoSlots();
  const slot = slots.find(s => s.id === slotId);
  if (!slot) return null;

  slot.bookedBy = studentUsername;
  db.setDemoSlots(slots);
  return slot;
}
