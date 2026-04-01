import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link'; 
import './Mainpage.css';

import logo from '../../assets/ThinkFitimage.png';
import mainimage from "../../assets/First_page_image.png";
import Student from '../../assets/Student image.webp'
import poster from '../../assets/poster.png'
const Mainpage = () => {
  return (
    <>
      <header className="top-header-section">
        <div className="header-thinkfit">
          <img src={logo} alt="ThinkFit Logo" className="header-logo" />
          <span className="brand-name">Thinkfit</span>
        </div>
        <div className="header-second-part">
          <HashLink to="#challenges-section">About Us</HashLink> 
          <HashLink to="#user-role-card">Login</HashLink>       
        </div>
      </header>

      <section className="intro-section">
        <div className="poster-img">
          <img src={poster} alt="" />
        </div>
        {/* <div className="intro-content">
          <div className="intro-image-container">
            <img src={mainimage} alt="Wellness Platform" />
          </div>
          <div className="intro-text-container">
           <p>
  We're building an <em>Integrated Campus Wellness Platform</em> a unified space 
  designed to support both student well-being and campus mental-health initiatives.
</p>

<p>
  <strong><em>For Student</em></strong>, it serves as a personal wellness hub with an AI support 
  chatbot, 24/7 guidance, confidential counsellor booking, mood tracking, stress checks, 
  digital journaling, and curated mental-health resources — all in a safe, judgment-free 
  space.
</p>
<p>
  <strong><em>For administration</em></strong>, it provides an 
  <em>Anonymous Wellness Dashboard</em> that highlights stress patterns, student 
  engagement, and emotional trends, helping institutions make informed decisions and 
  improve campus-wide well-being while keeping identities private.
</p>

<p>
  Together, we’re building a healthier, more connected, and supportive campus community.
</p>

          </div>
        </div> */}
      </section>


      <section className="challenges-solutions-section" id="challenges-section">
        <div className="challenges-container">
          <h2>Challenges We Address</h2>

          <div className="challenge-item">
            <h3>Social Stigma:</h3>
            <p className="challenge-desc">Students fear being labeled "weak" or "crazy," hindering help-seeking.</p>
            <p className="solution-desc">👉 With ThinkFit, support is private, stigma-free, and judgment-free.</p>
          </div>

          <div className="challenge-item">
            <h3>Accessibility Gap:</h3>
            <p className="challenge-desc">Few counselors on campus, especially in rural areas, make appointments difficult.</p>
            <p className="solution-desc">👉 ThinkFit provides 24/7 digital access, ensuring help is always within reach.</p>
          </div>

          <div className="challenge-item">
            <h3>Lack of Awareness:</h3>
            <p className="challenge-desc">Many students are unaware of college mental health services or normalize distress.</p>
            <p className="solution-desc">👉 ThinkFit offers Awareness through access, reminders, and self-help.</p>
          </div>

          <div className="challenge-item">
            <h3>Reactive System:</h3>
            <p className="challenge-desc">Colleges often react only after serious incidents, lacking real-time mental health data.</p>
            <p className="solution-desc">👉 ThinkFit offers proactive tracking and insights for early interventions.</p>
          </div>

          <div className="challenge-item">
            <h3>Content Mismatch:</h3>
            <p className="challenge-desc">Existing apps are often Western-focused, paid, and lack local language support.</p>
            <p className="solution-desc">👉 ThinkFit offers Affordable, multilingual, student-focused support.</p>
          </div>
          <div className="challenge-item">
            <h3>Peer Pressure:</h3>
            <p className="challenge-desc">Existing apps are often Western-focused, paid, and lack local language support.</p>
            <p className="solution-desc">👉 ThinkFit builds resilience and mindfulness practices handle pressure.</p>
          </div>

          <p className="result-text">✨ <strong>Result:</strong> By removing these barriers, ThinkFit ensures students access the right support at the right time, leading to healthier, happier, and more productive lives.</p>
        </div>
      </section>

      <div className="landing-page">
        <section className="hero-section">
          
          <div className="hero-content">
            <div className="hero-text">
              <div className="tagline">
                <span role="img" aria-label="heart" className="icon">❤️</span>
                Professional Mental Health Support
              </div>
              <h1 className="hero-title">
                Your Mental Health
                <span className="highlight"> Journey</span>
                <br />
                Starts Here
              </h1>
              <p className="hero-description">
                Connect with licensed mental health professionals through our
                secure platform. Get the support you need, when you need it.
              </p>
              <div className="role-cards">
                
                <div className="role-card" id="user-role-card">
                  <div className="card-header">
                    <div className="icon-circle">
                      <span role="img" aria-label="users" className="icon-lg">👥</span>
                    </div>
                    <h3 className="card-title">I need support</h3>
                    <p className="card-description">
                      Book sessions with licensed counselors and access AI-powered support
                    </p>
                  </div>
                  <div className="card-content">
                    <div className="card-points">
                      <div className="point">
                        <span role="img" aria-label="calendar" className="icon-sm">📅</span>
                        <span>Book counseling sessions</span>
                      </div>
                      <div className="point">
                        <span role="img" aria-label="chat bubble" className="icon-sm">💬</span>
                        <span>24/7 AI chat support</span>
                      </div>
                      <div className="point">
                        <span role="img" aria-label="shield" className="icon-sm">🛡️</span>
                        <span>Secure & confidential</span>
                      </div>
                    </div>
                    <Link to="/Userlogin">
                      <button className="cta-btn">Continue as User</button>
                    </Link>
                  </div>
                </div>
              <div className="role-card" id="counselor-role-card">
                  <div className="card-header">
                    <div className="icon-circle">
                      <span role="img" aria-label="brain" className="icon-lg">🧠</span>
                    </div>
                    <h3 className="card-title">I'm a counselor</h3>
                    <p className="card-description">
                      Manage your practice and provide professional mental health support
                    </p>
                  </div>
                  <div className="card-content">
                    <div className="card-points">
                      <div className="point">
                        <span role="img" aria-label="users" className="icon-sm">👥</span>
                        <span>Manage patient sessions</span>
                      </div>
                      <div className="point">
                        <span role="img" aria-label="chat bubble" className="icon-sm">💬</span>
                        <span>Real-time chat system</span>
                      </div>
                      <div className="point">
                        <span role="img" aria-label="calendar" className="icon-sm">📅</span>
                        <span>Session scheduling</span>
                      </div>
                    </div>
                    <Link to="/Userlogin">
                      <button className="cta-btn">
                        Continue as Counsellor
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="role-card" id="admin-role-card">
    <div className="card-header">
      <div className="icon-circle">
        <span role="img" aria-label="gear" className="icon-lg">⚙️</span>
      </div>
      <h3 className="card-title">Admin Panel</h3>
      <p className="card-description">
        Oversee the platform, manage users, and ensure smooth operations
      </p>
    </div>
    <div className="card-content">
      <div className="card-points">
        <div className="point">
          <span role="img" aria-label="monitor" className="icon-sm">📊</span>
          <span>Dashboard & analytics</span>
        </div>
        <div className="point">
          <span role="img" aria-label="users" className="icon-sm">👤</span>
          <span>Manage users & counselors</span>
        </div>
        <div className="point">
          <span role="img" aria-label="shield" className="icon-sm">🔒</span>
          <span>Ensure security & compliance</span>
        </div>
      </div>
      <Link to="/Userlogin">
        <button className="cta-btn">Continue as Admin</button>
      </Link>
    </div>
  </div>
              </div>
            </div>
          </div>
        </section>
        <section className="features-section">
          <div className="features-container">
            <div className="features-header">
              <img src={Student} alt="" height="200px" />
              <h2>Why Choose Our Platform?</h2>
              <p>
                Professional, secure, and accessible mental health support designed
                for modern needs
              </p>
            </div>
            <div className="features-grid">
              <div className="feature">
                <div className="feature-icon primary">
                  <span role="img" aria-label="shield" className="icon-sm">🛡️</span>
                </div>
                <h3>Secure & Private</h3>
                <p>
                  End-to-end encryption ensures your conversations remain completely
                  confidential
                </p>
              </div>
              <div className="feature">
                <div className="feature-icon secondary">
                  <span role="img" aria-label="heart" className="icon-sm">❤️</span>
                </div>
                <h3>Licensed Professionals</h3>
                <p>
                  Connect with certified mental health counselors and therapists
                </p>
              </div>
              <div className="feature">
                <div className="feature-icon primary">
                  <span role="img" aria-label="chat bubble" className="icon-sm">💬</span>
                </div>
                <h3>24/7 Support</h3>
                <p>
                  AI-powered chat support available anytime you need immediate
                  assistance
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Mainpage;