import React, { useState } from 'react';
import { useDb } from '../context/DbContext';
import TiltCard from './TiltCard';

export default function LandingPage({ setActiveView, onShowAuth }) {
  const { courses, currentUser } = useDb();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState('');

  // Accordion state for FAQ
  const [faqOpenIndex, setFaqOpenIndex] = useState(null);

  const approvedCourses = courses.filter(c => c.status === 'approved');
  
  const filteredCourses = selectedCategory === 'all'
    ? approvedCourses
    : approvedCourses.filter(c => c.category === selectedCategory);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(`Success! ${newsletterEmail} has been added to the newsletter hive.`);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(''), 5000);
    }
  };

  const toggleFaq = (index) => {
    setFaqOpenIndex(faqOpenIndex === index ? null : index);
  };

  const faqItems = [
    {
      q: 'What are Honey Drops?',
      a: 'Honey drops are gamified nectar points rewarded to student profiles whenever they complete a lesson chapter module. Earning drops ranks up your profile (e.g. from Worker Bee to Elite Forager) and unlocks achievements.'
    },
    {
      q: 'How do I get verified as a Mentor?',
      a: 'When you sign up as a Mentor, your profile is initially set to "Pending". Platform administrators review your biodata and qualifications, approve your status, and authorize you to publish courses onto the marketplace.'
    },
    {
      q: 'Is there a fee to upload courses?',
      a: 'Publishing hives on the Beehive network is completely free. We work on a decentralized commission-sharing agreement where mentors receive 85% of royalty shares when student bees buy course entry keys.'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-glow"></div>
        <span className="hero-tag">A New Era of Learning</span>
        <h1 className="hero-title">Welcome to the <span>Beehive</span></h1>
        <p className="hero-subtitle">
          A decentralized honey-sweet hub for students to gather knowledge and mentors to build hives of learning. Explore premium visual courses.
        </p>
        
        <div className="hero-buttons">
          {currentUser ? (
            <button className="btn btn-gold" onClick={() => setActiveView(`${currentUser.role}-dashboard`)}>
              Go to My Dashboard
            </button>
          ) : (
            <>
              <button className="btn btn-gold" onClick={() => onShowAuth('signup')}>
                Join the Swarm
              </button>
              <button
                className="btn btn-glass"
                onClick={() => {
                  const sec = document.getElementById('marketplace-sec');
                  if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Browse Courses
              </button>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="container">
        <div className="features-grid">
          <div className="feature-item glass-panel glowing">
            <div className="feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3 className="feature-title">Gamified Syllabi</h3>
            <p className="feature-desc">
              Interactive 3D honeycomb course grids. Earn sweet honey drops as you complete lesson modules.
            </p>
          </div>

          <div className="feature-item glass-panel glowing">
            <div className="feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 7l-7 5 7 5V7z" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            </div>
            <h3 className="feature-title">Mentor Classrooms</h3>
            <p className="feature-desc">
              Watch sleek high-definition video lessons and request 1-on-1 demo classes directly with mentors.
            </p>
          </div>

          <div className="feature-item glass-panel glowing">
            <div className="feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3 className="feature-title">Verified Hives</h3>
            <p className="feature-desc">
              Every course is review-vetted by system administrators to maintain highest standard of educational quality.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Stats Showcase Section */}
      <section className="container">
        <div className="stats-showcase">
          <div className="stat-show-card glass-panel glowing">
            <div className="stat-show-num">12,450+</div>
            <div className="stat-show-label">Active Bees</div>
          </div>
          <div className="stat-show-card glass-panel glowing">
            <div className="stat-show-num">480+</div>
            <div className="stat-show-label">Learning Hives</div>
          </div>
          <div className="stat-show-card glass-panel glowing">
            <div className="stat-show-num">98,200+</div>
            <div className="stat-show-label">Drops Harvested</div>
          </div>
          <div className="stat-show-card glass-panel glowing">
            <div className="stat-show-num">4.92 ★</div>
            <div className="stat-show-label">Hive Rating</div>
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section className="container" id="marketplace-sec" style={{ marginBottom: '100px' }}>
        <div className="dashboard-header" style={{ marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Explore Hives of Knowledge</h2>
            <p className="dashboard-subtitle" style={{ color: 'var(--text-gray-300)' }}>
              Find curated courses created by industry-verified experts
            </p>
          </div>
        </div>

        {/* Categories & Filters */}
        <div className="category-filter-chips">
          <button
            className={`filter-chip ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Hives
          </button>
          <button
            className={`filter-chip ${selectedCategory === 'Design' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('Design')}
          >
            Design & 3D CSS
          </button>
          <button
            className={`filter-chip ${selectedCategory === 'Development' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('Development')}
          >
            Development
          </button>
        </div>

        {/* Courses Grid */}
        <div className="course-grid">
          {filteredCourses.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-gray-500)', padding: '40px' }}>
              No courses found in this category.
            </div>
          ) : (
            filteredCourses.map((course) => (
              <TiltCard
                key={course.id}
                className="tilt-card glass-panel glowing"
                onClick={() => {
                  if (!currentUser) {
                    onShowAuth('login');
                  } else if (currentUser.role === 'student') {
                    // Navigate to student dashboard and pass params to enroll/redirect
                    setActiveView('student-dashboard', { enrollCourseId: course.id });
                  } else {
                    alert('Log in as a Student to enroll in classes!');
                  }
                }}
              >
                <div className="card-content">
                  <div className="card-img-wrapper">
                    <img src={course.image} alt={course.title} />
                    <span className="card-badge">{course.category}</span>
                  </div>
                  
                  <h3 className="card-title tilt-depth">{course.title}</h3>
                  <p className="card-desc">{course.description}</p>
                  
                  <div className="card-footer tilt-depth">
                    <div className="card-author">
                      <div className="avatar-mini">{course.mentor.charAt(0).toUpperCase()}</div>
                      <span>By {course.mentor}</span>
                    </div>
                    
                    <div className="card-stat">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--gold-primary)" stroke="none">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span>{course.rating ? course.rating : '4.5'}</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container testimonials-section" style={{ marginBottom: '100px' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>What the Swarm Says</h2>
        <p className="dashboard-subtitle" style={{ marginBottom: '50px' }}>
          Reviews and nectar results shared by students and instructors
        </p>
        
        <div className="course-grid">
          <TiltCard className="testimonial-card glass-panel glowing tilt-card">
            <div className="card-content">
              <p className="testimonial-text">
                "The 3D syllabus board kept me super engaged. Completed my course and earned my Elite Pollinator badge in a week!"
              </p>
              <div className="testimonial-user">
                <div className="avatar-mini" style={{ background: 'var(--gold-primary)', color: '#000' }}>S</div>
                <div className="testimonial-user-info">
                  <h4>Sam Sterling</h4>
                  <span>Student Bee</span>
                </div>
              </div>
            </div>
          </TiltCard>

          <TiltCard className="testimonial-card glass-panel glowing tilt-card">
            <div className="card-content">
              <p className="testimonial-text">
                "Structuring my lessons into visual honeycomb grids boosted my student completion rate by 45%. Admins approved my course in an hour!"
              </p>
              <div className="testimonial-user">
                <div className="avatar-mini" style={{ background: '#10b981', color: '#fff' }}>A</div>
                <div className="testimonial-user-info">
                  <h4>Dr. Beatrice Amber</h4>
                  <span>Senior Mentor</span>
                </div>
              </div>
            </div>
          </TiltCard>

          <TiltCard className="testimonial-card glass-panel glowing tilt-card">
            <div className="card-content">
              <p className="testimonial-text">
                "Beehive is easily the most beautiful educational interface I've used. Minimalist, premium, and extremely functional."
              </p>
              <div className="testimonial-user">
                <div className="avatar-mini" style={{ background: '#3b82f6', color: '#fff' }}>K</div>
                <div className="testimonial-user-info">
                  <h4>Kate Miller</h4>
                  <span>Creative Design Student</span>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="container faq-container" style={{ marginBottom: '100px' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '12px', textAlign: 'center' }}>Frequently Asked Questions</h2>
        <p className="dashboard-subtitle" style={{ marginBottom: '50px', textAlign: 'center' }}>
          Got questions? We've gathered the honey sweet answers.
        </p>

        {faqItems.map((item, idx) => (
          <div key={idx} className={`faq-item glass-panel ${faqOpenIndex === idx ? 'active' : ''}`}>
            <div className="faq-question" onClick={() => toggleFaq(idx)}>
              <span>{item.q}</span>
              <svg
                className="faq-arrow"
                style={{ transform: faqOpenIndex === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            <div
              className="faq-answer"
              style={{
                display: faqOpenIndex === idx ? 'block' : 'none',
                padding: '20px 24px',
                borderTop: '1px solid var(--border-glass)'
              }}
            >
              {item.a}
            </div>
          </div>
        ))}
      </section>

      {/* Footer Section */}
      <footer className="beehive-footer">
        <div className="container footer-grid">
          <div className="footer-col">
            <div className="logo" style={{ marginBottom: '20px' }}>
              <img src="assets/beehive logo.jpg" alt="Beehive Logo" className="logo-img" />
              Beehive
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-gray-300)', lineHeight: '1.6' }}>
              A next-generation, gamified space offering decentralized learning pathways and premium visual instruction.
            </p>
          </div>

          <div className="footer-col">
            <h4>Explore Hives</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory('Design');
                    const sec = document.getElementById('marketplace-sec');
                    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Web Design
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory('Development');
                    const sec = document.getElementById('marketplace-sec');
                    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  JavaScript Architecture
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory('Design');
                    const sec = document.getElementById('marketplace-sec');
                    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  3D Animation
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Beekeeper Info</h4>
            <ul className="footer-links">
              <li><a href="#" onClick={(e) => { e.preventDefault(); onShowAuth('login'); }}>Become a Student</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onShowAuth('signup'); }}>Apply as Mentor</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onShowAuth('login'); }}>Admin Registry</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Join the Swarm Newsletter</h4>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="honey@beehive.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-gold" style={{ padding: '12px 20px' }}>
                Join
              </button>
            </form>
            {newsletterSuccess && (
              <div style={{ color: '#34d399', fontSize: '0.8rem', marginTop: '10px', fontWeight: '500' }}>
                {newsletterSuccess}
              </div>
            )}
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 Beehive Swarm Technologies Inc. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Decentralized Registry</a>
          </div>
        </div>
      </footer>
    </>
  );
}
