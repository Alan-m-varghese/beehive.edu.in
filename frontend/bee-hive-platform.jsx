import React, { useState, useEffect } from 'react';
import { Home, BookOpen, Users, Award, Menu, X } from 'lucide-react';

export default function BeeHivePlatform() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const HoneycombPattern = () => (
    <svg className="honeycomb-pattern" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#FFA500', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map(row => 
        [0, 1, 2, 3].map(col => {
          const x = col * 70 + (row % 2) * 35 + 50;
          const y = row * 60 + 50;
          return (
            <polygon
              key={`${row}-${col}`}
              points={`${x},${y-30} ${x+25},${y-15} ${x+25},${y+15} ${x},${y+30} ${x-25},${y+15} ${x-25},${y-15}`}
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="2.5"
              opacity="0.8"
              style={{
                animation: `pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          );
        })
      )}
    </svg>
  );

  const Navigation = () => (
    <nav className="navbar">
      <div className="nav-container">
        <button 
          className="nav-link" 
          onClick={() => setCurrentPage('signin')}
        >
          Sign In
        </button>
        <button 
          className="nav-link" 
          onClick={() => setCurrentPage('features')}
        >
          Features
        </button>
        <button 
          className="nav-link" 
          onClick={() => setCurrentPage('services')}
        >
          Services
        </button>
        <button 
          className="brand" 
          onClick={() => setCurrentPage('landing')}
        >
          Bee Hive
        </button>
        <button 
          className="nav-link" 
          onClick={() => setCurrentPage('prices')}
        >
          Prices
        </button>
        <button 
          className="nav-link" 
          onClick={() => setCurrentPage('about')}
        >
          About Us
        </button>
        <button 
          className="nav-link nav-link-signup" 
          onClick={() => setCurrentPage('signup')}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );

  const LandingPage = () => (
    <div className={`page ${isLoaded ? 'loaded' : ''}`}>
      <Navigation />
      <div className="landing-content">
        <div className="hero-section">
          <h1 className="hero-title">
            Turn your screen time<br />
            into skill time.
          </h1>
          <button className="cta-button" onClick={() => setCurrentPage('signup')}>
            Get Started
          </button>
          <div className="stats">
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">courses</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">900+</div>
              <div className="stat-label">Hours of digital</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Verified Tutors</div>
            </div>
          </div>
        </div>
        <HoneycombPattern />
      </div>
    </div>
  );

  const ServicesPage = () => (
    <div className={`page ${isLoaded ? 'loaded' : ''}`}>
      <Navigation />
      <div className="services-content">
        <h2 className="section-title">Services</h2>
        <div className="services-grid">
          <button className="service-card">Courses</button>
          <button className="service-card">Assessments</button>
          <button className="service-card">Study materials</button>
          <button className="service-card">Exams</button>
          <button className="service-card">Community</button>
          <button className="service-card">Personal Assist</button>
        </div>
        <div className="motto">
          <span className="motto-text">INNOVATE</span>
          <span className="motto-icon">⚡</span>
          <span className="motto-text">INSPIRE</span>
          <span className="motto-icon">⚡</span>
          <span className="motto-text">CREATE</span>
        </div>
      </div>
    </div>
  );

  const FeaturesPage = () => (
    <div className={`page ${isLoaded ? 'loaded' : ''}`}>
      <Navigation />
      <div className="features-content">
        <h2 className="section-title">Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3 className="feature-title">Smarter learning Experience</h3>
            <ul className="feature-list">
              <li>● Personalized Learning Paths</li>
              <li>● Bite-Sized Microlearning</li>
              <li>● Interactive Quizzes & Projects</li>
            </ul>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Ultimate Convenience</h3>
            <ul className="feature-list">
              <li>● Offline Mode</li>
              <li>● Seamless Cross-Device Sync</li>
              <li>● Audio Only Mode</li>
            </ul>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Motivation & Achievement</h3>
            <ul className="feature-list">
              <li>● Verifiable Certificates</li>
              <li>● Gamified Progress Tracking</li>
              <li>● Goal Reminders & Nudges</li>
            </ul>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Community Support</h3>
            <ul className="feature-list">
              <li>● Learn from Industry Experts</li>
              <li>● Interactive Discussion Boards</li>
              <li>● 1-on-1 Networking (Premium Feature)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const SignUpPage = () => (
    <div className={`page ${isLoaded ? 'loaded' : ''}`}>
      <Navigation />
      <div className="auth-content">
        <div className="auth-form">
          <h2 className="auth-title">Sign Up</h2>
          <input type="text" placeholder="Enter Name" className="auth-input" />
          <input type="email" placeholder="Enter email" className="auth-input" />
          <input type="password" placeholder="Enter password" className="auth-input" />
          <input type="password" placeholder="Confirm password" className="auth-input" />
          <button className="auth-button">Continue</button>
        </div>
        <HoneycombPattern />
      </div>
    </div>
  );

  const SignInPage = () => (
    <div className={`page ${isLoaded ? 'loaded' : ''}`}>
      <Navigation />
      <div className="auth-content">
        <div className="auth-form">
          <h2 className="auth-title">Sign In</h2>
          <input type="email" placeholder="Enter email" className="auth-input" />
          <input type="password" placeholder="Enter password" className="auth-input" />
          <button className="auth-button">Continue</button>
        </div>
        <HoneycombPattern />
      </div>
    </div>
  );

  const PricesPage = () => (
    <div className={`page ${isLoaded ? 'loaded' : ''}`}>
      <Navigation />
      <div className="prices-content">
        <h2 className="section-title">Choose Your Plan</h2>
        <p className="prices-subtitle">Unlock your potential with the perfect learning plan</p>
        
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-header">
              <h3 className="pricing-tier">Starter</h3>
              <div className="pricing-amount">
                <span className="currency">$</span>
                <span className="price">0</span>
                <span className="period">/month</span>
              </div>
            </div>
            <ul className="pricing-features">
              <li>✓ Access to 10 free courses</li>
              <li>✓ Basic quizzes & assessments</li>
              <li>✓ Community forum access</li>
              <li>✓ Mobile & web access</li>
              <li>✗ Certificates</li>
              <li>✗ Offline mode</li>
              <li>✗ Personal mentor</li>
            </ul>
            <button className="pricing-button pricing-button-starter">Get Started</button>
          </div>

          <div className="pricing-card pricing-card-featured">
            <div className="featured-badge">MOST POPULAR</div>
            <div className="pricing-header">
              <h3 className="pricing-tier">Pro</h3>
              <div className="pricing-amount">
                <span className="currency">$</span>
                <span className="price">29</span>
                <span className="period">/month</span>
              </div>
            </div>
            <ul className="pricing-features">
              <li>✓ Unlimited course access</li>
              <li>✓ Advanced assessments & projects</li>
              <li>✓ Verified certificates</li>
              <li>✓ Offline mode</li>
              <li>✓ Priority support</li>
              <li>✓ Gamified progress tracking</li>
              <li>✗ 1-on-1 mentoring</li>
            </ul>
            <button className="pricing-button pricing-button-pro">Upgrade to Pro</button>
          </div>

          <div className="pricing-card">
            <div className="pricing-header">
              <h3 className="pricing-tier">Enterprise</h3>
              <div className="pricing-amount">
                <span className="currency">$</span>
                <span className="price">99</span>
                <span className="period">/month</span>
              </div>
            </div>
            <ul className="pricing-features">
              <li>✓ Everything in Pro</li>
              <li>✓ 1-on-1 mentor sessions</li>
              <li>✓ Custom learning paths</li>
              <li>✓ Team collaboration tools</li>
              <li>✓ API access</li>
              <li>✓ White-label options</li>
              <li>✓ Dedicated account manager</li>
            </ul>
            <button className="pricing-button pricing-button-enterprise">Contact Sales</button>
          </div>
        </div>
      </div>
    </div>
  );

  const AboutUsPage = () => (
    <div className={`page ${isLoaded ? 'loaded' : ''}`}>
      <Navigation />
      <div className="about-content">
        <div className="about-hero">
          <h2 className="section-title">About Bee Hive</h2>
          <p className="about-tagline">Building the future of online learning, one skill at a time.</p>
        </div>

        <div className="about-section">
          <div className="about-text">
            <h3 className="about-heading">Our Mission</h3>
            <p className="about-paragraph">
              At Bee Hive, we believe that learning should be as natural as a bee collecting nectar. 
              We're on a mission to transform idle screen time into productive skill-building moments. 
              Our platform brings together expert tutors, cutting-edge technology, and a vibrant community 
              to create an unparalleled learning experience.
            </p>
          </div>
          <HoneycombPattern />
        </div>

        <div className="values-section">
          <h3 className="about-heading">Our Core Values</h3>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h4 className="value-title">Excellence</h4>
              <p className="value-description">
                We maintain the highest standards in course quality, ensuring every learning 
                experience is valuable and impactful.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h4 className="value-title">Community</h4>
              <p className="value-description">
                Learning is better together. We foster a supportive environment where 
                students and mentors collaborate and grow.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h4 className="value-title">Innovation</h4>
              <p className="value-description">
                We continuously evolve our platform with the latest technology to provide 
                the best learning tools and experiences.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h4 className="value-title">Growth</h4>
              <p className="value-description">
                We're committed to helping every learner reach their full potential through 
                personalized paths and continuous support.
              </p>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <h3 className="about-heading">Our Impact</h3>
          <div className="impact-stats">
            <div className="impact-stat">
              <div className="impact-number">10,000+</div>
              <div className="impact-label">Active Learners</div>
            </div>
            <div className="impact-stat">
              <div className="impact-number">100+</div>
              <div className="impact-label">Expert Courses</div>
            </div>
            <div className="impact-stat">
              <div className="impact-number">50+</div>
              <div className="impact-label">Verified Tutors</div>
            </div>
            <div className="impact-stat">
              <div className="impact-number">95%</div>
              <div className="impact-label">Success Rate</div>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h3 className="cta-heading">Ready to Start Your Learning Journey?</h3>
          <button className="cta-button" onClick={() => setCurrentPage('signup')}>
            Join Bee Hive Today
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Space Grotesk', -apple-system, sans-serif;
          background: #0a0a0a;
          color: #ffffff;
          overflow-x: hidden;
        }

        .page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          position: relative;
          opacity: 0;
          animation: fadeIn 0.6s ease-out forwards;
        }

        .page.loaded {
          opacity: 1;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        .navbar {
          width: 100%;
          padding: 1.5rem 2rem;
          position: relative;
          z-index: 100;
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .nav-link {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 0.7rem 1.8rem;
          border-radius: 25px;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          letter-spacing: 0.3px;
        }

        .nav-link:hover {
          background: rgba(255, 215, 0, 0.15);
          border-color: rgba(255, 215, 0, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(255, 215, 0, 0.2);
        }

        .nav-link-signup {
          background: rgba(255, 215, 0, 0.1);
          border-color: rgba(255, 215, 0, 0.3);
        }

        .brand {
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          border: none;
          color: #0a0a0a;
          padding: 0.7rem 2.5rem;
          border-radius: 25px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 1px;
          text-transform: uppercase;
          box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
        }

        .brand:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 6px 30px rgba(255, 215, 0, 0.5);
        }

        /* Landing Page */
        .landing-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem;
          min-height: calc(100vh - 100px);
          gap: 4rem;
        }

        .hero-section {
          flex: 1;
          max-width: 600px;
          animation: slideInLeft 0.8s ease-out;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .hero-title {
          font-family: 'Orbitron', monospace;
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 2.5rem;
          background: linear-gradient(135deg, #ffffff 0%, #FFD700 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: textGlow 3s ease-in-out infinite;
        }

        @keyframes textGlow {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 40px rgba(255, 215, 0, 0.6));
          }
        }

        .cta-button {
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          border: none;
          color: #0a0a0a;
          padding: 1rem 3rem;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 30px rgba(255, 215, 0, 0.4);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .cta-button:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 12px 40px rgba(255, 215, 0, 0.6);
        }

        .stats {
          display: flex;
          gap: 3rem;
          margin-top: 4rem;
        }

        .stat-item {
          text-align: center;
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .stat-item:nth-child(1) { animation-delay: 0.2s; }
        .stat-item:nth-child(2) { animation-delay: 0.4s; }
        .stat-item:nth-child(3) { animation-delay: 0.6s; }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: #FFD700;
          margin-bottom: 0.3rem;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .honeycomb-pattern {
          width: 400px;
          height: 400px;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        /* Services Page */
        .services-content {
          max-width: 900px;
          margin: 0 auto;
          padding: 4rem 2rem;
          text-align: center;
        }

        .section-title {
          font-family: 'Orbitron', monospace;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 3rem;
          color: #FFD700;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        .service-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 2rem 1.5rem;
          border-radius: 20px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .service-card:hover {
          background: rgba(255, 215, 0, 0.1);
          border-color: rgba(255, 215, 0, 0.5);
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(255, 215, 0, 0.3);
        }

        .motto {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          font-size: 2rem;
          font-weight: 700;
          margin-top: 4rem;
        }

        .motto-text {
          color: #ffffff;
          letter-spacing: 3px;
          font-family: 'Orbitron', monospace;
        }

        .motto-icon {
          color: #FFD700;
          font-size: 1.5rem;
          animation: sparkle 2s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 0.7;
          }
        }

        /* Features Page */
        .features-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 20px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .feature-card:hover {
          background: rgba(255, 215, 0, 0.05);
          border-color: rgba(255, 215, 0, 0.3);
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(255, 215, 0, 0.2);
        }

        .feature-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #FFD700;
        }

        .feature-list {
          list-style: none;
          text-align: left;
        }

        .feature-list li {
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 0.8rem;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        /* Auth Pages */
        .auth-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
          min-height: calc(100vh - 100px);
          gap: 4rem;
        }

        .auth-form {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 3rem 2.5rem;
          border-radius: 25px;
          backdrop-filter: blur(20px);
          max-width: 400px;
          width: 100%;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
        }

        .auth-title {
          font-family: 'Orbitron', monospace;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: #FFD700;
          text-align: center;
        }

        .auth-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 1rem 1.5rem;
          border-radius: 15px;
          font-size: 1rem;
          margin-bottom: 1.2rem;
          transition: all 0.3s ease;
          font-family: 'Space Grotesk', sans-serif;
        }

        .auth-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .auth-input:focus {
          outline: none;
          border-color: rgba(255, 215, 0, 0.5);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.2);
        }

        .auth-button {
          width: 100%;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          border: none;
          color: #0a0a0a;
          padding: 1rem;
          border-radius: 15px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .auth-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255, 215, 0, 0.5);
        }

        /* Prices Page */
        .prices-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem;
          text-align: center;
        }

        .prices-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 4rem;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .pricing-card {
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.1);
          padding: 3rem 2rem;
          border-radius: 25px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .pricing-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #FFD700, #FFA500);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .pricing-card:hover {
          transform: translateY(-10px);
          border-color: rgba(255, 215, 0, 0.4);
          box-shadow: 0 15px 50px rgba(255, 215, 0, 0.2);
        }

        .pricing-card:hover::before {
          opacity: 1;
        }

        .pricing-card-featured {
          border-color: rgba(255, 215, 0, 0.5);
          background: rgba(255, 215, 0, 0.05);
          transform: scale(1.05);
        }

        .pricing-card-featured::before {
          opacity: 1;
        }

        .featured-badge {
          position: absolute;
          top: 20px;
          right: -35px;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          color: #0a0a0a;
          padding: 0.5rem 3rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 1px;
          transform: rotate(45deg);
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
        }

        .pricing-header {
          margin-bottom: 2rem;
        }

        .pricing-tier {
          font-family: 'Orbitron', monospace;
          font-size: 1.8rem;
          font-weight: 700;
          color: #FFD700;
          margin-bottom: 1.5rem;
        }

        .pricing-amount {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.3rem;
        }

        .currency {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .price {
          font-size: 4rem;
          font-weight: 700;
          color: #ffffff;
        }

        .period {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .pricing-features {
          list-style: none;
          text-align: left;
          margin: 2.5rem 0;
        }

        .pricing-features li {
          padding: 0.8rem 0;
          color: rgba(255, 255, 255, 0.8);
          font-size: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .pricing-features li:last-child {
          border-bottom: none;
        }

        .pricing-button {
          width: 100%;
          padding: 1rem 2rem;
          border-radius: 15px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 1rem;
        }

        .pricing-button-starter {
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
        }

        .pricing-button-starter:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .pricing-button-pro {
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          border: none;
          color: #0a0a0a;
          box-shadow: 0 8px 30px rgba(255, 215, 0, 0.4);
        }

        .pricing-button-pro:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(255, 215, 0, 0.6);
        }

        .pricing-button-enterprise {
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 215, 0, 0.3);
          color: #FFD700;
        }

        .pricing-button-enterprise:hover {
          background: rgba(255, 215, 0, 0.1);
          transform: translateY(-2px);
        }

        /* About Us Page */
        .about-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .about-hero {
          text-align: center;
          margin-bottom: 4rem;
        }

        .about-tagline {
          font-size: 1.4rem;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 1rem;
        }

        .about-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 4rem;
          margin-bottom: 6rem;
        }

        .about-text {
          flex: 1;
          max-width: 600px;
        }

        .about-heading {
          font-family: 'Orbitron', monospace;
          font-size: 2rem;
          font-weight: 700;
          color: #FFD700;
          margin-bottom: 1.5rem;
        }

        .about-paragraph {
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
        }

        .values-section {
          margin-bottom: 6rem;
        }

        .values-section .about-heading {
          text-align: center;
          margin-bottom: 3rem;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .value-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2.5rem 1.5rem;
          border-radius: 20px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .value-card:hover {
          background: rgba(255, 215, 0, 0.05);
          border-color: rgba(255, 215, 0, 0.3);
          transform: translateY(-5px);
        }

        .value-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }

        .value-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #FFD700;
          margin-bottom: 1rem;
        }

        .value-description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
        }

        .stats-section {
          margin-bottom: 6rem;
        }

        .stats-section .about-heading {
          text-align: center;
          margin-bottom: 3rem;
        }

        .impact-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 3rem;
        }

        .impact-stat {
          text-align: center;
          padding: 2rem;
          background: rgba(255, 215, 0, 0.05);
          border: 1px solid rgba(255, 215, 0, 0.2);
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .impact-stat:hover {
          background: rgba(255, 215, 0, 0.1);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(255, 215, 0, 0.2);
        }

        .impact-number {
          font-family: 'Orbitron', monospace;
          font-size: 3rem;
          font-weight: 700;
          color: #FFD700;
          margin-bottom: 0.5rem;
        }

        .impact-label {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .cta-section {
          text-align: center;
          padding: 4rem 2rem;
          background: rgba(255, 215, 0, 0.05);
          border: 1px solid rgba(255, 215, 0, 0.2);
          border-radius: 30px;
        }

        .cta-heading {
          font-family: 'Orbitron', monospace;
          font-size: 2rem;
          font-weight: 700;
          color: #FFD700;
          margin-bottom: 2rem;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .nav-container {
            gap: 1rem;
          }

          .nav-link {
            padding: 0.6rem 1.2rem;
            font-size: 0.85rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .landing-content {
            flex-direction: column;
            text-align: center;
          }

          .honeycomb-pattern {
            width: 300px;
            height: 300px;
          }

          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .auth-content {
            flex-direction: column;
          }

          .motto {
            flex-wrap: wrap;
            font-size: 1.5rem;
          }

          .pricing-grid {
            grid-template-columns: 1fr;
          }

          .pricing-card-featured {
            transform: scale(1);
          }

          .values-grid {
            grid-template-columns: 1fr;
          }

          .impact-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .about-section {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="app">
        {currentPage === 'landing' && <LandingPage />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'features' && <FeaturesPage />}
        {currentPage === 'signup' && <SignUpPage />}
        {currentPage === 'signin' && <SignInPage />}
        {currentPage === 'prices' && <PricesPage />}
        {currentPage === 'about' && <AboutUsPage />}
      </div>
    </>
  );
}
